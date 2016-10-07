/**
 * @author doodlewind
 * @licence MIT
 */
var Vue = require('vue');
var App = require('./components/App.vue');

new Vue({
  el: '#app',
  render: h => h(App)
})
