---
title: TypeScript
description: TypeScript学习
sidebar_label: TypeScript学习
hide_title: true
last_update:
  date: 2023-4-14
  author: Chason
---

## 一、认识Typescript

### 1.1、Typescript与Javascript的区别

|      类型系统特性      | JavaScript | Typescript |
| :--------------------: | :--------: | :--------: |
|    类型是如何绑定？    |    动态    |    静态    |
| 是否存在类型隐式转换？ |     是     |     否     |
|     何时检查类型？     |   运行时   |   编译时   |
|      何时报告错误      |   运行时   |   编译时   |

### 1.2、静态类型检查

1.在typescript中，在编译时就会检查类型，如果和预期的类型不符合直接会在编辑器里报错、爆红

![1661867586539](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368880-58b67e.png)

2.当对某一个变量进行类型定义之后，该变量可以使用该类型的属性和方法等，可能无法是其他类型定义的方法和属性

```ts
/**
 * 静态类型检查
 * @date: 2022-09-17 16:40
 */
let message: string = 'hello world';
// message = 10; // TS2322: Type 'number' is not assignable to type 'string'.
console.log(message.length);
console.log((555.454).toFixed(2));
// message.toFixed(2); // Error: Property 'toFixed' does not exist on type 'string'. Did you mean 'fixed'?

// 理解解释： message属于字符串型，可以调用length属性，没有toFixed的方法
```

### 1.3、非异常故障

![1661868116306](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368888-27612a.png)

## 二、基础类型

### 2.1、布尔值

```ts
/**
 * 布尔
 * @date: 2022-09-17 16:44
 */
let bool: boolean = true;
console.log(bool);
```

### 2.2、数字型

```ts
/**
 * Number型
 * @date: 2022-09-17 16:44
 */
const num: number = 1;
console.log(num);
```

👋注意：<u>TypeScript里的所有数字都是浮点数和Javascript一样，除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量</u>

```ts
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```

bigint 与 number 互不兼容， 同时bigint需要在`tsconfig.json`的compilerOptions的`lib字段`配置`ES2020`

```ts
// 注意：bigint 与 number 互不兼容
let bigNum: bigint = 100n; // Error: BigInt literals are not available when targeting lower than ES2020.
bigNum = num; // Error: Type 'number' is not assignable to type 'bigint'
num = bigNum; // Error: Type 'bigint' is not assignable to type 'number'.
```

### 2.3、字符串型

```ts
/**
 * String类型
 * @date: 2022-09-17 16:47
 */
let str: string = 'name is jack';
console.log(str);
```

### 2.4、undefined、null

> 默认情况下 null和undefined 是所有类型的子类型，如果在tsconfig.json的compilerOptions指定了 "strictNullChecks": true, null和undefined 只能赋值给void 和 它们各自的类型

1.未在tsconfig.json进行strictNullChecks选项配置

```ts
let u: undefined = undefined;
let n: null = null;
let v: void = null;
console.log(u, n);
let num_u: number = undefined;
let num_n: number = null;
let str_u: string = undefined;
let str_n: string = null;
```

2.tsconfig.json配置了strictNullChecks选项配置

```ts
let u: undefined = undefined;
let n: null = null;
let v: void = null; // Error: Type 'null' is not assignable to type 'void'.
console.log(u, n);
let num_u: number = undefined; // Error: Type 'undefined' is not assignable to type 'number'.
let num_n: number = null;
let str_u: string = undefined;
let str_n: string = null;
```

### 2.5、void

1.它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void

```ts
function warnUser(): void {
  console.log('This is my warning message');
}
warnUser();
```

2.声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null

```ts
let unusable: void = undefined;
console.log(unusable);
```

### 2.6、any

> any类型是十分有用的，它允许你在编译时可以选择地包含或移除类型检查。

```ts
/**
 * any
 * @date: 2022-09-17 16:48
 */
// any类型是十分有用的，它允许你在编译时可以选择地包含或移除类型检查。
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
let prettySure: Object = 4;
// prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

### 2.7、never

> never类型表示的是那些永不存在的值的类型，它既不是void，也不是null和undefined

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error('Something failed');
}

// 无限循环
function infiniteLoop(): never {
  while (true) {}
}
```

### 2.8、unknown

> unknown类型代表任何值。这与any类型类似，但更安全，因为对未知unknown值做任何事情都是不合法的。

```ts
/**
 * unknown
 * @date: 2022-09-17 16:50
 */
function f1(a: any) {
  a.b();
}
function f2(a: unknown) {
  // a.b() // Error: Object is of type 'unknown'.
}
```

### 2.9、类型断言

类型断言有两种形式。

`尖括号`语法：

```ts
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;
```

另一个为`as`语法：

```ts
let someValue: any = 'this is a string';
let strLength: number = (someValue as string).length;
```

两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；`然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的`。

### 2.10、数组

> 有两种定义方式

第一种：可以在元素类型后面接上 []

```typescript
let list: number[] = [1, 2, 3];
```

第二种：使用数组泛型

```typescript
let listArray: Array<number> = [1, 2, 3];
```

### 2.11、元组

> 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同

```ts
let x: [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
```

当访问一个已知索引的元素，会得到正确的类型：

```ts
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```

当访问一个越界的元素，会使用联合类型替代：

```ts
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
x[6] = true; // Error, 布尔不是(string | number)类型
```

在解构赋值时，如果解构数组元素的个数是不能超过元组中元素的个数，否则也会出现错误

```ts
let employee: [number, string] = [1, 'Semlinker'];
let [id, username, age] = employee; // Tuple type '[number, string]' of length '2' has no element at index '2'
```

