<template>
	<div>
		<div class="flex search-box bg-section-margin remove-margin-bottom">
			<div class="inline-block normal-font-size">
				<span>配置存储周期 : </span>
				<span>{{ app.recordingTime }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
    data(){
      return {
        app:{}
      }
    },
		ready(){
      let uid = this.$route.params.uid;
      let appId = this.$route.params.appid;
      let self = this;
      $.get('/tenant/tenants/'+uid+'/apps/'+ appId).then((res)=> {
        return res.data && (self.app = res.data);
      })
		}
	}
</script>

