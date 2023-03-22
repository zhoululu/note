# 基本使用

## git push后撤回

* 在执行git push的分支执行git log命令，查看git记录
  
  ![](/git-push-commit-log.png)

* 比如当前指向 f7061a9，想要恢复到3e85ca54，执行git reset --soft 3e85ca54

* 执行 git push origin 分支名 --force

