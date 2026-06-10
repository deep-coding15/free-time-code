# 📘 Mémo TypeScript — Bases & Concepts clés

> Basé sur le tutoriel [developpez.com](https://yahiko.developpez.com/tutoriels/introduction-typescript/) · Enrichi pour révision rapide  
> TypeScript = **JavaScript + typage statique**. Tout JS valide est du TS valide.

---

## 1. Pourquoi TypeScript ?

| JavaScript | TypeScript |
|---|---|
| Typage dynamique (erreurs à l'exécution) | Typage statique (erreurs à la compilation) |
| Pas d'autocomplétion fiable | Excellente intégration IDE |
| Difficile à maintenir sur gros projets | Auto-documenté grâce aux types |

> **Analogie Java :** TypeScript est à JavaScript ce que Java est à un langage non typé. Si tu viens de Java/Spring Boot, les interfaces, classes, génériques et modificateurs d'accès te seront très familiers.

---

## 2. Typage

```typescript
// Inférence de type : TypeScript déduit le type automatiquement
var pi      = 3.14;       // inféré : number
var message = "Bonjour !"; // inféré : string
var flag    = true;        // inféré : boolean
var joker   = null;        // inféré : null

// Typage explicite : recommandé pour les paramètres de fonctions
function triple(n: number): number {
    return n * 3;
}
```

### Types primitifs principaux
| Type | Exemple | Notes |
|---|---|---|
| `number` | `42`, `3.14` | Pas de `int` / `float` distincts comme en Java |
| `string` | `"hello"` | Guillemets simples ou doubles |
| `boolean` | `true` / `false` | |
| `null` | `null` | |
| `undefined` | `undefined` | Variable déclarée mais non initialisée |
| `any` | tout | ⚠️ Désactive le typage — à éviter autant que possible |
| `void` | — | Retour de fonction sans valeur (comme `void` en Java) |

### Bonne pratique
```typescript
// ❌ Éviter any sauf cas exceptionnel
function fct(x: any) { ... }

// ✅ Typer explicitement
function fct(x: number): string { ... }
```

---

## 3. Classes

```typescript
class Animal {
    name: string; // propriété d'instance (public par défaut)

    constructor(name: string) {
        this.name = name;
    }

    shout(): string {
        return "...";
    }
}

var animal = new Animal("pokemon");
```

### Héritage

```typescript
class Lion extends Animal {
    sex: string;

    constructor(name: string, sex: string) {
        super(name); // ⚠️ Obligatoire en 1er dans le constructeur enfant
        this.sex = sex;
    }

    shout(): string {       // Surcharge de méthode (override)
        return "Rooooaarrr";
    }
}
```

### Modificateurs d'accès (comme en Java)
```typescript
class Exemple {
    public    visible: string;   // accessible partout (défaut)
    private   secret: string;    // accessible uniquement dans la classe
    protected partage: string;   // accessible dans la classe et ses enfants
    readonly  fixe: string;      // ne peut pas être modifié après init (≈ final Java)
}
```

### Raccourci constructeur (TypeScript uniquement)
```typescript
// Équivalent de déclarer + assigner dans le constructeur
class Animal {
    constructor(public name: string, private age: number) {}
    // name et age sont automatiquement créés comme propriétés
}
```

---

## 4. Interfaces

Une interface définit un **contrat** : la forme que doit respecter un objet.

```typescript
interface I1 {
    a: number;
}

interface I2 {
    b: string;
}

function fct(x: I1) {
    alert(x.a);
}
```

### Classe implémentant une interface

```typescript
class I3 implements I1 {
    a: number;  // ✅ obligatoire
    z: number;  // ✅ autorisé d'ajouter des propriétés supplémentaires
}
```

### ⚠️ Piège classique : objet littéral vs variable

```typescript
// ❌ ERREUR — Objet littéral direct : TypeScript vérifie chaque propriété strictement
fct({ a: 20, z: -1 }); // 'z' n'existe pas dans I1 → erreur

// ✅ OK — Via une variable : TypeScript vérifie seulement la compatibilité structurelle
const obj = { a: 20, z: -1 };
fct(obj); // obj "contient" a: number → compatible avec I1
```

> **Règle :** TypeScript utilise le **typage structurel** ("duck typing") : si un objet possède toutes les propriétés requises, il est compatible — même s'il en a plus. Mais cette souplesse ne s'applique **pas** aux objets littéraux passés directement.

### Implémenter plusieurs interfaces

```typescript
class C implements I1, I2 {  // équivalent de "implements I1, I2" en Java
    a: number;
    b: string;

    constructor(a: number, b: string) {
        this.a = a;
        this.b = b;
    }
}

var c = new C(15, "Bonjour !");
fct(c); // ✅ C implémente I1, donc compatible
```

### Interface étendant une autre interface

```typescript
interface I3 extends I2 {  // I3 hérite de b: string et ajoute c: boolean
    c: boolean;
}
```

### Interface vs Classe — quand utiliser quoi ?
| | Interface | Classe |
|---|---|---|
| Définit un contrat / une forme | ✅ | ✅ |
| Génère du code JS à la compilation | ❌ (disparaît) | ✅ |
| Peut avoir une implémentation | ❌ | ✅ |
| Peut être instanciée | ❌ | ✅ |

---

## 5. Fonctions fléchées (Arrow Functions)

```typescript
function alertMsg(msg: string) {
    this.msg = msg;
    this.timer = setInterval(
        () => {           // ← fonction fléchée
            alert(this.msg);
        },
        500
    );
}
```

### Pourquoi la fonction fléchée ici ?

```typescript
// ❌ Fonction classique : 'this' change de contexte dans le callback
this.timer = setInterval(function() {
    alert(this.msg); // 'this' ici ≠ 'this' de alertMsg → undefined !
}, 500);

// ✅ Fonction fléchée : 'this' est capturé depuis le contexte parent
this.timer = setInterval(() => {
    alert(this.msg); // 'this' = celui de alertMsg ✅
}, 500);
```

> **Règle :** Utilise toujours des fonctions fléchées dans les callbacks pour éviter les problèmes de `this`. En Angular, tu les verras partout dans les `.subscribe()`, `.map()`, `.filter()`...

---

## 6. Modularité

### 6.1 Module interne (namespace — ancienne syntaxe)

```typescript
// ⚠️ Syntaxe ancienne : 'module' est remplacé par 'namespace' en TypeScript moderne
namespace M {
    var temp = "Bonjour !";   // privé au module (non exporté)
    export var id = 0;         // public
    export function fct() { }
    export interface I { a: number }
    export class C implements I { a: number; }
}

alert(M.id); // ✅ accessible car exporté
// alert(M.temp) // ❌ non accessible car non exporté
```

### 6.2 Module externe (standard ES6 — à privilégier aujourd'hui)

```typescript
// fichier: monModule.ts
export var id = 0;
export function fct2() { }
export interface I { a: number; }
export class C2 implements I { a: number; }

// fichier: main.ts
import * as m from "./monModule"; // ✅ syntaxe moderne (ES6)
// import m = require("./monModule"); // ancienne syntaxe CommonJS

m.id++;
```

> **En Angular**, chaque fichier est un module. Tu utiliseras `export` / `import` en permanence entre composants, services et modèles.

---

## 7. Génériques (Generics)

Comme en Java, les génériques permettent d'écrire du code réutilisable pour plusieurs types.

```typescript
function concatenate<T>(a1: T[], a2: T[]): T[] {
    return a1.concat(a2);
}

// Utilisation avec types explicites
const resultNumbers = concatenate<number>([1, 2], [3, 4]);       // ✅ [1, 2, 3, 4]
const resultStrings = concatenate<string>(["a", "b"], ["c", "d"]); // ✅ ["a", "b", "c", "d"]

// Erreurs de typage (détectées à la compilation !)
const resultError1 = concatenate<number>([1, 2], ["a", "b"]); // ❌ string ≠ number
const resultError2 = concatenate<string>([1, 2], ["a", "b"]); // ❌ number ≠ string

// Avec 'any' : pas d'erreur mais on perd la sécurité du typage
const resultAny = concatenate<any>([1, 2], ["a", "b"]);        // ✅ [1, 2, "a", "b"]
```

### Contrainte sur un générique

```typescript
// T doit obligatoirement avoir une propriété 'length'
function logLength<T extends { length: number }>(val: T): void {
    console.log(val.length);
}

logLength("hello");    // ✅ string a .length
logLength([1, 2, 3]);  // ✅ tableau a .length
logLength(42);         // ❌ number n'a pas .length
```

---

## 8. Récap visuel — Concepts clés

```
TypeScript
├── Typage
│   ├── Inférence automatique
│   ├── Annotation explicite (: type)
│   └── any (à éviter)
│
├── Classes (comme Java)
│   ├── Héritage (extends)
│   ├── Modificateurs (public, private, protected, readonly)
│   └── Raccourci constructeur
│
├── Interfaces
│   ├── Contrat structurel
│   ├── implements (une ou plusieurs)
│   ├── extends (héritage d'interface)
│   └── ⚠️ Littéral vs variable
│
├── Fonctions fléchées
│   └── Capture de 'this' (crucial pour les callbacks)
│
├── Modules
│   ├── namespace (interne — ancienne syntaxe)
│   └── export / import (externe — standard ES6 ✅)
│
└── Génériques
    ├── <T> — type paramétré
    ├── <T extends ...> — contrainte
    └── any — sans contrainte (déconseillé)
```

---

## 9. Pièges à retenir 🚨

| Piège | Explication |
|---|---|
| `fct({a: 1, z: 2})` directement | Erreur si propriétés inconnues dans un littéral |
| `this` dans un callback classique | Contexte perdu → utiliser une fonction fléchée |
| `module` vs `namespace` | `module` est l'ancienne syntaxe, préférer `namespace` ou les modules ES6 |
| `any` partout | Désactive le typage → perd tout l'intérêt de TypeScript |
| Oublier `super()` dans un constructeur enfant | Erreur à la compilation |

---

*Prochaine étape : angular.dev/tutorials — les concepts de classes, interfaces et modules seront utilisés en permanence dans les composants Angular.*