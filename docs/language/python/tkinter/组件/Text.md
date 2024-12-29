https://www.tutorialspoint.com/python/tk_text.htm

用于多行文本的输入框

```python
text.delete(1.0, tk.END)               # 清空文本 entry 用 0，text 用 1.0
text.insert(tk.END, "Hello, World!\n") # 添加 Hello World
content = text.get("1.0", tk.END)      # 获得文本
```

`"1.0"`表示第一行的第一个字符，`tk.END`表示文本的末尾。