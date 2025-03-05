
#### [数据存储](https://nonebot.dev/docs/next/best-practice/data-storing)

数据存储来自插件 `nonebot-plugin-localstore`，我们可以通过 `source .venv/bin/activate` 激活虚拟环境之后 `pip list` 来查看装了的插件，稍后可以通过 `deactivate` 退出。

使用 `nb localstore` 查看数据存储路径。

### 杂项

#### 1. 安装带有 [] 的插件时报错

我在使用 `nb plugin install nonebot-plugin-deepseek[image]` 时报错找不到这个东西，后续发现 [] 能在 pip 中使用，而 nb 不支持。