<template>
    <section class='section_four flex bg-section-margin flex-direction-column justify-content-s '>
        <head-box></head-box>
        <div class="no-wrap">
          <div class="box inline-block width-20"  v-for="rank in ranklist" >
            <ranking :rank='rank' :index=$index></ranking>
          </div>
        </div>
    </section>
</template>
<script>
  import { getMemberRankList } from 'actions'
  import headBox from './headBox.vue'
  import ranking from './ranking.vue'
  export default{
    vuex: {
      getters: {
        ranklist: ({ member }) => member.ranklist
      },
      actions: {
        getMemberRankList
      }
    },
    components: {
      ranking,
      headBox
    },
    ready () {
      this.getMemberRankList({ top: 3 })
    }
  }
</script>

<style lang="sass">
  .section_four {
    .box{
    }
  }
  .width-20 {
    width: 20%;
	  padding: 0 10px;
  }
</style>
