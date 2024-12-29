网格的索引先列再行，从 0 开始。

![[Pasted image 20231230223726.png]]

每个格子的大小受到所在位置元件的行间距与列间距共同影响。

### 设置

```python
obj.grid(row=0, column=0) # 设置组件占 (0,0) 格
obj.grid(rowspan=2)       # 设置组件竖跨 2 格（包括刚开始设置的那格）
obj.grid(columnspan=2)
```
