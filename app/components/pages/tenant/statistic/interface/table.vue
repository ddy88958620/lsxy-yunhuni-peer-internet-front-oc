<template>
  <div>
    <div class="admin-table table-responsive">
      <div class="table-total flex flex-1 justify-content-e">
        共<span class="text-danger">{{ value.length }}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">日期</th>
          <th>调用次数</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in value' track-by="$index">
          <td class="message-time text-align-c">2016-{{ month ? month+'-' : '' }}{{value.length-$index}}</td>
          <td>{{ message }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import DATE from '../../../../../utils/date'
  export default {
    props: {
      value: {
        type: Array,
        twoWays: true
      },
      date: {
        type: String,
	      twoWays: true
      }
    },
    computed: {
    	month(){
        let self = this
    		let month = DATE.dateParse(self.date).month
		    
        return month
      }
    }
  }

</script>
