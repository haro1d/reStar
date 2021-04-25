<template>
<div>
    <div style="margin:12px;"><strong>{{title}}</strong></div>
    <div style="border: 0.1px solid rgb(196, 196, 196);margin-top:4px;margin-bottom:12px;"></div>
    <div style="width:100%">
        <div style="display: flex;width:15%;float:left">
            <div class="left_10">  
                <img :src="require('@/assets/'+ this.img1 +'.png')" alt=""  class="photo1" />
                <div style="margin:4px;cursor: pointer;" @click="userDetaile(lzName)">{{lzName}}</div>    
                <br>
  
            </div>
        </div>
        <div style="margin-left:10px;display: flex;width:78%;float:left">
            <p v-html="content"></p>
            <!-- <pre>{{content}}</pre> -->
        </div>
    </div>
 
   <div style="clear: both;border:0.1px solid rgb(196, 193, 193);">

    <div style="font-family: KaiTi">共{{comment1.length}}条回复 
        <span style="right: 12px;position:absolute;color: gray;">{{time}}</span>
     </div>

    </div><br>
    
    
    
    <div class="content4">
        <el-table :show-header='false'  :data="comment1"  style="width: 100%" empty-text='别让楼主寂寞太久'  >
            <el-table-column  width="54" >
                <template scope="scope">
                    <img :src="require('@/assets/' + scope.row.img + '.png')" alt=""  class="photo2"/>
                    <!-- <p @click="test(scope.row)">22</p> -->
                 </template>
            </el-table-column>
            <el-table-column   width="120">
                <template scope="scope">
                    <span @click="userDetaile(scope.row.user_name)"  class="title">{{ scope.row.user_name }}</span>
               
                 </template>
            </el-table-column>
            <el-table-column  min-width="160">
                <template scope="scope">
                
                <span v-html="scope.row.content"></span>
                 </template>
            </el-table-column>
            <el-table-column   width="92">
                <template scope="scope">
                    {{scope.row.time}}
                 </template>
            </el-table-column>
         
        </el-table>
    </div>
    <div style="height:1px;width:100%;background-color:rgb(207, 203, 203);margin-top:14px;margin-bottom:18px;"></div>
    发表评论<br>

    <vue-tinymce
    v-model="newComment" 
    :setting="setting" />
<el-button  @click="submit" style="margin-left: 10px;background-color: rgb(231, 229, 191);">提交</el-button>
</div>
</template>

<script>
    export default {
        
        data() {
            return {
                comment1:[
                   
                ],
                
                title:'',
                lzName:'',
                content:'',
                time:'',
                newComment:'',
                img1:'pf0',
                setting: {
                    menubar: false,
                    toolbar: "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
                    toolbar_drawer: "sliding",
                    quickbars_selection_toolbar: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
                    plugins: "link image media table lists fullscreen quickbars",
                    language: 'zh_CN', //本地化设置
                    height: 350
                },
                
            }
        },
        created() {
            var that=this;
            var id = this.$route.query.article_id;
            this.myAxios("get",'/oneArticle',{
               article_id:id
          },r=>{
     
                that.title = r[0].title;
                that.lzName = r[0].user_name;
                that.content = r[0].content;
                that.comment1 = r[0].comment.reverse();
                that.time = r[0].time;
                that.img1 = r[0].img;
             
             }
          )

        },
        mounted() {

        },
        methods: {

            submit(){
                var name = this.$store.state.iName;
                var that = this;
              
                if(name === ''){
                    name = '匿名' 
                }
          
                that.$axios({
                    url:'http://120.77.245.87:3000/comment',
                    method:"post",
                    data:{
                        article_id:this.$route.query.article_id,
                        user_name:name,
                        content:that.newComment,
                        time:global.getDate.getDate(),
                    },   

                }).then(res =>{
                    this.$router.go(0);
                }).catch(err =>{
                console.log('error:',err);
                })
                
                
            },
            userDetaile(user_name){
                
                
                this.$router.push({name:"user",query:{user_name:user_name}})
                    
            },

        },
    }
</script>

<style scoped>
    .photo1{
        height:60px;width:60px;border-radius:30%;
        
    }
    .photo2{
        height:30px;width:30px;
    }
    .content4{
        margin :2px auto;
        width:96%;
        
        border:1px solid rgba(100, 61, 61, 0.137);
        overflow: auto;
    }
    .left_10{
        margin-left:10px;
    }
    .left_10 p{
        font-size:12px;
    }
    /* .el-table, .el-table__expanded-cell {
        background-color: transparent;
    }

    .el-table  th, .el-table tr {
        background-color: transparent;
    }
    .el-table__body tr:hover > td{
    background-color:rgb(241, 222, 42) !important;
} */
</style>