import { IExecutor } from "./Executor";
import ITask from "./Task";

export default async function run(
  executor: IExecutor,
  queue: AsyncIterable<ITask>,
  maxThreads = 0
) {  

  let stages = ['init', 'prepare', 'work', 'finalize', 'cleanup'];
  let execStatus = new Map<number, [boolean, string]>();
  let delayed: ITask[] = [];

  async function executeDelayed() {
    for (let i in delayed) {
      const delayedTask = delayed[i];

      if (!execStatus.get(delayedTask.targetId) || !execStatus.get(delayedTask.targetId)?.[0]) {
        const index = stages.indexOf(delayedTask.action);
        const prevAction = stages[index - 1];

        if (execStatus.get(delayedTask.targetId)?.[1] === prevAction) {
          execStatus.set(delayedTask.targetId, [true, delayedTask.action]);
          await executor.executeTask(delayedTask).then(
            () => {
              delayed[i] === null;
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
          await executor.executeTask(t).then(
            () => {
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
          await executor.executeTask(task).then(
            () => {
              execStatus.set(task.targetId, [false, task.action]);
            }
        );
        }
        else delayed.push(task);
      }
      else delayed.push(task);
    }
  }

  async function runThread() {
    let firstTask = (await queue[Symbol.asyncIterator]().next()).value;
    do {
      await executeFromQueue(firstTask);
      await executeDelayed();
      firstTask = (await queue[Symbol.asyncIterator]().next()).value;
    }
    while (firstTask)
  }

  const threads: Promise<any>[] = [];

  for(let i = 0; i < (maxThreads || 12); i++) {
    threads.push(new Promise((res, rej) => {
      res(runThread())
    }))
  }

  await Promise.all(threads);
}
