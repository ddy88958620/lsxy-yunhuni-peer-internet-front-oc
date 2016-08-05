<template>
  <div>
    <div class="admin-table table-responsive">
      <div class="table-total flex flex-1 justify-content-e">
        共<span class="text-danger">20</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">充值时间</th>
          <th>充值额（元）</th>
          <th>充值方式</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in messages'>
          <td class="message-time text-align-c">{{message.date}}</td>
          <td>{{message.money}}</td>
          <td>{{message.type}}</td>
        </tr>
        </tbody>
      </table>
      <div class="more"><a @click="moreMessage" class="text-none">加载更多<i class="icon iconfont icon-oc-dropdown" ></i></a></div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        messages: [],
        total : 100
      }
    },
    methods: {
      moreMessage(){
        this.messages.push(
          {
            date: '2016-06-06',
            money: '20',
            type:'支付宝充值'
          }
        )
      }
    },
    route: {
      data(){


      }
    },
    ready(){
      this.messages = [
        {
          date: '2016-06-06',
          money: '20',
          type:'手工充值'
        },
        {
          date: '2016-06-06',
          money: '4112',
          type:'支付宝充值'
        },
        {
          date: '2016-06-06',
          money: '1000',
          type:'银联充值'
        },
        {
          date: '2016-06-06',
          money: '523',
          type:'支付宝充值'
        }
      ]
    }

  }

</script>
