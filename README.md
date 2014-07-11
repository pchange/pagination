# pagination

适合前后端分离的页码生成器。

##  目录
* [快速上手](#快速上手)
* [特性](#特性)
* [方法](#方法)
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



## 版本说明

### v1.0.0
1、发布版本。