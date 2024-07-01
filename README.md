# XMind Writing Test

Name 谢运明
Date 2024-07-01

## 1. What's the time complexity of the following code, and why?

```js
var a = 0;
for (var i = 0; i < N; i++) {
  for (var j = N; j > i; j--) {
    a = a + i + j;
  }
}
```

Answer:

Time Complexity: O(N^2)
Explanation:
The outer loop runs N times, and the inner loop runs N-i times. Therefore, the total number of iterations is N\*(N-1)+N = N^2-N+N = N^2-N.
Simplify: O(N^2)

## 2. Tell the differences between a byte, a character, and a string. Tell the differences between Unicode, UTF-8, UTF-16, GB2312, andGB18030.

Answer:

Byte is a fundamental unit of digital information, typically consisting of 8 bits.
Character represents a symbol that is usually associated with a written language, such as letters, digits, or symbols.

### Example in TypeScript

```ts
const str: string = "Hello, World!"; // Example string
const char: string = "H"; // Example character 'A'
const byteValue: number = str.charCodeAt(0); // Example byte value representing ASCII 'H', which is 72
```

Differences between Unicode, UTF-8, UTF-16, GB2312, and GB18030:
Unicode: Universal character encoding standard.
UTF-8: Variable-width encoding for Unicode, supports 1 to 4 bytes per character.
UTF-16: Another variable-width encoding for Unicode, uses 2 or 4 bytes per character.
GB2312: Chinese character encoding for simplified Chinese characters.
GB18030: Extended and modernized Chinese character encoding standard supporting both simplified and traditional Chinese characters, and many others.

## 3. What are the mobile and desktop operating systems you use everyday? What applications do you use frequently? Can you name a few of them and tell how they can be improved or have bugs fixed?

Answer:

The operating systems I commonly use are macOS, Ubuntu, and Windows 11, with macOS and Ubuntu being the ones I use the most. I use them almost every day. Some of the frequently used software includes VS Code, Chrome, WeChat, draw.io, Figma, and others.

With tools like Figma and draw.io that I use, which are professional design software, is it possible to combine them now with the rise of artificial intelligence to reduce complexity and usage difficulties for non-professionals?

## 4. What is the difference between Factory and Builder design patterns? What is the difference between Adapter and Decorator design patterns? Give an example for each above pattern.

Answer:
The Factory pattern and the Builder pattern both focus on object creation. However, the Factory pattern emphasizes the decoupling of object instantiation from the code that uses it, while the Builder pattern emphasizes the object's construction process.

The Adapter pattern and the Decorator pattern both concentrate on extending object functionality. However, the Adapter pattern primarily focuses on interface conversion, while the Decorator pattern primarily focuses on adding new functionality to objects.

### Examples:

- Factory Design Pattern

```ts
interface Element {
  render(): void;
}

class Text implements Element {
  render(): void {
    console.log("Rendering a Text");
  }
}

type ElementType = "text";

class ElementFactory {
  createElement(type: ElementType): Element {
    switch (type) {
      case "text":
        return new Text();
      default:
        throw new Error("Invalid element type.");
    }
  }
}

// Usage
const factory = new ElementFactory();
const textElement = factory.createElement("text");
textElement.render(); // Output: Rendering a Text
```

- Builder Design Pattern

```ts
// Product interface
interface Text {
  render(): void;
}

// Concrete product
class PlainText implements Text {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  render(): void {
    console.log(`Rendering plain text: ${this.content}`);
  }
}

// Builder class
class TextBuilder {
  private content: string;

  constructor() {
    this.content = "";
  }

  addText(text: string): TextBuilder {
    this.content += text;
    return this;
  }

  build(): Text {
    return new PlainText(this.content);
  }
}

// Client code
const textBuilder = new TextBuilder();
const text = textBuilder.addText("Hello, ").addText("Builder pattern!").build();

text.render();
// Output: Rendering plain text: Hello, Builder pattern!
```

- Adapter Design Pattern

```ts
Copy;
// Target interface
interface Text {
  render(): void;
}

// Adaptee class
class LegacyText {
  customRender(): void {
    console.log("Displaying legacy text.");
  }
}

// Adapter class
class TextAdapter implements Text {
  private legacyText: LegacyText;

  constructor(legacyText: LegacyText) {
    this.legacyText = legacyText;
  }

  render(): void {
    this.legacyText.customRender();
  }
}

// Client code
const legacyText = new LegacyText();
const text: Text = new TextAdapter(legacyText);
text.render();
// Output: Displaying legacy text.
```

- Decorator Design Pattern

