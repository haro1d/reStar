<template>
  <div>
    <!-- <span @click="test">091</span> -->
    <br>
    <div class="threeChose" >

      </el-radio-group><el-radio-group v-model="a" >
        <el-radio  :label="9">显示全部</el-radio>
        <el-radio  :label="6" disabled>只看实名帖</el-radio>
        <el-radio  :label="3" disabled>只看匿名贴</el-radio>
      </el-radio-group>
    </div>
    <el-table :show-header='false'  :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border
    style="width: 100%" stripe >
    
          <el-table-column  width="100">
            <template scope="scope" >
              <img src="../assets/good.png" v-if="scope.row.favourite.indexOf(iName) === -1" alt="" class="giveLike" @click="Good(scope.row.article_id)"/>
              <img src="../assets/good_color.png" v-if="scope.row.favourite.indexOf(iName) >= 0" alt="" class="giveLike" @click="notGood(scope.row.article_id)"/>
              {{scope.row.favourite.length}}
              <img src="../assets/msg.png" alt="" style="height:18px;margin-bottom: -3px;margin-left: 10px;"/>
              {{scope.row.comment.length}}
            </template> 
          </el-table-column>
          <el-table-column min-width="180">
            <template scope="scope">
              
              <span @click="articleDetail(scope.row.article_id)"  class="title">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
        
          <el-table-column  width="50" v-if="$store.state.iName !== ''">
            <template scope="scope" >
    
              <img src="../assets/star.png" alt="" style="height:20px;cursor: pointer;" v-if="scope.row.collected.indexOf(iName) === -1"  @click="Star(scope.row.article_id)">
            
              <img src="../assets/star_color.png" alt="" style="height:20px;cursor: pointer;" v-if="scope.row.collected.indexOf(iName) >= 0"  @click="notStar(scope.row.article_id)">
          
          </template>
        </el-table-column> 

          <el-table-column  width="120">
            <template scope="scope">
              <!-- <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <p>住址: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper"> -->
                  <span @click="userDetaile(scope.row.user_name)"  class="title">{{ scope.row.user_name }}</span>
                <!-- </div>
              </el-popover> -->
            </template>
          </el-table-column>
          <el-table-column  width="90">
            <template scope="scope">
              {{scope.row.time}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="90">
            <template scope="scope">
      
              <!-- <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
  </el-table>



<!--   
    <el-table  :data="res.data.result.slice((currentPage-1)*pagesize,currentPage*pagesize)"   :show-header='false' 
    border >
      <el-table-column  prop="author"  width="120" class-name="author">
      </el-table-column>
    </el-table> -->

            <el-pagination 
                style="background-color: rgb(246, 234, 247);" 
                @current-change="handleCurrentChange" 
                :current-page="currentPage" 
                
                background
                layout="prev, pager, next, jumper" 
                
                prev-text="上一页" 
                next-text="下一页">
            </el-pagination>

 
          <el-input
            placeholder="标题" maxlength='50' show-word-limit
            v-model="title" style="margin: 10px;width:98%"
            clearable>
          </el-input>

          <vue-tinymce
          v-model="content" 
          :setting="setting" />
      <el-button  type="primary" style="margin-left: 10px;" @click="anonymous">匿名发帖</el-button>
    <el-button type="primary" @click="realName" v-if="iName!=''">实名发帖</el-button>
</div>
</template>


<script>


  export default {
   name: 'index',


   data() {
     return {
    
       i:'',
       year:'',
       month:'',
       day:'',
       hour:'',
       minute:'',
       iName : this.$store.state.iName,
      tableData:[],
      a:9,
      res:[],
      currentPage: 1, //默认显示页面为1
      pagesize: 10, //    每页的数据条数
      content:'',
      title:'',
      article_id:'',

      setting: {
        menubar: false,
        toolbar: "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
        toolbar_drawer: "sliding",
        quickbars_selection_toolbar: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        plugins: "link image media table lists fullscreen quickbars",
        language: 'zh_CN', //本地化设置
        height: 350
      },

     };
   },
   watch: {
    '$store.state.iName'(val){
         	//	this.index()
          this.iName = val;
    }
   },

  created() {

    this.index();
  },
   mounted(){

    },

   methods: {
    // handleDelete(a,b){
    // },

     index(){
        var that = this;
       
         that.$axios({
          url: 'http://120.77.245.87:3000/allArticle',
          method: "get",
           params: { type:'all' }
        }).then(res => {
          that.tableData = res.data.reverse() ;//reverse() = 倒序
        }).catch(err =>{
          console.log("data is error");
        })
      },
        //点击第几页
      handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
     
    },
    openArticle(){
      this.$router.push({path: '../content'})
    },
    anonymous(){
      var that = this;
     
        if(that.title === ''){
          this.$message({
              message: '标题不能为空！',
              type: 'warning'

            });
          }
          else{
            
      that.$axios({
        url: 'http://120.77.245.87:3000/creArticle',
        method:"post",
        data:{
            type:'N',
            user_name: '匿名',
            content: that.content,
            time: global.getDate.getDate(),
            title: that.title,
            // collected: [],
            // favourite: [],
            //img:"$user_msg.img",
            //comment:[]
        }

      }).then(res =>{
        this.$router.go(0);
      }).catch(err =>{
      })

    }
    },
    realName(){
      var that=this;
        if(that.title === ''){
          this.$message({
              message: '标题不能为空！',
              type: 'warning'

            });
          }
          else{

        that.$axios({
          url: 'http://120.77.245.87:3000/creArticle',
          method:"post",
          data:{
              type:'R',
              user_name: that.iName,
              content: that.content,
              time: global.getDate.getDate(),
              title: that.title,
          },   

      }).then(res =>{
        this.$router.go(0);
      }).catch(err =>{
       
      })
 
    }
  },
    // 当前时间

	// currentTime(){
  //     setInterval(()=>{ 
        
  //       this.getTime();
  //     }, 500);
  //   },
  // ————————————————————————————————————————————

  articleDetail(article_id){
    this.$router.push({name:"content",query:{article_id:article_id}})
        
  },
  userDetaile(user_name){
    this.$router.push({name:"user",query:{user_name:user_name}})      
  },
  //点赞和收藏
  Good(article_id){
    var that=this;
    if(this.iName !==''){
        
          that.$axios({
            url: 'http://120.77.245.87:3000/preAndColle',
            method:"post",
            data:{
              article_id:article_id,
              user_name:that.iName,
              type:'favourite'  //分别代表收藏和点赞
            }
          }).then(r =>{

            that.index();
          }).catch(err =>{

          })
        
      }
      

  },
  notGood(article_id){
      var that=this;
      if(this.iName !==''){
        that.$axios({
          url: 'http://120.77.245.87:3000/delpreAndColle',
          method:"post",
          data:{
            article_id:article_id,
            user_name:that.iName,
            type:'favourite'  //分别代表收藏和点赞
          }
        }).then(r =>{

        that.index();
        }).catch(err =>{

        })
        
      }
     
  },

  Star(article_id){
    var that=this;
    if(this.iName !==''){
        
          that.$axios({
            url: 'http://120.77.245.87:3000/preAndColle',
            method:"post",
            data:{
              article_id:article_id,
              user_name:that.iName,
              type:'collected'  //分别代表收藏和点赞
            }
          }).then(r =>{
      
           that.index();
          }).catch(err =>{
         
          })
          
      }
      
  },
  notStar(article_id){
    var that=this;
      if(this.iName !==''){
        that.$axios({
          url: 'http://120.77.245.87:3000/delpreAndColle',
          method:"post",
          data:{
            article_id:article_id,
            user_name:that.iName,
            type:'collected'  //分别代表收藏和点赞
          }
        }).then(r =>{

         that.index();
        }).catch(err =>{
 
        })
       
      }
      
  },

  //——————————————————————————————————————————————————
}
  
}

</script>


<style>
  .title{
    text-decoration: none;
    margin-left: 4px;
    cursor: pointer;
  }

</style>