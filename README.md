# pagination

适合前后端分离的页码生成器。

##  目录
* [快速上手](#快速上手)
* [特性](#特性)
* [方法](#方法)
* [库依赖](#库依赖)
* [html结构](#html结构)
* [版本说明](#版本说明)


## 快速上手

引入库，
```html
<script type="text/javascript" src="//cdn.staticfile.org/zepto/1.0rc1/zepto.min.js"></script>
<script type="text/javascript" src="./js/pagination.js"></script>
```

html结构
```html
<div class="pagination-box"></div>
```

初始化函数
```javascript
// 提前定义好分页之前的动作，可选
$(window).on('beforePageChange', function() {
  // callback
  // todo
  // 获取当前页码，可以从 pageBuilder.page.pageNow 取得，注意此时的值为未分页之前的旧页码。
})

// 提前定义好分页之后的动作，可选
$(window).on('afterPageChange', function() {
  // callback
  // todo
  // 获取当前页码，可以从 pageBuilder.page.pageNow 取得
})

var pageConfig = {
  // 每页显示的数据长度，必填，而且 >1
  prePageLenght: 10,
  // 数据的总长度，必填，而且 >1
  dataLength: 30,
  // 现在的页码，默认 1
  pageNow: 1,
  // 渲染分页 html 的容器，一般框架的容器即可
  renderBox: $('.pagination-box')
};
// 运行即可分页
pageBuilder(pageConfig);
// 获取当前页码，可以从 pageBuilder.page.pageNow 取得
```


##  特性
* 代码量少，方便改造
* 接口方便，方便回调
* 方便监控换页事件
* 高度定制
* 无css依赖，就是自己写css。

## 方法
### pageBuilder 
引入库文件之后，将在 ```window``` 对象下面挂载一个 ```pageBuilder``` 对象， ```typeof pageBuilder``` 值为 ```"function"```， ```pageBuilder``` 下面有个 ```page``` 对象，为当前分页的页码对象。
具体调用方法，一定要传输配置参数。
配置参数的对象格式为
```javascript
{
  // 每页显示的数据长度，必填，而且 >1
  prePageLenght: 10,
  // 数据的总长度，必填，而且 >1
  dataLength: 30,
  // 现在的页码，默认 1
  pageNow: 1,
  // 渲染分页 html 的容器，一般框架的容器即可，可选，默认 $('.pagination-box')
  renderBox: $('.pagination-box')
  // 还有其他参数，
}
```

### pageBuilder.page 对象
通过引用的方式引用分页时的配置对象，因此能直接获取当前分页时候的配置参数。
```javascript
var defaultConfig = {
    // 上一页，文案，默认 上一页
    pagePrev: "上一页",
    // 下一页，文案，默认 下一页
    pageNext: "下一页",
    // 当前页码，默认1
    pageNow: 1,
    // 每页显示的数据长度，一定需要赋值数据长度
    prePageLenght: 0,
    // 分页数据的长度
    dataLength: 0,
    // 页面显示多少个页码呢
    pageLength: 5,
    // 产生的结果赋值到哪个容器
    renderBox: $('.pagination-box'),
    // 是否创建过的标志，整个页面只能创建一次的页码，因此这个字段标志是否创建过。
    builded: false
  }
pageBuilder.page = defaultConfig;
```

## 库依赖

### js 库依赖
暂时支持 jquery 或者 zepto 之类的，用于 js 赋值操作，依赖这些库的 元素选择、事件方法、html操作方法（例如 ```$('body')```，```$(window).on('event',function(){})```，```$(window).trigger("event")```，```$('body').html("something")```）。

### css 库依赖
可以不进行 css 库的引入，分页代码的 html 结构和 bootstarp 的分页 html 结构基本一致。下面将提到 html 结构。想使用的话直接引用 bootstrap 的 css 库即可。当然可以选择单独引用， ```css/pagination.css``` 这个是直接从 bootstrap 里面单独抽出来的编译后的分页 css 代码，可直接引用。

## html结构
当前页码为 2 的时候。
```html
<ul class="pagination">
  <li><a href="#page=prev">上一页</a></li>
  <li><a href="#page=1">1</a></li>
  <li class="active"><a href="#page=2">2</a></li>
  <li><a href="#page=3">3</a></li>
  <li><a href="#page=4">4</a></li>
  <li><a href="#page=next">下一页</a></li>
</ul>
```
就是这么多，没有进行动作的绑定，只把分页事件绑定到了 window 下面的 hashchange 事件中，因此 a 标签的 href 能间接触发分页事件。这也是为什么一个页面只能使用一个分页实例的问题所在。

## 版本说明

### v1.0.0
1、发布版本。