元组类型的可选元素

```ts
let optionalTuple: [string, boolean?];
optionalTuple = ['Semlinker', true];
console.log(`optionalTuple : ${optionalTuple}`);
optionalTuple = ['Kakuqo'];
console.log(`optionalTuple : ${optionalTuple}`);
```

只读的元组类型

```ts
const point: readonly [number, number] = [10, 20];
point[0] = 1; // Cannot assign to '0' because it is a read-only property.
```

### 2.12、object、Obeject 和 {}

> object（首字母小写，以下称“小 object”）、Object（首字母大写，以下称“大 Object”）和 {}（以下称“空对象”）
>
> 小 object 代表的是所有非原始类型，也就是说我们不能把 number、string、boolean、symbol等 原始类型赋值给 object。在严格模式下，`null` 和 `undefined` 类型也不能赋给 object。
>
> JavaScript 中以下类型被视为原始类型：`string`、`boolean`、`number`、`bigint`、`symbol`、`null` 和 `undefined`。

#### 2.12.1、object

```ts
let lowerCaseObject: object;
lowerCaseObject = 1; // ts(2322)
lowerCaseObject = 'a'; // ts(2322)
lowerCaseObject = true; // ts(2322)
lowerCaseObject = null; // ts(2322)
lowerCaseObject = undefined; // ts(2322)
lowerCaseObject = {}; // ok
```

执行结果：

![1662208700431](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368896-d4c557.png)

#### 2.12.2、Object

> 大Object 代表所有拥有 toString、hasOwnProperty 方法的类型，所以所有原始类型、非原始类型都可以赋给 Object。同样，在严格模式下，null 和 undefined 类型也不能赋给 Object。

```ts
let upperCaseObject: Object;
upperCaseObject = 1; // ok
upperCaseObject = 'a'; // ok
upperCaseObject = true; // ok
upperCaseObject = null; // ts(2322)
upperCaseObject = undefined; // ts(2322)
upperCaseObject = {}; // ok
```

执行结果：

![1662208937597](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368900-d80240.png)

#### 2.12.3、{}

> {}空对象类型和大 Object 一样，也是表示原始类型和非原始类型的集合，并且在严格模式下，null 和 undefined 也不能赋给 {}

```ts
let ObjectLiteral: {};
ObjectLiteral = 1; // ok
ObjectLiteral = 'a'; // ok
ObjectLiteral = true; // ok
ObjectLiteral = null; // ts(2322)
ObjectLiteral = undefined; // ts(2322)
ObjectLiteral = {}; // ok
```

执行结果：

![1662209212120](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368905-b31f46.png)

🎨结论： <u>{}、大 Object 是比小 object 更宽泛的类型（least specific），{} 和大 Object 可以互相代替，用来表示原始类型（null、undefined 除外）和非原始类型；而小 object 则表示非原始类型。</u>

## 三、枚举

### 3.1、数字枚举

```ts
/**
 * 数字枚举
 * @date: 2022-09-17 16:52
 */
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
console.log(Direction.Left); // 输出3
```

👋注意：<u>我们定义了一个数字枚举， Up使用初始化为 1。 其余的成员会从 1开始自动增长。 换句话说， Direction.Up的值为 1， Down为 2， Left为 3， Right为 4。</u>

**当不初始化枚举时：**

```ts
// 当不初始化枚举时
enum initDirection {
  Up,
  Down,
  Left,
  Right,
}
console.log(initDirection.Up);
```

👋注意： <u>现在， Up的值为 0， Down的值为 1等等。 当我们不在乎成员的值的时候，这种自增长的行为是很有用处的，但是要注意每个枚举成员的值都是不同的。</u>

### 3.2、字符串枚举

```ts
/**
 * 字符串枚举
 * @date: 2022-09-17 16:53
 */
enum DirectionStr {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  // Right, // Error: Enum member must have initializer.
}
```

👋注意：<u>在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。</u>

## 四、接口

### 4.1、接口案例

> 在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。
>
> TypeScript 中的接口是一个非常灵活的概念，除了可用于[对类的一部分行为进行抽象]以外，也常用于对「对象的形状（Shape）」进行描述。

接口一般首字母大写

```ts
interface Person {
  name: string;
  age: number;
}
let tom: Person = {
  name: 'Tom',
  age: 25,
};
```

我们定义了一个接口 Person，接着定义了一个变量 tom，它的类型是 Person。这样，我们就约束了 tom 的形状必须和接口 Person 一致。

定义的变量比接口少了一些属性是不允许的：

```ts
interface Person {
  name: string;
  age: number;
}
let tom: Person = {
  name: 'Tom',
}; // Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.
```

多一些属性也是不允许的：

```ts
interface Person {
  name: string;
  age: number;
}
let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male',
};
// Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
// Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

可见，赋值的时候，变量的形状必须和接口的形状保持一致。

### 4.2、可选 | 只读属性

```ts
interface IPerson {
  readonly name: string;
  age?: number;
}

