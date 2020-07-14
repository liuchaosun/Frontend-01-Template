// 生成组件的组织函数--解析组件类型，根据不同的类型创建不同的组件实例
function creatComponent(Cls, attributes, ...children) {
  let o = null;

  // @1 声明创建组件
  if (typeof Cls === 'string') {// 组件名小写的时候
    o = new Wrapper(Cls);
  } else {// 组件名大写的时候
    o = new Cls({
      timer: {}
    });
  }

  // @2 收集 attributes
  for (let name in attributes) {
    // o[name] = attributes[name];// 这种情况下，attributes 和 props 相同
    o.setAttribute(name, attributes[name]);// 使用此方式，这里响应的都是 attributes
  }

  // @3 收集子组件，文本节点是作为子组件传入的
  for (let child of children) {
    if (typeof child === "string") {
      child = new Text(child);
    }

    o.appendChild(child);
  }

  return o;
}

/**********************文字基类*************************/
class Text {
  constructor(text) {
    this.children = [];
    this.textNode = document.createTextNode(text); // 创建一个文本节点
  }
  mountTo(parent) {
    parent.appendChild(this.textNode);
  }
}
/**********************文字基类*************************/


/**********************原生html标签基类*******************/
// 解决组件名是小写的时候的效果： 在 jsx 中认为小写的都是原生的 html 标签
class Wrapper {
  constructor(type) {
    // 收集子组件，当调用 mountTo 时才将子组件挂载到父组件上
    this.children = [];
    this.wrapperNode = document.createElement(type);
  }
  /**
   * get set 关键字直接作用于对象，修改值触发对于的 set,获取值对应 get
   */
  set cls(v) { // property
    console.log("Parent::class", v);
  }

  // 设置 attribute
  setAttribute(name, attr) {
    this.wrapperNode.setAttribute(name, attr)
  }
  // 获取 attribute
  getAttribute(name) {
    return this.wrapperNode.getAttribute(name);
  }

  // 收集子组件
  appendChild(child) {
    this.children.push(child);
  }

  // 生命周期函数--挂载函数
  mountTo(parent) {
    parent.appendChild(this.wrapperNode);
    for (let child of this.children) {
      child.mountTo(this.wrapperNode)
    }
  }
}
/**********************原生html标签基类*******************/

// 一个组件基类
class MyComponent {

  constructor(config) {
    // 收集子组件，当调用 mountTo 时才将子组件挂载到父组件上
    this.children = [];
    this.root = document.createElement('div');
  }
  /**
   * get set 关键字直接作用于对象，修改值触发对于的 set,获取值对应 get
   */
  set cls(v) { // property
    console.log("Parent::class", v);
  }
  // 设置 attribute
  setAttribute(name, attr) {
    this.root.setAttribute(name, attr)
  }
  // 获取 attribute
  getAttribute(name) {
    return this.root.getAttribute(name);
  }
  // 收集子组件
  appendChild(child) {
    this.children.push(child);
  }
  // 生命周期函数--挂载函数
  mountTo(parent) {
    // 初阶是绑定到根节点
    // parent.appendChild(this.root);
    // for (let child of this.children) {
    //   child.mountTo(this.root)
    // }

    // 根节点中的部分内容是我这个组件本身具有的，而内部的子组件是外部传入的  传入的内容都放到 slot 中去
    this.slot = this.root;
    for (let child of this.children) {
      this.slot.appendChild(child); // 注意这里挂载到 slot 
    }

    this.render().mountTo(parent);// 执行 render 后得到的都是 Wrapper组件
  }

  render() {
    return (
      <article>
        <header>我是头部</header>
        {
          this.slot
        }
        <footer>我是尾部</footer>
      </article>
    );
  }
}



// 编译前代码
// let component = <Div id="a" cls="b" style="width:100px;height:100px;background: lightblue;">
//   <div>111</div>
//   <Div>123</Div>
//   <Div>{new Wrapper('span')}</Div>
// </Div>;
// component.cls = "c"
// console.log(component.getAttribute('id'));
/** 
 * 编译后代码
 * var component = creatComponent(Parent,
  {
    id: "a",
    cls: "b"
  },
  creatComponent(Child, null),
  creatComponent(Child, null),
  creatComponent(Child, null)
);
通过编译后的代码发现 从第三个参数开始重复出现多个子组件,所以 creatComponent 需要接收Child
 * 
 */


let component = (
  <MyComponent >
    <div style="width:100px;height:100px;background: lightblue;">abc</div>
    {new Wrapper('span')}
    wenz
  </MyComponent>
);
/** 编译后
 * var component = creatComponent(
 *    MyComponent, 
 *    null, 
 *    creatComponent(
 *        "div", {style: "width:100px;height:100px;background: lightblue;"},"abc"
 *    ), 
 *    new Wrapper('span'), 
 *    "wenz"
 * );
 */

// 挂载到 body 节点下
component.mountTo(document.body);