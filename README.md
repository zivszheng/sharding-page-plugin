# sharding-page-plugin
通过 jQuery 实现的一款前段分页插件

## 使用
> 该插件是基于主流前段框架 `bootstrap` 的默认样式,可根据自己的需求优化样式

- **引入jQuery.js 和 shard_page.js**
```
<script type="text/javascript" src="../static/jquery/jquery.min.js"></script>
<script type="text/javascript" src="../static/js/shard_page.js"></script>
```

- **页面插件调用**
```
// page_div 是web页面中布局分页插件的div 如：`<div class="btn-box text-center" id="page_div"></div>`
$("#page_div").html(InitiatePage.init({pageNum:'${res.pageNum}',
                     totalPage:'${res.totalPage}',
                     totalRow:'${res.totalRowNum}',
                     totalRowText:'<@spring.message code="hotel.search.totalrows"/>',
                     callbackfun:pageCallback,
                     lang:'${lang?if_exists}'}));
```