let person: IPerson = {
  name: 'Victor',
};
person.name = 'Jack';
```

### 4.3、任意属性(索引签名)

> 有时候我们希望一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性，这时我们可以使用 **索引签名** 的形式来满足上述要求。

使用案例：

```ts
interface IPerson {
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: IPerson = {
  name: 'Tom',
  gender: 'male',
};
```

👋注意：<u>一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集</u>

```ts
interface IPerson {
  name: string;
  age?: number;
  [propName: string]: string;
} // Error: Property 'age' of type 'number | undefined' is not assignable to 'string' index type 'string'.
```

因为`age`属性的类型为 number | undefined 不能赋给 string（任意属性的） 类型， 一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用 。

解决方案如下：

```ts
interface IPerson {
  name: string;
  age?: number;
  [propName: string]: string | number | undefined;
} // Error: Property 'age' of type 'number | undefined' is not assignable to 'string' index type 'string'.
```

### 4.4、接口定义函数

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let searchStr: SearchFunc = function (source, subString) {
  return source.includes(subString);
};

console.log(searchStr("I'm jack", 'jack'));

interface logName {
  name: string;
  print: (firstName: string) => string;
}

const Jack: logName = {
  name: 'Jack',
  print: function (firstName) {
    console.log(firstName + this.name);
    return firstName + this.name;
  },
};
```

## 五、类

### 5.1、ES6的类

```ts
/* ES6的类 */
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'Hello, ' + this.greeting;
  }
}

let greeter = new Greeter('Javascript');
console.log(greeter.greet());
```

### 5.2、继承

```ts
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log('Slithering...');
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 45) {
    console.log('Galloping...');
    super.move(distanceInMeters);
  }
}

let sam = new Snake('Sammy the Python');
let tom: Animal = new Horse('Tommy the Palomino');

sam.move();
tom.move(34);
```

👋注意：<u>必须调用 super()，它会执行基类的构造函数。 而且，在构造函数里访问 this的属性之前，我们 一定要调用 super()。 这个是TypeScript强制执行的一条重要规则。</u>

### 5.3、公共，私有与受保护的修饰符

#### 5.3.1、public

在TypeScript里，成员都默认为 public。

```ts
class Animal {
  public name: string;
  public constructor(theName: string) {
    this.name = theName;
  }
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
```

#### 5.3.2、private

当成员被标记成 private时，它就不能在声明它的类的外部访问。

```ts
class Animal {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

new Animal('Cat').name; // 错误: 'name' 是私有的. Property 'name' is private and only accessible within class 'Animal'.
```

#### 5.3.3、protected

protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问。

```ts
class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee('Howard', 'Sales');
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误
```

### 5.4、readonly修饰符

```ts
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName;
  }
}
let dad = new Octopus('Man with the 8 strong legs');
dad.name = 'Man with the 3-piece suit'; // 错误! name 是只读的.
```

### 5.5、存取器

#### 5.5.1、基础使用

```ts
class C {
  _length = 0;
  get length() {
    return this._length;
  }

  set length(value) {
    this._length = value;
  }
}

const c = new C();
c.length; // 不能调用函数
c.length = 100;
```

👋注意：<u>使用getter不能通过调用函数</u>

#### 5.5.2、getter的返回类型必须setter的参数类型的子类型

例如:

```ts
class Ting {
  _size = 0;
  get size(): number {
    // The return type of a 'get' accessor must be assignable to its 'set' accessor type
    return this._size;
  }
  set size(value: string) {
    // 设置的类型必须和_size一样
    this._size = value; // Type 'string | number' is not assignable to type 'number'.   Type 'string' is not assignable to type 'number'.
  }
}
```

解决方案：

```ts
class Ting {
  _size = 0;
  get size(): number {
    // The return type of a 'get' accessor must be assignable to its 'set' accessor type
    return this._size;
  }
  set size(value: string | number) {
    // 设置的类型必须和_size一样
    // this._size = value // Type 'string | number' is not assignable to type 'number'.   Type 'string' is not assignable to type 'number'.
    let num = Number(value);
    if (!Number.isFinite) {
      this._size = 0;
      return;
    }
    this._size = num;
  }
}

let t: Ting = new Ting();
console.log(t.size);
t.size = 900;
console.log(t.size);
t.size = 'hello';
console.log(t.size);
```

👋注意：

- 如果存在get，但没有set，则该属性自动是只读的
- 如果没有指定setter参数的类型，它将从getter的返回类型中推断出来
- 访问器和设置器必须有相同的成员可见性

### 5.6、静态属性

> 我们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。 我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。用static进行定义，例如：

```ts
class Grid {
  static origin = { x: 0, y: 0 };
  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) {}
}

let grid1 = new Grid(1.0); // 1x scale
let grid2 = new Grid(5.0); // 5x scale

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
```

### 5.7、抽象类

> 使用 abstract 进行定义，可以定义抽象类和抽象成员和抽象方法

```ts
abstract class Base {
  abstract getName(): string; // 不能有 {} 进行实现, 子类中需要实现getName函数
  printName() {
    console.log(this.getName());
  }
}

const b = new Base(); // 抽象类不能被实例化

class Derived extends Base {
  getName(): string {
    return 'World';
  }
}

const d = new Derived();
d.getName();
b.printName();
```

👋注意：<u>抽象类不能被实例化，只能被继承。且子类必须构建抽象类的抽象成员</u>

![1663484892006](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368914-b9a56d.png)

### 5.8、类的索引签名

```ts
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);

  // 定义索引签名之后，属性必须符合索引签名类型
  x: number = 100; // Property 'x' of type 'number' is not assignable to 'string' index type 'boolean | ((s: string) => boolean)'.
}

// 解决方案
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);

  // 定义索引签名之后，属性必须符合索引签名类型
  // x:number = 100 // Property 'x' of type 'number' is not assignable to 'string' index type 'boolean | ((s: string) => boolean)'.
  x = true;
  check(s: string) {
    return this[s] as boolean;
  }
}
```

### 5.9、类继承接口-implements

> implements用来实现一个接口
>
> 一个类通过关键字implements声明自己使用一个或者多个接口，多个接口用逗号分隔

#### 5.9.1、基本使用

```ts
interface Pingable {
  ping(): void;
}

class Sonar implements Pingable {
  pong() {
    console.log('pong!');
  }
  ping() {
    // 不能缺少ping函数
    console.log('ping!');
  }
}
```

#### 5.9.2、继承多个接口

```ts
interface A {
  A: string;
}

interface B {
  B: string;
}

class C implements A, B {
  A: 'A';
  B: 'B';
}
```

#### 5.9.3、类接口定义的函数参数问题

```ts
/* 接口定义的函数参数问题 */
interface Checkable {
  check(name: string): boolean;
}

class NameChecker implements Checkable {
  // 接口定义的参数类型不一定和实现的函数类型一致，需要保持类型兼容
  check(name: number): boolean {
    //   Type 'string' is not assignable to type 'number'.
    return true;
  }
}
```

解决方案：

```ts
interface Checkable {
  check(name: string): boolean;
}

class NameChecker implements Checkable {
  check(name: number | string): boolean {
    return true;
  }
}
```

#### 5.9.4、类接口定义可选参数:

```ts
/* 类接口定义可选参数 */
interface Base {
  x: number;
  y?: number;
}

class Cn implements Base {
  x = 0;
}

const c = new Cn();
console.log(c.x);
console.log(c.y); // Error: TS2339: Property 'y' does not exist on type 'Cn'.
```

解决方案：

```ts
interface Base {
  x: number;
  y?: number;
}

class Cn implements Base {
  x = 0;
  y = 0;
}

const c = new Cn();
console.log(c.x);
console.log(c.y);
```

### 5.10、类与接口的实现和继承

#### 5.10.1、接口继承接口

```ts
/* 接口继承接口 */
interface IPerson {
  name: string;
  age: number;
}

interface IPeople extends IPerson {
  sex: string;
}
const p: IPeople = {
  name: 'jack',
  age: 10,
  sex: '男',
};
console.log(p);
```

#### 5.10.2、接口继承类

```ts
/* 接口继承类 */
class User {
  id: number;
}

interface IPeople extends User {
  sex: string;
}
const p: IPeople = {
  id: 10,
  sex: '男',
};
console.log(p);
```

#### 5.10.3、接口不能使用实现(implements)

```ts
class User {
  id: number
}

interface IPeople implements User { // Error: Interface declaration cannot have 'implements' clause.
  sex: string
}
```

#### 5.10.4、类不能继承接口

```ts
/* 类不能继承接口，只能继承类 */
interface IUser {
  name: string;
}

class User extends IUser {
  // Error:Cannot extend an interface 'IUser'. Did you mean 'implements'?
  name: 'name';
}
```

👋注意点：

1. 接口不能实现接口或者类，所以实现（implements）只能用于类身上,即类可以实现接口或类
2. 接口可以继承接口或类
3. 类不可以继承接口只能实现(implements)接口，类只能继承类
4. 可多继承或者多实现

### 5.11、泛型类

基本使用

```ts
class Box<T> {
  content: T;
  constructor(value: T) {
    this.content = value;
  }
}

const b: Box<number> = new Box(10);
console.log(b.content);
```

## 六、函数

### 6.1、函数声明

```ts
function sum(x: number, y: number): number {
  return x + y;
}
sum(50, 90);
```

### 6.2、函数表达式

```ts
let mySum: (x: number, y: number) => number = function (x, y): number {
  return x + y;
};

mySum(81, 96);
```

### 6.3、可选参数

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}

