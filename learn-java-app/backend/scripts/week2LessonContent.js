/**
 * Week 2 lesson content: readable, fun, easy to understand.
 * Each lesson uses short paragraphs, simple language, real-world analogies, and clear takeaways.
 */

export const lessonContentBySlug = {
  'how-java-is-compiled': `## How Java Code Becomes Something Your Computer Runs

**In a nutshell:** You write \`.java\` files. The compiler turns them into \`.class\` (bytecode). The JVM runs that bytecode. Same \`.class\` runs on Windows, Mac, or Linux — that’s the “write once, run anywhere” idea.

---

### Think of it like a recipe and a meal

- The **recipe** (your \`.java\` source) is what you write.
- The **meal prep** (compilation) turns it into something the “kitchen” can use.
- The **kitchen** (JVM) is what actually runs it. Different “kitchens” (different operating systems) can all use the same prep.

---

### Step 1: What the compiler does

The compiler doesn’t run your code. It **translates** it in stages:

1. **Lexical analysis** — Chops your code into tokens (keywords, names, symbols). Like splitting a sentence into words.
2. **Syntax analysis** — Checks that those tokens form valid Java (correct brackets, structure). Builds a tree (AST) of the program.
3. **Semantic analysis** — Checks types and rules: “Does this variable exist? Do the types match?”
4. **Bytecode generation** — Writes the result to \`.class\` files. That’s **bytecode**: instructions for the JVM, not for the CPU directly.

---

### Step 2: What the JVM does when you run the program

Before your code runs, the JVM **loads** the class:

| Phase | What happens |
|-------|----------------|
| **Loading** | Reads the \`.class\` file and creates a \`Class\` object in memory. |
| **Linking** | Verifies bytecode, prepares static storage, resolves references. |
| **Initialization** | Runs \`static\` blocks and sets default values for \`static\` fields. |

---

### Step 3: Making it fast (JIT)

At first the JVM **interprets** bytecode (step by step). For code that runs a lot, it uses **JIT (Just-In-Time)** to compile that part into real machine code. So you get portability (bytecode) and speed (JIT) together.

---

**Takeaway:** Compile once to bytecode; the JVM runs it (and can JIT it) on any supported platform.`,

  'basic-syntax': `## Java Syntax: The Rules of the Game

**In a nutshell:** Java is strict but clear. Every statement ends with \`;\`, blocks use \`{ }\`, and you always say the **type** of a variable. Once you know the pattern, reading and writing Java gets easier.

---

### Variables: “What kind of thing is this?”

You always declare **type** and **name**:

\`int count = 0;\`  
\`String name = "Java";\`

No “guess the type” — the compiler needs to know. That helps catch bugs early.

---

### Operators: Doing stuff with values

- **Math:** \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (\% = remainder).
- **Compare:** \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`.
- **Logic:** \`&&\` (and), \`||\` (or), \`!\` (not).

---

### Control flow: Choices and loops

- **Choices:** \`if\` / \`else if\` / \`else\`, and \`switch\` for many options.
- **Loops:** \`for\`, “enhanced” \`for (Type x : collection)\`, \`while\`, \`do-while\`.

---

### Methods: Reusable pieces of behavior

A method has: **return type**, **name**, **parameters**:

\`\`\`java
returnType methodName(parameterType param) {
    return value;  // if not void
}
\`\`\`

**Fun fact:** In Java the return type comes *first*. So \`int getCount()\` means “a method named getCount that returns an int.”

---

### Comments: Notes for humans

- \`//\` single line
- \`/* ... */\` multi-line
- \`/** ... */\` for Javadoc (docs that tools can read)

---

**Takeaway:** Type first, then name; semicolons and braces matter. Clear structure makes code readable.`,

  'variables-and-data-types': `## Variables and Data Types: Putting Data in Named Boxes

**In a nutshell:** A variable is a **named box** that holds a value. In Java every box has a **type**. You choose the right type so the compiler can check your program and avoid silly mistakes.

---

### Primitives: The built-in “value” types

These hold the value directly (no “pointer” to another object):

| Type | Size | Good for |
|------|------|----------|
| \`byte\`, \`short\`, \`int\`, \`long\` | 1–8 bytes | Whole numbers |
| \`float\`, \`double\` | 4–8 bytes | Decimals |
| \`boolean\` | 1 bit | \`true\` / \`false\` |
| \`char\` | 2 bytes | One character |

**Example:** \`int age = 25;\` — the box is named \`age\`, holds an integer, and can’t suddenly hold text.

---

### Reference types: Pointing to objects

- **String** — text. It’s a class, not a primitive.
- **Arrays** — lists of values.
- **Your own classes** — any type you define.

The variable holds a **reference** (like an address) to the object, not the object itself.

---

### Where does the variable live? (Scope)

- **Instance variable** — inside the class, outside methods. Each object has its own copy.
- **Local variable** — inside a method (or block). Only visible there.
- **Static variable** — \`static\`; one copy shared by the whole class.

**Important:** Local variables are *not* given a default value. You must assign before use. Instance and static fields *are* defaulted (e.g. 0, false, null).

---

### Changing types: Widening vs narrowing

- **Widening** — going from a “smaller” type to a “larger” one (e.g. \`int\` → \`long\`). Java does this automatically.
- **Narrowing** — going from “larger” to “smaller” (e.g. \`double\` → \`int\`). You must **cast**: \`(int) x\`. You might lose information (e.g. the decimal part).

---

**Takeaway:** Pick the right type, know where the variable is visible (scope), and use casting only when you narrow.`,

  'garbage-collection': `## Garbage Collection: Java Cleans Up for You

**In a nutshell:** In Java you **don’t** free memory yourself. When an object is no longer reachable (nothing useful points to it), the **Garbage Collector (GC)** reclaims its memory. You avoid a whole class of bugs (use-after-free, double-free) and the lessons are easier to follow.

---

### Why it matters

In languages like C you say “I’m done, free this.” In Java you just stop using the object. If no thread can reach it, the JVM’s **GC** will eventually reclaim the memory. So you focus on *what* your program does, not *when* to free.

---

### Where do objects live? The heap in simple terms

The JVM’s heap is like a warehouse with zones:

- **Eden** — Most new objects start here. When it gets full, a **Minor GC** runs and removes what’s dead; survivors move on.
- **Survivor spaces** — Objects that survived Minor GC sit here; the JVM tracks “age.”
- **Old Generation** — Long-lived objects end up here. When the JVM needs to, it runs a **Major** or **Full GC** here.

So: new → Eden → (maybe) Survivor → (maybe) Old. When nothing points to an object, it’s **eligible** for collection.

---

### Reference strength (for the curious)

| Type | In plain English |
|------|-------------------|
| **Strong** | Normal reference. GC only collects when nothing can reach it. |
| **Soft** | Can be cleared when memory is tight (good for caches). |
| **Weak** | Can be collected in the next GC (e.g. \`WeakHashMap\`). |
| **Phantom** | Used for cleanup/finalization; you can’t get the object back. |

---

### Who does the cleaning?

The **Garbage Collector** inside the JVM. Different algorithms exist (e.g. **G1** as default in Java 17+, **ZGC** for very low pause). You usually don’t configure them until you need to tune.

---

### What you should do

- Use **try-with-resources** (or \`finally\`) so streams and connections are closed.
- Don’t keep huge references in static or long-lived objects if you don’t need them.
- Avoid “memory leaks” in the Java sense: objects that are still reachable but never used (e.g. forgotten caches).

---

**Takeaway:** You don’t free memory; the GC does. Write clear code and close resources; the JVM handles the rest.`,

  'classes-and-objects': `## Classes and Objects: Blueprints and the Things You Build

**In a nutshell:** A **class** is a blueprint (recipe). An **object** is one thing you build from that blueprint (one meal, one car). Same class, many possible objects — each with its own data.

---

### Class = blueprint

A class describes:

- **What data** each instance has (attributes, fields).
- **What it can do** (methods).

Example: a \`Car\` class might have \`model\` and \`year\`, and a method \`drive()\`. The class itself isn’t a car; it’s the *idea* of a car.

\`\`\`java
public class Car {
    private String model;
    private int year;
    public void drive() { /* ... */ }
}
\`\`\`

---

### Object = one concrete instance

You create an **object** with \`new\`:

\`\`\`java
Car myCar = new Car();
\`\`\`

Now \`myCar\` is one real “car” in memory. You can create many: \`Car otherCar = new Car();\` — same blueprint, different object.

---

### The main pieces of a class

| Piece | Role |
|-------|------|
| **Attributes (fields)** | Data that each object has (e.g. \`model\`, \`year\`). |
| **Constructors** | Code that runs when you do \`new Car(...)\`. Same name as the class; you can have several (overloading). |
| **Methods** | Actions the object can do (e.g. \`drive()\`). |

---

### Why use \`private\` and getters/setters?

Keeping fields \`private\` and exposing them through **getters/setters** lets you:

- Check values before they’re set (e.g. “balance can’t be negative”).
- Change how you store data later without breaking callers.

That’s **encapsulation** — we’ll see it again soon.

---

**Takeaway:** Class = type/blueprint. Object = one instance created with \`new\`. Attributes hold state; methods define behavior.`,

  'inheritance': `## Inheritance: Reusing and Extending What Already Exists

**In a nutshell:** **Inheritance** means one class can “inherit” the fields and methods of another. You get a **parent** (superclass) and a **child** (subclass). Use it when the relationship is **“is-a”**: a Dog *is a* kind of Animal.

---

### How it looks in code

\`\`\`java
class Animal { }
class Dog extends Animal { }
\`\`\`

\`extends\` means “Dog is a Animal and gets its non-private stuff.” So Dog **is-a** Animal.

---

### The main ideas

- **extends** — “This class is a kind of that class.” (Only one parent in Java.)
- **super** — Call the parent’s constructor (\`super(...)\`) or a parent method (\`super.method()\`).
- **Overriding** — The child defines its own version of a method. Use \`@Override\` so the compiler can check.

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

### Rules to remember

- **Private** stuff in the parent is *not* visible in the child. (The data is there, but only the parent’s own code can touch it.)
- **Constructors** are not “inherited”; the child’s constructor must call the parent’s (often \`super()\`) to set up the parent part.
- **One parent only** — Java doesn’t let a class \`extends\` two classes. For multiple “contracts,” use **interfaces**.
- Every class eventually extends **Object** — so every object has \`toString()\`, \`equals()\`, etc.

---

### When to use it

Use inheritance when the relationship is clearly **“is-a”** (Dog is-a Animal, SavingsAccount is-a Account). When the relationship is **“has-a”** (Car has-a Engine), prefer **composition** (a field of type Engine) instead of inheritance.

---

**Takeaway:** \`extends\` = is-a, reuse and extend. Use \`super\` to call the parent; use \`@Override\` when replacing a method.`,

  'polymorphism': `## Polymorphism: One Name, Many Behaviors

**In a nutshell:** **Polymorphism** means “many forms.” The same method name (or the same type) can behave differently depending on *what* object is actually there. That lets you write one piece of code that works with many kinds of objects.

---

### Two kinds in Java

1. **Compile-time (overloading)** — Same method name, **different parameter list**. The compiler picks which method to call based on the arguments. No inheritance needed.
2. **Runtime (overriding)** — Same method *signature* in parent and child. The **JVM** picks which implementation runs based on the **actual object** at runtime.

\`\`\`java
Animal a = new Dog();
a.makeSound();  // Prints "Woof!" — the object is a Dog, so Dog's method runs
\`\`\`

---

### The key idea: reference vs object

- **Reference type** (\`Animal\`) — Decides what *names* you’re allowed to use (what methods the compiler lets you call).
- **Object type** (\`Dog\`) — Decides *which* implementation runs when you call an overridden method.

So you can write: “Treat this as an Animal,” but when you call \`makeSound()\`, the JVM runs the **Dog** version. That’s **runtime polymorphism**.

---

### Why it’s useful

You can write code that works with **any** Animal (or any “list of accounts,” etc.). Later you add new subtypes (e.g. Cat, Bird) and your existing code doesn’t need to change — it just calls \`makeSound()\` and the right thing happens. That’s the “open/closed” idea: open for extension, closed for modification.

---

**Takeaway:** Overloading = same name, different params (compiler chooses). Overriding = same signature, subclass implementation (JVM chooses at runtime by actual object type).`,

  'encapsulation': `## Encapsulation: Hiding the Insides, Exposing a Clear Outside

**In a nutshell:** **Encapsulation** means you bundle **data** and the **methods** that use it inside a class, and you **control who can touch the data**. Usually: fields are \`private\`, and the outside world talks to your object through **getters** and **setters** (or other methods). That makes the code safer and easier to change.

---

### Why hide data?

If anyone can change \`balance\` or \`age\` directly, you get:

- Invalid states (e.g. negative balance, age = -5).
- No place to add checks or logging later.

So you **hide** the field (\`private\`) and **expose** only what you want (e.g. \`getBalance()\`, \`setBalance(double x)\` with a check inside).

---

### How it looks

\`\`\`java
public class BankAccount {
    private double balance;

    public double getBalance() { return balance; }
    public void setBalance(double amount) {
        if (amount >= 0) this.balance = amount;
    }
}
\`\`\`

Only your class can read/write \`balance\` directly. Everyone else uses the methods, so you can enforce rules (e.g. “no negative balance”).

---

### Access levels (quick recap)

- **private** — Only this class.
- **default (package-private)** — This class + same package.
- **protected** — Package + subclasses.
- **public** — Everyone.

For fields you usually want **private**; for “do this” methods you often want **public** (or protected if only subclasses should call).

---

### Benefits

- **Control** — You decide how data is read and updated.
- **Safety** — Callers can’t put the object in an invalid state (if you validate in setters).
- **Flexibility** — You can rename or change how you store data inside without breaking callers, as long as the getters/setters stay the same.

---

**Takeaway:** Encapsulation = private fields + public (or protected) methods. Use getters/setters to control and validate access.`,

  'abstraction': `## Abstraction: Showing What Matters, Hiding the Rest

**In a nutshell:** **Abstraction** means you focus on *what* something does, not *how* it does it. In Java you get that through **abstract classes** (partial “templates”) and **interfaces** (pure contracts). Both help you write code that depends on “something that can do X” instead of one concrete implementation.

---

### Why abstract?

You don’t need to know how \`ArrayList\` stores elements to use \`add()\` and \`get()\`. That’s abstraction: a clear **interface** (the methods you call) and hidden **implementation** (how it’s done). Same idea in your own design: define a clear “what” and hide the “how.”

---

### Two tools in Java

| Tool | In plain English |
|------|-------------------|
| **Abstract class** | A class you can’t \`new\` by itself. It can have both abstract methods (no body) and normal methods. Subclasses fill in the abstract parts. One \`extends\` only. |
| **Interface** | A contract: “whoever implements me must have these methods.” A class can **implement** many interfaces. (Since Java 8, interfaces can have \`default\` and \`static\` methods too.) |

---

### Abstract class in short

- Declared with \`abstract\`.
- Can have \`abstract\` methods (subclass *must* implement) and concrete methods (shared code).
- You **cannot** do \`new AbstractClass()\` — only create instances of a *concrete* subclass.

---

### Interface in short

- Describes *what* methods implementors must provide.
- A class can \`implements A, B, C\` — so you get “multiple types” without multiple inheritance of *implementation*.
- Fields in an interface are \`public static final\` (constants). Methods were “public abstract” until Java 8 added \`default\` and \`static\`.

---

### When to use which?

- **Abstract class** — When several classes share real *code* and a clear “is-a” hierarchy (e.g. Animal → Dog, Cat).
- **Interface** — When you want a *contract* or a “role” (e.g. Runnable, Comparable), or when a class needs to play several roles (implement several interfaces).

---

**Takeaway:** Abstraction = hide “how,” expose “what.” Use abstract classes for shared code and hierarchy; use interfaces for contracts and multiple roles.`,

  'composition': `## Composition: Building Big Things From Smaller Parts

**In a nutshell:** **Composition** means one object **contains** other objects (as fields). The relationship is **“has-a”**: a Car *has an* Engine, a Laptop *has a* Keyboard. You reuse behavior by *having* a part, not by *being* a subtype. That often makes design simpler and more flexible than deep inheritance.

---

### Has-a vs is-a

- **Inheritance** — “Dog **is-a** Animal.” Use \`extends\`.
- **Composition** — “Car **has-a** Engine.” Use a **field** of type \`Engine\`.

\`\`\`java
class Car {
    private Engine engine;
    private SteeringWheel wheel;
    public void startCar() { engine.start(); }
}
\`\`\`

The car doesn’t *become* an engine; it *uses* one. That’s composition.

---

### Why prefer composition when it fits?

- **Flexibility** — You can swap the Engine for another implementation without changing the rest of Car.
- **Less coupling** — You depend on “something that can start,” not a big inheritance tree.
- **Easier testing** — You can inject a fake or mock Engine.

“Favor composition over inheritance” is a classic design guideline when the relationship is has-a or when inheritance would be forced.

---

### Composition vs aggregation

- **Composition** — The part doesn’t make sense without the whole (e.g. Engine is *part of* this Car). When the Car is gone, the Engine is too (in concept).
- **Aggregation** — The part can exist on its own (e.g. a Student can exist without a given Course). Weaker “has-a.”

Both are “has-a”; composition is the stronger form.

---

### In real code

Instead of \`new Engine()\` inside \`Car\`, you often **inject** the dependency (constructor or setter). That’s **dependency injection** — the same composition idea, but the part is given to you. It makes testing and swapping implementations easy.

---

**Takeaway:** Composition = “has-a” = fields that are other objects. Use it when the relationship isn’t “is-a.” It keeps design flexible and testable.`,

  'big-o-notation': `## Big O Notation: How “Fast” or “Heavy” Is This Code?

**In a nutshell:** **Big O** describes how time or memory grows when the **input size** (usually \`n\`) grows. We care about the **dominant** term and often the **worst case**. It doesn’t give you an exact number of operations, but it lets you compare algorithms and avoid obviously slow designs.

---

### Why it’s useful

You don’t need a stopwatch to guess that “loop over every element” grows with \`n\`, and “two nested loops over \`n\`” grows with \`n²\`. Big O makes that idea precise so you can say “this is O(n)” or “this is O(n²)” and compare.

---

### Common complexities (roughly from “best” to “worst”)

| Big O | Name | Example |
|-------|------|---------|
| O(1) | Constant | Get by index in array; hash lookup (average) |
| O(log n) | Logarithmic | Binary search on sorted data |
| O(n) | Linear | One loop over \`n\` elements |
| O(n log n) | Linearithmic | Good sorting (e.g. merge sort) |
| O(n²) | Quadratic | Two nested loops over \`n\` |
| O(2ⁿ) | Exponential | Naive recursive Fibonacci |

---

### In Java collections

- **ArrayList** — get by index: O(1). Search unsorted: O(n).
- **HashMap** — get/put: O(1) average. Worst case (bad hashing): O(n).
- **TreeMap** — get/put: O(log n).
- **Binary search** on a sorted list: O(log n).

---

### How we use it

- **Drop constants** — O(2n) → O(n).
- **Drop lower-order terms** — O(n² + n) → O(n²).
- **Worst case** — We often report the worst case so we don’t get surprised when inputs are bad.

---

**Takeaway:** Big O = how cost grows with input size. Use it to compare algorithms and choose the right data structure (e.g. HashMap vs list for lookups).`,

  'serialization': `## Serialization: Saving and Loading Objects as Bytes

**In a nutshell:** **Serialization** = turning an object into a stream of bytes (e.g. to save to disk or send over the network). **Deserialization** = turning those bytes back into an object. In Java you use \`Serializable\`, streams, and sometimes \`transient\` and \`serialVersionUID\` to get it right.

---

### Why it matters

You can’t just “write an object” to a file. You need a format. Java’s built-in serialization turns your object into bytes so you can write it with \`ObjectOutputStream\` and read it back with \`ObjectInputStream\`. Handy for caching, saving state, or sending objects over the wire (though for new systems, JSON or other formats are often preferred).

---

### Basics

- Your class **implements \`java.io.Serializable\`** (a marker interface — no methods).
- You write with **ObjectOutputStream**, read with **ObjectInputStream**.
- Fields marked **\`transient\`** are *not* serialized (e.g. passwords, caches, or things that aren’t \`Serializable\`).

\`\`\`java
public class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private transient String password;  // not saved
}
\`\`\`

---

### serialVersionUID

- The JVM uses a “version” of the class when reading bytes back. If you don’t declare \`serialVersionUID\`, the JVM generates one from the class layout. If you later add/remove/change fields, that number can change and old saved bytes may fail to deserialize (\`InvalidClassException\`).
- **Best practice:** Declare \`private static final long serialVersionUID = 1L;\` (or another number). When you make *incompatible* changes, bump the number so you don’t silently load wrong data.

---

### When to use what

- **transient** — For fields that shouldn’t be saved (sensitive data, recomputable caches, non-Serializable references).
- **Serializable** — For “plain” Java object persistence. For new code, consider JSON, Protocol Buffers, or other formats if you need portability or smaller size.

---

**Takeaway:** Serialization = object → bytes; deserialization = bytes → object. Use \`Serializable\`, \`transient\` for sensitive or non-serializable fields, and \`serialVersionUID\` for stable versioning.`
};

export function getLessonContent(slug) {
  return lessonContentBySlug[slug] ?? '';
}
