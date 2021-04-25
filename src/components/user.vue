<template>
    <div>
        <img :src="require('@/assets/'+ this.img +'.png')" alt=""  style="width:150px;height: 150px;"/>
        <span style="font-family: YouYuan;font-size:30px;font-weight: bold;">{{name}}</span>
        <br><br>
      <div v-show = "name !== '匿名'">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick" >
              <el-tab-pane label="他的帖子" name="first"></el-tab-pane>
              <el-tab-pane label="他的收藏" name="second" disabled></el-tab-pane>

            </el-tabs>
          <el-table :show-header='false'  :data="myArticle" style="width: 100%" border stripe>
                <el-table-column  width="42">
                  <!-- <template scope="scope" >
                    <img src="../assets/good.png" v-if="scope.row.favourite.indexOf(iName) === -1" alt="" class="giveLike" @click="Good(scope.row.article_id)"/>
                    <img src="../assets/good_color.png" v-if="scope.row.favourite.indexOf(iName) >= 0" alt="" class="giveLike" @click="notGood(scope.row.article_id)"/>
                    {{scope.row.favourite.length}}
                    <img src="../assets/msg.png" alt="" style="height:18px;margin-bottom: -3px;margin-left: 10px;"/>
                    {{scope.row.comment.length}}
                  </template>  -->
                </el-table-column>
                <el-table-column width="690">
                  <template scope="scope">
                    
                    <span @click="articleDetaile(scope.row.article_id)"  class="title">{{ scope.row.title }}</span>
                  </template>
                </el-table-column>
                <!-- <el-table-column  width="50">
                  <template scope="scope" >
                    <img src="../assets/star.png" alt="" style="height:20px;cursor: pointer;" v-if="scope.row.collected.indexOf(iName) === -1"  @click="Star(scope.row.article_id)">
                    <img src="../assets/star_color.png" alt="" style="height:20px;cursor: pointer;" v-if="scope.row.collected.indexOf(iName) >= 0"  @click="notStar(scope.row.article_id)">
                  </template>
              </el-table-column> -->

                <el-table-column  width="90">
                  <template scope="scope">
                    {{scope.row.time}}
                  </template>
                </el-table-column>
            
        </el-table>
  </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                myArticle:[],
                iName:'',
                name:'',
                img:'pf0',
                activeName:'first'
            }
        },
        created() {
            
            var that=this;
            this.iName = this.$store.state.iName;
            that.name = this.$route.query.user_name;
        this.myAxios("get",'/users/myMsg',{        
            user_name:this.name,
            
         },r=>{    
            
               that.img = r[0].img;
            }
         )
        this.myAxios("get",'/users/myArticle',{
               
                user_name:this.name,
                type:'R'
          },r=>{
                
                that.myArticle = r;
             //   console.log("myArticle:",that.myArticle);
              //  console.log("test",that.title,that.lzName);
             }
          )
        },
        methods:{
            articleDetaile(article_id){
                var that = this;
                
                this.$router.push({name:"content",query:{article_id:article_id}})
                    
            },
            handleClick(tab, event) {
               // console.log(tab, event);
            },
        }
    }
</script>

<style></style>