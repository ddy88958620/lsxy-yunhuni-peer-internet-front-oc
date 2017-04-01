<template>
  <div>
     <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
          &nbsp;&nbsp;共<span class="text-danger">{{proData.product.totalCount ? proData.product.totalCount : 0 }}</span>条
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="text-align-c">服务项目</th>
            <th>基础价</th>
            <th>折扣</th>
            <th>一口价</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for='message in proData.list'>
          <td class="message-time text-align-c">{{message.name}}</td>
          <td>{{message.basePrice}}</td>
          <td>{{message.discount}}</td>
          <td>{{message.buyoutPrice}}</td>
          <td>
            <a @click='setting($index)'>配置</a>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="more">
        <a v-show='proData.product.currentPageNo >= proData.product.totalPageCount'>加载完毕</a>
        <a @click="query('more')" class="text-none" v-else>加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
      </div>
    </div>

   

    <confing-modal v-ref:config></confing-modal>
  </div>
</template>
<script>
  export default {
    components:{
      'confingModal': require('./confingModal.vue'),
      'modal':require('ui/modal.vue')
    },
    data(){
      return {
        proData:{
          list:[],
          product:{},
          page:{
            pageNo:1,
            pageSize:20
          }
        }
      }
    },
    methods: {
      query(type){
        if(type=='more') {
          this.proData.page.pageNo = this.proData.product.currentPageNo + 1
        }
        $.get('/config/product/discount/' + this.$route.params.uid + '/price/plist', this.proData.page).then((res) => {
          if (res.data.totalCount >= 0) {
            this.proData.product = res.data
            this.proData.list = type=='more' ? this.proData.list.concat(res.data.result) :res.data.result
          }
        })
      },
      setting(index){
        console.log(this.$refs.config)
        console.log(this.proData.list[index])

        this.$refs.config.origin = this.proData.list[index]
        this.$refs.config.show = true
      }
    },
    ready(){
      this.query()
    }
  }

</script>

<style lang="sass" scoped>
  .padding-ten{
    padding-left:10%;
  }
</style>