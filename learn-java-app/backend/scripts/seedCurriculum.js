/**
 * Seed script: populates Week 2 (OOP) and 4 real-world projects.
 * Uses 20 interview-aligned activities + 20 interview-aligned quiz questions per topic from week2InterviewData.js.
 * Run: npm run seed (from backend folder)
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { Week } from '../models/Week.js';
import { Project } from '../models/Project.js';
import { getActivitiesAndQuizzes } from './week2InterviewData.js';
import { getLessonContent } from './week2LessonContent.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/learn-java';

const week2Topics = [
  {
    order: 1,
    slug: 'how-java-is-compiled',
    title: 'How Java Code is Compiled',
    lessonContent: `## Java Compilation Process

The Java compilation process turns your **source code** (\`.java\` files) into **bytecode** (\`.class\` files) that the JVM can run. Understanding this helps in interviews and when debugging.

---

### 1. Initial Compilation Phase

**Lexical Analysis** — The compiler breaks source code into **tokens**: keywords (\`public\`, \`class\`), identifiers (variable names), operators (\`+\`, \`-\`), literals (numbers, strings), and symbols (brackets, semicolons).

**Syntax Analysis** — The parser builds an **Abstract Syntax Tree (AST)** and checks that the code follows Java grammar (correct nesting, brackets, etc.).

**Semantic Analysis** — Type checking, variable scope, method signatures, and access modifiers are validated.

**Bytecode Generation** — The compiler outputs **bytecode**: platform-independent instructions, constant pool, and metadata for the JVM.

---

### 2. JVM Execution: Class Loading

| Phase | What happens |
|-------|----------------|
| **Loading** | Reads \`.class\` file, creates a \`Class\` object in memory |
| **Linking** | Verification (bytecode safe), preparation (static memory), resolution (symbolic references) |
| **Initialization** | Runs static initializers and sets static field values |

---

### 3. JIT Compilation

The JVM can **interpret** bytecode at first, then use **Just-In-Time (JIT)** compilation to turn hot code into native machine code for speed. JIT uses tiers (e.g. C1, C2) and optimizations like method inlining and loop unrolling.

---

### Key Takeaway

**Compile once (bytecode), run anywhere (JVM).** This gives Java platform independence and good performance.`,
    activities: [
      {
        type: 'drag-order',
        instruction: 'Drag the steps into the correct order of the Java compilation and execution pipeline.',
        options: [
          { id: 'lex', text: 'Lexical analysis (tokens)', correctOrder: 1 },
          { id: 'syn', text: 'Syntax analysis (AST)', correctOrder: 2 },
          { id: 'sem', text: 'Semantic analysis (types, scope)', correctOrder: 3 },
          { id: 'byte', text: 'Bytecode generation', correctOrder: 4 },
          { id: 'load', text: 'Class loading (JVM)', correctOrder: 5 },
        ],
        correctAnswer: ['lex', 'syn', 'sem', 'byte', 'load'],
        explanation: 'The compiler first tokenizes (lexical), then parses (syntax), then checks types and scope (semantic), then emits bytecode. The JVM then loads the class.',
      },
      {
        type: 'multiple-choice',
        instruction: 'Interview-style: Why does Java use bytecode instead of compiling directly to machine code?',
        options: [
          { id: 'a', text: 'Bytecode runs faster than machine code' },
          { id: 'b', text: 'Bytecode is platform-independent; the same .class runs on any JVM' },
          { id: 'c', text: 'Machine code is not allowed in Java' },
          { id: 'd', text: 'Bytecode is smaller than source code' },
        ],
        correctAnswer: 'b',
        explanation: 'Bytecode is platform-independent. Write once, run anywhere: the JVM on each platform interprets or JIT-compiles bytecode to that platform\'s machine code.',
      },
    ],
    quizQuestions: [
      {
        question: 'What is produced by the Java compiler?',
        options: [
          { id: 'a', text: 'Native machine code' },
          { id: 'b', text: 'Bytecode' },
          { id: 'c', text: 'Assembly code' },
          { id: 'd', text: 'Source code' },
        ],
        correctOptionId: 'b',
        explanation: 'The compiler produces bytecode (.class files), which the JVM then interprets or JIT-compiles to machine code.',
      },
      {
        question: 'Which phase checks that variable types and method signatures are correct?',
        options: [
          { id: 'a', text: 'Lexical analysis' },
          { id: 'b', text: 'Syntax analysis' },
          { id: 'c', text: 'Semantic analysis' },
          { id: 'd', text: 'Bytecode generation' },
        ],
        correctOptionId: 'c',
        explanation: 'Semantic analysis performs type checking, scope validation, and method signature verification.',
      },
      {
        question: 'Interview: What is the difference between compilation and interpretation in Java?',
        options: [
          { id: 'a', text: 'Java is only interpreted, never compiled' },
          { id: 'b', text: 'javac compiles to bytecode; the JVM interprets bytecode and can JIT-compile hot code to native code' },
          { id: 'c', text: 'Java is only compiled, never interpreted' },
          { id: 'd', text: 'Interpretation happens before compilation' },
        ],
        correctOptionId: 'b',
        explanation: 'javac compiles .java to .class (bytecode). The JVM interprets bytecode and uses JIT to compile frequently executed code to native machine code.',
      },
      {
        question: 'Which JVM phase runs static initializers and assigns initial values to static fields?',
        options: [
          { id: 'a', text: 'Loading' },
          { id: 'b', text: 'Linking' },
          { id: 'c', text: 'Initialization' },
          { id: 'd', text: 'Verification' },
        ],
        correctOptionId: 'c',
        explanation: 'Initialization is the phase where static blocks run and static variables get their initial values.',
      },
    ],
  },
  {
    order: 2,
    slug: 'basic-syntax',
    title: 'Basic Syntax',
    lessonContent: `## Core Java Syntax

Java syntax is strict and readable. Every statement ends with a semicolon; blocks use curly braces.

---

### Variables and Types

Declare with type and name: \`int x = 5;\`, \`String name = "Java";\`  
Variables must be declared before use and have a fixed type.

---

### Operators

- **Arithmetic:** \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (modulo = remainder)
- **Comparison:** \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`
- **Logical:** \`&&\` (AND), \`||\` (OR), \`!\` (NOT)

---

### Control Structures

- **Conditionals:** \`if\`, \`else if\`, \`else\`, \`switch\`
- **Loops:** \`for\`, enhanced \`for\`, \`while\`, \`do-while\`

---

### Methods

Methods declare return type and parameters. The signature is: return type, name, then parameters.

\`\`\`java
returnType methodName(parameterType param) {
    return value;  // if not void
}
\`\`\`

---

### Comments

- Single-line: \`// comment\`
- Multi-line: \`/* comment */\` or \`/** Javadoc */\` for documentation`,
    activities: [
      {
        type: 'multiple-choice',
        instruction: 'What is the correct way to declare a method that returns an int and takes no parameters?',
        options: [
          { id: 'a', text: 'void method()' },
          { id: 'b', text: 'int method()' },
          { id: 'c', text: 'method int()' },
          { id: 'd', text: 'int method(void)' },
        ],
        correctAnswer: 'b',
        explanation: 'In Java, return type comes first, then method name, then parentheses for parameters. int method() is correct.',
      },
      {
        type: 'match-pairs',
        instruction: 'Match each operator to its meaning in Java.',
        options: [
          { id: 'mod', text: '%', correctMatch: 'remainder' },
          { id: 'and', text: '&&', correctMatch: 'logical and' },
          { id: 'eq', text: '==', correctMatch: 'equals' },
          { id: 'not', text: '!', correctMatch: 'logical not' },
        ],
        matchOptions: [
          { id: 'remainder', text: 'Modulo (remainder of division)' },
          { id: 'logical and', text: 'Logical AND (both conditions true)' },
          { id: 'equals', text: 'Equality comparison' },
          { id: 'logical not', text: 'Logical NOT (negation)' },
        ],
        correctAnswer: [['mod', 'remainder'], ['and', 'logical and'], ['eq', 'equals'], ['not', 'logical not']],
        explanation: '% is modulo; && is AND; == is equality; ! is NOT.',
      },
    ],
    quizQuestions: [
      {
        question: 'Which operator is used for modulo (remainder)?',
        options: [
          { id: 'a', text: '/' },
          { id: 'b', text: '%' },
          { id: 'c', text: '//' },
          { id: 'd', text: '&' },
        ],
        correctOptionId: 'b',
        explanation: 'The % operator returns the remainder of a division (e.g. 7 % 3 == 1).',
      },
      {
        question: 'Interview: What is the correct order of elements in a Java method declaration?',
        options: [
          { id: 'a', text: 'name, return type, parameters' },
          { id: 'b', text: 'return type, name, parameters' },
          { id: 'c', text: 'parameters, return type, name' },
          { id: 'd', text: 'return type, parameters, name' },
        ],
        correctOptionId: 'b',
        explanation: 'Java method declaration order is: return type, method name, then parameter list in parentheses.',
      },
      {
        question: 'Which keyword is used for logical OR in Java?',
        options: [
          { id: 'a', text: '&' },
          { id: 'b', text: '|' },
          { id: 'c', text: '||' },
          { id: 'd', text: 'or' },
        ],
        correctOptionId: 'c',
        explanation: '|| is the short-circuit logical OR operator. | is bitwise OR.',
      },
    ],
  },
  {
    order: 3,
    slug: 'variables-and-data-types',
    title: 'Variables and Data Types',
    lessonContent: `## Variables and Data Types in Java

A **variable** is a container that holds a value. It must be declared with a **type** before use. Java is strongly typed: the type cannot change after declaration.

---

### Primitive Types

| Type     | Size   | Example           |
|----------|--------|-------------------|
| byte     | 1 byte | \`byte b = 100;\` |
| short    | 2 bytes| \`short s = 5000;\` |
| int      | 4 bytes| \`int i = 100000;\` |
| long     | 8 bytes| \`long l = 15000000000L;\` |
| float    | 4 bytes| \`float f = 5.75f;\` |
| double   | 8 bytes| \`double d = 19.99;\` |
| boolean  | 1 bit  | \`boolean b = true;\` |
| char     | 2 bytes| \`char c = 'A';\` |

---

### Reference Types

- **String** — text (reference type, not primitive)
- **Arrays** — collections of values
- **Classes** — user-defined types

---

### Scope

- **Instance variables** — inside class, outside methods; one per object
- **Local variables** — inside a method or block; only visible there
- **Static variables** — \`static\` keyword; shared by all instances of the class

---

### Type Casting

- **Widening (automatic):** smaller → larger (e.g. int → long). No cast needed.
- **Narrowing (manual):** larger → smaller (e.g. double → int); requires explicit cast and may lose data.`,
    activities: [
      {
        type: 'match-pairs',
        instruction: 'Match each data type to its typical use.',
        options: [
          { id: 'int', text: 'int', correctMatch: 'whole' },
          { id: 'double', text: 'double', correctMatch: 'decimal' },
          { id: 'boolean', text: 'boolean', correctMatch: 'truefalse' },
          { id: 'char', text: 'char', correctMatch: 'letter' },
        ],
        matchOptions: [
          { id: 'whole', text: 'Whole numbers (e.g. count)' },
          { id: 'decimal', text: 'Decimal numbers (e.g. price)' },
          { id: 'truefalse', text: 'True or false' },
          { id: 'letter', text: 'Single character' },
        ],
        correctAnswer: [['int', 'whole'], ['double', 'decimal'], ['boolean', 'truefalse'], ['char', 'letter']],
        explanation: 'int for integers, double for decimals, boolean for logic, char for one character.',
      },
      {
        type: 'multiple-choice',
        instruction: 'Interview: What is the default value of an uninitialized local variable in Java?',
        options: [
          { id: 'a', text: '0 or false or null depending on type' },
          { id: 'b', text: 'Java does not allow uninitialized local variables; you must assign before use' },
          { id: 'c', text: 'null for all types' },
          { id: 'd', text: '0 for all numeric types' },
        ],
        correctAnswer: 'b',
        explanation: 'Local variables must be explicitly initialized before use. Instance and static fields get default values (0, false, null); locals do not.',
      },
    ],
    quizQuestions: [
      {
        question: 'Which type would you use for a variable that holds only true or false?',
        options: [
          { id: 'a', text: 'int' },
          { id: 'b', text: 'boolean' },
          { id: 'c', text: 'byte' },
          { id: 'd', text: 'String' },
        ],
        correctOptionId: 'b',
        explanation: 'boolean is the primitive type for true/false values.',
      },
      {
        question: 'Interview: Why do we use the L suffix when assigning a long literal (e.g. 15000000000L)?',
        options: [
          { id: 'a', text: 'L stands for "long" and is required by the compiler' },
          { id: 'b', text: 'Without L, the literal is treated as int and may be out of range' },
          { id: 'c', text: 'L makes the number unsigned' },
          { id: 'd', text: 'L is optional and has no effect' },
        ],
        correctOptionId: 'b',
        explanation: 'Integer literals are int by default. A value like 15000000000 exceeds int range, so we use 15000000000L to make it a long literal.',
      },
      {
        question: 'What is widening casting?',
        options: [
          { id: 'a', text: 'Converting a larger type to a smaller type' },
          { id: 'b', text: 'Converting a smaller type to a larger type (e.g. int to long); automatic in Java' },
          { id: 'c', text: 'Converting a primitive to a reference type' },
          { id: 'd', text: 'Converting a String to a number' },
        ],
        correctOptionId: 'b',
        explanation: 'Widening is converting from a smaller to a larger type; Java does it automatically. Narrowing (larger to smaller) requires an explicit cast.',
      },
    ],
  },
  {
    order: 4,
    slug: 'garbage-collection',
    title: 'Garbage Collection',
    lessonContent: `## Garbage Collection in Java

The JVM automatically reclaims memory for objects that are no longer reachable. You do **not** free memory manually like in C/C++. This is a common interview topic.

---

### Heap Structure

- **Eden** — most new objects are allocated here. When full, triggers **Minor GC**.
- **Survivor spaces (S0/S1)** — objects that survive Eden are copied here; age is tracked.
- **Old Generation** — long-lived objects; cleaned by **Major** or **Full GC**.

---

### Reference Types

| Type    | Behavior |
|---------|----------|
| **Strong** | Normal reference; GC only when unreachable |
| **Soft**   | Can be cleared before OutOfMemoryError (e.g. caches) |
| **Weak**   | Collected in next GC (e.g. WeakHashMap) |
| **Phantom** | For cleanup/finalization |

---

### Collectors

- **G1** (default in Java 17+) — region-based, low pause
- **ZGC** — very low pause, scales to large heaps
- **Parallel** — throughput-focused, stop-the-world

---

### Best Practices

- Close resources (e.g. **try-with-resources**)
- Clear references when no longer needed
- Avoid unintended retention in collections (e.g. static maps holding objects)`,
    activities: [
      {
        type: 'drag-order',
        instruction: 'Order the heap areas by where objects typically start and where they end up after surviving GC.',
        options: [
          { id: 'eden', text: 'Eden (new objects)', correctOrder: 1 },
          { id: 'surv', text: 'Survivor spaces (after Minor GC)', correctOrder: 2 },
          { id: 'old', text: 'Old Generation (long-lived)', correctOrder: 3 },
        ],
        correctAnswer: ['eden', 'surv', 'old'],
        explanation: 'Objects are first allocated in Eden. If they survive Minor GC, they move to Survivor spaces. After several cycles, they are promoted to Old Generation.',
      },
      {
        type: 'multiple-choice',
        instruction: 'Interview: When is an object eligible for garbage collection?',
        options: [
          { id: 'a', text: 'As soon as you set the reference to null' },
          { id: 'b', text: 'When no live thread can reach it through any chain of references' },
          { id: 'c', text: 'After a fixed time (e.g. 5 minutes)' },
          { id: 'd', text: 'When the program calls System.gc()' },
        ],
        correctAnswer: 'b',
        explanation: 'An object is eligible for GC when it is unreachable—no live thread has a reference to it. Setting a reference to null may make the object unreachable if no other references exist.',
      },
    ],
    quizQuestions: [
      {
        question: 'Who is responsible for freeing object memory in Java?',
        options: [
          { id: 'a', text: 'The programmer' },
          { id: 'b', text: 'The JVM (Garbage Collector)' },
          { id: 'c', text: 'The operating system' },
          { id: 'd', text: 'The compiler' },
        ],
        correctOptionId: 'b',
        explanation: 'The JVM runs the Garbage Collector to reclaim memory for unreachable objects.',
      },
      {
        question: 'Interview: What is the difference between SoftReference and WeakReference?',
        options: [
          { id: 'a', text: 'There is no difference' },
          { id: 'b', text: 'Soft references are cleared only when memory is needed (e.g. before OOM); weak references can be cleared in the next GC' },
          { id: 'c', text: 'Weak references are stronger than soft references' },
          { id: 'd', text: 'Soft references are used for caches; weak references are never cleared' },
        ],
        correctOptionId: 'b',
        explanation: 'Soft references are cleared when the JVM needs memory (e.g. before OutOfMemoryError). Weak references can be collected in the next GC cycle regardless of memory pressure.',
      },
      {
        question: 'Which GC is the default in Java 17+?',
        options: [
          { id: 'a', text: 'Parallel' },
          { id: 'b', text: 'G1' },
          { id: 'c', text: 'ZGC' },
          { id: 'd', text: 'Serial' },
        ],
        correctOptionId: 'b',
        explanation: 'G1 (Garbage-First) is the default collector in Java 17 and later.',
      },
    ],
  },
  {
    order: 5,
    slug: 'classes-and-objects',
    title: 'Classes and Objects',
    lessonContent: `## Classes and Objects in Java

**Classes** and **objects** are the building blocks of OOP. Interviewers often ask: "What is the difference between a class and an object?"

---

### What is a Class?

A **class** is a **blueprint** or template. It defines **attributes** (state) and **methods** (behavior). A class is not an object; it describes what objects of that type will have.

\`\`\`java
public class Car {
    private String model;   // attribute
    private int year;       // attribute
    public void drive() { } // method
}
\`\`\`

---

### What is an Object?

An **object** is an **instance** of a class — a concrete entity with its own data. You create objects with \`new\`.

\`\`\`java
Car myCar = new Car();
\`\`\`

---

### Key Components

| Component       | Role |
|-----------------|------|
| **Attributes**  | Instance variables; state of the object |
| **Constructors**| Initialize objects; same name as class; can overload |
| **Methods**     | Define behavior; parameters and return types |

---

### Best Practices

- Use clear names for classes, methods, and attributes.
- Prefer **private** attributes with getters/setters (encapsulation).
- Keep each class focused (single responsibility).`,
    activities: [
      {
        type: 'drag-order',
        instruction: 'Order the steps to create and use an object in Java.',
        options: [
          { id: 'def', text: 'Define a class (attributes and methods)', correctOrder: 1 },
          { id: 'inst', text: 'Create an instance: MyClass obj = new MyClass();', correctOrder: 2 },
          { id: 'use', text: 'Use the object: obj.method();', correctOrder: 3 },
        ],
        correctAnswer: ['def', 'inst', 'use'],
        explanation: 'First you define the class, then create an object with new, then call methods on it.',
      },
      {
        type: 'multiple-choice',
        instruction: 'Interview: What is the difference between a class and an object?',
        options: [
          { id: 'a', text: 'They are the same thing' },
          { id: 'b', text: 'A class is a template; an object is a concrete instance created from that class' },
          { id: 'c', text: 'An object is the template; a class is the instance' },
          { id: 'd', text: 'A class holds methods; an object holds only data' },
        ],
        correctAnswer: 'b',
        explanation: 'A class is the blueprint (template). An object is a specific instance created at runtime with its own state.',
      },
    ],
    quizQuestions: [
      {
        question: 'What keyword is used to create a new instance of a class?',
        options: [
          { id: 'a', text: 'create' },
          { id: 'b', text: 'new' },
          { id: 'c', text: 'instance' },
          { id: 'd', text: 'object' },
        ],
        correctOptionId: 'b',
        explanation: 'The new keyword allocates memory and calls the constructor to create an object.',
      },
      {
        question: 'Interview: Can a class have multiple constructors?',
        options: [
          { id: 'a', text: 'No, only one constructor per class' },
          { id: 'b', text: 'Yes, via constructor overloading (same name, different parameter lists)' },
          { id: 'c', text: 'Only if they have different return types' },
          { id: 'd', text: 'Only in abstract classes' },
        ],
        correctOptionId: 'b',
        explanation: 'Constructor overloading allows multiple constructors with different parameter lists. The class name is the same; the parameter list differentiates them.',
      },
      {
        question: 'What do we call the variables that hold the state of an object?',
        options: [
          { id: 'a', text: 'Local variables' },
          { id: 'b', text: 'Instance variables (or attributes/fields)' },
          { id: 'c', text: 'Static variables only' },
          { id: 'd', text: 'Parameters' },
        ],
        correctOptionId: 'b',
        explanation: 'Instance variables (fields/attributes) hold the state of each object. They are declared inside the class, outside any method.',
      },
    ],
  },
  {
    order: 6,
    slug: 'inheritance',
    title: 'Inheritance',
    lessonContent: `## Inheritance in Java

**Inheritance** lets a class inherit attributes and methods from a **parent** (superclass), creating a parent–child relationship. Use it for **"is-a"** relationships (e.g. Dog is-a Animal).

---

### Syntax

\`\`\`java
class Parent { }
class Child extends Parent { }
\`\`\`

---

### Key Concepts

- **extends** — establishes inheritance (one parent only).
- **super** — refer to parent constructor or methods (e.g. \`super()\`, \`super.method()\`).
- **Method overriding** — child provides its own implementation; use \`@Override\`.

\`\`\`java
class Animal {
    void makeSound() { System.out.println("Some sound"); }
}
class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Woof!"); }
}
\`\`\`

---

### Rules

- **Private** members of the parent are **not** inherited (child cannot access them directly).
- Constructors are not inherited; the parent constructor is invoked when creating a child (often via \`super()\`).
- Java does **not** support multiple inheritance of classes (one \`extends\` only). Use interfaces for multiple "contracts."
- All classes implicitly extend \`Object\`.

---

### When to Use

Use inheritance for **"is-a"** relationships. Prefer composition when you have **"has-a"** (e.g. Car has-a Engine).`,
    activities: [
      {
        type: 'multiple-choice',
        instruction: 'How do you make a class inherit from another in Java?',
        options: [
          { id: 'a', text: 'class Child implements Parent' },
          { id: 'b', text: 'class Child extends Parent' },
          { id: 'c', text: 'class Child : Parent' },
          { id: 'd', text: 'class Child inherits Parent' },
        ],
        correctAnswer: 'b',
        explanation: 'The extends keyword is used for class inheritance. implements is for interfaces.',
      },
      {
        type: 'match-pairs',
        instruction: 'Match the keyword or concept to its role in inheritance.',
        options: [
          { id: 'ext', text: 'extends', correctMatch: 'decl' },
          { id: 'sup', text: 'super', correctMatch: 'parent' },
          { id: 'over', text: '@Override', correctMatch: 'child' },
          { id: 'obj', text: 'Object', correctMatch: 'root' },
        ],
        matchOptions: [
          { id: 'decl', text: 'Declares that a class inherits from another' },
          { id: 'parent', text: 'Refers to parent constructor or method' },
          { id: 'child', text: 'Marks a method that overrides a parent method' },
          { id: 'root', text: 'The root superclass of all Java classes' },
        ],
        correctAnswer: [['ext', 'decl'], ['sup', 'parent'], ['over', 'child'], ['obj', 'root']],
        explanation: 'extends declares inheritance; super accesses parent; @Override marks overriding; Object is the top of the hierarchy.',
      },
    ],
    quizQuestions: [
      {
        question: 'Can a Java class extend more than one class?',
        options: [
          { id: 'a', text: 'Yes' },
          { id: 'b', text: 'No' },
        ],
        correctOptionId: 'b',
        explanation: 'Java supports only single inheritance for classes. A class can implement multiple interfaces.',
      },
      {
        question: 'Interview: Are private members of a superclass inherited by the subclass?',
        options: [
          { id: 'a', text: 'Yes, the subclass can access them directly' },
          { id: 'b', text: 'No; they are not inherited in the sense that the subclass cannot access them directly' },
          { id: 'c', text: 'Only if the subclass is in the same package' },
          { id: 'd', text: 'Yes, but only through the super keyword' },
        ],
        correctOptionId: 'b',
        explanation: 'Private members exist in the superclass but are not accessible to the subclass. The subclass can use public/protected accessors if the superclass provides them.',
      },
      {
        question: 'What is the purpose of calling super() in a constructor?',
        options: [
          { id: 'a', text: 'To create a superclass object' },
          { id: 'b', text: 'To call the parent class constructor and initialize the parent part of the object' },
          { id: 'c', text: 'To override the parent constructor' },
          { id: 'd', text: 'To make the class abstract' },
        ],
        correctOptionId: 'b',
        explanation: 'super() invokes the parent constructor so the parent portion of the object is properly initialized. It is often required when the parent has no no-arg constructor.',
      },
    ],
  },
  {
    order: 7,
    slug: 'polymorphism',
    title: 'Polymorphism',
    lessonContent: `## Polymorphism in Java

**Polymorphism** ("many forms") lets one interface or type represent different behaviors. It is a core OOP concept and a frequent interview topic.

---

### Two Types

1. **Compile-time (overloading)** — Same method name, different parameter lists; the **compiler** chooses which method to call based on the argument types.
2. **Runtime (overriding)** — Subclass provides its own implementation; the **JVM** chooses based on the **actual object type** at runtime.

\`\`\`java
Animal a = new Dog();
a.makeSound();  // "Woof!" — uses Dog's overridden method, not Animal's
\`\`\`

---

### Key Idea

- **Reference type** (e.g. \`Animal\`) decides what members are **visible** (what you can call).
- **Object type** (e.g. \`Dog\`) decides **which overridden method** runs.

---

### Benefits

- Write generic code that works with any subtype (e.g. process any \`Animal\`).
- Add new subtypes without changing existing code (open/closed principle).`,
    activities: [
      {
        type: 'multiple-choice',
        instruction: 'Interview: What is method overloading?',
        options: [
          { id: 'a', text: 'Replacing a parent method in a child class' },
          { id: 'b', text: 'Having multiple methods with the same name but different parameter lists in the same class' },
          { id: 'c', text: 'Loading a method from a JAR file' },
          { id: 'd', text: 'Making a method run faster' },
        ],
        correctAnswer: 'b',
        explanation: 'Overloading = same method name, different parameter lists (number or types). The compiler picks the right one at compile time.',
      },
      {
        type: 'multiple-choice',
        instruction: 'Given: Animal a = new Dog(); a.makeSound(); Which makeSound() runs?',
        options: [
          { id: 'a', text: 'Animal\'s makeSound(), because the reference type is Animal' },
          { id: 'b', text: 'Dog\'s makeSound(), because the actual object is a Dog (runtime polymorphism)' },
          { id: 'c', text: 'Neither; it is a compile error' },
          { id: 'd', text: 'Both, in sequence' },
        ],
        correctAnswer: 'b',
        explanation: 'Runtime polymorphism: the JVM looks at the actual object type (Dog), so Dog\'s overridden makeSound() is called.',
      },
    ],
    quizQuestions: [
      {
        question: 'When is the correct method implementation chosen in method overriding?',
        options: [
          { id: 'a', text: 'At compile time' },
          { id: 'b', text: 'At runtime' },
          { id: 'c', text: 'When the class is loaded' },
          { id: 'd', text: 'Never' },
        ],
        correctOptionId: 'b',
        explanation: 'Runtime polymorphism: the JVM looks at the actual object type at runtime to decide which overridden method to call.',
      },
      {
        question: 'Interview: What is the difference between overloading and overriding?',
        options: [
          { id: 'a', text: 'They are the same' },
          { id: 'b', text: 'Overloading = same name, different params (compile-time); Overriding = subclass replaces superclass method (runtime)' },
          { id: 'c', text: 'Overloading is for interfaces; overriding is for classes' },
          { id: 'd', text: 'Overriding is compile-time; overloading is runtime' },
        ],
        correctOptionId: 'b',
        explanation: 'Overloading: multiple methods same name, different parameter lists; resolved at compile time. Overriding: subclass provides its own implementation of a superclass method; resolved at runtime.',
      },
      {
        question: 'What decides which overridden method is called at runtime?',
        options: [
          { id: 'a', text: 'The reference type (variable type)' },
          { id: 'b', text: 'The actual object type (the type of the object the variable refers to)' },
          { id: 'c', text: 'The compiler' },
          { id: 'd', text: 'The first method defined in the class' },
        ],
        correctOptionId: 'b',
        explanation: 'The actual object type (runtime type) determines which overridden method runs. The reference type only determines which methods are visible to call.',
      },
    ],
  },
  {
    order: 8,
    slug: 'encapsulation',
    title: 'Encapsulation',
    lessonContent: `## Encapsulation in Java

**Encapsulation** means wrapping data and the code that operates on it into one unit (the class) and **restricting direct access** to internal details. It is one of the four pillars of OOP and is commonly discussed in interviews.

---

### Principles

- **Data hiding** — make instance variables \`private\` so external code cannot access them directly.
- **Access control** — use \`private\`, \`protected\`, \`public\` (and default) to control visibility.
- **Getters/setters** — provide controlled read/write and add validation (e.g. reject negative balance).

\`\`\`java
public class BankAccount {
    private double balance;
    public double getBalance() { return balance; }
    public void setBalance(double amount) {
        if (amount >= 0) this.balance = amount;
    }
}
\`\`\`

---

### Benefits

- **Control** — you decide how data is read and modified (e.g. validation in setters).
- **Security** — limit unauthorized or invalid access to internals.
- **Flexibility** — change internal implementation without breaking callers (e.g. rename a field but keep getter/setter names).`,
    activities: [
      {
        type: 'match-pairs',
        instruction: 'Match the OOP concept to its definition.',
        options: [
          { id: 'enc', text: 'Encapsulation', correctMatch: 'wrap' },
          { id: 'inh', text: 'Inheritance', correctMatch: 'reuse' },
          { id: 'poly', text: 'Polymorphism', correctMatch: 'many' },
          { id: 'abs', text: 'Abstraction', correctMatch: 'hide' },
        ],
        matchOptions: [
          { id: 'wrap', text: 'Wrapping data and methods; restricting access' },
          { id: 'reuse', text: 'Reusing and extending from a parent class' },
          { id: 'many', text: 'One interface, many forms (overriding)' },
          { id: 'hide', text: 'Hiding implementation details' },
        ],
        correctAnswer: [['enc', 'wrap'], ['inh', 'reuse'], ['poly', 'many'], ['abs', 'hide']],
        explanation: 'Encapsulation = wrap + restrict; Inheritance = reuse/extend; Polymorphism = many forms; Abstraction = hide details.',
      },
      {
        type: 'multiple-choice',
        instruction: 'Interview: Why use getters/setters instead of public fields?',
        options: [
          { id: 'a', text: 'Getters/setters are faster' },
          { id: 'b', text: 'To add validation, computed values, or change internal representation without breaking callers' },
          { id: 'c', text: 'Public fields are not allowed in Java' },
          { id: 'd', text: 'Only for static fields' },
        ],
        correctAnswer: 'b',
        explanation: 'Getters/setters let you validate input, compute values on the fly, or change how data is stored internally while keeping the same API.',
      },
    ],
    quizQuestions: [
      {
        question: 'What access modifier is typically used for instance variables in encapsulated classes?',
        options: [
          { id: 'a', text: 'public' },
          { id: 'b', text: 'private' },
          { id: 'c', text: 'protected' },
          { id: 'd', text: 'default' },
        ],
        correctOptionId: 'b',
        explanation: 'Instance variables are usually private so access goes through getters/setters.',
      },
      {
        question: 'Interview: What is data hiding?',
        options: [
          { id: 'a', text: 'Deleting data after use' },
          { id: 'b', text: 'Making fields private and exposing them only through methods (e.g. getters/setters)' },
          { id: 'c', text: 'Using encrypted storage' },
          { id: 'd', text: 'Hiding methods from the user' },
        ],
        correctOptionId: 'b',
        explanation: 'Data hiding means keeping internal state (fields) private and controlling access through methods.',
      },
      {
        question: 'Which keyword allows access only within the same class?',
        options: [
          { id: 'a', text: 'public' },
          { id: 'b', text: 'private' },
          { id: 'c', text: 'protected' },
          { id: 'd', text: 'internal' },
        ],
        correctOptionId: 'b',
        explanation: 'private members are visible only within the same class.',
      },
    ],
  },
  {
    order: 9,
    slug: 'abstraction',
    title: 'Abstraction',
    lessonContent: `## Abstraction in Java

**Abstraction** hides implementation details and exposes only what the user needs. It lets you work with "what" something does, not "how" it does it.

---

### Two Ways

| Approach           | Abstraction level | Notes |
|--------------------|-------------------|--------|
| **Abstract class** | Partial (0–100%)  | Can have both abstract and concrete methods; single inheritance |
| **Interface**      | Complete (100%)   | Contract only (before Java 8); a class can implement multiple |

---

### Abstract Classes

- Declared with the \`abstract\` keyword.
- Can have **abstract** methods (no body) and **concrete** methods (with body).
- **Cannot** be instantiated: \`new AbstractClass()\` is invalid.
- Must be **extended** by concrete classes that implement any abstract methods.

---

### Interfaces

- Define a **contract**: what methods implementors must provide.
- All methods were public and abstract by default (before Java 8).
- Fields are public, static, final.
- A class can **implement multiple** interfaces.
- Since Java 8: **default** and **static** methods are allowed in interfaces.

---

### When to Use

- **Abstract class** — when you have shared behavior and a clear "is-a" hierarchy (e.g. Animal → Dog).
- **Interface** — when you need a contract or multiple "types" (e.g. Runnable, Comparable).`,
    activities: [
      {
        type: 'multiple-choice',
        instruction: 'Interview: When would you use an abstract class instead of an interface?',
        options: [
          { id: 'a', text: 'When you need multiple inheritance' },
          { id: 'b', text: 'When you want to share common code (concrete methods) and have a base type for a hierarchy' },
          { id: 'c', text: 'When you have no methods' },
          { id: 'd', text: 'When you want to instantiate the type directly' },
        ],
        correctAnswer: 'b',
        explanation: 'Abstract classes are for sharing code and defining a base type with some implementation. Interfaces are for contracts and multiple "roles."',
      },
      {
        type: 'drag-order',
        instruction: 'Order these from "most abstract" to "most concrete" in Java.',
        options: [
          { id: 'int', text: 'Interface (contract only)', correctOrder: 1 },
          { id: 'abs', text: 'Abstract class (partial implementation)', correctOrder: 2 },
          { id: 'conc', text: 'Concrete class (full implementation)', correctOrder: 3 },
        ],
        correctAnswer: ['int', 'abs', 'conc'],
        explanation: 'Interface is the most abstract (contract); abstract class adds some implementation; concrete class is fully implemented and instantiable.',
      },
    ],
    quizQuestions: [
      {
        question: 'Can you create an instance of an abstract class with new?',
        options: [
          { id: 'a', text: 'Yes' },
          { id: 'b', text: 'No' },
        ],
        correctOptionId: 'b',
        explanation: 'Abstract classes cannot be instantiated. You must extend them and create instances of the concrete subclass.',
      },
      {
        question: 'Interview: Can a class implement multiple interfaces in Java?',
        options: [
          { id: 'a', text: 'No, only one interface per class' },
          { id: 'b', text: 'Yes; a class can implement multiple interfaces' },
          { id: 'c', text: 'Only if the interfaces have no methods' },
          { id: 'd', text: 'Only in abstract classes' },
        ],
        correctOptionId: 'b',
        explanation: 'A class can implement any number of interfaces (e.g. class Foo implements A, B, C). This is how Java supports multiple "contracts."',
      },
      {
        question: 'What is the main purpose of an interface?',
        options: [
          { id: 'a', text: 'To hold static variables only' },
          { id: 'b', text: 'To define a contract (what methods must be implemented) without providing implementation' },
          { id: 'c', text: 'To replace abstract classes entirely' },
          { id: 'd', text: 'To allow multiple inheritance of implementation' },
        ],
        correctOptionId: 'b',
        explanation: 'Interfaces define a contract: they declare method signatures that implementing classes must provide (unless default methods supply implementation).',
      },
    ],
  },
  {
    order: 10,
    slug: 'composition',
    title: 'Composition',
    lessonContent: `## Composition in Java

**Composition** means building a class from **other classes** as parts. It models a **"has-a"** relationship (e.g. Car has-a Engine). Interviewers often ask: "Composition vs inheritance?"

---

### Example

\`\`\`java
class Car {
    private Engine engine;
    private SteeringWheel wheel;
    public void startCar() { engine.start(); }
}
\`\`\`

The Car **has** an Engine and a SteeringWheel. It does not **extend** them.

---

### Composition vs Inheritance

| Inheritance | Composition |
|-------------|-------------|
| "is-a" (Dog is-a Animal) | "has-a" (Car has-a Engine) |
| \`extends\` keyword | Field that holds another object |

---

### Aggregation vs Composition

- **Composition** — strong "has-a"; the part has no independent meaning without the whole (e.g. Engine belongs to one Car).
- **Aggregation** — weaker "has-a"; the part can exist on its own (e.g. a Student can exist without a University).

---

### Benefits

- **Reusability** — reuse components in different classes.
- **Flexibility** — swap or replace parts without changing the rest.
- **Encapsulation** — components can hide their own internals.`,
    activities: [
      {
        type: 'multiple-choice',
        instruction: 'Interview: When should you prefer composition over inheritance?',
        options: [
          { id: 'a', text: 'Always; never use inheritance' },
          { id: 'b', text: 'When the relationship is "has-a" rather than "is-a", or when you want to avoid tight coupling and fragile base classes' },
          { id: 'c', text: 'Only for interfaces' },
          { id: 'd', text: 'When you need multiple inheritance' },
        ],
        correctAnswer: 'b',
        explanation: 'Prefer composition for "has-a" and when you want flexibility and looser coupling. Use inheritance for clear "is-a" relationships.',
      },
      {
        type: 'match-pairs',
        instruction: 'Match the relationship to the correct design (inheritance vs composition).',
        options: [
          { id: 'car_eng', text: 'Car and Engine', correctMatch: 'comp' },
          { id: 'dog_animal', text: 'Dog and Animal', correctMatch: 'inh' },
          { id: 'book_lib', text: 'Book and Library', correctMatch: 'agg' },
          { id: 'wheel_car', text: 'SteeringWheel and Car', correctMatch: 'comp2' },
        ],
        matchOptions: [
          { id: 'comp', text: 'Composition (Car has-a Engine)' },
          { id: 'inh', text: 'Inheritance (Dog is-a Animal)' },
          { id: 'agg', text: 'Aggregation (Library has many Books; Book can exist alone)' },
          { id: 'comp2', text: 'Composition (Car has-a SteeringWheel)' },
        ],
        correctAnswer: [['car_eng', 'comp'], ['dog_animal', 'inh'], ['book_lib', 'agg'], ['wheel_car', 'comp2']],
        explanation: 'Car–Engine and Car–SteeringWheel are composition. Dog–Animal is inheritance. Library–Book is often aggregation.',
      },
    ],
    quizQuestions: [
      {
        question: 'What relationship does composition model?',
        options: [
          { id: 'a', text: 'is-a' },
          { id: 'b', text: 'has-a' },
          { id: 'c', text: 'uses-a' },
          { id: 'd', text: 'inherits-a' },
        ],
        correctOptionId: 'b',
        explanation: 'Composition models "has-a": one object contains or is composed of other objects.',
      },
      {
        question: 'Interview: What is the main advantage of composition over inheritance?',
        options: [
          { id: 'a', text: 'Composition is faster' },
          { id: 'b', text: 'Composition is more flexible; you can change behavior at runtime and avoid fragile base class issues' },
          { id: 'c', text: 'Inheritance is never allowed in Java' },
          { id: 'd', text: 'Composition uses less memory' },
        ],
        correctOptionId: 'b',
        explanation: 'Composition allows you to swap implementations and avoids the fragility of deep inheritance hierarchies.',
      },
      {
        question: 'How do you typically represent composition in code?',
        options: [
          { id: 'a', text: 'Using the extends keyword' },
          { id: 'b', text: 'Using a field that holds a reference to another object' },
          { id: 'c', text: 'Using the implements keyword' },
          { id: 'd', text: 'Using a static method' },
        ],
        correctOptionId: 'b',
        explanation: 'Composition is represented by having a field (instance variable) that references another object (e.g. private Engine engine;).',
      },
    ],
  },
  {
    order: 11,
    slug: 'big-o-notation',
    title: 'Big O Notation',
    lessonContent: `## Big O Notation (Algorithm Complexity)

**Big O** describes how time or space grows as **input size** (n) grows. It focuses on the **worst case** and the **dominant term**. This is a very common interview topic.

---

### Common Complexities (from best to worst)

| Notation   | Name         | Example |
|------------|--------------|---------|
| O(1)       | Constant     | Array index access, hash table lookup |
| O(log n)   | Logarithmic  | Binary search on sorted array |
| O(n)       | Linear       | Single loop over n elements |
| O(n log n) | Linearithmic | Merge sort, efficient sorting |
| O(n²)      | Quadratic    | Nested loops over n (e.g. simple sort) |
| O(2ⁿ)      | Exponential  | Naive recursive Fibonacci |

---

### In Java

- **ArrayList**: get by index O(1); linear search O(n); add at end amortized O(1).
- **HashMap**: get/put average O(1); worst case O(n) with bad hash.
- **TreeMap**: get/put O(log n).
- **Binary search** on sorted list: O(log n).`,
    activities: [
      {
        type: 'drag-order',
        instruction: 'Order these time complexities from best (fastest) to worst (slowest) for large n.',
        options: [
          { id: 'o1', text: 'O(1)', correctOrder: 1 },
          { id: 'olog', text: 'O(log n)', correctOrder: 2 },
          { id: 'on', text: 'O(n)', correctOrder: 3 },
          { id: 'on2', text: 'O(n²)', correctOrder: 4 },
        ],
        correctAnswer: ['o1', 'olog', 'on', 'on2'],
        explanation: 'O(1) is constant; O(log n) grows slowly; O(n) is linear; O(n²) grows much faster.',
      },
      {
        type: 'multiple-choice',
        instruction: 'Interview: What is the time complexity of a single loop that runs n times and does O(1) work each time?',
        options: [
          { id: 'a', text: 'O(1)' },
          { id: 'b', text: 'O(log n)' },
          { id: 'c', text: 'O(n)' },
          { id: 'd', text: 'O(n²)' },
        ],
        correctAnswer: 'c',
        explanation: 'n iterations × O(1) per iteration = O(n) total.',
      },
    ],
    quizQuestions: [
      {
        question: 'What is the time complexity of binary search on a sorted array of n elements?',
        options: [
          { id: 'a', text: 'O(1)' },
          { id: 'b', text: 'O(n)' },
          { id: 'c', text: 'O(log n)' },
          { id: 'd', text: 'O(n²)' },
        ],
        correctOptionId: 'c',
        explanation: 'Binary search halves the search space each step, so it is O(log n).',
      },
      {
        question: 'Interview: What does Big O typically describe?',
        options: [
          { id: 'a', text: 'Best-case performance only' },
          { id: 'b', text: 'How time or space grows as input size grows (often worst case)' },
          { id: 'c', text: 'Exact number of operations' },
          { id: 'd', text: 'Average case only' },
        ],
        correctOptionId: 'b',
        explanation: 'Big O describes growth rate with input size. We usually care about worst case and drop constants and lower-order terms.',
      },
      {
        question: 'Two nested loops, each iterating n times (no early exit). What is the time complexity?',
        options: [
          { id: 'a', text: 'O(n)' },
          { id: 'b', text: 'O(n log n)' },
          { id: 'c', text: 'O(n²)' },
          { id: 'd', text: 'O(2n)' },
        ],
        correctOptionId: 'c',
        explanation: 'n × n iterations = O(n²).',
      },
    ],
  },
  {
    order: 12,
    slug: 'serialization',
    title: 'Serialization',
    lessonContent: `## Serialization in Java

**Serialization** = converting an object into a stream of bytes (for storage or network). **Deserialization** = reconstructing the object from that stream. Interviewers often ask about \`Serializable\`, \`transient\`, and \`serialVersionUID\`.

---

### Basics

- The class must implement \`java.io.Serializable\` (a marker interface with no methods).
- Use **ObjectOutputStream** to write objects; **ObjectInputStream** to read them.
- **transient** fields are **not** serialized (e.g. passwords, caches, non-serializable resources).

\`\`\`java
public class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private transient String password;  // not serialized
}
\`\`\`

---

### serialVersionUID

- A **version ID** for the class. If you don't declare it, the JVM generates one from the class structure.
- **Declare it explicitly** (e.g. \`1L\`) to avoid unexpected \`InvalidClassException\` when you change the class (add/remove fields).
- If the UID in the stream doesn't match the class, deserialization throws \`InvalidClassException\`.`,
    activities: [
      {
        type: 'multiple-choice',
        instruction: 'Interview: Why would you mark a field as transient?',
        options: [
          { id: 'a', text: 'To make it serializable' },
          { id: 'b', text: 'To exclude it from serialization (e.g. sensitive data, or non-serializable type)' },
          { id: 'c', text: 'To speed up serialization' },
          { id: 'd', text: 'To make it thread-safe' },
        ],
        correctAnswer: 'b',
        explanation: 'transient fields are not written to the byte stream. Use for passwords, caches, or fields that are not Serializable.',
      },
      {
        type: 'match-pairs',
        instruction: 'Match the term to its role in Java serialization.',
        options: [
          { id: 'ser', text: 'Serializable', correctMatch: 'mark' },
          { id: 'trans', text: 'transient', correctMatch: 'skip' },
          { id: 'uid', text: 'serialVersionUID', correctMatch: 'ver' },
          { id: 'oos', text: 'ObjectOutputStream', correctMatch: 'write' },
        ],
        matchOptions: [
          { id: 'mark', text: 'Marker interface; class must implement it to be serializable' },
          { id: 'skip', text: 'Keyword; field is not serialized' },
          { id: 'ver', text: 'Version ID for the class; helps with compatibility' },
          { id: 'write', text: 'Used to write objects to a stream' },
        ],
        correctAnswer: [['ser', 'mark'], ['trans', 'skip'], ['uid', 'ver'], ['oos', 'write']],
        explanation: 'Serializable = marker; transient = skip field; serialVersionUID = version; ObjectOutputStream = write.',
      },
    ],
    quizQuestions: [
      {
        question: 'Which keyword prevents a field from being serialized?',
        options: [
          { id: 'a', text: 'static' },
          { id: 'b', text: 'transient' },
          { id: 'c', text: 'final' },
          { id: 'd', text: 'volatile' },
        ],
        correctOptionId: 'b',
        explanation: 'The transient keyword excludes a field from serialization.',
      },
      {
        question: 'Interview: What happens if you don\'t declare serialVersionUID and later add a new field to the class?',
        options: [
          { id: 'a', text: 'Nothing; deserialization still works' },
          { id: 'b', text: 'Deserialization of old bytes may throw InvalidClassException because the generated UID changes' },
          { id: 'c', text: 'The new field is always null' },
          { id: 'd', text: 'Serialization is disabled' },
        ],
        correctOptionId: 'b',
        explanation: 'Without an explicit serialVersionUID, the JVM generates one from the class structure. Adding a field changes it, so old serialized data may fail to deserialize.',
      },
      {
        question: 'What interface must a class implement to be serializable?',
        options: [
          { id: 'a', text: 'Serializable (java.io.Serializable)' },
          { id: 'b', text: 'Serializable (java.util.Serializable)' },
          { id: 'c', text: 'Externalizable only' },
          { id: 'd', text: 'No interface required' },
        ],
        correctOptionId: 'a',
        explanation: 'java.io.Serializable is the marker interface for serialization. Externalizable is an alternative for custom control.',
      },
    ],
  },
];

