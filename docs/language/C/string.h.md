
[参考网站](https://en.cppreference.com/w/c/string)

### [strtok](https://www.runoob.com/cprogramming/c-function-strtok.html)

strtok 可以用指定分割符分割字符串

### strcmp

以 ASCII 值逐位比较俩字符串哪个大并返回 -1，0 或 1。

### [strcspn](https://www.runoob.com/cprogramming/c-function-strcspn.html)

C 库函数 **size_t strcspn(const char *str1, const char *str2)** 检索字符串 **str1** 开头连续有几个字符都不含字符串 **str2** 中的字符。

```c
a[strcspn(a, "\n")]='\0'; // 将 a 字符串末尾的 \n 去掉
```