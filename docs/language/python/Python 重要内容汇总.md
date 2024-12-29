### 切片相关  

- 列表、字符串的下标从 0 开始。
- 使用`[x:y]`对列表进行切片操作时，包含下标为`x`的元素，不包含下标为`y`的元素。
### 编码规范

- 每个`import`语句只导入一个模块。
- 不要在行尾添加分号，不要用分号将两条命令放在同一行。
- 缩进，用 4 个空格，不要用制表符。
- 每行不超过 80 个字符，若超过建议用 “()” 把多行内容隐式地连接起来。
- 使用必要的空格增加句子的可读性。一般在顶级定义（例如函数或者类的定义）之间空两行，方法定义之间空一行。另外，在用于分割某些功能的位置也可以空一行。
- 用空行分隔函数和类，及函数内较大的代码块。
- 通常情况，运算符两侧、函数参数之间、“,” 右侧建议使用空格分割。
- 避免在循环中使用`+`和`+=`操作累加字符串。这样会创建不必要的临时对象。应将字符串加入列表后使用`join()`方式连接列表。
- 最好把注释放到单独一行。
- 使用文档字符串。

### 命名规范
  
- 类和函数的命名要一致；按惯例，命名类用 `UpperCamelCase`，命名函数与方法用 `lowercase_with_underscores`。命名方法中第一个参数总是用 `self`。

  ~~买的书上这一节还用的是`java`的命名规范，麻烦编辑长点心~~。

- 编写用于国际多语环境的代码时，不要用生僻的编码。Python 默认的 UTF-8 或纯 ASCII 可以胜任各种情况。
- 同理，就算多语阅读、维护代码的可能再小，也不要在标识符中使用非 ASCII 字符。

### 版权相关

该编码规范有部分内容来自[`Python`官方文档](https://docs.python.org/zh-cn/3/tutorial/controlflow.html#intermezzo-coding-style)。版权由相关人员或组织所有。

### 速查  

[`Python`官方教程|7.2. 读写文件](https://docs.python.org/zh-cn/3/tutorial/inputoutput.html#reading-and-writing-files)

[`str`对象的方法](https://docs.python.org/zh-cn/3/library/stdtypes.html#text-sequence-type-str)

[文件对象截断一部分内容](https://www.runoob.com/python/file-truncate.html)