import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import Player from './Player.vue'

import {Howl, Howler} from 'howler'

Vue.use(Vuetify)
// adding this to calculate # of the song order
Vue.filter('numbers', (value) => {
  var number = value + 1;
  return number + ". "
})
// adding this to convert numbers for song duration into mins
Vue.filter('minutes', (value) => {
  var min = parseInt(value / 60);
  var sec = parseInt(value % 60);
  min = min < 10 ? "0" + min : min;
  sec = sec <10 ? "0" + sec : sec;
  value = min + ":" + sec;
  return value;
})

new Vue({
  el: '#app',
  render: h => h(Player),
})