<template>
  <div class="app-main-content">
    <ul class='app-main-left'>
      <li>
        <a v-link="'/admin/charts/c'">c</a></li>
      <li><a v-link="'/admin/charts/d'">d</a></li>
    </ul>
    <router-view></router-view>
  </div>
</template>
