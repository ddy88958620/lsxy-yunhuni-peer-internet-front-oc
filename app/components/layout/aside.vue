<style lang='sass'>
@import '../../scss/variable.scss';
.app-sidebar {
  border: 1px solid red;
  position: fixed;
  top: $header-height;
  height: 100%;
  width: $sidebar-width;

  ul {
    list-style: none;
    padding: 0;
  }

}
</style>
<template>
  <aside class='app-sidebar'>
    <ul>
      <li v-for='menu in menus'>
        <a v-link="menu.link">{{ menu.title }}</a>
      </li>
    </ul>
  </aside>
</template>
<script>
import menus from '../../config/menu.js'

export default {
  data() {
    return {
      menus: menus,
    }
  }
}

</script>
