<template>
	<div class="single-box inline-block while" v-for="app in appdata">
		<header class="flex flex-1 flex-direction-column header-box normal-font-size"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/app/detail/'+app.id+'/play'">
			<div class="flex text-align-r">
				<span v-if="app.status == 1" class="inline-block down">已上线</span>
				<span v-else class="inline-block down">未上线</span>
			</div>
			<div class="flex flex-1 flex-direction-column justify-content-c align-items-c">
				<img src="../../../../../assets/images/app.png" width="100" height="100">
				<p class="bigger-font-size name">{{ app.name}}</p>
				<p>应用标识: {{ app.id}}</p>
				<p>选择服务: <span v-if="app.serviceType ==='voice'">语音</span><span	 v-if="app.serviceType==='call_center'">呼叫中心</span></p>
				<p class="text-center word-wrap">{{ app.description ? app.description :'这家伙很懒，什么都没留下'}}</p>
			</div>
		</header>

		<main class="inline-block whilebg middle-font-color  flex-direction-column main-box ">
			<div class="block">
				<div class="hr-title inline-block middle-font-size middle-font-color">上月指标</div>
			</div>

			<div class="flex  ">
				<div class="inline-block width-32 append-solid float-l ">
					<span class="green money word-wrap">{{ app.consume ? app.consume : '0' }} </span>
					<span>消费额(元)</span>
				</div>

				<div class="inline-block width-32 append-solid float-l">
					<span class="green money word-wrap">{{ app.sessionCount ? app.sessionCount : '0' }}</span>
					<span>会话量(次)</span>
				</div>
				<div class="inline-block width-32 float-l">
					<span class="green money word-wrap">{{ app.amongDuration ? app.amongDuration : '0' }}</span>
					<span>话务量(分钟)</span>
				</div>
			</div>
		</main>
	</div>

</template>

<script>
	export default{
		props:{
			appdata :{
				type:Array
			}
		}
	}
</script>


<style lang="sass" scoped>
	.single-box{
		width: 50%;
		padding: 0 20px 0 0;
		margin-bottom: 20px;
	}
	.header-box{
		text-align: center;
		padding: 20px;
		background-color:#97a1be;
		.name{
			margin-top: 10px;
		}
	}
	.main-box{
		width: 100%;
		padding: 10px 0;
		min-height: 173px;
		text-align: center;
	}
	.money{
		font-size: 2.6rem;
	}
	.down{
		color: #e8e041;
	}
	.width-32{
		width: 32%;
	}

</style>