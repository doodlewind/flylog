<head>
    <title>FlyLog - Doc</title>
</head>
<nav>
    <div class="title">FlyLog</div>
    <div class="nav-item" onclick="window.open('/')">Admin</div>
    <div class="nav-item active">Doc</div>
</nav>
<style>
* {
    box-sizing: border-box;
}
@font-face {
    font-family: "AgencyFB";
    src: url("font/AgencyFB.woff") format("woff");
}
h1, h2, h3, h4 {
    color: #355A9F;
}
nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    z-index: 10;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    background-color: #355A9F;
}
.title, .nav-item {
    font-size: 20px;
    font-family: "AgencyFB", sans-serif;;
    font-weight: normal;
    color: #FEFEFE;
}
.title {
    position: fixed;
    top: 10px;
    left: 20px;
}
.nav-item {
    width: 60px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    vertical-align: middle;
    cursor: pointer;
}
.nav-item.active {
    border-bottom: 4px #FEFEFE solid;
}
</style>


# FlyLog
前端 AOP 跨屏日志及性能分析工具。

* 实时推送页面调试及报错日志
* 记录页面加载性能信息
* 提供面向切面风格的 API，可无侵入地为页面添加调试等信息


## Demo
打开 <a href="/" target="_blank">FlyLog Admin</a> 即可查看引入 FlyLog 后本页面实时的调试和报错信息。刷新本页即可查看页面加载速度。控制台的原始输出不受影响。可点击下方按钮触发日志和报错事件：

<button onclick="console.log(1)">console.log(1)</button>
<button onclick="console.log(2)">console.log(2)</button>
<button onclick="console.log('foo', 2, 3)">console.log('foo', 2, 3)</button>
<button onclick="refErr()">Ref Error</button>
<button onclick="typeErr()">Type Error</button>
<button onclick="syntaxErr(">Syntax Error</button>

<script src="js/demo-1.js"></script>
<script src="js/demo-2.js"></script>
<script crossorigin id="fly-echo" src="/flyEcho.min.js"></script>

在 iOS 和 Android 设备上打开本页，触发的调试信息均可推送到 Admin 后台。引入 FlyLog 的页面同时被多人访问时，所有页面触发的消息都会广播到每个 Admin 后台上。跨域不影响 FlyLog 的数据上报。


## 安装
安装 [Node.js](https://nodejs.org/) 后，执行以下命令即可：

``` text
npm install -g flylog
```

## 使用
启动 flylog 服务端（默认监听 3000 端口，支持 `flylog 2333` 更改端口号）后

``` text
flylog
```

在所需调试的页面尾部引入如下脚本即可，端口号和地址需替换为实际值，注意脚本需由 flylog 服务器所在位置引入，保存脚本到本地后导入脚本是无法正确上报数据的：

``` html
<script crossorigin id="fly-echo" src="http://localhost:3000/flyEcho.min.js"></script>
```


## API
FlyLog 提供的 `before` 和 `after` API 可在不修改原有代码的前提下，为函数添加调试等功能。

### before
`before` 可将自定义代码 Hook 到函数执行前执行：

``` js
// 原有代码
function foo(x) {
    console.log(x);
}

// 挂载 before 事件
foo = foo.before(function(x) {
    console.log(x + 1);
});

// 在点击等事件触发 foo 时先执行 before 再执行 foo
foo(1); // 2 1
```

若要阻止原函数执行，在注入的匿名函数内返回 `false` 即可：

``` js
// 对象方法同样可 Hook
var foo = {
    bar: function(x) {
        console.log(x);
    }
}

foo.bar = foo.bar.before(function(x) {
    console.log(x + 1);
    // 可在调试时按需阻止原函数执行
    if (x == 1) {
        return false;
    }
});

foo.bar(1); // 2
foo.bar(2); // 3 2
```

### after
`after` 可将自定义代码 Hook 到函数执行完成后执行：

``` js
window.onload = (window.onload || function() {}).after(function() {
    alert(1);
});
```

`flyEcho.js` 中即应用了上例以实现在 `window.onload` 加载完成后上报性能数据。类似地，原函数返回 `false` 时可阻断 `after` 执行。


## 架构
FlyLog 分为三个独立的模块：

* `flyEcho.js` 供待调试页面引入的 AOP 模块，无第三方依赖
* `flyHub.js` 无状态的 Node.js WebSocket 服务端，允许跨域并提供基础的静态文件服务
* `flyAdmin.js` 后台界面，基于 vue.js 组件开发，Gulp + Webpack 打包


## 开发
构建开发版本（构建前需清空 `dist` 目录）：

``` text
gulp build-dev
```

构建生产版本：

``` text
gulp build
```


## Changelog
* `1.0.1` 修复 bundle 问题
* `1.0.0` 初始版本


## 许可
MIT
