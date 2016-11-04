<template>
	<!--导入线路号码-->
	<modal :show.sync="show" title="导入线路号码" :action="closeModal">
		<div slot="body">
			<form>
				<div id="uploader"></div> <a @click="">上传</a>
				<p class="text-success margin-top-20">
					请按照模板格式填写后上传（只支持Excel文件） <a href="/api/ossfile/telnum">下载模板</a>
				</p>
			</form>
		</div>
	</modal>
</template>
<script>
	export default {
		data(){
			return {
				show: false,
				upload: {}
			}
		},
		components: {
			'modal': require('ui/modal.vue'),
		},
		methods: {},
		ready(){}
	}
</script>
