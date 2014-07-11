;(function() {
  var pageBuilderObj = {};
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
    // 是否创建过的标志
    builded: false
  }
  /**
   * @name
   * @desc 页码组装, 这个函数只运行一次，一个页面只能进行一个页码组装
   * @depend ['jQuery']
   **/
  function pageBuilder(config) {

    $.extend(defaultConfig, config);
    $.pageBuilderObj = defaultConfig;

    // 只运行一次的标志，页码下面数据长度小于 1 也不行。分页数据长度小于 1 也不行，容器不存在也不行
    if (defaultConfig.builded === true || defaultConfig.prePageLenght < 1 || defaultConfig.dataLength < 1 || defaultConfig.renderBox.length < 1 ) {
      return;
    } else {
      defaultConfig.builded = true;
    }

    // 向上取整获取最大的页码数
    defaultConfig.lastPage = Math.ceil( defaultConfig.dataLength / defaultConfig.prePageLenght );

    function renderPagination() {
      // 触发换页前的事件
      $(window).trigger("beforePageChange");

      var html = '',
        // 当前页码计算器
        pageNowTemp,
        // 当前页码长度计算器，缓存
        pageLengthTemp;

      // 判断当前页码
      if (defaultConfig.pageNow > defaultConfig.lastPage) {
        // 页码过大，防止熊孩子乱设置页码。
        location.hash = "page=1";
      } else if (defaultConfig.pageNow < 1) {
        // 没有小于 1 的页码的
        defaultConfig.pageNow = 1;
      }

      html += '<ul class="pagination">';

      // 组装上一页
      if (defaultConfig.pageNow !== 1) {
        html += '<li><a href="#page=prev">' + defaultConfig.pagePrev + '</a></li>'
      }

      // 组装中间的页码
      pageNowTemp = defaultConfig.pageNow - (defaultConfig.pageLength / 2) | 0;

      // 缓存页码长度
      pageLengthTemp = defaultConfig.pageLength;

      // 遍历输出页码数据
      while (pageLengthTemp > 0) {

        if (pageNowTemp < 1 || pageNowTemp > defaultConfig.lastPage) {
          // 不组装 小于 1 或者大于最大页码数的页码
        } else {
          // 组装中间页码
          if (pageNowTemp === defaultConfig.pageNow) {
            html += '<li class="active">';
          } else {
            html += '<li>'
          }
          html += '<a href="#page=' + pageNowTemp + '">' + pageNowTemp + '</a></li>';
        }

        // 下一页
        pageNowTemp++;
        // 页码计数器减
        pageLengthTemp--;
      }

      // 组装下一页
      if (defaultConfig.lastPage > defaultConfig.pageNow) {
        html += '<li><a href="#page=next">' + defaultConfig.pageNext + '</a></li>'
      }

      html += '</ul>';
      // 赋值到容器，使用jquery的
      defaultConfig.renderBox.html(html);

      // 触发换页后的事件
      $(window).trigger("afterPageChange");
    }

    // 绑定事件
    $(window).on('renderPagination', function() {
      renderPagination();
    })

    // 默认触发事件一次
    // $(window).trigger("renderPagination");
    // renderPagination();


    // 绑定换页的事件
    $(window).on('hashchange', function() {
      var hash = location.hash;
      var pageTemp = 0;
      if (/^#page=\d+$/.test(hash) === true) {
        // 直接是页码的
        pageTemp = hash.substring(6) | 0;
        if (defaultConfig.pageNow !== pageTemp) {
          defaultConfig.pageNow = pageTemp;
          $(window).trigger("renderPagination");
        }

      } else if (hash === "#page=next") {
        // 下一页的
        location.hash = "page=" + ( defaultConfig.pageNow + 1 );
      } else if (hash === "#page=prev") {
        // 上一页的
        location.hash = "page=" + ( defaultConfig.pageNow - 1 );
      }
    })


    $(window).trigger("renderPagination");
  }

  // $(window).on('pageBuilder', function() {
  //   pageBuilder();
  // })
  // $(window).trigger("pageBuilder");
  // 绑定到 $
  pageBuilder.page = defaultConfig;
  window.pageBuilder = pageBuilder;
})(window);

