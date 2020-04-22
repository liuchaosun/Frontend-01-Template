# 第二周学习总结

以下是部分来自于训练营的学习笔记：

- 乔姆斯基谱系：是计算机科学中刻画形式文法表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1956 年提出的。它包括四个层次：

  - 0- 型文法（无限制文法或短语结构文法）包括所有的文法。
  - 1- 型文法（上下文相关文法）生成上下文相关语言。
  - 2- 型文法（上下文无关文法）生成上下文无关语言。
  - 3- 型文法（正规文法）生成正则语言。

- Brainfuck ：一种极小化的程序语言，它是由 Urban Müller 在 1993 年创造的。由于 fuck 在英语中是脏话，这种语言有时被称为 Brainfck 或 Brainf\*\*，或被简称为 BF。
- 巴科斯诺尔范式：即巴科斯范式（英语：Backus Normal Form，缩写为 BNF）是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。它是由约翰·巴科斯（John Backus）和彼得·诺尔（Peter Naur）首先引入的用来描述计算机语言语法的符号集。
- 图灵机（Turing machine）：又称确定型图灵机，是英国数学家艾伦·图灵于 1936 年提出的一种将人的计算行为抽象掉的数学逻辑机，其更抽象的意义为一种计算模型，可以看作等价于任何有限逻辑数学过程的终极强大逻辑机器。
- 图灵完备性：在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。这个词源于引入图灵机概念的数学家艾伦·图灵。虽然图灵机会受到储存能力的物理限制，图灵完全性通常指“具有无限存储能力的通用物理机器或编程语言”。
  Bjarne Stroustrup（比雅尼·斯特劳斯特鲁普）：1950 年 12 月 30 日生于丹麦奥胡斯郡，计算机科学家。他以创造 C++ 编程语言而闻名，被称为“C++ 之父”。

一些帮助理解的知识：

- 终结符： 最终在代码中出现的字符（ https://zh.wikipedia.org/wiki/ 終結符與非終結符）
- 产生式： 在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句
- 静态和动态语言： https://www.cnblogs.com/raind/p/8551791.html
- 强类型： 无隐式转换
- 弱类型： 有隐式转换( c++ 也是)
- 协变与逆变： https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html
- Yacc 与 Lex 快速入门： https://www.ibm.com/developerworks/cn/linux/sdk/lex/index.html
- 关于元编程： https://www.zhihu.com/question/23856985
- 编程语言的自举： https://www.cnblogs.com/lidyan/p/6727184.html

## 编程语言通识基础

本周学习的内容主要有：编程语言通识

### 产生式（BNF）--巴科斯诺尔范式

- 用尖括号括起来的名称来表示语法结构名
- 语法结构分成基础结构和需要用其他语法结构定义的复合结构
  - 基础结构称为终结符
  - 复合结构称为非终结符
- 引号和中间的字符表示终结符
- 可以有括号
- \*表示重复多次
- |表示或
- +表示至少一次

举例--

<Pragram> := "a" + | "b" +

支持递归：
<Pragram> := <Pragram> "a" + | <Pragram> "b" +

定义一个数字：
<Number> = "0" | "1" |...| "9"
<DecimalNumber>= "0" | (("1" |...| "9") <Number> \*)

DecimalNumber 即可匹配 0 和 除 0 以外的任意整数如 1、111、10290190

定义一个加法，支持连加：
<AdditiveExpression> = <DecimalNumber> | <Expression> "+" <DecimalNumber>

定义一个乘法，支持连乘：
<MultiplicativeExpression> = <DecimalNumber> | <MultiplicativeExpression> "\*" <DecimalNumber>

通过表达式 1 + 2 _ 3 来理解， 左操作数 1， 右操作数 2 _ 3，则加法可以变为：

<AdditiveExpression> = <MultiplicativeExpression> | <AdditiveExpression> "+" <MultiplicativeExpression>

最终得到完整的定义：

```text

数字： <Number> = "0" | "1" |...| "9"

十进制整数： <DecimalNumber> = "0" | (("1" |...| "9") <Number> \*)

乘法/除法： <MultiplicativeExpression> = <PrimaryExpression> |
            <MultiplicativeExpression> "\*" <PrimaryExpression> |
            <MultiplicativeExpression> "\/" <PrimaryExpression>

加法/剪法： <AdditiveExpression> = <MultiplicativeExpression> |
            <AdditiveExpression> "+" <MultiplicativeExpression> |
            <AdditiveExpression> "-" <MultiplicativeExpression>

总结构： <LogicalExpression> = <AdditiveExpression> |
          <LogicalExpression> "||" <AdditiveExpression> |
          <LogicalExpression> "&&" <AdditiveExpression>

带括号的四则运算：<PrimaryExpression> = <DecimalNumber> | "(" <LogicalExpression> ")"
```

到此已经可以得到一份语言的定义。

### 通过产生式理解乔姆斯基谱系

1. 0 型 无限制文法，左侧可以有任意的非终结符： <a> <b> ::= "c"
2. 1 型 上下文相关文法，格式对应 "a" <b> "c" ::= "a" "x" "c" --->可以得到 <b> = "x"
3. 2 型 上下文无关文法，<a> ::= "c"
4. 3 型 正则文法

学习产生式可以从更规范的角度看待一门语言，也会显得更加的专业，便于与别人沟通。

小知识：

1. 某些场景下 JavaScript 正则性能并不是很好，跟受处理的文本长度很相关
2. JavaScript 在大多数场景下是 2 型文法，少数场景为 1 型，比如 get 可以是关键字也可以是变量名标识符，表达式大多数在 3 型。

### 知识扩展

1. 图灵完备性
2. 动态与静态
3. 类型系统
4. 一般命令式编程语言
   有五个组成部分
   1. Atom: 元子
      - Identifier: 变量名、标识符
      - Literal: 直接量 123、3.2
   2. Expression：表达式
      - Atom
      - Operator
      - Punctuator：操作符
   3. Statement： 语句
      - Expression
      - Keyword: 关键字
      - Punctuator
   4. Structure：结构化
      - Function
      - Class
      - Process
      - Namespace
      - ......
   5. Program
      - Program
      - Module
      - Package
      - Library

## 词法，类型

<!-- @Todo 待补充 -->
