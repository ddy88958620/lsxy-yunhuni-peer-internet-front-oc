<template>
		<section-one></section-one>
	  <section-two></section-two>
		<section-three></section-three>
		<section-four></section-four>
		<!--<section-five></section-five>-->
</template>
<script>
	export default {
		components: {
			'section-one': require('./section-one/index.vue'),
			'section-two': require('./section-two/index.vue'),
			'section-three': require('./section-three/index.vue'),
			'section-four': require('./section-four/index.vue'),
			'section-five': require('./section-five/index.vue')
		},
		route: {
			data(){
				console.log(this.$route)
			}
		}
	}
</script>