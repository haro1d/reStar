import Vue from 'vue'
import Router from 'vue-router'

// import index from '@/components/index'
// import page2 from '@/components/page2'
// import menu from '@/components/menu'
// import myCollection from '@/components/myCollection'
// import private1 from '@/components/private1'
// import user from '@/components/user'
// import content from '@/components/content'

//const index = () => import('@/components/index')
//const page2 = () => import('@/components/page2')
//const menu = () => import('@/components/menu')
//const myCollection = () => import('@/components/myCollection')
//const private1 = () => import('@/components/private1')
//const user = () => import('@/components/user')
//const content = () => import('@/components/content')

Vue.use(Router)

export default new Router({

  routes: [

    {
      path:'/menu',
      name:'导航一',
      iconCls: 'el-icon-menu',
      children: [
        { path: '/menu/index',name: 'index', direction:'默认',iconCls: 'el-icon-s-home',
          component: resolve => require(['@/components/index'],resolve)
        },
        // { path: 'user', component: user, name: '用户页',iconCls: 'el-icon-milk-tea'},
        // { path: 'realName', component: realName, name: '实名帖' ,iconCls: 'el-icon-user',},
        // { path: 'anonym', component: anonym, name: '匿名帖' ,iconCls: 'el-icon-user-solid'},
        { path: '/menu/myCollection',  direction: '我的收藏' ,iconCls: 'el-icon-star-off',
          component: resolve => require(['@/components/myCollection'],resolve)
        },
        { path: '/menu/private1',  direction: '私人笔记' ,iconCls: 'el-icon-notebook-1',
          component: resolve => require(['@/components/private1'],resolve)
        },
      ],
      component: resolve => require(['@/components/menu'],resolve)
    },

    {
      path: '/',
      name: 'index1',  
      redirect: '/menu/index',
      //component: resolve => require(['@/components/index'],resolve)
 
    },
    {
      path: '/content',
      name: 'content',
      
      iconCls: 'el-icon-s-data',
      component: resolve => require(['@/components/content'],resolve)
    },
    {
      path: '/page2',
      name: 'page2',
      
      iconCls: 'el-icon-s-check',
      component: resolve => require(['@/components/page2'],resolve)
    },
    { 
      path: '/user', 
     
      name: 'user',
      component: resolve => require(['@/components/user'],resolve)
    },
   
    

  ]
})