let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
console.log(tomcat, tom);
```

👋注意：<u>可选参数必须要在必需参数后面， 可选参数后面不允许再出现必需参数</u>

```ts
function buildName(firstName: string, lastName?: string, symbol: string) {
  // TS1016: A required parameter cannot follow an optional parameter.
  if (lastName) {
    return firstName + symbol + lastName;
  } else {
    return firstName;
  }
}

let tomcat = buildName('Tom', 'Cat', ' ');
let tom = buildName('Tom', 'Dog', ' ');
console.log(tomcat, tom);
```

执行结果：

![1662187029573](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368923-d0bf24.png)

### 6.4、参数默认值

```ts
function buildName(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
console.log(tom, tomcat);
```

### 6.5、剩余参数

```ts
function push(array: any[], ...items: any[]) {
  items.forEach(function (item) {
    array.push(item);
  });
}
let a = [];
push(a, 1, 2, 3);
```

### 6.6、函数重载

由于 JavaScript 是一个动态语言，我们通常会使用不同类型的参数来调用同一个函数，该函数会根据不同的参数而返回不同的类型的调用结果：

```ts
function add(x, y) {
  return x + y;
}
add(1, 2); // 3
add('1', '2'); //"12"
```

由于 TypeScript 是 JavaScript 的超集，因此以上的代码可以直接在 TypeScript 中使用，但当 TypeScript 编译器开启 `noImplicitAny` 的配置项时，以上代码会提示以下错误信息：

![1662191526541](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368927-5b8751.png)

该信息告诉我们参数 x 和参数 y 隐式具有 any 类型。为了解决这个问题，我们可以为参数设置一个类型。因为我们希望 add 函数同时支持 string 和 number 类型，因此我们可以定义一个 string | number 联合类型，同时我们为该联合类型取个别名：

```ts
type Combinable = string | number;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add('Semlinker', ' Kakuqo');
result.split(' '); // Property 'split' does not exist on type 'string | number'.   Property 'split' does not exist on type 'number'.
console.log(result);
```

这时候我们想当然的认为此时 result 的变量的类型为 string，所以我们就可以正常调用字符串对象上的 `split` 方法。但这时 TypeScript 编译器又出现以下错误信息了：

![1662191635639](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368931-9e436c.png)

很明显 `number` 类型的对象上并不存在 `split` 属性。问题又来了，那如何解决呢？这时我们就可以利用 TypeScript 提供的函数重载特性。

> `函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。` 要解决前面遇到的问题，方法就是为同一个函数提供多个函数类型定义来进行函数重载，编译器会根据这个列表去处理函数的调用。

```ts
type Types = number | string;
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Types, b: Types) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add('Semlinker', ' Kakuqo');
result.split(' ');
```

## 七、泛型

### 7.1、泛型

```ts
/**
 * 泛型
 * @date: 2022-09-17 17:08
 */
