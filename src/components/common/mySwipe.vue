<template>
    <div>
        <mt-swipe :auto="4000" class="imgHeight">
            <mt-swipe-item v-for="(img,index) in imgs" :key="index">
                <a href="img.url" style="target:_blank">
                  <img :src="img.img" alt="" style="width:100%">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                imgs:[],
            }
        }
        ,props:['url']
        ,created(){
            this.$ajax.get(this.url)
            .then(res=>{
                this.imgs=res.data.message;
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
</script>
<style scoped>
.imgHeight{
    height: 140px;
}
    
</style>