// import { defineConfig } from "rollup";
// import alias from "@rollup/plugin-alias";
// import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import externals from "rollup-plugin-node-externals";
import commonjs from "@rollup/plugin-commonjs";
// import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import babel, { getBabelOutputPlugin } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";
import dts from "rollup-plugin-dts";
import path from "node:path";
import nodePolyfills from "rollup-plugin-node-polyfills";

export default {
  // 需要处理的资源路径 打包入口文件
  input: "./src/index.ts",
  // 打包成指定格式的配置选项
  // dir: 输出目录
  // format: 输出指定格式，常用有 'es' | 'cjs' | 'umd' | 'iife'
  // exports: 导出模式, 常用 'named' | 'auto' | 'default'
  // hoistTransitiveImports: 是否允许空导入，默认允许。例 import 'vue' or require('vue')
  // entryFileNames: 打包入口文件命名，例：'[name][hash].cjs',
  // chunkFileNames: 公共块文件命名，例：'[name]-[hash].cjs',
  // manualChunks: 自定义共享公共块，例：将 node_modules 中资源都打包到 vendor 中
  // sourcemap: 是否启用 sourcemap
  // paths: 将外部模块ID映射到路径，例：转换成来自于CDN的外部路径

  output: {
    file: "./dist/bundle.js",
    format: "es",
  },
  // 使用 Rollup 插件
  plugins: [
    // 将 CommonJS 模块转换为 ESM，以便 Rollup 解析处
    commonjs(),
    // 解析在 node_modules 中的第三方模块
    resolve(),
    // 路径别名映射
    // alias({
    //   entries: [
    //     {
    //       find: "@",
    //       replacement: new URL("./src", import.meta.url).pathname,
    //     },
    //   ],
    // }),

    // 替换文件中目标字符串，例: process.env.NODE_ENV 情况
    // replace({
    //   preventAssignment: true,
    //   "process.env.NODE_ENV": JSON.stringify("development"),
    // }),

    // nodePolyfills(),
    // 构建中处理 JSON 文件
    // json(),

    // 将 typescript 解析 javascript, 常与 tsconfig.json 配合使用
    typescript({
      sourceMap: false,
    }),
    // babel 插件，常通过 babel.config.js 配置启用 presets 或 plugin
    babel({ babelHelpers: "bundled" }),
    // 拷贝文件资源至指定文件夹
    copy({
      targets: [
        // {
        //   dest: ["dist"],
        //   src: ["src/assets/*", "!src/assets/*.ts"],
        //   rename: (name, ext) => `assets/${name}.${ext}`,
        // },
        {
          dest: ["dist"],
          src: ["assets/*", "!assets/*.ts"],
        },
        {
          dest: "dist",
          src: "package.json",
          transform: (contents, filename) => {
            let json = JSON.parse(contents.toString());

            return JSON.stringify({
              name: json["name"],
              version: json["version"],
              description: json["description"],
              type: json["type"],
              keywords: json["keywords"],
              license: json["license"],
            });
          },
        },
      ],
      expandDirectories: false,
    }),

    // 压缩源码插件
    terser(),
    // 汇总生成声明文件，即 .d.ts 文件
    // dts(),
    // externals({
    //   devDeps: false, //// devDependencies 类型的依赖就不用加到 externals 了,
    // }),
  ],
  // 需要排除打包的一些插件
  // external: [],
};