```ts
interface Text {
  render(): void;
}

class SimpleText implements Text {
  render(): void {
    console.log("Rendering simple text");
  }
}

class TextDecorator implements Text {
  protected text: Text;

  constructor(text: Text) {
    this.text = text;
  }

  render(): void {
    this.text.render();
  }
}

class BoldTextDecorator extends TextDecorator {
  render(): void {
    console.log("Rendering bold text");
    super.render();
  }
}

class ItalicTextDecorator extends TextDecorator {
  render(): void {
    console.log("Rendering italic text");
    super.render();
  }
}

// Usage
const text: Text = new SimpleText();
const boldText: Text = new BoldTextDecorator(text);
const italicBoldText: Text = new ItalicTextDecorator(boldText);

text.render(); // Output: Rendering simple text
boldText.render(); // Output: Rendering bold text, Rendering simple text
italicBoldText.render(); // Output: Rendering italic text, Rendering bold text, Rendering simple text
```

## 5. What computer languages do you master? What're the pros and cons of each of them?

Answer:

I am proficient in JavaScript and TypeScript, and I also know some other programming languages such as Python, Golang, and C++. I believe each language has significant advantages in its respective development domain, with large user and community bases.

For example, TypeScript excels with its type checking and excellent support for large-scale projects, which enhances maintainability. However, it requires additional compilation steps and specific tooling like ts-lint and ts-node.

On the other hand, C++ is a great programming language known for its high performance, cross-platform capability, and rich history. Its downsides include complexity, high learning curve, and lack of unified package management solutions.

## 6. Explain the differences between mutable and immutable objects.

Answer:

Immutable objects are objects whose state cannot be changed once created. Mutable objects are objects that can be modified after creation.
Immutable objects are generally used in performance-critical scenarios, such as in rich text editors like Slate.js. They provide better stability for data management.

- Mutable Object In Example

```js
// Mutable object with getter and setter methods
let mutableObject = {
  _fontSize: 12,
  _content: "hello",

  // Getter method for fontSize
  get fontSize() {
    return this._fontSize;
  },

  // Setter method for fontSize
  set fontSize(newSize) {
    this._fontSize = newSize;
  },

  // Getter method for content
  get content() {
    return this._content;
  },

  // Setter method for content
  set content(newContent) {
    this._content = newContent;
  },
};

// Accessing and modifying mutable object properties using getters and setters
console.log(mutableObject.fontSize); // Output: 12
console.log(mutableObject.content); // Output: 'hello'

mutableObject.fontSize = 16;
mutableObject.content = "world";

console.log(mutableObject.fontSize); // Output: 16
console.log(mutableObject.content); // Output: 'world'
```

- Immutable Object In Example

```js
// Immutable object with getter methods (no setter methods)
const immutableObject = {
  _fontSize: 12,
  _content: "hello",

  // Getter method for fontSize
  get fontSize() {
    return this._fontSize;
  },

  // Getter method for content
  get content() {
    return this._content;
  },
};

// Accessing immutable object properties using getters
console.log(immutableObject.fontSize); // Output: 12
console.log(immutableObject.content); // Output: 'hello'

// Attempting to change properties (which should not be possible in a truly immutable object)
// immutableObject.fontSize = 16; // This would not change the value in a truly immutable object
// immutableObject.content = 'world'; // This would not change the value in a truly immutable object

console.log(immutableObject.fontSize); // Output: 12
console.log(immutableObject.content); // Output: 'hello'
```

## 7. Use JavaScript to implement the 'reactive' and 'computed' functions so that the following code works as expected.

```js
const node = reactive({ leftChildren: 1,
// rightChildren: 0
})
console.log(node.leftChildren, node.rightChildren) // 1 undefined
const children = computed(() => node.leftChildren + (parseInt(node.rightChildren) || 0))
console.log(children.value) // 1
node.leftChildren = 10 console.log(children.value) // 10
node.rightChildren = 2 console.log(children.value) // 12
```

Answer:

```js
function reactive(obj) {
  const handlers = {
    set(target, prop, value) {
      target[prop] = value;
      // Indicate success
      return true;
    }
  }
  return new Proxy(obj, handlers)
}

// Helper function to create computed properties
function computed(fn) {
  const dummyObj = { value: undefined }
  const getter = () => {
    dummyObj.value = fn()
    return dummyObj
  }

  const proxy = new Proxy(dummyObj, {
    get(target, prop) {
      if (prop === 'value') {
        return getter().value
      }
      return Reflect.get(target, prop)
    }
  })
  return proxy
}

const originNode = { leftChildren: 1 }
// Example usage
const node = reactive(originNode)

console.log(node.leftChildren, node.rightChildren) // 1 undefined

const children = computed(() => node.leftChildren + (parseInt(node.rightChildren) || 0))

console.log(children.value) // 1

node.leftChildren = 10
console.log(children.value) // 10

node.rightChildren = 2
console.log(children.value) // 12
```

## 8. Given a number of rectangles defined by their width, height, and location (x, y) of their top-left corners, how can we insert a new rectangle(with a fixed size) as close as possible to a desired target location, without making it intersect with any existing rectangles?

Answer:

```ts
// TODO
```