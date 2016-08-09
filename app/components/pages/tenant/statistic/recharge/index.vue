<template>
	<div class="flex flex-1 admin-padding  bg-section-margin whilebg ">
		<chart :uuid="'realtime-app-chart1'" :label="['']" :color="['#deef70']" :title="['充值统计','充值额(元)']"></chart>
	</div>
	<div class="flex-flex-1 bg-section-margin">
		<admin-table></admin-table>
	</div>
</template>
<style lang="sass" scoped>

</style>
<script>
	export default{
		components: {
			'chart': require('../../../../ui/realtime-chart.vue'),
			'admin-table': require('./table.vue')
		}
	}
</script>
