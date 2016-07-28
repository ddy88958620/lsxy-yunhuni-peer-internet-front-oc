<template>
		<section-one></section-one>  
</template>
<script>
	export default {
		components: {
			'section-one': require('./section-one/index.vue'),
		},
		route: {
			data(){
				console.log(this.$route)
			}
		}
	}
</script>