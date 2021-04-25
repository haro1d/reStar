<template>
  <div id="app"> 
    <video autoplay loop muted playsinline>
      <source src="./assets/video.webm" type="video/webm">
  </video>
    <!-- <button @click="quit" style="position: absolute;top:20%"> quit</button>
    <button @click="test" style="position: absolute;top:17%"> （测试）</button> -->
    <div class="head">
      <div>
        <el-tooltip content="随心所欲，畅所欲言" placement="right-end" effect="dark" :open-delay = 750>

          <img class="logo" src="./assets/logo3.png">
        </el-tooltip>

      </div>
      <div class="startMenu">
        
       
        <!-- <router-link to="/login"> -->
          
            <el-button slot="reference" @click="loginVisible = true" v-show="!isLogin"><i class="el-icon-lollipop"></i>  &nbsp&nbsp登录  
            </el-button>
          
            <!-- </router-link> -->
        <el-button slot="reference" @click="registerVisible = true"><i class="el-icon-key"></i>&nbsp&nbsp注册</el-button>

        <!-- <el-button @click="adviceVisible = true"><i class="el-icon-box"></i>&nbsp&nbsp意见箱</el-button> -->
        <el-button slot="reference" @click="about = true"><i class="el-icon-orange"></i>&nbsp&nbsp关于</el-button>
    
      </div>
  
      <div v-if="isLogin" class="user">
        <img :src="require('@/assets/'+ this.img1 +'.png')" alt=""  class="userPf" @click="changeProfile"/>
      <el-dropdown>
        <span class="el-dropdown-link userName" style="color:white">
          {{lgId}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  @click.native="userDetaile($store.state.iName)">个人信息</el-dropdown-item>
          <el-dropdown-item  @click.native="quit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      </div>
    </div>

    <el-dialog :visible.sync="about" width='30%' :before-close="handleClose" >
      <span slot="title">
        
      </span>
      <span style="font-family: STXinwei,STXingkai,FZShuTi;font-size: 1.25rem;color:brown">本洞之主 历经七七四十九日 栖星枕月 苦思冥想</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="x1=!x1"></el-button>
      </span>
        <span v-show= "x1" class="nextVersion">
          <br><br><br>
          <p>下版本更新内容：</p>
          <p>只看实名/匿名帖功能开放</p>
          <p> “我的收藏”可以被访问，也可以设置禁止其他人访问</p>
          <p>个性签名</p>
          <p> 帖子时间显示更人性化及个性化</p>
          <p> assets中的图片移到static</p>
          

        </span>
      </span>
    
    </el-dialog>


    <el-dialog :close-on-click-modal=false :visible.sync="adviceVisible" width="40%" :before-close="handleClose">
      <span slot="title">
        <span><i class="el-icon-edit"></i>&nbsp&nbsp请告诉我们您的建议：</span>
      </span>
      <textarea cols="70" rows="14" class='textarea1' v-model='adviceContent'></textarea>
      <span slot="footer" class="dialog-footer">
        <el-button @click="anonSubmit" style="margin-right: -12px;">匿名投递</el-button>
        <el-button @click="rNSubmit">实名投递</el-button>
      </span>
    </el-dialog>

    <el-dialog :close-on-click-modal=false :visible.sync="registerVisible" width='25rem' :before-close="handleClose">
      <span>账号： </span>
      <el-input style="margin-bottom:14px;" placeholder="请输入账号" v-model="rgId" clearable maxlength='14'>
      </el-input>
      <span>密码： </span>
      <el-input placeholder="请输入密码" v-model="rgPassword1" show-password style="margin-bottom:14px;"></el-input>
      <span>确认密码： </span>
      <el-input placeholder="请再次输入密码" v-model="rgPassword2" show-password></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="rgSubmit">注册</el-button>
      </span>
    </el-dialog>

    <el-dialog :close-on-click-modal=false :visible.sync="loginVisible" width='25rem' :before-close="handleClose">
      <el-tooltip content="登陆以能锁更多功能（不登录也可以正常看帖以及匿名发帖的）" placement="right" effect="dark" :open-delay = 200>
        <span class="loginHelp" >?</span></el-tooltip>
      <span>账号： </span>
      <el-input style="margin-bottom:14px;" placeholder="请输入账号" v-model="lgId" clearable></el-input>
      <span>密码： </span>
      <el-input placeholder="请输入密码" v-model="lgPassword" show-password style="margin-bottom:14px;"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="lgSubmit">登录</el-button>
      </span>
    </el-dialog>

    <el-dialog title="更换头像" :visible.sync="changeProfile1"  :before-close="handleClose">
 
          <span v-for = "(item,index) in pfList" >
            <img ref="imag" :src="item" class="choosePf" @click="box2(index)" >
          </span>

        <span slot="footer" class="dialog-footer">
          <el-button @click="changePfSuccess(photoOrder)" style="margin-right: -12px;">确定</el-button>
          <el-button @click="changeProfile1 = false">取消</el-button>
        </span>
    </el-dialog>

    <div class="router1">
      <el-menu :default-active="$route.path"  router unique-opened class="el-menu-demo" mode="horizontal" 
      background-color="#F2E797" active-text-color="black" text-color="#2B2C2D">    
                    <el-menu-item v-for="child in $router.options.routes[0].children"  :index="child.path"
           :key="child.path">
                           <i :class="child.iconCls"></i>{{child.direction}}
        
                      </el-menu-item>
                  </el-submenu>    
      </el-menu>
      <div style="width:100%;height:0.05px;background-color:#409EFF"></div>

      <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >

    <el-menu-item index="1"><router-link to="/"> 默认</router-link></el-menu-item>
    <el-menu-item index="2"><router-link to="/page1">实名帖</router-link></el-menu-item>
    <el-menu-item index="3" >匿名帖</el-menu-item>
    <el-menu-item index="4" style="margin-left:36px;">  我的收藏</el-menu-item>
    <el-menu-item index="5" >私人笔记</el-menu-item>
  </el-menu> -->



    <router-view ></router-view>
    <div><br><br></div>
    </div>

  </div>

</template>

<script >


  export default {
    name: 'App',

    data() {
      return {
        x1:false,
        changeProfile1:false,
        activeIndex: '1',
        adviceVisible: false,
        registerVisible: false,
        loginVisible: false,
        adviceContent: '',
        res: [],
        currentPage: 1, //默认显示页面为1
        pagesize: 10, //    每页的数据条数
        input: '',
        rgId: '',
        rgPassword1: '',
        rgPassword2: '',
        lgId: '',
        //this.$store.getters.iName;
        lgPassword: '',
        about: false,
        isLogin:false,
       
        myProfile:'',
        img1:"pf99",
        a:'',
        photoOrder:'',
        pfList:[
       require( '@/assets/pf1.png'),
       require( '@/assets/pf2.png'),
       require( '@/assets/pf3.png'),
       require( '@/assets/pf4.png'),
       require( '@/assets/pf5.png'),
       require( '@/assets/pf6.png'),
       require( '@/assets/pf7.png'),
       require( '@/assets/pf8.png'),
       require( '@/assets/pf9.png'),
       require( '@/assets/pf10.png'),
       require( '@/assets/pf11.png'),
       require( '@/assets/pf12.png'),

        ]
      };
    },

    created() {
      var that = this;
      this.getProfile();
    },
  mounted() {
     this.lgId = this.$store.state.iName;
      if(this.lgId != ''){
        this.isLogin = true
      }
   
   
  },  
    methods: {

      box2(index){
      
       for(var i=0;i<this.pfList.length;i++){
                    if(i!==index){//没选中的清除样式
                      this.$refs.imag[i].style.border="";
                      this.$refs.imag[i].style.width="96px";
                        this.$refs.imag[i].style.height="96px";
                         
                    }else{//选中图片的样式
                        this.$refs.imag[i].style.border="3px groove rgb(240, 76, 76)";
                        this.$refs.imag[i].style.width="102px";
                        this.$refs.imag[i].style.height="102px";
                    }
                }     
                this.photoOrder = index+1;   
                



      },
      getProfile(){
        
        var that = this;
        if(this.$store.state.iName != ''){
          that.$axios({
            url: 'http://120.77.245.87:3000/users/myMsg',
            method: "get",
            params:{user_name:that.$store.state.iName}
          }).then(r => {

          that.img1 = r.data[0].img;
         
          }).then(err =>{}
          //console.log(err)
          )
        }
     
      },

      handleClose(done) {
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        done();
        // })
        // .catch(_ => {});
      },
      changeProfile(){
        this.changeProfile1 = true
      },
      changePfSuccess(photoOrder){

        var that = this;
       
        that.$axios({
          url: 'http://120.77.245.87:3000/users/changeImg',
          method: "post",
          data:{
            user_name:this.$store.state.iName,
            img:'pf'+this.photoOrder
          }
          
          
        }).then(r => {
          this.$message({
            message: '头像修改成功',
            type: 'success'

          });

       
        that.getProfile();
        that.changeProfile1 = false;
        }).then(err =>{})
      },
      anonSubmit() {
        if (this.adviceContent == "") {
          this.$message({
           message: '内容不能为空！',
           type: 'warning'
           

          });
        }
        else {
         // this.adviceVisible = false;
          this.$message({
            // message: '匿名投递成功',
            // type: 'success'
            message: '该功能尚未开放！',
            type: 'warning'

          });
        }
      },
      rNSubmit() {
        if (this.adviceContent == "") {
          this.$message({
            message: '内容不能为空！',
            type: 'warning'

          });
        }
        else {
         // this.adviceVisible = false;
          this.$message({
          //  message: '实名投递成功',
          //  type: 'success'
          message: '该功能尚未开放！',
            type: 'warning'

          });
        }
      },
      rgSubmit() {
        if (this.rgId === "") {
          this.$message({
            message: '账号不能为空！',
            type: 'warning'

          });
        }
        else if (this.rgPassword1 === '') {
          this.$message({
            message: '密码不能为空！',
            type: 'warning'

          });
        }
        else if (this.rgPassword1 !== this.rgPassword2) {
          this.$message({
            message: '两次输入密码不相同！',
            type: 'warning'

          });
        }
        else {    
          var that = this;
          that.$axios({
            url: 'http://120.77.245.87:3000/users/regist',
            method: "post",
            data: { user_name: that.rgId, pwsd: that.rgPassword1,time: global.getDate.getDate(),img:"pf6"}
          }).then(r => {

            if(r.data){
              that.registerVisible = false;
              this.$message({
                  message: '注册成功',
                  type: 'success'

                });
              }
            else{
            this.$message({
                  message: '账号已存在！',
                  type: 'warning'

                });
              }
          })

        }
      },

      lgSubmit() {
        var that = this;
          that.$axios({
            url: 'http://120.77.245.87:3000/users/login',
            method: "post",
            data: { user_name: that.lgId, pwsd: that.lgPassword}
          }).then(r => {

        if (this.lgId === "") {
          this.$message({
            message: '账号不能为空！',
            type: 'warning'

          });
        }
        else if (r.data === false){
          
          this.$message({
            message: '用户名或密码错误',
            type: 'warning'

          });
        }
        else if(r.data === true) {
          
          this.loginVisible = false;
          this.isLogin = true;
      
          // this.$store.state.iName=this.lgId;
          // this.a = this.lgId;

	      	this.$store.commit("setuserInfo", that.lgId);//更新iName


          this.getProfile();
          this.$message({
            message: '登录成功',
            type: 'success'

          });
        
        }
      })
      },
      quit(){
         this.isLogin = false;

        //this.$store.state.iName='';
 
        this.$store.commit("setuserInfo",'');//更新iName
        
     
      },
      userDetaile(user_name){
                this.$router.push({name:"user",query:{user_name:user_name}})        
      },

    }
  }

</script>

<style scoped>
  @import url(./assets/js/app.css);

</style>