// 预设规则
const presets = [
  [
    "@babel/preset-env"
  ]
];

// 插件
const plugins = [
  // 支持 jsx 语法糖的插件
  [
    "@babel/plugin-transform-react-jsx",
    {
      // jsx 默认使用的是 React 的方法，通过 pragma 改为自己指定的函数
      pragma: 'creatComponent'
    }
  ]
];

module.exports = {
  presets,
  plugins
}