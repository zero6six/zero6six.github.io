
### 设置

```python
btn = tk.Button(text="Click me", bg="white")
btn.pack()
```

### 调整信息

```python
btn.config(bg='skyblue', width=10, height=5) # 此处宽x高类似网格分布而非像素
```

### 设置图片

![[image#^bcacdb]]

```python
btn.config(image=img)
```

### 函数调用

```python
def say_hi():
    print("Hello World")
btn.config(command=say_hi)
```