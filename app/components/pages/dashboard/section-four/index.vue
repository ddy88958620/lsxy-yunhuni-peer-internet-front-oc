<template>
    <section class='section_four flex bg-section-margin flex-direction-column justify-content-s '>
        <head-box></head-box>
        <div class="flex flex-direction-row justify-content-b">
          <div class="flex box" v-for="rank in allRank" >
            <ranking
              :index="$index"
              :datarank="rank"
            ></ranking>
          </div>
        </div>
    </section>



    {{ranklist | json }}
</template>
<script>
  import {getMemberRankList} from '../../../../vuex/actions'
  import headBox from './headBox.vue'
  import ranking from './ranking.vue'
  export default{
    vuex:{
      getters:{
        ranklist: ({member}) => member.ranklist
      },
      actions:{
        getMemberRankList
      }
    },
    data(){
      return{
        allRank:[
          [
            {name:'流水行院科技有限公司1',count:'2006000',rank:'1'},
            {name:'流水行院科技有限公司2',count:'25000',rank:'2'},
            {name:'流水行院科技有限公司3',count:'300',rank:'3'},
          ],
          [
            {name:'流水行院科技有限公司1',count:'1999999',rank:'1'},
            {name:'流水行院科技有限公司2',count:'25000',rank:'2'},
            {name:'流水行院科技有限公司3',count:'300',rank:'3'},
          ],
          [
            {name:'流水行院科技有限公司1流水行院科技有限公司1流水行院科技有限公司1',count:'35512',rank:'1'},
            {name:'流水行院科技有限公司1流水行院科技有限公司1流水行院科技有限公司1',count:'25000',rank:'2'},
            {name:'流水行院科技有限公司3',count:'300',rank:'3'},
          ],
          [
            {name:'流水行院科技有限公司1',count:'44651',rank:'1'},
            {name:'流水行院科技有限公司2',count:'25000',rank:'2'},
            {name:'流水行院科技有限公司3',count:'300',rank:'3'},
          ],
          [
            {name:'流水行院科技有限公司1',count:'44651',rank:'1'},
            {name:'流水行院科技有限公司2',count:'25000',rank:'2'},
            {name:'流水行院科技有限公司3',count:'300',rank:'3'},
          ],
        ]
      }
    },
    components:{
       ranking,
       headBox
    },
    ready(){
      let top = {top:3}

      this.getMemberRankList(top)
     


    }

  }
</script>

<style lang="sass">
  .section_four {
    .box{
      width: 18%;
    }
  }
</style>
