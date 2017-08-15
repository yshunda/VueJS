<template>
    <div>
            <mt-header  title="VUE全家桶实战"></mt-header>
            <router-view></router-view>
            <nav class="mui-bar mui-bar-tab">
                <router-link class="mui-tab-item" :to="{name:'home'}">
                    <span class="mui-icon icon-shouye1"></span>
                    <span class="mui-tab-label">首页</span>
                </router-link>
                <router-link class="mui-tab-item" :to="{name:'member'}" >
                    <span class="mui-icon icon-huiyuan1"></span>
                    <span class="mui-tab-label">会员</span>
                </router-link>
                <router-link class="mui-tab-item" :to="{name:'shopcart'}">
                    <span class="mui-icon icon-gouwucheman"><span class="mui-badge">{{pickNum}}</span></span>
                    <span class="mui-tab-label">购物车</span>
                </router-link>
                <router-link class="mui-tab-item" :to="{name:'search'}">
                    <span class="mui-icon icon-huiyuan2"></span>
                    <span class="mui-tab-label">查找</span>
                </router-link>
            </nav>
    </div>
</template>
<script>
import connect from './components/common/connect.js';
import prodTools from './components/common/prodTools.js';
    export default {
        data(){
            return {
                pickNum:prodTools.getTotalCount(),
            }
        }
        ,created(){
            connect.$on('addShopcart',(num)=>{
                this.pickNum=this.pickNum+num;
            })
        }
    }
</script>
<style>
    
</style>