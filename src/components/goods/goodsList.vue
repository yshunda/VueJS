<template>
    <div class="tmpl" style="557px">
        <nav-bar title="商品列表"></nav-bar>
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isShow" ref="loadmore">
        <ul class="mui-table-view mui-grid-view">
            <router-link :to="{name:'goods.detail',query:{id:prod.id}}" v-for="prod in prods" :key="prod.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                <a>
                    <img class="mui-media-object" :src="prod.img_url">
                    <div class="mui-media-body">{{prod.title}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{prod.sell_price}}</span>
                            <s>￥{{prod.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                {{prod.zhaiyao}}
                            </div>
                            <div class="count">
                                {{prod.stock_quantity}}
                            </div>
                        </div>
                    </div>
                </a>
            </router-link>
        </ul>
    </mt-loadmore>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                pageindex:1,
                prods:[],
                allLoaded:false,
                isShow:false,
            }
        }
        ,created(){
           this.loadMorePage();
        }
        ,methods:{
            loadBottom(){
                this.loadMoreConcat()
                // console.log('上拉触发了');
            }
            ,loadMorePage(){
                this.$ajax.get('getgoods?pageindex='+this.pageindex)
                .then(res=>{
                   this.prods=res.data.message;
                })
                .catch(err=>{
                      
                })
            }
            ,loadMoreConcat(){
                this.$ajax.get('getgoods?pageindex='+(this.pageindex++))
                .then(res=>{
                   this.prods=this.prods.concat(res.data.message);
                })
                .catch(err=>{
                        console.log(err)
                })
                this.$refs.loadmore.onBottomLoaded();
            }
        }
    }
</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
</style>
