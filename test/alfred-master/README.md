# @liangshen/alfred

Creat, Develop and Publish Alfred workflows

## Usage

### 创建新项目（如果已有忽略）
```
mkdir test
cd test
npm init -y
```

此时package.json 的name也就是项目名为test

### Install 
```
npm install @liangshen/alfred --save
```
1.初始化: 会读取package.json 中的name、author、description、keywords等字段来生成info.plist文件初始化alfred的工作流(如果存在info.plist文件则不初始化)
2.会为项目创建软链到alfred workflow目录下（主要用于发布前的开发调试阶段）

### 添加入口文件

```
touch index.js
```
 
index.js
```typescript
import alfred from '@liangshen/alfred'

const items = [{arg: 'test', title: '测试', subtitle: '11111'}]
alfred.output({items});
```

### 测试

打开alfred窗口输入 test 会出现output中的iterms 测试成功

### Public Alfred Workflow

工作流测试完成后可发布到npm
```
npm publish --access public
```

当工作流被全局下载时同样会自动创建软到alfred workflow目录下 工作流开箱即用

```
npm install -g xxxxxx
```

### Uninstall

会自动清除创建的软链

```
npm uninstall @liangshen/alfred
```

## Related

* [@liangshen/alfred-intellij-idea](https://github.com/liangshen001/alfred-intellij-idea) - Alfred Workflow For IDEA
* [@liangshen/alfred-webstorm](https://github.com/liangshen001/alfred-webstorm) - Alfred Workflow For WebStorm
* [@liangshen/alfred-datagrip](https://github.com/liangshen001/alfred-datagrip) - Alfred Workflow For DataGrip
* [@liangshen/alfred--pycharm](https://github.com/liangshen001/alfred--pycharm) - Alfred Workflow For Pycharm
* [@liangshen/alfred-ip](https://github.com/liangshen001/alfred-ip) - Search Public IP or Local IP
* [@liangshen/alfred-youdao](https://github.com/liangshen001/alfred-youdao) - Use Youdao Dictionary for translation
* [@liangshen/alfred-tunnelblick](https://github.com/liangshen001/alfred-tunnelblick) - Alfred Workflow For Tunnelblick
* [@liangshen/alfred-jenkins](https://github.com/liangshen001/alfred-jenkins) - Alfred Workflow For Jenkins
* [@liangshen/alfred-items](https://github.com/liangshen001/alfred-items) - Alfred Workflow For ITems2
* [@liangshen/alfred-npms](https://github.com/liangshen001/alfred-npms) - Alfred Workflow For Npms
* [@liangshen/alfred-md5](https://github.com/liangshen001/alfred-md5) - Alfred Workflow For MD5


