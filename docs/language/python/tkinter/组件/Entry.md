
输入框

### 设置

```python
en = tk.Entry()
en.pack()
```

### 文本编辑

```python
entry_widget.insert(tk.END, "插入的文本")
entry_widget.delete(0, tk.END) # 清空文本 entry 用 0，text 用 1.0
en.get() # 读取文本
```

### Entry 与 lable, button 联动

Entry 也有 bg 和 fg 的设置。

![[Label#设置]]