import { admin, dec2bin, bin2dec } from "./loadMe";
import * as weewee from "./bad"; 

admin.name = "NewName";

console.clear();

console.log(dec2bin(9)); // 1001
console.log(bin2dec("1110")); // 14

console.log(weewee.boo()); // boo
console.log(weewee.adminName()); // NewName

let {sayHi, sayBye} = await import('./good.js');

sayHi();
sayBye();