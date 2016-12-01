<template>
  <div>
    <!--<div class="alert alert-success" role="alert">-->
      <!--禁止红名单号码作为被叫号码使用，禁止黑名单号码作为主叫号使用-->
    <!--</div>-->
    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        共<span class="text-danger">{{origin.product.totalCount ? origin.product.totalCount : 0}}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class=" text-align-c">创建时间</th>
          <th>计费项</th>
          <th>计费标识</th>
          <th>归属产品</th>
          <th>价格</th>
          <th>计价单位</th>
          <th class=" text-align-c">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='l in list.product'>
          <td class="message-time text-align-c">{{l.createTime | totalDate}}</td>
          <td>{{ l.priceItem }}</td>
          <td>{{ l.priceKey }}</td>
          <td>{{ l.productType }}</td>
          <td>{{ l.price }}</td>
          <td>{{ l.unit }}</td>
          <td class="text-align-c">
            <a v-link="'/admin/settings/product/list/price/edit/'+l.id">编辑</a>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="more">
        <a v-if='origin.product.currentPageNo >= origin.product.totalPageCount'>加载完毕</a>
        <a @click="query('more')" class="text-none" v-else>加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
  import { showMsg } from 'actions'
  export default {
    vuex: {
      actions: { showMsg }
    },
    components: {
      'datetime-picker': require('ui/datetimepicker.vue'),
      'modal': require('ui/modal.vue')
    },
    data () {
      return {
        show: {
          newNumber: false
        },
        postData: {
          type: '',
          pageNo: 1,
          newNumber: {
            type: 1,
            number: ''
          }
        },
        list: {
          product: []
        },
        origin: {
          product: {}
        }
      }
    },
    methods: {
      query (type) {
        let params = this.postData
        if(type === 'more') {
          params.pageNo = this.originData.number.currentPageNo + 1
        }
        $.get('config/product/price/plist', params).then((res) => {
          this.origin.product = res.data
          this.list.product = type === 'more' ? this.list.product.concat(res.data.result) : res.data.result
        })
      }
    },
    ready(){
      this.query()
    }
  }
</script>
<style lang="sass" scoped>
</style>
