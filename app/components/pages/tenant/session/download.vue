<template>
<div>
</div>
</template>

<script>
  export default{
    methods: {
      download (index, recordId) {
        var  serach = this.$parent.$data.serach
        var tag = $('#download' + index)
        var status = tag.attr('data-status')
        if(status == 1) {
          tag.html('正在下载<span class="download"></span>').attr('data-status', '2')
          $.get('/tenant/tenants/' + this.$route.params.uid + '/apps/' + serach.app + '/records/' + recordId + '/', {}).then((res) => {
            if (res.success && res.data != 'url') {
              window.open(res.data)
              tag.html('录音下载').attr('data-status', '1')
            } else {
              tag.html('下载失败,请重试').attr('data-status', '1')
            }
          })
        }else if(status ==  2) {
          tag.html('下载失败,请重试').attr('data-status', '1')
        }else {
          tag.html('录音下载').attr('data-status', '1')
        }
      }
    }
  }
</script>
