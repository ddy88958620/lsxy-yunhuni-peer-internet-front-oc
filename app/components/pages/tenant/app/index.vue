<template>
	<div class="flex flex-direction-column">
		<div class="flex">


			<single-one-app></single-one-app>
			<single-one-app></single-one-app>
		</div>
		<div class="flex">
			<single-one-app></single-one-app>
			<single-one-app></single-one-app>
		</div>
	</div>
</template>
<script>
	export default {
		components: {
			'singleOneApp': require('./single.vue')
		}
	}
</script>


<style lang="sass" scoped>


</style>