function identity<T, U>(value: T, message: U): T {
  console.log(message);
  return value;
}
console.log(identity<Number, string>(68, 'Semlinker'));
```

其中 `T` 代表 **Type**，在定义泛型时通常用作第一个类型变量名称。但实际上 `T` 可以用任何有效名称代替。除了 `T` 之外，以下是常见泛型变量代表的意思：

- K（Key）：表示对象中的键类型；
- V（Value）：表示对象中的值类型；
- E（Element）：表示元素类型。

<span className="highlight">图解：</span>

![](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368935-715dbb.jpg)

其实并不是只能定义一个类型变量，我们可以引入希望定义的任何数量的类型变量。比如我们引入一个新的类型变量 `U`，用于扩展我们定义的 `identity` 函数：

```ts
function identity<T, U>(value: T, message: U): T {
  console.log(message);
  return value;
}
console.log(identity<Number, string>(68, 'Semlinker'));
```

### 7.2、泛型约束

案例：

```ts
function trace<T>(arg: T): T {
  console.log(arg.size); // Error: Property 'size doesn't exist on type 'T'
  return arg;
}
```

报错的原因在于 T 理论上是可以是任何类型的，不同于 any，你不管使用它的什么属性或者方法都会报错（除非这个属性和方法是所有集合共有的）。那么直观的想法是限定传给 trace 函数的**参数类型**应该有 size 类型，这样就不会报错了。

如何去表达这个**类型约束**的点呢？实现这个需求的关键在于使用类型约束。使用 extends 关键字可以做到这一点。简单来说就是你定义一个类型，然后让 T 实现这个接口即可。

解决方案：

```ts
interface Sizeable {
  size: number;
}
function trace<T extends Sizeable>(arg: T): T {
  console.log(arg.size);
  return arg;
}
```

## 八、模块

### 8.1、全局模块

默认情况下，当你在一个新的TypeScript文件中写下代码时，它处于全局命名空间中。

```ts
// moduele01.ts
const foo = 123;
```

```ts
// moduele02.ts
const bar = foo; // 编辑及不会报错，但是单独执行 ts-node进行打印会出错
console.log(bar);
```

👋注意： <u>常见定义类型时的冲突</u>

#### 8.1.1、接口会自动合并

```ts
//module01.ts

const foo = 123;

interface Test {
  test: string;
}

type TestType = {
  Test: string;
};
```

```ts
// module02.ts

const bar = foo; // 编辑及不会报错，但是单独执行 ts-node进行打印会出错
console.log(bar);

interface Test {
  date: Date;
}

// 接口自动合并
const testObj: Test = {
  // TS2741: Property 'test' is missing in type '{ date: Date; }' but required in type 'Test'.
  date: new Date(),
};

type TestType = {
  Test: string;
};
```

执行结果：

![1663507351758](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368941-43e108.png)

#### 8.1.2、类型别名会报错

![1663507340555](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368946-914316.png)

毋庸置疑，使用全局变量空间是危险的，因为它会与文件内的代码命名冲突。我们强烈推荐使用文件模块。

### 8.2、文件模块

它也被称为外部模块。如果在你的TypeScript文件的根级别位置含有import或者export，它会在这个文件中创建一个本地的作用域。因此，我们需要把`全局模块中`改成如下方式

```ts
// module02.ts

const bar = foo; // 编辑及不会报错，但是单独执行 ts-node进行打印会出错
console.log(bar);

interface Test {
  date: Date;
}

// 接口自动合并
const testObj: Test = {
  // TS2741: Property 'test' is missing in type '{ date: Date; }' but required in type 'Test'.
  date: new Date(),
};

export type TestType = {
  Test: string;
};
```

执行结果：

![1663507489632](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368951-95baac.png)

## 九、命名空间

项目开发过程中，我们回发现我们的命名是有严格规范的，我们不能随意的去起名字，但若是都采用尽量标准化的方式去命名，我们又无法避免的会造成污染，TypeScript提供了namespace避免这个问题出现

- 在TS1.5之前被叫做内部模块，主要用于组织代码，避免命名冲突
- 在本质上就是定义一个对象，把变量、方法、类、接口等都放里面
- 通过export导出
- 通过namespace定义

### 9.1、namespace定义命名空间

```ts
namespace A {
  export const a = 10;
}
console.log(A.a);
```

### 9.2、嵌套命名空间

```ts
/* 嵌套的命名空间 */
namespace B {
  export const b = 200;
  export namespace C {
    // 也是需要export导出
    export const c = 100;
  }
}
console.log(B.b);
console.log(B.C.c);
```

简化嵌套的命名空间：

```ts
/* 简化嵌套命名空间 */
import c = B.C.c;
console.log(c);
```

### 9.3、三斜杠语法

> 语法使用：`/// <reference path="" />`

```ts
// 08-namespace-test.ts

namespace User {
  export interface IName {
    name: string;
  }
}

/* 使用reference进行导入命名空间，不能使用export导出 */
// export namespace D {
//   export const d = 300
// }
```

```ts
/// <reference path="./08-namespace-test.ts" />

// import { D } from './namespaceTest'
// console.log(D.d)
const Obj: User.IName = {
  name: '杨超越',
};
console.log(Obj.name);
```

