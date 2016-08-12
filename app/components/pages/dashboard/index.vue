<template>
  <div class="app-main-content admin-padding flex-direction-column">
    <section-one></section-one>
    <section-two></section-two>
    <section-three></section-three>
    <section-four></section-four>
    <section-five></section-five>
    <section-six></section-six>
    <router-view></router-view>
  </div>
</template>
<script>
import { getAppCount } from '../../../vuex/actions'

export default {
  vuex: {
    actions:{
      getAppCount
    }
  },
  components: {
    'section-one': require('./section-one/index.vue'),
    'section-two': require('./section-two/index.vue'),
    'section-three': require('./section-three/index.vue'),
    'section-four': require('./section-four/index.vue'),
    'section-five': require('./section-five/index.vue'),
    'section-six': require('./section-six/index.vue'),
  },
  route: {
    data: function({next}) {
    	console.log(this.getAppCount())
    	return this.getAppCount()
    }
  }
}
</script>
<style lang='sass'>
@import '../../../scss/layout.scss';
</style>
