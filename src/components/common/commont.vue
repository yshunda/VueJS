<template>
   <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>发表评论</span>
                        <span><a @click="goBack">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="msg"></textarea>
                </li>
                <li>
                <mt-button type="primary" @click="sendComment" size="large">点击发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment,index) in comments" :key="index">
                    {{comment.user_name}}：{{comment.content}} {{comment.add_time | convertData}}
                </li>
            </ul>
            <mt-button type="primary" @click="loadByMore" size="large">点击加载更多</mt-button>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                pageIndex:1,
                comments:[],
                msg:'',
            }
        }
        ,created(){
            this.loadFirst();
        }
        ,props:['cid']
        ,methods:{
            loadFirst(){
                this.$ajax.get('getcomments/'+this.cid+'?pageindex=1')
                .then(res=>{
                   this.comments=res.data.message;
                })
                .catch(err=>{
                    console.log(err);
                })
            }
            ,loadByMore(){
                this.$ajax.get('getcomments/'+this.cid+'?pageindex='+(++this.pageIndex))
                .then(res=>{
                    this.comments=this.comments.concat(res.data.message);
                })
                .catch(err=>{
                    console.log(err);
                })
            }
            ,sendComment(){
                this.$ajax.post('postcomment/'+this.cid,'content='+this.msg)
                .then(res=>{
                    if(this.msg === ''){
                        return;
                    }
                    this.loadFirst();
                    this.msg='';
                    console.log(this.msg);
                    
                })
                .catch(err=>{
                    console.log(err);
                })
            }

            ,goBack(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
}

.photo-desc p {
    font-size: 18px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2 2;
}

/*评论内容样式*/
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
</style>
