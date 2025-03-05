
[Math 对象](Math%20对象.md)

### 方法

#### toFixed

把数字转换为字符串，结果的小数点后有指定位数的数字（四舍六入，五看情况）：

```js
var num = 5.56789;  
var n=num.toFixed(2);
// 5.57
```

若需要标准的四舍五入，我们可以用可以四舍五入至整数的 [round](Math%20对象.md#round) 方法来自己实现。

```js
function myToFixed(num, digits) {
    // 这样子返回的是 Number
    const factor = Math.pow(10, digits);
    return Math.round(num * factor) / factor;
    // 若需要补 0，自行再用一遍 toFixed，用完是 String
}

let num = 3.14159;
console.log(myToFixed(num, 2)); // 输出: 3.14
console.log(myToFixed(num, 3)); // 输出: 3.142
```

#### toString

把数字转换为字符串，没啥可说的。