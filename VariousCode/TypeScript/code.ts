console.clear();

namespace Users {
  export class User {
    constructor(public name: string) {}
  }

  export class Admin {
    constructor(public name: string) {}
  }
}

//Uppercase для того, чтобы проверить область видимости содержимого неймспейса

let User = new Users.User("John");
let Admin = new Users.Admin("Admin");
console.log(User.name, Admin.name); // John, Admin

// Для чего такое может пригодиться? Сделать резко константу чи шо?

let constVariable1: string = <const>"Aboba";
let constVariable2: string = "Abobus" as const;

console.log(constVariable1, constVariable2);

// Предохранитель in

interface IDog {
  gav(): void;
}
interface ICat {
  meow(): void;
}

function speak(pet: IDog | ICat) {
  if ("gav" in pet) {
    pet.gav();
  } else {
    pet.meow();
  }
}

const cat: ICat = {
  meow() {
    console.log("Cat does meow");
  }
};

speak(cat);

// Record

const XYZ: Record<"x" | "y" | "z", number> = {
  x: 1,
  y: 2,
  z: -10
};

// Pick

interface IUserData {
  id: number;
  name: string;
  maidenName: string;
  isAdmin: boolean;
}

type PickedUserData = Pick<IUserData, "id" | "maidenName">;

const user: PickedUserData = {
  id: 0,
  maidenName: "IronMan"
};

console.log(user);

// Partial

const someCoords: Partial<{ x: number; y: number; z: number }> = {
  x: 1,
  y: 2
};

console.log(someCoords);
