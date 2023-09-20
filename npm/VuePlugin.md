# 在 npm 建立 vue plugin  

## 创建插件项目：  

    mkdir my-vue-plugin
    cd my-vue-plugin
    npm init

## 编写插件代码：  

    my-vue-plugin/
    ├── src/
    │   ├── index.js      // 插件主文件
    │   ├── MyComponent.vue // 你的 Vue 组件
    ├── package.json

## 编写 package.json：  

    {
    "name": "my-vue-plugin",
    "version": "1.0.0",
    "description": "My Vue 3 Plugin",
    "main": "src/index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": ["vue", "plugin"],
    "author": "Your Name",
    "license": "MIT",
    "peerDependencies": {
        "vue": "^3.0.0"
    }
    }

确保在 peerDependencies 中列出了 Vue 3 作为你的插件的对等依赖。  

## 发布到 npm：

在 npm 上注册一个账户，如果没有的话。然后使用 npm login 命令登录到你的账户。

接下来，使用 npm publish 命令将你的插件发布到 npm。

    npm publish

## 使用插件：

    npm install my-vue-plugin

主程式引入:  

    import { createApp } from 'vue';
    import MyPlugin from 'my-vue-plugin';

    const app = createApp(App);
    app.use(MyPlugin);

应用中使用 

    <my-component></my-component> 

标签来包含你的组件

# 組件代碼  

## 組件 index.js

單一組件  

    import MyComponent from './MyComponent.vue';

    const MyPlugin = {
    install(app) {
        app.component('my-component', MyComponent);
    },
    };

    export default MyPlugin;

多個組件  

    import MyComponent1 from './MyComponent1.vue';
    import MyComponent2 from './MyComponent2.vue';

    const MyPlugin = {
    install(app) {
        app.component('my-component-1', MyComponent1);
        app.component('my-component-2', MyComponent2);
    },
    };

    export default MyPlugin;

## 組件 vue檔(MyComponent.vue)  

    <template>
    <div>
        <h1>{{ message }}</h1>
        <button @click="changeMessage">Change Message</button>
    </div>
    </template>

    <script>
    export default {
    data() {
        return {
        message: 'Hello from MyComponent!',
        };
    },
    methods: {
        changeMessage() {
        this.message = 'Message changed!';
        },
    },
    };
    </script>