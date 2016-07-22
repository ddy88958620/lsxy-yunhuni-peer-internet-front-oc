<template>
<div>
<div class="admin-table-header">
  <h4>消息列表</h4>
  <span class='datetime-picker-label'>发布时间:</span>
  <datetime-picker></datetime-picker>
  <span class='datetime-picker-label'>至</span>
  <datetime-picker></datetime-picker>
  <span class='datetime-picker-label'>发布状态: </span>
  <select class="form-control">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </select>
</div>
  <div class="table-responsive">
    <table class="table">
    <thead>
       <tr>
        <th>发布时间</th>
        <th>发布人</th>
        <th>发布状态</th>
        <th>发布标题</th>
        <th>操作</th>
       </tr>
       <tr>
    </thead>
    <tbody>
      <tr v-for='message in messages'>
        <td>{{message.date}}</td>
        <td>{{message.author}}</td>
        <td>{{message.status ? '未上线' : '已上线'}}</td>
        <td>{{message.title}}</td>
        <td>
          <span><a href="#">编辑</a></span>
          <span><a href="#">上线</a></span>
          <span><a href="#">删除</a></span>
        </td>
      </tr>
    </tbody>
    </table>
  </div>
</div>
</template>
<script>
export default {
  components: {
    'datetime-picker': require('../../ui/datetimepicker.vue')
  },
  data(){
    return {
        messages: [
          {
            date: '2016-06-06 16:00',
            author: 'CPHJY',
            status: false,
            title: '云呼你有新的讯息，新的活动，市场活动，滚动播出-----点击查看详情'
          },
          {
            date: '2016-06-06 16:00',
            author: 'CPHJY',
            status: false,
            title: '云呼你有新的讯息，新的活动，市场活动，滚动播出-----点击查看详情'
          },
          {
            date: '2016-06-06 16:00',
            author: 'CPHJY',
            status: true,
            title: '云呼你有新的讯息，新的活动，市场活动，滚动播出-----点击查看详情'
          },
          {
            date: '2016-06-06 16:00',
            author: 'CPHJY',
            status: false,
            title: '云呼你有新的讯息，新的活动，市场活动，滚动播出-----点击查看详情'
          },
        ]
    }
  },
}

</script>
