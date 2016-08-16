<template>
  <div>
    <div class="admin-table table-responsive">
      <div class="table-total flex flex-1 justify-content-e">
        消费金额: <span class="brown">100</span>元 共<span class="text-danger">20</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">呼叫时间</th>
          <th>主叫</th>
          <th>被叫</th>
          <th>时长(秒)</th>
          <th>消费金额(元)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in messages'>
          <td class="message-time text-align-c">{{message.date}}</td>
          <td>{{ message.calling }}</td>
          <td>{{ message.called }}</td>
          <td>{{ message.time }}</td>
          <td>{{ message.money }}</td>
        </tr>
        </tbody>
      </table>
      <div class="more"><a @click="moreMessage" class="text-none">加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        messages: [],
        total: 100
      }
    },
    methods: {
      moreMessage(){
        this.messages.push(
          {
            id: 4,
            calling: '13611460986',
            called: '13611452022',
            status: '正常',
            time: '1.23',
            money: '10',
            date: '2016-06-06 16:00',
            name: '流水行云科技有限公司',
          }
        )
      }
    },
    route: {
      data(){
        let id = this.$route.params.tabid;
        let wait_array = [
          {
            id: 4,
            calling: '13611460986',
            called: '13611452022',
            status: '正常',
            time: '1.23',
            money: '10',
            date: '2016-06-06 16:00',
            name: '流水行云科技有限公司',
          },
          {
            id: 4,
            calling: '13611460986',
            called: '13611452022',
            status: '正常',
            time: '1.23',
            money: '10',
            date: '2016-06-06 16:00',
            name: '流水行云科技有限公司',
          },
          {
            id: 4,
            calling: '13611460986',
            called: '13611452022',
            status: '正常',
            time: '1.23',
            money: '10',
            date: '2016-06-06 16:00',
            name: '流水行云科技有限公司',
          },
          {
            id: 4,
            calling: '13611460986',
            called: '13611452022',
            status: '正常',
            time: '1.23',
            money: '10',
            date: '2016-06-06 16:00',
            name: '流水行云科技有限公司',
          },
        ]

        this.messages = wait_array;
      }
    },
    ready(){

    }

  }

</script>
