<template>
  <div class="app-main-content">
    <ul class='app-main-left'>
      <li>
        <a v-link="'/admin/dashboard/a'">a</a></li>
      <li><a v-link="'/admin/dashboard/b'">b</a></li>
    </ul>
    <router-view></router-view>
  </div>
</template>
