
https://www.runoob.com/jsref/jsref-obj-string.html

### 基本内容

#### 字符串重复

```js
> "a"*3
NaN
> "a".repeat(3)
'aaa'
```

### 属性

#### length 属性

length 属性返回字符串的长度(字符数)。

### 方法

#### [字符串补全](https://www.runoob.com/w3cnote/es6-string.html)

```js
console.log("h".padStart(5,"o"));  // "ooooh"
console.log("h".padEnd(5,"o"));    // "hoooo"
console.log("h".padStart(5));      // "    h"
```

#### concat 方法

```javascript
var str1 = "Hello ";
var str2 = "world!";
var n = str1.concat(str2);
// Hello world!
```

concat() 方法用于连接两个或多个字符串。

该方法没有改变原有字符串，但是会返回连接两个或多个字符串新字符串。

~~直接用加号连接不就行了？用 concat 是真把 js 当 C 了？~~

#### split 方法

```js
var str="How are you doing today?";  
var n=str.split(" ");
// ["How","are","you","doing","today?"]
```

split() 方法用于把一个字符串分割成字符串数组。

**提示：** 如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割。

**注意：** split() 方法不改变原始字符串。

#### trim 方法

trim() 方法用于删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。

trim() 方法不会改变原始字符串。