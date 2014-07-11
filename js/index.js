/**
 * @name beforePageChange
 * @desc 分页之前的动作
 * @depend ['jQuery', ]
 * @param {event} e
 **/
function beforePageChange() {
  // callback
  $(window).trigger('loading');
}

$(window).on('beforePageChange', function() {
  beforePageChange();
})

/**
 * @name loading
 * @desc 分页之前的处理
 * @depend ['jQuery', ]
 * @param {event} e
 **/
function loading() {
  $('.list-box').prepend($('<div class="loading"></div>'));
  document.body.scrollTop = 0;
}
$(window).on('loading', function() {
  loading();
})

/**
 * @name afterPageChange
 * @desc 分页之后的动作
 * @depend ['jQuery', ]
 * @param {event} e
 **/
function afterPageChange() {
  // callback
  $(window).trigger('getData');
}

$(window).on('afterPageChange', function() {
  afterPageChange();
})
/**
 * @name getData
 * @desc 分页之后，进行更新页码对应的数据
 * @depend ['jQuery', ]
 * @param {event} e
 **/
function getData() {
  // 分页之后获取数据
  $.getJSON('./data/data' + pageBuilder.page.pageNow + '.json', function(datas) {
    // 虚拟下网络时延
    setTimeout( function(){
      var data = {};
      if (datas && datas.length && datas.length > 0) {
        // console.log( datas );
        data.datas = datas;
          var html = template('list-box', data);
          $('.list-box').html(html);
      }
    }, 300)
  });
}
$(window).on('getData', function() {
  getData();
})



// 获取数据长度
var pageConfig = {
  prePageLenght: 10,
  dataLength: 0,
  pageLength: 6,
  // pageNow: 1
};


/**
 * @name init
 * @desc demo 初始化函数
 * @depend ['jQuery', ]
 * @param {event} e
 **/
function init() {
  $.getJSON('./data/count', function(data) {
    if (data && data.count && data.count > 0) {
      pageConfig.dataLength = data.count;

      var hash = location.hash;
      var pageTemp = 0;
      if (/^#page=\d+$/.test(hash) === true) {
        pageTemp = hash.substring(6) | 0;
        pageConfig.pageNow = pageTemp;
      }

      pageBuilder(pageConfig);
    }
  });
}
$(window).on('init', function() {
  init();
})
$(window).trigger('init');
