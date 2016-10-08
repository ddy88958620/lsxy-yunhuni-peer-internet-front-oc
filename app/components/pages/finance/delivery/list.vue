<style lang="sass" scoped>

</style>
<template>
	<div class="flex flex-direction-column admin-table-header">

		<div class="flex flex-1 admin-main-tab">
			<div class="tab inline-block"><a class="" v-link="'/admin/finance/delivery/list/unsend'">待寄出</a></div>
			<div class="tab inline-block"><a class="" v-link="'/admin/finance/delivery/list/send'">已寄出</a></div>
		</div>
	</div>
	<router-view></router-view>
</template>
<script>
	export default {
		components: {
			'datetime-picker': require('../../../ui/datetimepicker.vue'),
			'search': require('../../../ui/search-input.vue')
		},
		ready(){

		}
	}
</script>
