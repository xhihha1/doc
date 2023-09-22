# Vite 直接修改 node_modules 下的插件  

Vite專案在 `npm run dev` 時，一直讀到舊的 module。

## 原因：  

vite会将预构建的依赖，缓存到 node.modules/.vite下，只有以下文件发生改变，才会重新构建依赖：  
`package.json` 中的 dependencies 列表  
包管理器的 lockfile，例如 `package-lock.json`, `yarn.lock`，或者 `pnpm-lock.yaml`  
可能在 `vite.config.js` 相关字段中配置过的  

如果出于某些原因，你想要强制 Vite 重新构建依赖，你可以用 --force 命令行选项启动开发服务器，或者`手动删除 node_modules/.vite `目录.  
