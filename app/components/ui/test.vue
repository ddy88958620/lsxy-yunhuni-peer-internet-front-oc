<template>
	<div>
		{{ max }}
		{{ min }}
	</div>
</template>
<script>
	export default {
		props: {
			min: {
				type: Number,
				twoWays: true,
				default: 0
			},
			max: {
				type: Number,
				twoWays: true
			},
		}
	}
</script>
