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

### Example Usage in TypeScript
```ts
const str: string = 'Hello, World!'; // Example string
const char: string = 'H'; // Example character 'A'
const byteValue: number = str.charCodeAt(0); // Example byte value representing ASCII 'H', which is 72
```

Differences between Unicode, UTF-8, UTF-16, GB2312, and GB18030:
