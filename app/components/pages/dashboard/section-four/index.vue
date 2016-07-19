<template>
    <section class='section_four flex bg-section-margin flex-direction-column justify-content-s '>
        <head-box></head-box>
        <div class="flex flex-direction-row justify-content-b  ">
            <ranking></ranking>
            <ranking></ranking>
            <ranking></ranking>
            <ranking></ranking>
            <ranking></ranking>
        </div>
    </section>
</template>
<script>
  import headBox from './headBox.vue'
  import ranking from './ranking.vue'
  export default{

    components:{
       ranking,
       headBox
    }

  }
</script>

<style>
  .section_four {

  }
</style>
