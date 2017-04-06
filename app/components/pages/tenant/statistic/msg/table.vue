<template>
  <div>
    <div class="admin-table">
      <div class="table-total flex flex-1 justify-content-e float-r">
        共<span class="text-danger">{{ value.length }}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">日期</th>
          <th>闪印发送总量</th>
          <th>闪印成功发送量</th>
          <th>闪印失败发送量</th>
          <th>短信发送总量</th>
          <th>短信成功发送量</th>
          <th>短信失败发送量</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in value' track-by="$index">
          <td class="message-time text-align-c">2016-{{ month ? month+'-' : '' }}{{$index+1}} </td>
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
      appId: {
        type: String,
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
    },
    methods:{
      query(type){

        
      }
    }
  }

</script>