const projects = [
  {
    order: 1,
    slug: 'library-management',
    title: 'Library Management System',
    description: 'Build a simple library system with Book, Library, and Member classes. Practice classes, encapsulation, inheritance, and polymorphism.',
    concepts: ['Classes and Objects', 'Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'],
    steps: [
      { order: 1, title: 'Design classes', description: 'Define Book (title, author, isbn), Library (list of books, add/remove), Member (name, borrowed books). Use private fields and getters/setters.', concepts: ['Classes', 'Encapsulation'], hints: ['Start with Book: private String title, author, isbn;'] },
      { order: 2, title: 'Add inheritance', description: 'Create Fiction and NonFiction that extend Book. Add a method getCategory() or similar that each overrides.', concepts: ['Inheritance', 'Polymorphism'], hints: ['class Fiction extends Book { }'] },
      { order: 3, title: 'Implement borrowing', description: 'In Library, add borrowBook(Member m, Book b) and returnBook(Member m, Book b). Different book types can have different loan periods (polymorphism).', concepts: ['Polymorphism'], hints: ['Use a Map<Member, List<Book>> for borrowed books.'] },
      { order: 4, title: 'Add interface/abstract', description: 'Introduce an interface Borrowable or abstract class for items that can be borrowed. Have Book implement/extend it.', concepts: ['Abstraction'], hints: ['interface Borrowable { int getLoanDays(); }'] },
    ],
  },
  {
    order: 2,
    slug: 'bank-accounts',
    title: 'Bank Account System',
    description: 'Model different account types (Savings, Checking) with inheritance and polymorphism. Practice encapsulation and validation.',
    concepts: ['Inheritance', 'Polymorphism', 'Encapsulation'],
    steps: [
      { order: 1, title: 'Base Account class', description: 'Create Account with private balance, accountId. Methods: deposit(amount), withdraw(amount), getBalance(). Validate amount > 0 and balance >= 0.', concepts: ['Classes', 'Encapsulation'], hints: ['private double balance;'] },
      { order: 2, title: 'SavingsAccount and CheckingAccount', description: 'SavingsAccount extends Account; add interest rate and applyInterest(). CheckingAccount extends Account; optionally add overdraft limit.', concepts: ['Inheritance'], hints: ['super(accountId) in constructor'] },
      { order: 3, title: 'Override withdraw', description: 'Savings: no overdraft. Checking: allow overdraft up to limit. Use @Override and call super.withdraw() where appropriate.', concepts: ['Polymorphism'], hints: ['Override withdraw in each subclass with different rules.'] },
      { order: 4, title: 'Use polymorphism', description: 'Create an array or list of Account, add Savings and Checking instances, and call withdraw/deposit on each. Demonstrate polymorphic behavior.', concepts: ['Polymorphism'], hints: ['Account[] accounts = { new SavingsAccount(...), new CheckingAccount(...) };'] },
    ],
  },
  {
    order: 3,
    slug: 'product-catalog',
    title: 'E-Commerce Product Catalog',
    description: 'Build a product catalog with categories and products. Use abstraction (interface/abstract class) and composition.',
    concepts: ['Abstraction', 'Composition', 'Encapsulation'],
    steps: [
      { order: 1, title: 'Product and Category', description: 'Product has name, price, category. Category has name and list of products. Use composition: Product has-a Category (or categoryId).', concepts: ['Composition'], hints: ['class Product { private String name; private double price; private Category category; }'] },
      { order: 2, title: 'Sellable interface', description: 'Create interface Sellable with getPrice(), getDescription(). Product implements Sellable.', concepts: ['Abstraction'], hints: ['interface Sellable { double getPrice(); String getDescription(); }'] },
      { order: 3, title: 'Catalog class', description: 'Catalog has list of Categories. Methods: addCategory, addProduct, findProductsByCategory, getTotalValue().', concepts: ['Composition'], hints: ['Use List<Category> or Map<String, Category>.'] },
      { order: 4, title: 'Optional: abstract Product type', description: 'Abstract class AbstractProduct with common fields; DigitalProduct and PhysicalProduct extend it with different getDescription().', concepts: ['Abstraction'], hints: ['abstract class AbstractProduct implements Sellable { ... }'] },
    ],
  },
  {
    order: 4,
    slug: 'task-tracker',
    title: 'Task / Project Tracker',
    description: 'Create a task tracker with status, priority, and optional assignee. Practice composition and design choices.',
    concepts: ['Composition', 'Encapsulation', 'Enums or constants'],
    steps: [
      { order: 1, title: 'Task and Status', description: 'Task has title, description, status (e.g. TODO, IN_PROGRESS, DONE), priority (HIGH, MEDIUM, LOW). Use enums or constants for status and priority.', concepts: ['Classes', 'Composition'], hints: ['enum Status { TODO, IN_PROGRESS, DONE }'] },
      { order: 2, title: 'Assignee (composition)', description: 'Task has an optional Assignee (name, email). Assignee is a separate class; Task has-a Assignee.', concepts: ['Composition'], hints: ['class Assignee { private String name, email; }'] },
      { order: 3, title: 'Project or Board', description: 'Project has list of Tasks. Methods: addTask, getTasksByStatus(Status), getTasksByPriority(Priority).', concepts: ['Composition'], hints: ['List<Task> tasks;'] },
      { order: 4, title: 'Filter and move', description: 'Implement moveTaskToStatus(Task t, Status s) and getHighPriorityTasks(). Encapsulate task list; no direct exposure of internal list if possible.', concepts: ['Encapsulation'], hints: ['Return copies or unmodifiable lists when exposing tasks.'] },
    ],
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Merge readable/fun lesson content + 20 interview-aligned activities + 20 quiz per topic
  const topicsWithInterview = week2Topics.map((t) => {
    const { activities, quizQuestions } = getActivitiesAndQuizzes(t.slug);
    const lessonContent = getLessonContent(t.slug) || t.lessonContent;
    return { ...t, lessonContent, activities, quizQuestions };
  });

  await Week.deleteOne({ slug: 'week-2-oop' });
  const week2 = await Week.create({
    order: 2,
    slug: 'week-2-oop',
    title: 'Week 2: Object-Oriented Programming',
    description: 'Classes, objects, inheritance, polymorphism, encapsulation, abstraction, composition, and more.',
    topics: topicsWithInterview,
  });
  console.log('Week 2 (OOP) seeded.');

  await Project.deleteMany({});
  for (const p of projects) {
    await Project.create({ ...p, weekId: week2._id });
  }
  console.log('4 projects seeded.');

  await mongoose.disconnect();
  console.log('Seed complete.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
