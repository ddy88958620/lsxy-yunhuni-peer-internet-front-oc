<template>
  <a @click="download(message.id)" data-status="1" v-if="message.cost > 0 && message.recording !== 0">录音下载</a>
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
        $.get('tenant/' + uid + '/'+this.type+'/download/'+id).then((res) => {
          if (res.success && res.data) {
            window.location.href = res.data
          } else if ( res.errorCode === '0401') {
  					this.showMsg( { content: res.errorMsg, type: 'danger' })
          } else {
            console.log(res.errorMsg);
            this.downloadPolling(res.errorMsg)
          }
        })
      },
      downloadPolling(id) {
        let count = 5
        this.temp = setInterval(()=> {
          $.get('tenant/polling/'+id).then((res) =>{
            if(res.success && res.data) {
              clearInterval(this.temp)
              window.location.href = res.data
            } else {
    					this.showMsg( { content: res.errorMsg, type: 'danger' })
              count = count - 1
              if (count === 0) {
      					this.showMsg( { content: '录音文件下载超时,请稍后重试', type: 'danger' })
                clearInterval(this.temp)
              }
            }
          })
        }, 1500)
      }
    }
  }
</script>
