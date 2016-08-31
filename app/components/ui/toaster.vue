<template>
	<div v-if="show">
		<p :class="{
      'bg-success': type==='success',
      'bg-danger': type==='danger',
      }"
		   transition="fade"
		>
			{{content}}
		</p>
	</div>
</template>
<script type="text/javascript">

export default {
  props: {
  	show: {
  		type: Boolean,
		  towWays: true
	  },
    type: {
      type: String,
      default: 'bg-success'
    },
    content: {
      type: String,
      default: '',
      twoWays: true
    },
	  title: {
    	type: String
	  }
  },
	ready(){}
}
</script>
<style lang='sass' scoped>

p{
  padding: 15px;
  width: 300px;
  text-align: center;
  position: fixed;
  left: 50%;
  top: 30px;
  transform: translate(-50%, -50%);
}
</style>