## 十、类型推论

```ts
/**
 * 类型推导
 * @date: 2022-09-17 17:14
 */
let str = 'jack'; // str变量未指定类型，类型被推断string类型，这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时。
str = 1; // TS2322: Type 'number' is not assignable to type 'string'.

let arr = [1, 'a']; // 被推断为 number | string 联合类型
arr = [1, 'b', 3, false]; // TS2322: Type 'boolean' is not assignable to type 'string | number'.

window.onmousedown = function (e) {
  // 自动推动为MouseEvent，MouseEvent中没有a属性
  console.log(e.a); // TS2339: Property 'a' does not exist on type 'MouseEvent'.
};
```

执行结果：

![1663249578740](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368960-8f0808.png)

👋注意： <u>类型推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时。</u>

## 十一、高级类型

### 11.1、联合类型

```ts
/* 联合类型 */
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven'; // OK
myFavoriteNumber = 7; // OK
console.log(myFavoriteNumber);
```

特殊的字面量

```ts
// 字面量类型
const num: 1 | 2 = 1;
type EventNames = 'click' | 'scroll' | 'mousemove';
```

### 11.2、类型别名

> 使用 type 定义

```ts
/* 类型别名 */
type Message = string | string[];
let greet = (message: Message) => {
  console.log(message);
};

greet(['1', '2']);
```

### 11.3、交叉类型

```ts
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorfulCircle = Circle & Colorful;

const cc: ColorfulCircle = {
  color: 'red',
  radius: 100,
};
console.log(cc);
```

⭐重点：<u>如何处理冲突</u>

```ts
/* 如何解决冲突 */
interface Sister {
  name: string;
}

interface Sister {
  age: number;
}

// 定义相同的interface会进行重新合并
const sister1: Sister = {
  name: 'sisterAn',
  age: 20,
};
console.log(sister1);

// 如果定义相同的类型别名会出错，TS2300: Duplicate identifier 'Sister'.
type Sister = {
  name: string;
};

type Sister = {
  age: number;
};
```

### 11.4、接口与类型别名的区别

实际上，在大多数的情况下使用接口类型和类型别名的效果等价，但是在某些特定的场景下这两者还是存在很大区别。

> TypeScript 的核心原则之一是对值所具有的结构进行类型检查。而接口的作用就是为这些类型命名和为你的代码或第三方代码定义数据模型。
>
> type(类型别名)会给一个类型起个新名字。type 有时和 interface 很像，但是可以作用于原始值（基本类型），联合类型，元组以及其它任何你需要手写的类型。起别名不会新建一个类型 - 它创建了一个新 名字来引用那个类型。给基本类型起别名通常没什么用，尽管可以做为文档的一种形式使用。

#### 11.4.1、Objects / Functions

两者都可以用来描述对象或函数的类型，但是语法不同

interface

```ts
interface SetPoint {
  (x: number, y: number): void;
}
```

type alias

```ts
type SetPoint = (x: number, y: number) => void;
```

#### 11.4.2、Other Types

与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组。

```ts
/* 基础 */
type Name = string;
/* 对象 */
type PartialPointX = { x: number };
type PartialPointY = { y: number };

/* 联合类型 */
type PartialPoint = PartialPointX | PartialPointY;

/* 元组 */
type Data = [number, string];

/* dom */
let div = document.createElement('div');
type B = typeof div;
```

👋注意： <u>接口可以定义多次，类型别名不可以。与类型别名不同，接口可以定义多次，会被自动合并为单个接口。</u>

```ts
/* 接口可以定义多次,类型别名不可以 */
interface Point {
  x: number;
}
interface Point {
  y: number;
}
const point: Point = { x: 1, y: 2 };

type Direction = {
  UP: string;
};

type Direction = {
  DOWN: string;
};
```

执行结果：

![1662903370043](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368966-ab6988.png)

#### 11.4.3、扩展

> 两者的扩展方式不同，但并不互斥。接口可以扩展类型别名，同理，类型别名也可以扩展接口。
>
> 接口的扩展就是继承，通过 extends 来实现。类型别名的扩展就是交叉类型，通过 & 来实现。

接口扩展接口

```ts
interface PointX {
  x: number;
}

interface Point extends PointX {
  y: number;
}
```

接口扩展类型别名

```ts
/* 接口扩展类型别名 */
type PointX = {
  x: number;
};
interface Point extends PointX {
  y: number;
}
```

类型别名扩展类型别名

```ts
/* 类型别名扩展类型别名 */
type PointX = {
  x: number;
};

type Point = PointX & {
  y: number;
};
```

类型别名扩展接口

```ts
/* 类型别名扩展接口 */
interface PointX {
  x: number;
}
type Point = {
  y: number;
} & PointX;
```

### 11.5、泛型工具类型

> 为了方便开发者 TypeScript 内置了一些常用的工具类型，比如 Partial、Required、Readonly、Record 和 ReturnType 等。不过在具体介绍之前，我们得先介绍一些相关的基础知识，方便读者可以更好的学习其它的工具类型。

#### 11.5.1、typeof

> typeof 的主要用途是在类型上下文中获取变量或者属性的类型

```ts
interface Person {
  name: string;
  age: number;
}
const sem: Person = { name: 'semlinker', age: 30 };
type Sem = typeof sem; // type Sem = Person
```

在上面代码中，我们通过 `typeof` 操作符获取 sem 变量的类型并赋值给 Sem 类型变量，之后我们就可以使用 Sem 类型：

```ts
const lolo: Sem = { name: 'lolo', age: 5 };
console.log(lolo);
```

