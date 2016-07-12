<style lang='sass' scope>
@import '../../scss/variable.scss';
.app-sidebar {
  position: absolute;
  top: $header-height;
  height: 100%;
  width: $sidebar-width;
  background-color: #222d32;

  a {
    color: white;
  }

  ul {
    list-style: none;
    padding: 0;
    $height: 50px;

    li {
      a {
        width: 100%;
        padding-left: 15px;
        height: $height;
        line-height: $height;
        display: inline-block;
      }
      a.v-link-active {
        @extend a;
        background-color: #1fc8db;
        color: #fff;
      }
    }
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
