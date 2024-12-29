## 网页地址

[git 速查手册](https://www.bookstack.cn/books/learngit-basic)

## 文件更改

使用`git reset --soft HEAD [文件名]`来取消 add 状态。

## 版本回退

1. 使用`git reset --soft HEAD^`回退到上一个 commit，保留工作目录内所有文件。
2. 使用`git push -f origin <branch-name>`强制推送更改来版本回退。

## 修改提交信息

执行`git commit --amend`命令。

## 远程仓库