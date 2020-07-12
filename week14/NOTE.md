# 十四周学习总结--组件化

前端发展到现在，组合化变为一个十分热门的话题，那么组件化到底是什么呢？

## 组件化基础

state
children

component user's markup code

1. attribute

component user's js code

1. method
2. property
3. event

### attribute

attribute vs property

1. Attribute 强调描述性
2. Property 强调从属关系

### 如何设计组件状态

[示意图](./component-design.png)

一个组件的基本机构是

``` javascript

class MyComponent {
  constructor(config){
    // state
    this.state = {
      i: 1
    }
  }

  // property
  get prop1(){
  }
  set prop1(){
  }

  // attribute
  getAttribute(attr){
  }
  setAttribute(attr, value){
  }
}


// property
MyComponent.prop1 = 33;
// attribute
<MyComponent attr1="33" />;

```

创建组件的方式基本上都是声明式， 如

let a = <MyComponent attr1="33" />

通过 new 关键字创建组件的方式使用的较少

let a = new MyComponent({
  attr1: 1
})

通过 new 创建时，传入的参数作用到组件的构造函数的 config 中，使用声明式创建的方式基本不会用到config

### 生命周期 lifecycle

[常见的生命周期](./lifecycle.png)

### 轮播组件 Carousel

组件设计：

state
    activeIndex

property
    loop time imglist autoplay color forward

attribute
    startIndex loop time imglist autoplay color forward

children
    与 imglist 二选一，使用 children 一般作为 CarouselView 组件实现

event
    change click hover swipe  resize

method
    next() prev() goto() play() stop()

config
    mode: "useRAF", "useTimeout"

## 组件化 实现 jsx

