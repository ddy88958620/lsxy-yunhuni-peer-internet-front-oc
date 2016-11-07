<template>
	<!--导入线路号码-->
	<modal :show.sync="show" title="导入线路号码" :action="closeModal">
		<div slot="body">
			<div>
				<fileupload class="btn btn-info" title="添加文件"
				             name="file"
				             :post-action="url"
				             v-ref:upload
				             :drop="drop"></fileupload>
				&nbsp;
				<span>{{ filename }}</span>
				&nbsp;
				&nbsp;
				&nbsp;
				<button v-if="upload.active" type="submit" @click.prevent="$refs.upload.active = !$refs.upload.active" class="btn btn-danger">停止上传</button>
				<button v-else type="submit" @click.prevent="$refs.upload.active = !$refs.upload.active" class="btn btn-primary">开始上传</button>
				<p class="text-success margin-top-20">
					请按照模板格式填写后上传（只支持Excel文件） <a href="/api/ossfile/telnum">下载模板</a>
				</p>
			</div>
		</div>
	</modal>
</template>
<script>
	import domain from 'domain'
	export default {
		data(){
			return {
				show: false,
				url: domain.API_ROOT+'config/line/telnum/upload/' + this.$route.params.lid,
				upload: {},
				filename: ''
			}
		},
		components: {
			'modal': require('ui/modal.vue'),
			'fileupload': require('ui/upload.vue'),
		},
		vuex:{
			actions: {
				showMsg: require('actions').showMsg
			}
		},
		methods: {},
		events: {
			addFileUpload(file, component) {
				console.log('addFileUpload');
				if (this.auto) {
					component.active = true;
				}
				this.filename = file.name
			},
			fileUploadProgress(file, component) {
				console.log('fileUploadProgress ' + file.progress);
			},
			afterFileUpload(file, component) {
				console.log('afterFileUpload');
				let res = JSON.parse(file.data)
				if(!res.success){
					this.showMsg({content: res.data, type: 'danger'})
					return
				}
				this.showMsg({content: res.data, type: 'success'})
				this.$route.router.replace({path: this.$route.path, query: {t: new Date()}})
				this.show = false
				this.filename = ''
			},
			beforeFileUpload(file, component) {
				console.log('beforeFileUpload');
			},
		},
		ready(){
			this.upload = this.$refs.upload
		},
	}
</script>
<style lang="sass" scoped>
	.file-upload {
		display: block;
	}
	.file-upload span{
		display: block;
		font-size: 18px;
		padding: 1em;
		font-weight: bold;
		border: 1px solid #888;
	}
	.drop-active {
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		position: absolute;
		opacity: .4;
		background: #000;
	}
</style>
