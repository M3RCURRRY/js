import { IExecutor } from "./Executor";
import ITask from "./Task";

export default async function run(
  executor: IExecutor,
  queue: AsyncIterable<ITask>,
  maxThreads = 0
) {
  maxThreads = Math.max(0, maxThreads);

  let stages = ['init', 'prepare', 'work', 'finalize', 'cleanup'];
  let execStatus = new Map<number, [boolean, string]>();
  let delayed: ITask[] = [];
  let running: number = 0;

  async function executeDelayed() {
    for (let i in delayed) {
      const delayedTask = delayed[i];

      if (!execStatus.get(delayedTask.targetId) || !execStatus.get(delayedTask.targetId)?.[0]) {
        const index = stages.indexOf(delayedTask.action);
        const prevAction = stages[index - 1];

        if (execStatus.get(delayedTask.targetId)?.[1] === prevAction) {
          execStatus.set(delayedTask.targetId, [true, delayedTask.action]);
          running++;
          await executor.executeTask(delayedTask).then(
            () => {
              delayed[i] === null;
              running--;
              execStatus.set(delayedTask.targetId, [false, delayedTask.action]);
            }
          );
        }
      }
    }

    delayed = delayed.filter(task => task !== null);
  }

  async function executeFromQueue(t: ITask) {
    {
      if (!execStatus.get(t.targetId) || !execStatus.get(t.targetId)?.[0] ) {
        const index = stages.indexOf(t.action);
        const prevAction = stages[index - 1];
        if (execStatus.get(t.targetId)?.[1] === prevAction) {
          execStatus.set(t.targetId, [true, t.action])
          running++;
          await executor.executeTask(t).then(
            () => {
              running--;
              execStatus.set(t.targetId, [false, t.action]);
            }
        );
        }
      }
      else delayed.push(t);
    }

    for await (let task of queue) {
      if (!execStatus.get(task.targetId) || !execStatus.get(task.targetId)?.[0] ) {
        const index = stages.indexOf(task.action);
        const prevAction = stages[index - 1];
        if (execStatus.get(task.targetId)?.[1] === prevAction) {
          execStatus.set(task.targetId, [true, task.action])
          running++;
          await executor.executeTask(task).then(
            () => {
              running--;
              execStatus.set(task.targetId, [false, task.action]);
            }
        );
        }
        else delayed.push(task);
      }
      else delayed.push(task);
    }
  }

  async function runThread(s: string) {
    let firstTask = (await queue[Symbol.asyncIterator]().next()).value;
    do {
      await executeFromQueue(firstTask);
      await executeDelayed();
      firstTask = (await queue[Symbol.asyncIterator]().next()).value;
    }
    while (firstTask)

    while(running) {
      firstTask = (await queue[Symbol.asyncIterator]().next()).value;
      if (firstTask) {
        await executeFromQueue(firstTask);
        await executeDelayed();
      }

      await new Promise(res => {
        setTimeout(() => res(1), 10);
      });
    }
  }

  const threads: Promise<any>[] = [];

  for(let i = 0; i < (maxThreads || 12); i++) {
    threads.push(new Promise((res, rej) => {
      res(runThread(`${i}`))
    }))
  }

  await Promise.all(threads);
}
