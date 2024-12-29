在Tkinter中，可以通过创建Frame控件来创建子容器。Frame是一个容器控件，用于组织其他控件的布局，可以包含其他控件或者甚至是其他Frame控件。下面是如何在Tkinter中创建一个简单的子容器（Frame）的例子：

```python
import tkinter as tk

# 创建主窗口
root = tk.Tk()
root.title("主窗口")

# 创建一个Frame作为子容器
frame = tk.Frame(root, bg='lightgray', bd=2, relief=tk.SUNKEN)
frame.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)

# 在Frame中添加一个标签
label = tk.Label(frame, text="这是一个标签")
label.pack(pady=10)

# 在Frame中添加一个按钮
button = tk.Button(frame, text="这是一个按钮")
button.pack(pady=10)

# 运行主循环
root.mainloop()
```

在这个例子中，我们首先导入了Tkinter模块，并创建了一个主窗口（root）。然后，我们创建了一个Frame控件，将其背景色设置为浅灰色，边框宽度为2，边框样式为SUNKEN（凹陷效果），并将其添加到主窗口中。我们通过pack方法设置了Frame的布局，使其填充整个可用空间。

接着，我们在Frame子容器中添加了一个标签（Label）和一个按钮（Button），并通过pack方法设置了它们的布局。

当运行这段代码时，你会看到一个包含标签和按钮的子容器（Frame），它位于主窗口中。你可以在这个子容器中添加更多的控件，或者创建更多的子容器来组织你的界面。

### 关于 Frame.config(width, height) 和 Frame.place(height,width)

总结一下两者之间的区别：

- 当你在创建 `Frame` 时指定 `width` 和 `height`，这些值定义了 `Frame` 的初始尺寸。如果后续没有使用布局管理器（如 `pack`、`grid` 或 `place`）来改变尺寸，那么 `Frame` 将使用这些初始尺寸。
- 当你使用 `place()` 方法并指定 `width` 和 `height` 时，这些值将覆盖在创建 `Frame` 时指定的尺寸（如果有的话），并且定义了 `Frame` 在布局中的最终尺寸。

需要注意的是，当使用 `pack` 或 `grid` 布局管理器时，`Frame` 的尺寸可能会根据其内容和布局选项而改变，而 `place` 布局管理器允许你精确控制控件的位置和大小。