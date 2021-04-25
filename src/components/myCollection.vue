<template>
    <div v-if="$store.state.iName === ''">
        <div style="display: flex;">
            <img src="../assets/smile.png">
            <p class="p1">
                登录后才可查看我的收藏
            </p>

        </div>

    </div>
    <div v-else>
        <!-- <button @click="test">21</button> -->
        <el-table  :show-header='false' :data="favList" border style="width: 100%" stripe empty-text='您的收藏夹空空如也'>

            <el-table-column width="112">
                <template scope="scope">
                    <img src="../assets/good.png" v-if="scope.row.favourite.indexOf($store.state.iName) === -1" alt=""
                        class="giveLike" @click="Good(scope.row.article_id)" />
                    <img src="../assets/good_color.png" v-if="scope.row.favourite.indexOf($store.state.iName) >= 0"
                        alt="" class="giveLike" @click="notGood(scope.row.article_id)" />
                    {{scope.row.favourite.length}}
                    <img src="../assets/msg.png" alt="" style="height:18px;margin-bottom: -3px;margin-left: 10px;" />
                    {{scope.row.comment.length}}
                </template>
            </el-table-column>
            <el-table-column min-width="180">
                <template scope="scope">

                    <span @click="articleDetaile(scope.row.article_id)" class="title">{{ scope.row.title }}</span>
                </template>
            </el-table-column>

            <el-table-column width="50">
                <template scope="scope">

                    <img src="../assets/star.png" alt="" style="height:20px;cursor: pointer;"
                        v-if="scope.row.collected.indexOf($store.state.iName) === -1"
                        @click="Star(scope.row.article_id)">

                    <img src="../assets/star_color.png" alt="" style="height:20px;cursor: pointer;"
                        v-if="scope.row.collected.indexOf($store.state.iName) >= 0"
                        @click="open1(scope.row.article_id)">

                </template>
            </el-table-column>

            <el-table-column width="120">
                <template scope="scope">

                    <span @click="userDetaile(scope.row.user_name)" class="title">{{ scope.row.user_name }}</span>

                </template>
            </el-table-column>
            <el-table-column width="90">
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
    </div>        
    </div>

</template>
<script>
    export default {
        name: "facvo",
        data() {
            return {
                favList: [],
                dataList: [],
                
            }
        },
        watch: {
            '$store.state.iName'(val) {
                this.index()
            }
        },
        created() {
            this.index();
            

        },
        mounted() {

        },
        methods: {
     
            index() {
               
                var that = this

                this.myAxios("get", '/getMyCo', {
                    user_name: that.$store.state.iName
                }, r => {
        
                    for (var i = 0; i < r.length; i++) {
                        that.dataList[i] = r[i].amsg[0]
                      //that.$set(that.favList,i, r[i].amsg[0]);
                    }
     
                    that.favList = that.dataList.filter(i=>i);
                    that.dataList = [];
                  //  that.$set(that.favList, that.dataList);
                
                    //this.$router.go(0);
                    // that.favList =r.data;
                })
            },
    
            test() {

            },
            open1(x) {
                this.$alert('确定要取消收藏吗？', '', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.notStar(x)
                        this.$message({
                            type: 'success',
                            message: `已取消收藏`
                        });
                       
                    }

                });
                
            },
            userDetaile(user_name){
                var that = this;
                
                this.$router.push({name:"user",query:{user_name:user_name}})
                    
            },

            //点赞和收藏
            Good(article_id) {
                var that = this;


                that.$axios({
                    url: 'http://120.77.245.87:3000/preAndColle',
                    method: "post",
                    data: {
                        article_id: article_id,
                        user_name: that.$store.state.iName,
                        type: 'favourite'  //分别代表收藏和点赞
                    }
                }).then(r => {
 
                    that.index();
                }).catch(err => {
             
                })




            },
            notGood(article_id) {
                var that = this;

                that.$axios({
                    url: 'http://120.77.245.87:3000/delpreAndColle',
                    method: "post",
                    data: {
                        article_id: article_id,
                        user_name: that.$store.state.iName,
                        type: 'favourite'  //分别代表收藏和点赞
                    }
                }).then(r => {
                 
                    that.index();
                }).catch(err => {
            
                })



            },

            Star(article_id) {
                var that = this;


                that.$axios({
                    url: 'http://120.77.245.87:3000/preAndColle',
                    method: "post",
                    data: {
                        article_id: article_id,
                        user_name: that.$store.state.iName,
                        type: 'collected'  //分别代表收藏和点赞
                    }
                }).then(r => {
                    that.index();
                }).catch(err => {

                })



            },
            notStar(article_id) {
                var that = this;

                that.$axios({
                    url: 'http://120.77.245.87:3000/delpreAndColle',
                    method: "post",
                    data: {
                        article_id: article_id,
                        user_name: that.$store.state.iName,
                        type: 'collected'  //分别代表收藏和点赞
                    }
                }).then(r => {
 
                   that.index();
                    
                }).catch(err => {
           
                })
                
                

            },
            articleDetaile(article_id) {


                this.$router.push({ name: "content", query: { article_id: article_id } })

            },
        },
    }
</script>
<style>
</style>