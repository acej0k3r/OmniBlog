import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ProfileView from '../views/ProfileView.vue'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        title: 'Home',
        description : 'The main page of the omni blog. It contains highlight of blogs as well as the latest blogs'
      }
    },
    {
      path: '/blog',
      name: 'blog',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BlogView.vue'),
      meta:{
        title: 'Blog',
      }
    },
    {
      path: '/create-post',
      name: 'post',
      // route level code-splitting
      // this generates a separate chunk (Blog.[hash].js) for this route
      // which is lazy-loaded when the route is 
      component : () =>  import('../views/CreatePostView.vue') ,
      meta:{
        title: 'Post'
      }
    },{
      path: '/login',
      name : 'login',
      component : LoginView,
      meta:{
        title: 'Login',
      }
    },{
      path: '/register',
      name : 'register',
      component : RegisterView,
      meta:{
        title: 'Register',
      }
    },{
      path: '/forgot-password',
      name : 'forgotpassword',
      component : ForgotPasswordView,
      meta:{
        title: 'Forgot Pasword',
      }
    },{
      path: '/profile',
      name : 'profile',
      component : ProfileView,
      meta:{
        title: 'Profile',
      }
    },{
      path: '/admin',
      name : 'admin',
      component : AdminView,
      meta:{
        title: 'Admin',
      }
    }
  ],
  scrollBehavior(to, from, savedPosition){
    return { top : 0 };
  },
  
})



router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | OmniBlog`;
  //dynamic meta integration
  
  const metaDescriptionTag = document.querySelector(`meta[name="description"]`);
  
  if(metaDescriptionTag){
    metaDescriptionTag.setAttribute('content', to.meta.description);
  }else{
    const meta = document.createElement('meta');
    meta.name = "description";
    meta.content = `${to.meta.description}`;
    document.head.appendChild(meta); 
  }
  
  next();
})


export default router
