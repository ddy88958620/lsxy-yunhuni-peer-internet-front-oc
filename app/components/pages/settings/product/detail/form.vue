<template>
  <form class="form-horizontal line-form" role="form">
    <div class="form-group">
      <label class="control-label">计费项 : </label>
      <input v-model="post.priceItem" type="text" class="form-control" placeholder="">
    </div>
    <div class="form-group">
      <label class="control-label">计费标识 : </label>
      <span>{{ post.priceKey }}</span>
    </div>
    <div class="form-group">
      <label class="control-label">所属产品 : </label>
      <span> {{ post.productType }}</span>
    </div>
    <div class="form-group">
      <label class="control-label">价格(元) : </label>
      <input v-model="post.price" type="number" class="form-control" placeholder="" number>
    </div>
    <div class="form-group">
      <label class="control-label">计价单位 : </label>
      <select class="form-control" v-model='post.unit' >
        <option value=''>请选择单位</option>
        <option v-for='l in list.priceType' :value='l.name'>{{l.name}}</option>
      </select>
    </div>
  </form>
</template>
<script>
  import vSelect from "vue-select"
  export default {
    vuex: {
      actions: {showMsg: require('actions').showMsg}
    },
    data(){
      return {
        search: false,
        post: {
          price: 0,
          priceKey: '',
          priceItem: '', // 计费项
          productType: '', // 归属产品
          unit: '' // 计价单位
        },
        list: {
          priceType: [],
          productType: []
        },
        selected: {
          province: [],
          tenant: ''
        }
      }
    },
    components: {
      vSelect,
      'modal': require('ui/modal.vue')
    },
    watch: {},
    methods: {
      fetchPirceType () {
        $.get('/config/product/price/type/list/' + this.$route.params.pid).then((e) => {
          this.list.priceType = e.data
        })
      }
    },
    ready () {
      this.fetchPirceType()
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .v-select {
    .dropdown-toggle {
      border: none !important;
    }
    .selected-tag{
      background-color: #fff  !important;;
      border:none !important;;
      margin: 0 !important;;
    }
  }
</style>
