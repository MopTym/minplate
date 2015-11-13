# minplate

> 可能是最小的浏览器端JS模板引擎，无任何依赖。当然，功能也比较简单。

### 安装

除了直接clone外，也可以通过[npm](https://www.npmjs.com/)安装。

```
npm install --save minplate
```

支持[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)及[CommonJS](http://www.commonjs.org/)等模块化规范，当不处于这些模块化环境中时，会暴露一个名为```Minplate```的对象。

===

### 使用

```Minplate```对象对外暴露两个接口：```render(tpl, data [, wrapper])```和```renderArray(tpl, array [, wrapper])```。其中```renderArray```只是```render```在数据数组上的封装，给一个数组中的每个对象执行```render```等效于给此数组执行```renderArray```。

===

##### 基本示例：

```js
var tpl = '<li id="{{ id }}">{{ name }}</li>';
var user = { 
    id: 1, 
    name: 'Kakura' 
};
var html = Minplate.render(tpl, user);  // '<li id="1">Kakura</li>'
```

Minplate会用```render```接口的第二个参数的指定属性值来替换模版内的mustache（{{}}）中的字符串。

属性可以是深层的，下面都是可以正常替换的等效的mustache：

```js
{{ a.b.c }}
{{ a[b].c }}
{{ a[b]c }}
{{ a[b][c] }}
{{ a b c }}
```

注意，渲染完成后用来替换的属性值都已经经过escapeHTML处理。

===

##### 一般示例：

```js
var tpl = '<li id="{{ id }}">{{ fullName }}</li>';
var user = { 
    id: 1, 
    firstName: 'Tom',
    lastName: 'Cruse',
    fullName: function () {
        return this.firstName + ' ' + this.lastName;
    }
};
var html = Minplate.render(tpl, user);  // '<li id="1">Tom Cruse</li>'
```

你可以使用计算属性，比如示例中的```fullName```。

===

##### 进阶示例：

```js
var tpl = '<li id="{{ id }}">{{ fullName }}</li>';
var user = { 
    id: 1, 
    firstName: 'Tom',
    lastName: 'Cruse'
};
var wrapper = {
    fullName: function () {
        return this.firstName + ' ' + this.lastName;
    }
};
var html = Minplate.render(tpl, user, wrapper);  // '<li id="1">Tom Cruse</li>'
```

很多时候我们需要使用计算属性，但又不想因为添加计算属性而影响原有对象的结构，这时候我们可以使用wrapper对象。

注意，wrapper对象的优先级高于原有对象。

===

### 许可

[MIT License](https://github.com/MopTym/minplate/blob/master/LICENSE)
