<style lang='sass' scope>
@import '../../scss/variable.scss';
.app-sidebar {
  width: $sidebar-width;
  background-color: #616888;

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
        border-left: 3px solid #f6f883;
        background-color: #515a76;
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
