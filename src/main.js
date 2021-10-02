/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// global.jQuery = require('jquery');
// let $ = global.jQuery;
// window.$ = $;

import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import moment from 'moment';

import { Form, HasError, AlertError } from 'vform';
window.Form = Form;


import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { faVuejs } from '@fortawesome/free-brands-svg-icons';

library.add(faVuejs)

library.add(fas)
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
window.Swal = Swal;
window.Toast = Toast;

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '3px'
});

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)


/**
 * Routes imports and assigning
 */
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import routes from './routes';
import { createProvider } from './vue-apollo'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
const router = new VueRouter({
  mode: 'history',
  routes
});
// Routes End

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Components
Vue.component('pagination', require('laravel-vue-pagination'));
Vue.component('dashboard', require('./components/Dashboard.vue'));

// Vue.component(
//   'passport-clients',
//   require('./components/passport/Clients.vue').default
// );
//
// Vue.component(
//   'passport-authorized-clients',
//   require('./components/passport/AuthorizedClients.vue').default
// );

// Vue.component(
//   'passport-personal-access-tokens',
//   require('./components/passport/PersonalAccessTokens.vue').default
// );

Vue.component(
  'not-found',
  require('./components/NotFound.vue').default
);

// Filter Section

Vue.filter('myDate', function (created) {
  return moment(created).format('MMMM Do YYYY');
});

Vue.filter('yesno', value => (value ? '<i class="fas fa-check green"></i>' : '<i class="fas fa-times red"></i>'));

// end Filter

Vue.component('example-component', require('./components/ExampleComponent.vue'));


Vue.config.productionTip = false

new Vue({
  apolloProvider: createProvider(),
  router,
  render: h => h(App),
}).$mount('#app')
