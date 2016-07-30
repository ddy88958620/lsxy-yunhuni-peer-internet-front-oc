<template>



	<div class="flex flex-1 bg-section-margin">
		<div class="btn-group  " role="group" >
			<button type="button" class="btn btn-primary">语音呼叫</button>
			<button type="button" class="btn btn-default">语音回拨</button>
			<button type="button" class="btn btn-default">会话服务</button>
			<button type="button" class="btn btn-default">语音验证码</button>
			<button type="button" class="btn btn-default">录音服务</button>
			<button type="button" class="btn btn-default">IVR定制服务</button>
		</div>
	</div>



	<div class="headbox flex flex-1 align-items-c ">
		<span class="m-title flex ">选择应用</span>
		<select class="form-control flex">
			<option value="">飞飞应用</option>
		</select>
	</div>

	<mytable></mytable>

</template>

<script>
	export default{
		components:{
			'mytable': require('./table.vue')
		},
		data(){
			return{
			}
		}

	}
</script>

<style lang="sass" scoped>


</style>
