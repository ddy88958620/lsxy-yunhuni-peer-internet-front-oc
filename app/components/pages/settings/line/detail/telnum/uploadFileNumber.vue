<template>
	<!--导入线路号码-->
	<modal :show.sync="show" title="导入线路号码" :action="closeModal">
		<div slot="body">
			<input type="file" @change="uploadNumber"/> 请上传文件
			<p class="text-success margin-top-20">
				请按照模板格式填写后上传（只支持Excel文件） <a href="">下载模板</a>
			</p>
		</div>
	</modal>
</template>
<script>
	export default {
		data(){
			return {
				show: false
			}
		},
		components: {
			'modal': require('ui/modal.vue'),
		},
		methods: {
			uploadNumber(e){
				let file = e.target.files[0]
				
				$.file('config/line/telnum/upload/'+this.$route.params.lid, file).then((e)=>{
					console.log(e)
				})
			}
		}
	}
</script>