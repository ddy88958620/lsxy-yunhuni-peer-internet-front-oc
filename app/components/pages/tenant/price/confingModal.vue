<template>
  <div>
    <modal :show.sync="show" title="折扣配置" :action="set" :reset="fail" classname="small">
      <div slot="body" class="flex">
        <div class="flex flex-1">
          <div class="flex flex-1" >
            <span class="inline-block extent-text" >服务项</span>
            <span class="inline-block admin-button-margin">{{ origin.name}}</span>
          </div>
          <div class="flex flex-1 margin-top-20" >
            <span class="inline-block extent-text" >基础价格</span>
            <span class="inline-block admin-button-margin">{{ origin.basePrice}}</span>
          </div>
          <div class="flex flex-1 margin-top-20">
            <span class="inline-block extent-text" >折扣（%）</span>
            <span class="inline-block admin-button-margin"><input type="text" v-model="origin.discount" class="form-control" ></span>
          </div>
           <div class="flex flex-1 margin-top-20">
            <span class="inline-block extent-text" >一口价</span>
            <span class="inline-block admin-button-margin"><input type="text" v-model="origin.buyoutPrice" class="form-control" ></span>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
  import {showMsg} from 'actions'

  export default{
    vuex:{ actions: { showMsg } },
    props: {
      id: {
        type: String
      },
      show:{
        type: Boolean
      },
      origin:{
        type: Object
      }
    },
    components:{
      'modal': require('ui/modal.vue')
    },
    data(){
      return {
        
      }
    },
    methods: {
      set() {
        let id = this.origin.id
        let params = {
          discount: parseInt(this.origin.discount ? this.origin.discount : 0 ),
          buyoutPrice : parseInt(this.origin.buyoutPrice ? this.origin.buyoutPrice : 0)
        }
        $.post('config/product/discount/' + this.$route.params.uid + '/price/edit/'+ id +'?discount='+params.discount + '&buyoutPrice=' + params.buyoutPrice ,params).then((res) => {
          if (res.success) {
            this.showMsg( { content:res.data ,type: 'success'})
          } else {
            this.showMsg( { content: res.errorMsg, type: 'danger' })
          }
          this.show = false
        })
      },
      fail() {
        this.show = false
      }
    }
  }
</script>

<style lang='sass'>
  .extent-text{
    width: 80px;
  }
</style>