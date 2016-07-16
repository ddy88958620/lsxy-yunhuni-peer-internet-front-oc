<style lang='sass' scope>
@import '../../scss/variable.scss';
.app-sidebar {
  width: $sidebar-width;
  background-color: #616888;
  a {
    color: white;
  }
  .active{
    border-left: 3px solid #f6f883;
    background-color: #515a76;
    color: #fff;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      a {
        width: 100%;
        padding: 15px;
        &:hover{
          padding-left: 12px;
          @extend .active;
        }
      }
      a.v-link-active {
        @extend a;
        @extend .active;
        padding-left: 12px;
      }
    }
  }
}
</style>
<template>
  <aside class='app-sidebar'>
    <ul class="flex-direction-column-reverse fex fex-1 ">
      <li class="flex" v-for='menu in menus'>
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
