<template>
  <a @click="download(message.id)">下载</a>
</template>
<script>
	import {showMsg} from 'actions'
  export default{
		vuex:{ actions: { showMsg } },
    props: {
      message: {
        type: Object
      },
      type: {
        type: String
      }
    },
    methods: {
      download(id) {
        let uid = this.$route.params.uid

        $.get('tenant/' + uid + '/session/msg/download/'+id).then((res) => {
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
