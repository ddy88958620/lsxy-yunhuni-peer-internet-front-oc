<template>
		<section-one></section-one>
	  <section-two></section-two>
</template>
<script>
	export default {
		components: {
			'section-one': require('./section-one/index.vue'),
			'section-two': require('./section-two/index.vue')
		},
		route: {
			data(){
				console.log(this.$route)
			}
		}
	}
</script>