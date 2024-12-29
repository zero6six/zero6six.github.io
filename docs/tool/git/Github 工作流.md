## 一般修改

1. 在对 fork 的仓库进行修改时，首先去网页端对远端主分支进行 Sync fork。 ^88de6c
2. bash 内使用 `git checkout [<branch>]` 切换到本地主分支并使用 `git pull` 拉取远端主分支更改到本地主分支。
3. 使用 `git checkout -b my-feature` 将本地主分支复制一份到本地新创建的 my-feature 分支。
4. 正常使用 `git status/diff/add/commit` 命令。若在修改过程中需要和上游仓库同步看下一段。
5. 使用 `git push [-f] origin my-feature` 将本地 my-branch 分支更改推送到远端主分支。注意：使用过 `git rebase` 则需要加上 -f 参数。若所同步的分支是与他人共用时谨慎使用 -f 参数以免覆盖他人代码。
6. 提交 pull request。
7. 在 pull request 通过后在 Github 网页端删除远端 my-feature 分支并在本地使用 `git checkout [<branch>]` 与 `git branch -D my-feature`。以此切换到本地主分支并删除本地 my-feature 分支。
8. 把远程 PR 的结果同步到本地。
	- 使用 `git pull` 将远端主分支上自己的提交拉取到本地的主分支。
	- 若此时不想在远端 Sync fork 时可以使用`git remote prune origin`清理本地分支与远程分支。它会移除本地分支中已经不存在于远程仓库中的分支引用。

## 与上游仓库同步

1. 进行 [[Github 工作流#^88de6c|1.]] (在 my-feature 进行的 commit 不会被 pull 所覆盖)后使用 `git checkout [<branch>]` 切换到本地主分支并使用 `git pull` 将远端主分支更改同步到本地的主分支。
2. 使用 `git checkout my-feature` 并使用 `git rebase [<main branch>]`。以此切换到本地 my-feature 分支并在更新后的基础上进行改动。