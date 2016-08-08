<template>
  <div>
    <div class="admin-table table-responsive">
      <div class="table-total flex flex-1 justify-content-e">
        共<span class="text-danger">20</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">日期</th>
          <th>调用次数</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='message in messages'>
          <td class="message-time text-align-c">{{ message.date }}</td>
          <td>{{ message.count }}</td>
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
            count: '20'
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
          count: '1020',
        },
        {
          date: '2016-06-05',
          count: '4112',
        },
        {
          date: '2016-06-03',
          count: '1000',
        },
        {
          date: '2016-06-02',
          count: '523',
        }
      ]
    }

  }

</script>
