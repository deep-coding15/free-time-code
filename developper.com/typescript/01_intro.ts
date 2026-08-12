// 2. Typage
var pi = 3.14;
var message = "Bonjour !";
var flag = true;
var joker = null;

function triple(n : number): number {
    return n * 3;
}

// 3. Classe
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    shout():string {
        return "...";
    }
}

var animal = new Animal("pokemon");

class Lion extends Animal {
    sex: string;

    constructor(name: string, sex: string) {
        super(name);
        this.sex = sex;
    }
    shout(): string {
        return "Rooooaarrr";
    }
}

// 4. Interface
interface I1 {
    a: number;
}

interface I2 {
    b: string;
}

function fct(x: I1) {
    alert (x.a);
}

class I3 implements I1 {
    a: number;
    z: number;
}

const obj = {
    a: 20,
    z: -1
};

fct(obj);

class C implements I1, I2 {
    a: number;
    b: string;

    constructor(a: number, b: string) {
        this.a = a;
        this.b = b;
    }
}

var c = new C(15, "Bonjour !");
fct(c);

interface I3 extends I2 {
    c: boolean;
}


// 5. Fonction anonyme fléchée
function alertMsg(msg: string) {
    this.msg = msg;
    this.timer = setInterval(
        () => {
            alert(this.msg);
        },
        500
    )
}

// 6. Modularité
 // 6-1 referencement de fichiers
 // 6-2 module explicite
    // En TypeScript chaque fichier source est implicitement un module.
module M  {
    var temp = "Bonjour !";
    export var id = 0;
    export function fct() { }
    export interface I {
        a: number
    }
    export class C implements I {
        a: number;
    }
}

alert (M.id);

 // 6-3 Importation de modules externes

export var id = 0;
export function fct2() {  }
export interface I {
    a: number;
}
export class C2 implements I {
    a: number;
}

import m = require("./01_intro");

m.id++;

// 7 Typage generique
function concatenate<T> (a1: T[], a2: T[]): T[] {
    return a1.concat(a2);
}

resultNumbers = concatenate<number>([1, 2], [3, 4]); // [1, 2, 3, 4]
resultStrings = concatenate<string>(["a", "b"], ["c", "d"]); // ["a", "b", "c", "d"]
resultError1 = concatenate<number>([1, 2], ["a", "b"]); // erreur
resultError2 = concatenate<string>([1, 2], ["a", "b"]); // erreur
resultAny = concatenate<any>([1, 2], ["a", "b"]); // [1, 2, "a", "b"]

