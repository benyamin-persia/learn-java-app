# Week 2: Object-Oriented Programming

A structured curriculum and study guide. Use the index below to jump to any section. Content can be added piece by piece.

**Source (Week 2 curriculum):** [Core Java — Notion](https://watery-whale-92f.notion.site/Core-Java-184408cc99df8031a47df8ca2cba0270)

---

## Index (Table of Contents)

| # | Topic | Link |
|---|--------|------|
| 1 | How Java Code is Compiled | [→ Go to section](#1-how-java-code-is-compiled) |
| 2 | Basic Syntax | [→ Go to section](#2-basic-syntax) |
| 3 | Variables and Data Types | [→ Go to section](#3-variables-and-data-types) |
| 4 | Garbage Collection | [→ Go to section](#4-garbage-collection) |
| 5 | Week 2 Assignment | [→ Go to section](#5-week-2-assignment) |
| 6 | Classes and Objects | [→ Go to section](#6-classes-and-objects) |
| 7 | Inheritance | [→ Go to section](#7-inheritance) |
| 8 | Polymorphism | [→ Go to section](#8-polymorphism) |
| 9 | Encapsulation | [→ Go to section](#9-encapsulation) |
| 10 | Abstraction | [→ Go to section](#10-abstraction) |
| 11 | Composition | [→ Go to section](#11-composition) |
| 12 | Big O Notation | [→ Go to section](#12-big-o-notation) |
| 13 | Serialization | [→ Go to section](#13-serialization) |
| 14 | Week 3 Assignment | [→ Go to section](#14-week-3-assignment) |

---

## 1. How Java Code is Compiled

### Java Compilation Process: A Comprehensive Guide

#### 1.1 Initial Compilation Phase

The Java compilation process begins with the transformation of human-readable source code into bytecode, involving several sophisticated steps:

**Lexical Analysis**

The compiler first performs **lexical analysis**, where the source code is broken down into tokens:

- **Keywords** — `public`, `class`, `void`, etc.
- **Identifiers** — variable names, method names
- **Operators** — `+`, `-`, `*`, `/`, etc.
- **Literals** — string constants, numeric values
- **Special symbols** — brackets, semicolons

**Syntax Analysis**

The parser performs **syntax analysis** by:

- Constructing an **Abstract Syntax Tree (AST)**
- Validating the grammatical structure of the code
- Ensuring proper nesting of program elements
- Checking for syntax errors

**Semantic Analysis**

During this phase, the compiler performs:

- Type checking and type inference
- Variable declaration and scope validation
- Method signature verification
- Access control validation

**Bytecode Generation**

The final compilation phase produces **bytecode** with the following characteristics:

- Platform-independent instructions
- Verification information for the JVM
- Constant pool containing literals and references
- Method and field metadata

---

#### 1.2 Java Virtual Machine (JVM) Execution

**Class Loading**

The JVM employs a sophisticated **three-phase class loading process**:

| Phase | Description |
|-------|-------------|
| **Loading** | Reads the `.class` file; creates a `Class` object in memory; stores method code and variables |
| **Linking** | **Verification** — ensures bytecode correctness and security; **Preparation** — allocates memory for class variables; **Resolution** — resolves symbolic references |
| **Initialization** | Executes static initializers; assigns initial values to static fields |

---

#### 1.3 Just-In-Time (JIT) Compilation: Deep Dive

**JIT Compilation Triggers**

The JIT compiler employs sophisticated heuristics to determine when to compile code:

- Method invocation frequency counters
- Loop iteration thresholds
- Method size considerations
- Memory usage patterns

**Tiered Compilation System**

Modern JVMs implement a **five-tier compilation system**:

| Level | Name | Description |
|-------|------|-------------|
| **Level 0** | Interpreter | Initial execution mode; collects execution statistics; no optimization overhead |
| **Level 1** | C1 with no profiling | Basic optimizations; quick compilation time; limited inlining |
| **Level 2** | C1 with light profiling | Method inlining; branch prediction; basic escape analysis |
| **Level 3** | C1 with full profiling | Advanced profiling; deeper inlining; exception handling optimization |
| **Level 4** | C2 | Aggressive optimizations; loop unrolling; escape analysis; lock elision; vector operations |

**Advanced JIT Optimizations**

- **Method Inlining** — Eliminates method call overhead; enables further optimizations; smart heuristics for inlining decisions.
- **Loop Optimizations** — Loop unrolling; range check elimination; loop fusion; auto-vectorization.
- **Escape Analysis** — Stack allocation of objects; lock elimination; scalar replacement.

**Deoptimization**

The JVM can **revert optimized code** when assumptions become invalid (e.g. dynamic class loading, debugging, assumption violations, on-stack replacement).

---

#### 1.4 Performance Monitoring and Tuning

- **`-XX:+PrintCompilation`** — compilation logging
- **JIT Watch** — detailed compilation analysis
- **Java Flight Recorder** — runtime statistics
- **JConsole** and **VisualVM** — performance monitoring

> This comprehensive compilation and execution system enables Java to achieve both **platform independence** and **high performance**.

**Reference:** [How Java code is Compiled (Notion)](https://watery-whale-92f.notion.site/How-Java-code-is-Compiled-188408cc99df801a883fcfdbef662553) · [Java Virtual Machine (Notion)](https://watery-whale-92f.notion.site/Java-Virtual-Machine-184408cc99df80368b36ee507f0ffa08)

[↑ Back to Index](#index-table-of-contents)

---

## 2. Basic Syntax

### Core Java Syntax Guide

Variables in Java store data and must be declared with a specific type before use.

#### Variables and Data Types

Declare with type and name: `int x = 5;`, `String name = "Java";`, etc. (See [§3. Variables and Data Types](#3-variables-and-data-types) for details.)

#### Basic Operations

| Category | Operators / Operations |
|----------|-------------------------|
| **Arithmetic** | Addition (`+`), Subtraction (`-`), Multiplication (`*`), Division (`/`), Modulo (`%`) |
| **Comparison** | Equal to (`==`), Not equal to (`!=`), Greater than (`>`), Less than (`<`), `>=`, `<=` |
| **Logical** | AND (`&&`), OR (`\|\|`), NOT (`!`) |

#### Control Structures

- **Conditionals:** `if`, `else if`, `else`, `switch`
- **Loops:** `for`, `enhanced for`, `while`, `do-while`

#### Comments

- Single-line: `// comment`
- Multi-line: `/* comment */` or `/** Javadoc */`

#### Methods

Methods must declare return type and parameter types:

```java
returnType methodName(parameterType param) {
    // body
    return value;  // if not void
}
```

#### Best Practices

- Use meaningful variable and method names
- Follow consistent indentation
- Add comments where they clarify intent
- Declare variables with the right data types

**Reference:** [Basic Syntax (Notion)](https://watery-whale-92f.notion.site/Basic-Syntax-184408cc99df80a2ba55c6d079219397) · [If Statements](https://watery-whale-92f.notion.site/Understanding-If-Statements-in-Java-From-Basics-to-Best-Practices-190408cc99df80959d0fd057a99e4813) · [Java Methods](https://watery-whale-92f.notion.site/Understanding-Java-Methods-A-Comprehensive-Guide-190408cc99df80809cd7c50e79472cc3) · [Comments](https://watery-whale-92f.notion.site/The-Art-of-Writing-Comments-in-Java-A-Comprehensive-Guide-190408cc99df806a952dc60176c1679b) · [While/Do-While Loops](https://watery-whale-92f.notion.site/Java-While-Loops-and-Do-While-Loops-A-Student-s-Guide-190408cc99df80298866e207055c5f52) · [Basic Operations](https://watery-whale-92f.notion.site/Understanding-Basic-Operations-in-Programming-190408cc99df80bc976ac55515a49f57)

[↑ Back to Index](#index-table-of-contents)

---

## 3. Variables and Data Types

### Understanding Java Variables

A variable in Java is a container that holds a value. It must be declared with a specific type before use.

#### Variable Declaration Syntax

Variables are declared with type and name (e.g. `int count;`, `String name = "Java";`).

#### Primitive Data Types

| Type    | Size   | Description                                      | Example            |
|---------|--------|--------------------------------------------------|--------------------|
| `byte`  | 1 byte | Whole numbers from -128 to 127                   | `byte b = 100;`    |
| `short` | 2 bytes| Whole numbers from -32,768 to 32,767             | `short s = 5000;`  |
| `int`   | 4 bytes| Whole numbers from -2³¹ to 2³¹−1                 | `int i = 100000;`  |
| `long`  | 8 bytes| Whole numbers from -2⁶³ to 2⁶³−1                 | `long l = 15000000000L;` |
| `float` | 4 bytes| Decimal numbers up to 7 decimal digits          | `float f = 5.75f;` |
| `double`| 8 bytes| Decimal numbers up to 15 decimal digits          | `double d = 19.99;`|
| `boolean` | 1 bit | True or false values                           | `boolean b = true;`|
| `char`  | 2 bytes| Single character/letter or ASCII value           | `char c = 'A';`    |

#### Reference Data Types

Reference types store references to objects. Common ones include:

- **String** — for text values
- **Arrays** — for collections of values
- **Classes** — user-defined types

#### Variable Naming Rules

- Must begin with a letter, underscore (`_`), or dollar sign (`$`)
- Cannot start with a number
- Case-sensitive (`age` and `Age` are different)
- Cannot use Java keywords as variable names
- Use **camelCase** for naming

#### Variable Scope

| Scope              | Where declared                                      |
|--------------------|-----------------------------------------------------|
| Instance variables | Inside a class, outside any method                  |
| Local variables    | Inside a method or block                            |
| Static variables   | With `static` keyword; shared across all instances |

#### Type Casting

- **Widening casting (automatic)** — converting a smaller type to a larger type (e.g. `int` → `long`)
- **Narrowing casting (manual)** — converting a larger type to a smaller type (e.g. `double` → `int`); requires explicit cast

#### Best Practices

- Always initialize variables before use
- Use meaningful names that describe their purpose
- Choose the appropriate data type
- Use `final` for constants
- Declare variables in the smallest scope possible

**Reference:** [Variables And Datatypes (Notion)](https://watery-whale-92f.notion.site/Variables-And-Datatypes-184408cc99df80b59b2dc9cb32b7c4b4) · [Understanding Reference Data Types in Java](https://watery-whale-92f.notion.site/Understanding-Reference-Data-Types-in-Java-190408cc99df8029a801f1a51a268c1b)

[↑ Back to Index](#index-table-of-contents)

---

## 4. Garbage Collection

### Advanced Guide to Java Garbage Collection Internals

#### 1. Memory Management Architecture

**Heap memory structure**

The JVM heap is divided into:

- **Eden Space** — initial allocation for most objects; size via `-Xmn`; when full, triggers **Minor GC**
- **Survivor Spaces (S0/S1)** — hold objects that survive Eden; objects copied between them; age tracked for tenuring
- **Old Generation** — long-lived objects; cleaned by **Major GC / Full GC**; tenuring threshold via `-XX:MaxTenuringThreshold`

#### 2. Reference Types

| Type | Behavior | Typical use |
|------|----------|-------------|
| **Strong** | Default; prevents GC until unreachable | Normal references |
| **Soft** | Cleared before `OutOfMemoryError` | Caches |
| **Weak** | Collected in next GC cycle | `WeakHashMap`, canonical mapping |
| **Phantom** | Cannot be dereferenced; used with `ReferenceQueue` | Cleanup / finalization |

#### 3. Garbage Collectors

- **G1 (default in Java 17+)** — region-based; phases: Young-Only, Concurrent Mark, Mixed Collection, Full GC (fallback)
- **ZGC** — concurrent; sub-millisecond pauses; scales from 8 MB to 16 TB
- **Parallel** — multi-threaded; stop-the-world; throughput-focused

#### 4. GC Tuning Parameters

Examples: `-Xms`/`-Xmx` (heap size), `-XX:+UseG1GC`, `-XX:MaxGCPauseMillis`, `-XX:MaxTenuringThreshold`, etc.

#### 5. Memory Leaks and Prevention

- Close resources (e.g. try-with-resources)
- Clear references when no longer needed
- Choose appropriate collection types and avoid unintended retention

#### 6. GC Monitoring and Analysis

- **JConsole** — built-in monitoring  
- **VisualVM** — heap and GC analysis  
- **JMC (Java Mission Control)** — advanced monitoring  
- **GC logging** — detailed GC events for tuning

#### 7. Performance Impact

Factors: object allocation rate, object lifetime distribution, heap size and fragmentation, application vs GC threads.

#### 8. Best Practices (e.g. for OCP)

- Close resources properly
- Clear references when done
- Use appropriate collections
- Understand object lifecycle

**Reference:** [Garbage Collection (Notion)](https://watery-whale-92f.notion.site/Garbage-Collection-188408cc99df80eb9553f80aeaf30db9)

[↑ Back to Index](#index-table-of-contents)

---

## 5. Week 2 Assignment

*(Content to be added — send your notes to fill this section.)*

**Reference:** [Week 2 Assignment (Notion)](https://watery-whale-92f.notion.site/Week-2-Assignment-184408cc99df80418d22d94252222095)

[↑ Back to Index](#index-table-of-contents)

---

## 6. Classes and Objects

### Understanding Classes and Objects in Java

Classes and objects are the building blocks of Java OOP.

#### What is a Class?

A **class** is a blueprint or template. It defines **attributes** (state) and **methods** (behavior) that instances will have.

```java
public class Car {
    private String model;   // attribute
    private int year;       // attribute
    public void drive() { } // method
}
```

#### What is an Object?

An **object** is an **instance** of a class — a concrete entity with its own data.

```java
Car myCar = new Car();
```

#### Key Components of a Class

| Component | Role |
|-----------|------|
| **Attributes (fields)** | Instance variables storing object state; can use `private`, `public`, `protected` |
| **Constructors** | Special methods to initialize objects; name = class name; overloading allowed |
| **Methods** | Define behavior; can take parameters and return values |

#### OOP Principles (in brief)

- **Encapsulation** — bundle data and methods in one unit; control access with modifiers (see [§9. Encapsulation](#9-encapsulation))
- **Inheritance** — reuse and extend from another class (see [§7. Inheritance](#7-inheritance))

#### Best Practices

- Initialize attributes for a consistent state
- Use clear names for classes, methods, and attributes
- Prefer private attributes with getters/setters (encapsulation)
- Document with Javadoc
- Keep each class focused (single responsibility)

**Reference:** [Classes and Objects (Notion)](https://watery-whale-92f.notion.site/Classes-and-Objects-184408cc99df80c8908ced11f59a744b)

[↑ Back to Index](#index-table-of-contents)

---

## 7. Inheritance

### Understanding Inheritance in Java

Inheritance is a fundamental OOP concept that allows a class to inherit attributes and methods from another class, creating a **parent–child (superclass–subclass)** relationship.

#### Basic Syntax

```java
class Parent {
    // Parent class members
}
class Child extends Parent {
    // Child class members
}
```

#### Types of Inheritance

- **Single** — a class inherits from one parent
- **Multilevel** — a class inherits from a child class
- **Hierarchical** — multiple classes inherit from one parent

#### Key Concepts

**1. `extends` keyword** — establishes inheritance between classes.

```java
public class Animal {
    void eat() { System.out.println("This animal eats food"); }
}
public class Dog extends Animal {
    void bark() { System.out.println("The dog barks"); }
}
```

**2. `super` keyword** — refers to parent class members (constructor, methods, fields).

```java
class Child extends Parent {
    Child() { super(); }  // Calls parent constructor
    void display() { super.display(); }  // Calls parent method
}
```

**3. Method overriding** — child classes override parent methods to provide specific behavior.

```java
class Animal {
    void makeSound() { System.out.println("Some sound"); }
}
class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Woof!"); }
}
```

#### Important Rules

- **Private** members of the parent are **not** inherited.
- Constructors are not inherited; the parent constructor is invoked when creating a child object.
- Java does **not** support multiple inheritance of classes (a class cannot `extend` more than one class).
- All Java classes implicitly inherit from **`Object`**.

#### Best Practices

- Use inheritance for **"is-a"** relationships.
- Keep the hierarchy simple and shallow.
- Override `toString()`, `equals()`, and `hashCode()` when needed.
- Prefer **composition over inheritance** when appropriate.

#### Common Use Cases

- Specialized versions of classes
- Shared behavior in a parent class
- Hierarchical class structures
- Code reuse and maintenance

**Reference:** [Inheritance (Notion)](https://watery-whale-92f.notion.site/Inheritance-184408cc99df80219678eeed771cdc9f)

[↑ Back to Index](#index-table-of-contents)

---

## 8. Polymorphism

### Understanding Polymorphism in Java

**Polymorphism** (“many forms”) lets one interface or type represent different underlying behaviors. In Java it is mainly **compile-time** (overloading) and **runtime** (overriding).

#### Compile-time polymorphism (method overloading)

Same method name, different parameter lists; the compiler chooses which method to call.

```java
void print(int x) { }
void print(String s) { }
void print(int x, String s) { }
```

#### Runtime polymorphism (method overriding)

A subclass provides its own implementation of a method defined in the parent. The JVM chooses the implementation based on the **actual object type** at runtime.

```java
Animal a = new Dog();
a.makeSound();  // "Woof!" — uses Dog's overridden method
```

#### Key ideas

- **Reference type vs object type:** The reference type decides what members are visible; the object type decides which overridden method runs.
- **`@Override`** — use this annotation when overriding to get compiler checks.
- Works with **inheritance** and **interfaces**: superclass/interface reference, subclass implementations.

#### Benefits

- Write generic code that works with any subtype (e.g. `Animal` handling `Dog`, `Cat`).
- Extensibility: add new subtypes without changing existing code.
- Supports abstraction and flexible design.

**Reference:** [Polymorphism (Notion)](https://watery-whale-92f.notion.site/Polymorphism-184408cc99df80d2a5fecfd34b622d0d)

[↑ Back to Index](#index-table-of-contents)

---

## 9. Encapsulation

### Understanding Encapsulation in Java

**Encapsulation** is the practice of wrapping data and the code that operates on it into a single unit (the class) and **restricting direct access** to internal details.

#### Key principles

- **Data hiding** — make instance variables `private`; expose them only through methods
- **Access control** — use `private`, `protected`, `public` to control visibility
- **Getters/setters** — provide controlled read/write access and validation

#### Implementation example

```java
public class BankAccount {
    private double balance;  // hidden

    public double getBalance() { return balance; }
    public void setBalance(double amount) {
        if (amount >= 0) this.balance = amount;
    }
}
```

#### Benefits

- **Control** — decide how data is read and modified
- **Security** — limit unauthorized access to internals
- **Flexibility** — change implementation without breaking callers
- **Maintainability** — easier to modify and debug

#### Best practices

- Declare instance variables **private**
- Provide **public** getters/setters only where needed
- Add **validation** in setters (e.g. range checks)
- Use clear names: `getXxx` / `setXxx`

#### Common mistakes

- Making instance variables `public`
- No validation in setters
- Exposing internal structures (e.g. mutable collections) without copying

**Reference:** [Encapsulation (Notion)](https://watery-whale-92f.notion.site/Encapsulation-184408cc99df8090aca0df589d44daa1)

[↑ Back to Index](#index-table-of-contents)

---

## 10. Abstraction

### Understanding Abstraction in Java

Abstraction is one of the four core OOP concepts: **hiding implementation details** and exposing only the functionality to the user.

#### Two Ways to Achieve Abstraction

| Approach           | Degree of abstraction |
|--------------------|------------------------|
| Abstract classes  | Partial (0–100%)       |
| Interfaces        | Complete (100%)        |

#### Abstract Classes

- Declared with the `abstract` keyword.
- Can have both **abstract** and **concrete** methods.
- **Cannot** be instantiated (no `new AbstractClass()`).
- Can have constructors and static methods.
- Can have `final` methods.
- Must be extended by concrete classes.

#### Interfaces

- Fully abstract type with only abstract methods (before Java 8).
- All methods are **public** and **abstract** by default.
- All fields are **public**, **static**, and **final** by default.
- A class can **implement multiple** interfaces.
- Since Java 8: can have **default** and **static** methods.

#### Benefits of Abstraction

- **Reduced complexity** — hide implementation, show only what’s needed.
- **Increased security** — internal details hidden from users.
- **Easier maintenance** — change implementation without affecting callers.
- **Reusability** — abstract classes reused via inheritance.

#### When to Use What?

| Use **abstract class** when …           | Use **interface** when …        |
|----------------------------------------|----------------------------------|
| Several classes share common behavior  | You need full abstraction       |
| You are extending base class behavior  | You need multiple inheritance   |
| Classes are closely related            | You are defining a contract     |

#### Best Practices

- Keep interfaces small and focused.
- Use abstract classes when sharing common code.
- Follow the Interface Segregation Principle (ISP).
- Use interfaces to define types.

**Reference:** [Abstraction (Notion)](https://watery-whale-92f.notion.site/Abstraction-184408cc99df80988e0eee81bbbde1f2)

[↑ Back to Index](#index-table-of-contents)

---

## 11. Composition

### Understanding Composition in Java

**Composition** means building a class from one or more **other classes** as parts. It models a **“has-a”** relationship (e.g. a car *has-a* engine).

#### Real-life example: Car

A car *has-a* engine, *has-a* steering wheel, *has-a* transmission. The car is not an engine; it **contains** these components.

```java
class Engine {
    private String type;
    private int horsepower;
    public Engine(String type, int horsepower) { this.type = type; this.horsepower = horsepower; }
    public void start() { System.out.println("Engine started"); }
}
class SteeringWheel {
    private String material;
    public SteeringWheel(String material) { this.material = material; }
    public void turn(String direction) { System.out.println("Turning " + direction); }
}
class Car {
    private Engine engine;           // composition
    private SteeringWheel wheel;     // composition
    public Car() {
        engine = new Engine("V8", 300);
        wheel = new SteeringWheel("Leather");
    }
    public void startCar() { engine.start(); }
    public void turnCar(String direction) { wheel.turn(direction); }
}
```

- **Component classes** — `Engine`, `SteeringWheel` are independent.
- **Composite class** — `Car` is composed of them.
- **Lifetime** — components are created and owned by the `Car` instance.

#### Benefits

- **Reusability** — same components in different composites
- **Flexibility** — change components without changing the composite’s interface
- **Encapsulation** — component internals stay hidden

#### Composition vs inheritance

| Inheritance | Composition |
|-------------|-------------|
| “is-a” (Car *is-a* Vehicle) | “has-a” (Car *has-a* Engine) |
| `extends` | Field holding another object |

#### Aggregation vs composition

- **Composition** — strong “has-a”; child has no meaning without parent (e.g. Car–Engine).
- **Aggregation** — weaker “has-a”; child can exist independently (e.g. University–Student; students can exist without a university).

#### Dependency injection

Inject components via constructor or setters instead of creating them inside the class — improves testability and flexibility.

```java
public Computer(CPU cpu, RAM ram) { this.cpu = cpu; this.ram = ram; }
```

#### Design patterns using composition

- **Decorator** — add behavior by wrapping objects
- **Composite** — treat single objects and groups uniformly
- **Strategy** — swap algorithms by injecting different implementations

**Reference:** [Composition (Notion)](https://watery-whale-92f.notion.site/Composition-188408cc99df80f68808d66b6266b32a)

[↑ Back to Index](#index-table-of-contents)

---

## 12. Big O Notation

### Understanding Big O Notation (Algorithm Complexity)

**Big O** describes how an algorithm’s time or space use grows as the **input size** grows. It focuses on the **worst case** and on the **dominant term** (e.g. ignore constants and lower-order terms).

#### Common complexities (from best to worst)

| Notation | Name | Example |
|----------|------|--------|
| O(1) | Constant | Array access by index, hash table lookup |
| O(log n) | Logarithmic | Binary search in a sorted array |
| O(n) | Linear | Single loop over n elements |
| O(n log n) | Linearithmic | Efficient sorting (e.g. MergeSort) |
| O(n²) | Quadratic | Nested loops over n (e.g. simple sort) |
| O(2ⁿ) | Exponential | Naive recursive Fibonacci |

#### Why it matters in Java

- **Data structures** — `ArrayList` get by index O(1); linear search O(n); binary search on sorted O(log n).
- **Collections** — `HashMap` get/put average O(1); `TreeMap` O(log n).
- **Loops** — nested loops over the same collection often imply O(n²) or higher.

#### Rules of thumb

- Drop constants: O(2n) → O(n).
- Drop lower-order terms: O(n² + n) → O(n²).
- Worst case is what we usually express (e.g. linear search O(n)).

**Reference:** [Big O Notation (Notion)](https://watery-whale-92f.notion.site/Big-O-Notation-188408cc99df800b9f4bce81f5fd5cf0)

[↑ Back to Index](#index-table-of-contents)

---

## 13. Serialization

### Serialization and serialVersionUID in Java

**Serialization** is converting an **object** into a stream of bytes (e.g. for storage or network). **Deserialization** is reconstructing the object from that stream.

#### Basics

- Class must implement **`java.io.Serializable`** (marker interface).
- Use **`ObjectOutputStream`** to write objects, **`ObjectInputStream`** to read them.
- `transient` fields are **not** serialized (e.g. caches, non-serializable resources).

```java
public class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private transient String password;  // not serialized
}
```

#### serialVersionUID

- A **version ID** for the class. If you don’t declare it, the JVM generates one from the class structure.
- **Declaring it explicitly** (e.g. `private static final long serialVersionUID = 1L;`) gives you control when you change the class (add/remove fields, change types).
- If the UID of the class doesn’t match the UID in the stream, deserialization throws **`InvalidClassException`**. You can bump the UID when you make incompatible changes.

#### Best practices

- Define `serialVersionUID` for `Serializable` classes to avoid surprise failures after refactoring.
- Mark non-serializable or sensitive fields as `transient`.
- Prefer **Java serialization** only when you need it; for new code, consider JSON, Protocol Buffers, or other formats.

**Reference:** [Serialization and serialVersionId (Notion)](https://watery-whale-92f.notion.site/Serialization-and-serialVersionId-188408cc99df80cdb481c8f80c4cadb3)

[↑ Back to Index](#index-table-of-contents)

---

## 14. Week 3 Assignment

*This assignment is submitted in Week 3 but assesses the OOP concepts covered in Week 2.*

### Object-Oriented Programming Assignment

In this assignment, you will demonstrate your understanding of the core OOP concepts covered in Week 2.

#### Task Description

Create a simple **Library Management System** that implements the following OOP concepts:

| OOP Concept | Implementation |
|-------------|----------------|
| **Classes and Objects** | Design classes for `Book`, `Library`, and `Member` |
| **Inheritance** | Create different types of books (e.g. `Fiction`, `NonFiction`) that inherit from `Book` |
| **Polymorphism** | Implement different borrowing behaviors for different types of books |
| **Encapsulation** | Use proper access modifiers and getter/setter methods |
| **Abstraction** | Create appropriate abstract classes or interfaces |

#### Requirements

- Implement all five OOP concepts covered in the lectures
- Include proper documentation and comments
- Write a brief explanation of how each OOP principle is used in your code

#### Submission Guidelines

- Submit your Java source code files
- Include a README file explaining how to run your program
- Add comments explaining the implementation of each OOP concept

#### Evaluation Criteria

| Criterion | Weight |
|-----------|--------|
| Correct implementation of OOP concepts | 50% |
| Code organization and clarity | 25% |
| Documentation quality | 25% |

**Due date:** One week from assignment date.

**Reference:** [Week 3 Assignment (Notion)](https://watery-whale-92f.notion.site/Week-3-Assignment-184408cc99df807684cafe2b5b2de46f)

[↑ Back to Index](#index-table-of-contents)
