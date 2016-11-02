<template>
	<!--新增透传-->
	<modal :show.sync="show" title="新增透传号码" :action="closeModal">
		<div slot="body">
			<div class="form-group">
				<label class="">运营商 : </label>
				<select class="form-control input-width-select" v-model='type'>
					<option value=1>活动消息</option>
					<option value=0>用户消息</option>
				</select>
				&nbsp;
				&nbsp;
				<label class="">模糊查询 : </label>
				<div class="select-box inline-block">
					<search
						:value.sync="search"
						:action="query"
						placeholder="模糊查询"
					></search>
				</div>
			</div>
			<div class="pass_number_result">
				<input type="checkbox" v-model="selected.passNumber" value="12414"> 15002010123 <br/>
				<input type="checkbox" v-model="selected.passNumber" value="234234"> 15002010123 <br/>
				<input type="checkbox" v-model="selected.passNumber" value="234235"> 15002010123 <br/>
			</div>
			<div class="admin-table">
				<div class="more">
					<a
						v-show=''>加载完毕</a>
					<a @click="query('more')" class="text-none"
					   v-show=''>加载更多<i
						class="icon iconfont icon-oc-dropdown"></i></a>
				</div>
			</div>
			<div class="pass_number_selected">
				<span class="selected_box bg-success" v-for="number in selected.passNumber">
					{{number}} &nbsp;<button @click="deletePassNumberSelected($index)" type="button" class="close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				</span>
			</div>
		</div>
	</modal>

</template>
<script>
	export default {
		data(){
			return {
				show: false,
				selected: {
					passNumber: [],
				},
			}
		},
		components: {
			'modal': require('ui/modal.vue'),
			'search': require('ui/search-input.vue'),
		},
	}
</script>
