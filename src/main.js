import Vue from 'vue'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'

import App from './App'
import store from './store'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
Vue.use(VueResource)
Vue.use(VueLazyload, {
    error: require('./assets/loading.svg'),
    loading: require('./assets/loading.svg'),
    attempt: 1
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

//获取当前页面的信息
$rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {  
  $rootScope.previousState = from; //from为前一个页面的路由信息：url,cache,views,name  
  $rootScope.previousParams = fromParams; //fromParams为前一个页面的ID信息  
  $rootScope.nowState = to; //to为当前页面的路由信息：url,cache,views,name，同样，toParams为当前页面的ID信息  
  });  

  $scope.first = null;
//监听手机返回键
  document.addEventListener("plusready", function() {
     $scope.webview = plus.webview.currentWebview();
     plus.key.addEventListener('backbutton', function () {
         $scope.webview.canBack(function (e) {
         if($rootScope.nowState.name == 'Main0'){               		              		
             //首次按键，提示‘再按一次退出应用’
             if (!$scope.first) {
                 $scope.first = new Date().getTime();
                 plus.nativeUI.toast('再按一次退出应用');
                 setTimeout(function() {
                     $scope.first = null;
                 }, 1000);
                } else {                      
                     plus.runtime.quit();                      
                }              
             } else if (e.canBack && localStorage.getItem('uid') && localStorage.getItem('openid')) {
                 $scope.webview.back();					
             } else{
               plus.runtime.quit();
             }
         })
     });
 });