也可以对嵌套对象执行相同的操作：

```ts
const Message = {
  name: 'jimmy',
  age: 18,
  address: {
    province: '四川',
    city: '成都',
  },
};
type message = typeof Message;
const mess: message = {
  name: 'Victor',
  age: 24,
  address: {
    province: '江西',
    city: '上饶',
  },
};
console.log(mess);
```

此外，typeof 操作符除了可以获取对象的结构类型之外，它也可以用来获取函数对象的类型，比如：

```ts
function toArray(x: number): Array<number> {
  return [x];
}
type Func = typeof toArray; // -> (x: number) => number[]
```

#### 11.5.2、keyof

> `keyof` 操作符是在 TypeScript 2.1 版本引入的，该操作符可以用于获取某种类型的所有键，其返回类型是联合类型。

```ts
/**
 * keyof
 * @date: 2022-09-17 17:31
 */
interface KPerson {
  name: string;
  age: number;
}

type k1 = keyof KPerson; // name | age
type k2 = keyof KPerson[]; // "length" | "toString" | "toLocaleString" | "pop" | "push" | "concat" | "join" | "reverse" | "shift" | "slice" | "sort"
type K3 = keyof { [x: string]: KPerson }; // string | number
```

在 TypeScript 中支持两种索引签名，数字索引和字符串索引：

#### 11.5.3、in

> 只用来遍历枚举类型

type定义的枚举：

```ts
type Keys = 'a' | 'b' | 'c';

type Obj = {
  [p in Keys]: any;
}; // -> { a: any, b: any, c: any }
```

enum定义枚举：

```ts
enum Props {
  UP,
  DOWN,
}

type Obj = {
  [p in Props]: any;
}; // { 0: any, 1: any }

const direct: Obj = {
  0: 0,
  1: 1,
};
```

其他类型错误：

```ts
type Props = {
  name: string;
  key: number;
};

type Obj = {
  [p in Props]: any;
}; // Error: Type 'Props' is not assignable to type 'string | number | symbol'.
```

#### 11.5.4、条件类型

```ts
/**
 * 条件类型
 * @date: 2022-09-17 18:16
 */
interface Animal {
  live(): void;
}

interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
type Example2 = RegExp extends Animal ? number : string;
const data: Example1 = '1';
```

执行结果：

![1663409962316](https://gitee.com/szchason/pic_bed/raw/main/notes/typescript/typescript_base/2023-05-29-1685368972-c029ed.png)

条件类型与泛型结合

#### 11.5.5、infer

#### 11.5.6、extends

#### 11.5.7、映射类型

> 根据旧的类型创建出新的类型, 我们称之为映射类型

```ts
interface TestInterface {
  name: string;
  age: number;
}

type OptionalTestInterface<T> = {
  [p in keyof T]: T[p];
};

type newTestInterface = OptionalTestInterface<TestInterface>; // {name: string, age: number}
```

#### 11.5.8、Partial

> `Partial<T> 将类型的属性变成可选`

Partial源代码：

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

使用案例说明：

```ts
interface UserInfo {
  id: string;
  name: string;
}
// error：Property 'id' is missing in type '{ name: string; }' but required in type 'UserInfo'
const xiaoming: UserInfo = {
  name: 'xiaoming',
};
```

使用`Partial<T>`

```ts
type NewUserInfo = Partial<UserInfo>;
const xiaoming: NewUserInfo = {
  name: 'xiaoming',
};
```

但是` Partial<T>` 有个局限性，就是只支持处理第一层的属性，如果我的接口定义是这样的

```ts
interface UserInfo {
  id: string;
  name: string;
  fruits: {
    appleNumber: number;
    orangeNumber: number;
  };
}

type NewUserInfo = Partial<UserInfo>;

// Property 'appleNumber' is missing in type '{ orangeNumber: number; }' but required in type '{ appleNumber: number; orangeNumber: number; }'.
const xiaoming: NewUserInfo = {
  name: 'xiaoming',
  fruits: {
    orangeNumber: 1,
  },
};
```

#### 11.5.9、Required

> Required将类型的属性变成必选

Required源代码：

```ts
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

使用案例：

```ts
interface Props {
  name?: string;
  code?: string;
}

type NewProps = Required<Props>;
const props: NewProps = {
  name: 'Victor',
  code: '0',
};
console.log(props);
```

#### 11.5.10、Readonly

> `Readonly` 的作用是将某个类型所有属性变为只读属性，也就意味着这些属性不能被重新赋值。

Readonly源代码：

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

使用案例：

```ts
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: 'Delete inactive users',
};

todo.title = 'Hello'; // Cannot assign to 'title' because it is a read-only property.
```

#### 11.5.11、Pick

> Pick 从某个类型中挑出一些属性出来

Pick源代码：

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

使用案例：

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
```

#### 11.5.12、Record

> Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。

Record源代码：

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

使用案例：

```ts
interface PageInfo {
  title: string;
}

type keyAny = keyof any; // string | number | symbol

type Page = 'home' | 'about' | 'contact' | 55;

const x: Record<Page, PageInfo> = {
  about: { title: 'about' },
  contact: { title: 'contact' },
  home: { title: 'home' },
  55: { title: '55' },
};
```

#### 11.5.13、ReturnType

> 这个工具主要适用于函数，能够提取函数所返回的类型。

ReturnType源代码：

```ts
type MyReturnType<T extends Function> = T extends (...args: any[]) => infer R ? R : never;
```

使用案例：

```ts
type FnReturnString = ReturnType<() => string>; // string
type FnReturnString = ReturnType<() => [number, string]>; // [number, string]
```

