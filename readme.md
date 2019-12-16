# 无人机大赛裁判机

## 环境安装与部署

请确保您的电脑上安装了`Node.js > 12`,`yarnpkg > 1.17`,`ros`开发环境

1. `clone`本代码库与任意目录下，执行`deploy.sh`
2. 执行`roscore`
3. 执行`run.sh`

## 添加队伍

浏览器访问`[host:port]/api/gen/$groupid/$groupname`，待返回`success`即可，支持中文

## 清空队伍

删除 `newback`下`database`文件夹即可
