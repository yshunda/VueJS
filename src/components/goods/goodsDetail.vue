<template>
    <div class="tmpl">
        <nav-bar title="图文详情"></nav-bar>
        <div class="outer-swiper">
            <div class="swiper">
                <my-swipe :url="luboUrl" style="height:330px"></my-swipe>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{prodM.title}}
                </span></li>
                <li class="price-li">市场价：
     <s>￥{{prodM.market_price}}</s> 销售价：<span>￥{{prodM.sell_price}}</span></li>
                <li class="number-li">购买数量：<span @click="substract">-</span><span>{{num}}</span><span @click="add">+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="addShopcart">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <transition name="ball">
            <div class="ball"></div>
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数：13574835759394</li>
                <li>商品货号：{{prodM.goods_no}}</li>
                <li>库存情况：{{prodM.stock_quantity}}件</li>
                <li>上架时间：{{prodM.add_time | convertData}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain @click="showPicInfo">图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain @click="showProdComment ">商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import connect from '../common/connect.js';
import prodTools from '../common/prodTools.js';
 export default{
        data(){
            return {
                id:this.$route.query.id,
                imgs:[],
                prodM:{},
                luboUrl:"getthumimages/+'id'",
                num:1,
            }
        }
        ,created(){
            this.luboUrl='getthumimages/'+this.id;
            this.$ajax.all([
                    this.$ajax.get('goods/getinfo/'+this.id),
                ])
            .then(this.$ajax.spread((resInfo)=>{
                this.prodM=resInfo.data.message[0];
            }))
            .catch(err=>{
                console.log(err);
            })
        }
        ,methods:{
            add(){
                if(this.num >= this.prodM.stock_quantity) return ;
                this.num++;
            }
            ,substract(){
                if(this.num <= 1) return ;
                this.num--;
            }
            ,addShopcart(){
                prodTools.addOrUpdate({
                    id:this.prodM.id,
                    num:this.num,
                })
                connect.$emit('addShopcart',this.num);
            }
            ,showProdComment(){
                let id=this.$route.query.id;
                this.$router.push({
                    name:'goods.comment',
                    query:{id}
                });
            }
            ,showPicInfo(){
                let id = this.$route.query.id;
                this.$router.push({
                    name:'goods.pictureInfo',
                    query:{ id } 
                });
            }
        }
    }

</script>
<style scoped>
.imgHeight[data-v-4a44fbf8]{
    height: 340px;
}
.ball-enter-active {
    animation: bounce-in 1s;
}

@keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(140px, -50px, 0);
    }
    75% {
        transform: translate3d(160px, 0px, 0);
    }
    100% {
        transform: translate3d(140px, 300px, 0);
    }
}

.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}
</style>
