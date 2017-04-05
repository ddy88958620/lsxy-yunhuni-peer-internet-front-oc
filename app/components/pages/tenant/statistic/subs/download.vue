<template>
  <span class="datepicker-wrap">
    <button class="btn btn-primary" @click="download">表格下载</button>
  </span>
</template>
<script>
	import {showMsg} from 'actions'
  export default{
		vuex:{ actions: { showMsg } },
    props: {
      message: {
        type: Object
      },
      params: {
        type: Object
      },
      type: {
        type: String
      }
    },
    methods: {
      download() {
        let uid = this.$route.params.uid
        let params = this.params
        $.get('tenant/tenants/' + uid + '/sub/statistic/'+this.params.type+'/download/',params).then((res) => {
          console.log(res)
          if (res.success && res.data) {
            window.location.href = res.data
          } else if ( res.errorCode === '0401') {
  					this.showMsg( { content: res.errorMsg, type: 'danger' })
          } else {
            console.log(res.errorMsg);
          }
        })
      }
    }
  }
</script>