#### 11.5.14、Exclude

> `Exclude` 的作用是将某个类型中属于另一个的类型移除掉。

Exclude源代码：

```ts
type Exclude<T, U> = T extends U ? never : T;
```

使用案例：

```ts
type T0 = Exclude<'a' | 'b' | 'c', 'a'>; // "b" | "c"
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

#### 11.5.15、Extract

> `Extract` 的作用是从 `T` 中提取出 `U`。

Extract源代码：

```ts
type Extract<T, U> = T extends U ? T : never;
```

使用案例：

```ts
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>; // "a"
type T1 = Extract<string | number | (() => void), Function>; // () =>void
```

#### 11.5.16、Omit

> `Omit` 的作用是使用 `T` 类型中除了 `K` 类型的所有属性，来构造一个新的类型。

Omit源代码：

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

使用案例：

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, 'description'>;
const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
console.log(todo);
```

#### 11.5.17、NonNullable

> `NonNullable` 的作用是用来过滤类型中的 `null` 及 `undefined` 类型。

NonNullable源代码：

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
```

使用案例：

```ts
/**
 * NonNullable
 * @date: 2022-09-17 18:40
 */
type T0 = NonNullable<string | number | undefined>; // string | number
type T1 = NonNullable<string[] | null | undefined>; // string[]
```

#### 11.5.18、Parameters

> 这个工具主要适用于函数，能够提取函数所返回的类型

Parameters源代码：

```ts
type MyParameters<T extends Function> = T extends (...args: infer R) => any ? R : never;
```

使用案例：

```ts
type T0 = Parameters<() => string>; // T0返回 []
type T1 = Parameters<(name: string, age: number) => string>; // T1返回 [string, number]
```

## 十二、tsconfig.json

### 12.1、概述

如果一个目录下存在一个<u>tsconfig.json</u>文件，那么它意味着这个目录是TypeScript项目的根目录。 `tsconfig.json`文件中指定了用来编译这个项目的根文件和编译选项。 一个项目可以通过以下方式之一来编译：

- 不带任何输入文件的情况下调用<u>tsc</u>，编译器会从当前目录开始去查找`tsconfig.json`文件，逐级向上搜索父目录。

- 不带任何输入文件的情况下调用`tsc`，且使用命令行参数`--project`（或`-p`）指定一个包含`tsconfig.json`文件的目录。

  当命令行上指定了输入文件时，`tsconfig.json`文件会被忽略。

### 12.2、files

> `"files"`指定一个包含相对或绝对文件路径的列表。<span className="highlight">注意：</span>只能文件，不能是文件夹

### 12.3、include

include 字段用于指明需要被 tsc 编译的文件或文件夹列表，例如：

```json
{
  "include": ["src", "global.d.ts"]
}
```

### 12.4、exclude

exclude 字段用于排除不需要 tsc 编译的文件或文件夹列表，例如：

```ts
{
  "exclude": ["test.ts", "src/test.ts"],
}
```

### 12.5、include和exclude的细节

1.  `"include"`和`"exclude"`属性指定一个文件glob匹配模式列表。 支持的glob通配符有：
2.  如果一个glob模式里的某部分只包含*或.*，那么仅有支持的文件扩展名类型被包含在内（比如默认.ts，.tsx，和.d.ts， 如果 allowJs设置能true还包含.js和.jsx）。
3.  如果`"files"`和`"include"`都没有被指定，编译器默认包含当前目录和子目录下所有的TypeScript文件（`.ts`, `.d.ts` 和 `.tsx`），排除在`"exclude"`里指定的文件。JS文件（`.js`和`.jsx`）也被包含进来如果`allowJs`被设置成`true`。 如果指定了 `"files"`或`"include"`，编译器会将它们结合一并包含进来。 使用 `"outDir"`指定的目录下的文件永远会被编译器排除，除非你明确地使用`"files"`将其包含进来（这时就算用`exclude`指定也没用）。
4.  使用`"include"`引入的文件可以使用`"exclude"`属性过滤。 然而，通过 `"files"`属性明确指定的文件却总是会被包含在内，不管`"exclude"`如何设置。 如果没有特殊指定， `"exclude"`默认情况下会排除`node_modules`，`bower_components`，`jspm_packages`和``目录。
5.  任何被`"files"`或`"include"`指定的文件所引用的文件也会被包含进来。 `A.ts`引用了`B.ts`，因此`B.ts`不能被排除，除非引用它的`A.ts`在`"exclude"`列表中。
6.  `tsconfig.json`文件可以是个空文件，那么所有默认的文件（如上面所述）都会以默认配置选项编译。

### 12.6、extends

tsconfig.json文件可以利用extends属性从另一个配置文件里继承配置。

extends是tsconfig.json文件里的顶级属性（与compilerOptions，files，include，和exclude一样）。 extends的值是一个字符串，包含指向另一个要继承文件的路径。

### 12.7、compileOnSave

compileOnSave 是声明是否需要在保存时候自动触发 tsc 编译的字段，一般来说，我们的代码编译过程会通过 Rollup、Webpack 等打包构建工具，并且使用热更新，因此无需配置该项，保持缺省即可。

```ts
{
  "compileOnSave": false,
}
```

### 12.8、compilerOptions

> 编译选项配置非常繁杂，有很多配置，这里只列出常用的配置。

```json
{
  "compilerOptions": {
    "target": "ES6",
    "lib": ["ES6"],
    "strictNullChecks": true,
    "sourceMap": false,
    "outDir": "./dist",
    "noImplicitAny": true
  },
  "compileOnSave": false,
  "include": ["./src"],
  "exclude": ["node_modules"]
}
```
