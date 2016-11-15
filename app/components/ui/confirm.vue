<template>
	<div class="modal" v-show="show" transition="fade">
		<div class="modal-table-wrap">
		<div class="modal-dialog">
			<div class="modal-content inline-block">
				<!--头部-->
				<div class="modal-header">
					<slot name="header">
						<p class="title">{{modal.title}}</p>
					</slot>
					<i class="icon iconfont icon-oc-close-middle cursor close float-r" @click="close(0)"></i>
				</div>
				<!--内容区域-->
				<div class="modal-body">
					<slot name="body">
						<p class="notice">{{modal.text}}</p>
					</slot>
				</div>
				<!--尾部,操作按钮-->
				<div class="modal-footer float-r">
					<slot name="button">
						<a v-if="modal.showCancelButton" href="javascript:void(0)" class="btn {{modal.cancelButtonClass}}"
						   @click="close(1)">{{modal.cancelButtonText}}</a>
						<a v-if="modal.showConfirmButton" href="javascript:void(0)" class="btn {{modal.confirmButtonClass}}"
						   @click="submit">{{modal.confirmButtonText}}</a>
					</slot>
				</div>
			</div>
		</div>
		</div>
	</div>
	<div v-show="show" class="modal-backup" transition="fade"></div>
</template>
<script>
	export default {
		/**
		 * modal 模态接口参数
		 * @param {string} modal.title 模态框标题
		 * @param {string} modal.text 模态框内容
		 * @param {boolean} modal.showCancelButton 是否显示取消按钮
		 * @param {string} modal.cancelButtonClass 取消按钮样式
		 * @param {string} modal.cancelButtonText 取消按钮文字
		 * @param {string} modal.showConfirmButton 是否显示确定按钮
		 * @param {string} modal.confirmButtonClass 确定按钮样式
		 * @param {string} modal.confirmButtonText 确定按钮标文字
		 */
		props: {
			modalOptions: {
				type: Object,
				default: function(){
					return {}
				},
				required: false,
			}
		},
		computed: {
			/**
			 * 格式化props进来的参数,对参数赋予默认值
			 */
			modal: {
				get() {
					let modal = this.modalOptions;
					modal = {
						title: modal.title || '提示',
						text: modal.text || '你确认要执行这操作吗？',
						showCancelButton: typeof modal.showCancelButton === 'undefined' ? true : modal.showCancelButton,
						cancelButtonClass: modal.cancelButtonClass ? modal.showCancelButton : 'btn-default',
						cancelButtonText: modal.cancelButtonText ? modal.cancelButtonText : '取消',
						showConfirmButton: typeof modal.showConfirmButton === 'undefined' ? true : modal.cancelButtonClass,
						confirmButtonClass: modal.confirmButtonClass ? modal.confirmButtonClass : 'btn-primary',
						confirmButtonText: modal.confirmButtonText ? modal.confirmButtonText : '确定',
					};
					return modal;
				},
			},
		},
		data() {
			return {
				show: false,   // 是否显示模态框
				resolve: '',
				reject: '',
				promise: '',  // 保存promise对象
			};
		},
		methods: {
			/**
			 * 确定,将promise断定为完成态
			 */
			submit() {
				this.resolve('submit');
			},
			/**
			 * 关闭,将promise断定为reject状态
			 * @param type {number} 关闭的方式 0表示关闭按钮关闭,1表示取消按钮关闭
			 */
			close(type) {
				this.show = false;
				this.reject(type);
			},
			/**
			 * 显示confirm弹出,并创建promise对象
			 * @returns {Promise}
			 */
			confirm() {
				this.show = true;
				this.promise = new Promise((resolve, reject) => {
					this.resolve = resolve;
					this.reject = reject;
				});
				return this.promise;   //返回promise对象,给父级组件调用
			},
		},
	}
</script>
<style>
	.modal {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 1001;
		-webkit-overflow-scrolling: touch;
		outline: 0;
		overflow: scroll;
		display: table;
	}
	
	.modal-table-wrap {
		display: table-cell;
		vertical-align: middle;
	}
	.modal-dialog {
		background: #fff;
		margin: 0 auto;
		width: 400px;
	}
	
	.modal-content {
		width: 100%;
	}
	
	.modal-backup {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.5);
	}
	
	.modal-header {
		line-height: 1.3;
		margin-top: 0;
		padding: 10px;
		color: #FFF;
		background-color: #008fd5;
	}
	
	.modal-body {
		padding: 30px;
	}
	
	.modal-footer{
		padding: 10px;
	}
</style>