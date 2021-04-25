<template>
  <div v-if="$store.state.iName === ''">
    <div style="display: flex;">
      <img src="../assets/smile.png" >
      <p class="p1">
        登录后才可以使用私人笔记
      </p>
     
      
    </div>
    <div  >
      <img src="../assets/pencil.png"  class="pencil">
      <span class="p2">在这里写下的东西别人是无法看到的呢</span>
    </div>
    
    </div>
  <div v-else>
    <el-table :show-header='false'  :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
    style="width: 100%" stripe empty-text='这里写下的东西是仅你自己可见的'>
          <el-table-column  width="50">
            
          </el-table-column>
          <el-table-column min-width="180">
            <template scope="scope">
              
              <span @click="articleDetail(scope.row.article_id)" class="title">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column  width="50">
      
          </el-table-column>

          <el-table-column  width="200">
            <template scope="scope">
              {{scope.row.time}}
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" width="90">
            <template scope="scope">
      
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column> -->
  </el-table>

    
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
          <el-button type="primary"  @click="cre" style="margin-left: 10px;">发帖</el-button>
       
    </div>
  </template>
  
  <script>
      export default {
   name: 'index',
   data() {
     return {
      tableData: [
    
      ],
      
      isLogin:false,
      iName:'',
      res:[],
      currentPage: 1, //默认显示页面为1
      pagesize: 10, //    每页的数据条数
      content:'',
      title:'',
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
        
      	this.index()
    
   }
},
   created() {
    this.index();

   }, 
   methods: {
    index(){
        var that = this;
         that.$axios({
          url: 'http://120.77.245.87:3000/users/myArticle',
          method: "get",
           params: { user_name: this.$store.state.iName, type: 'P' }
        }).then(res => {

          that.tableData = res.data.filter(i=>i).reverse() ;//filter(i=>i)去除空值，reverse倒序
        }).catch(err =>{
        })
      },
          //点击第几页
        handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;

    },
    //发帖
    cre(){
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
                  type:'P',
                  user_name: this.$store.state.iName,
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
   
  articleDetail(article_id){

    this.$router.push({name:"content",query:{article_id:article_id}})
        
  },
    }
 }

  </script>
  
  <style>
    .p1{
      color: rgb(255, 136, 0);
      font-size: 25px;
      clear: both;
    }
    .pencil{
      width:40px;
      height: 40px;
    }
    .p2{
      font-size:20px;
      font-family: KaiTi;
    }
  </style>