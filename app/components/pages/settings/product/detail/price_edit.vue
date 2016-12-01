<template>
  <div class="admin-table-header">
    <line-form v-ref:edit class="margin-top-20"></line-form>
    <div class="admin-bottom admin-top">
      <button  class="btn btn-primary" @click="save">保存</button>
      <button  class="btn btn-default admin-margin-l" v-link="{name: 'priceList'}">返回</button>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return { }
    },
    vuex: {
      actions: {showMsg: require('actions').showMsg}
    },
    components: {
      lineForm: require('./form.vue')
    },
    methods: {
      fetch () {
        $.get('config/product/price/' + this.$route.params.pid).then((e) => {
          if (e.errorMsg) {
            this.showMsg({ content: e.errorMsg, type: 'danger' })
            return
          }
          this.$refs.edit.post = e.data
        })
      },
      save () {
        $.put('config/product/price/edit/' + this.$route.params.pid, this.$refs.edit.post).then((e) => {
          if (e.errorMsg) {
            this.showMsg({ content: e.errorMsg, type: 'danger' })
            return
          }
          this.showMsg({ content: '修改成功', type: 'success' })
          this.$route.router.go({ name: 'priceList' })
        })
      }
    },
    ready(){
     this.fetch()
    }
  }
</script>
