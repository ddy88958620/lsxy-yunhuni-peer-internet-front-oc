<template>
	<div>
		<div class="flex flex-direction-column admin-table-header">
			<h4 >查看消息</h4>
		</div>
		<div class="">
			<div class="admin-form flex flex-direction-row align-items-c">
				<label for="title" class="lable flex">标题:</label>
				<div class="flex-1">
					{{title}}
				</div>
			</div>
			<div class="admin-form flex flex-direction-row align-items-s">
				<label for="content" class="lable flex">正文:</label>
				<div class="" id="cont">
				</div>
			</div>

			<div class="admin-form flex flex-direction-row align-items-s">
				<label class="linetime" for="content">上线时间:</label>
				<div class="flex">
					{{line}}
				</div>
			</div>

			<div class="admin-form flex flex-direction-row align-items-s">
				<label for="content"><button class="btn btn-default" v-link="'/admin/message/list'">返回</button></label>
			</div>
		</div>
	</div>
</template>
<script>
	import Simditor from 'simditor'
	import {NewMessage} from '../../../vuex/actions.js'
	import * as filter from '../../../utils/filters'
	export default {
		vuex: {
			getters: {
				
			},
			actions :{
				NewMessage
			}
		},
		data(){
			return {
				text: 'test',
				date : '',
				title: '',
				content: '',
				line: '',
				status:'',
			}
		},
		components: {
			'datetimepicker': require('../../ui/datetimepicker.vue')
		},
		ready(){
			let mid = this.$route.params.mid
			let self = this
			$.get('/message/detail/' + mid).then((res)=> {
				self.content = res.data.content
				
				self.status = res.data.status
				var html = document.getElementById('cont')
				html.innerHTML = self.content
				self.title = res.data.title
				self.line = filter.totalDateWithNoSeconds(res.data.lineTime)
			})
		}
	}
</script>
<style lang="sass" >
	@import '~simditor/styles/simditor.css';
	
	.label {
		width: 50px;
		margin-bottom: 0px;
	}

	.admin-form {
		margin-top: 20px;
		$input-width: 900px;
	label {
		width: 50px;
		margin-bottom: 0px;
	}
	
	input, .simditor {
		width: $input-width;
	}
	.linetime{
		width: 60px;
	}

	}

</style>
