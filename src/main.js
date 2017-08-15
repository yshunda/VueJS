'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';  //引入路由对象
Vue.use(VueRouter);
import Mint from 'mint-ui';   //引入Mint-ui
import 'mint-ui/lib/style.css';//引入Mint-ui的CSS样式
import './static/css/global.css';//引入全局CSS样式
import Moment from 'moment';
Vue.use(Mint);
import Axios from 'axios' ;
Vue.prototype.$ajax=Axios;
Axios.defaults.baseURL="http://182.254.146.100:8899/api/";

// 加入拦截器
Axios .interceptors.request.use(function(config){
    Mint.Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
});
    return config;
});
Axios .interceptors.response.use(function(config){
    Mint.Indicator.close();
    return config;
});
import Mui from './static/vendor/mui/dist/css/mui.css';
import NavBar from './components/common/navBar.vue';
import VuePreview from 'vue-preview';
import Commont from './components/common/commont.vue';
import MySwipe from './components/common/mySwipe.vue';
Vue.use(VuePreview);

//添加过滤器
Vue.filter('convertData',function(value){
    return Moment(value).format('YYYY-DD-MM');
});

Vue.component('navBar',NavBar);
Vue.component('commont',Commont);
Vue.component('mySwipe',MySwipe);



//引入自己的vue文件
import App from './app.vue';
import Home from './components/home/home.vue';
import Member from './components/member/member.vue';
import Shopcart from './components/shopcart/shopcart.vue';
import Search from './components/search/search.vue';
import NewsList from './components/news/newsList.vue';
import NewsDetail   from './components/news/newsDetail.vue';
import PhotoShare  from './components/photo/photoShare.vue';
import PhotoDetail from './components/photo/photoDetail.vue';
import GoodsList   from  './components/goods/goodsList.vue';
import GoodsDetail from  './components/goods/goodsDetail.vue';
import GoodsComment from './components/goods/goodsComment.vue';
let router = new VueRouter({
    linkActiveClass:'mui-active',
    routes: [
        {path:'/', redirect:{name:'home'}},
        {name:'home',path:'/home',component:Home},
        {name:'member',path:'/member',component:Member},
        {name:'shopcart',path:'/shopcart',component:Shopcart},
        {name:'search',path:'/search',component:Search},
        {name:'news.list',path:'/news/list',component:NewsList},
        {name:'news.detail',path:'/news/detail',component:NewsDetail},
        {name:'photo.share',path:'/photo/share',component:PhotoShare},
        {name:'photo.detail',path:'/photo/detail/:id',component:PhotoDetail},
        {name:'goods.lists',path:'/goods/lists',component:GoodsList},
        {name:'goods.detail',path:'/goods/detail',component:GoodsDetail},
        {name:'goods.comment',path:'/goods/comment',component:GoodsComment},
        { name:'goods.pictureInfo',path:'/goods/pictureinfo',component:NewsDetail},
    ]
});
new Vue({
    el:'#app',
    router,
    render:c=>c(App)
})