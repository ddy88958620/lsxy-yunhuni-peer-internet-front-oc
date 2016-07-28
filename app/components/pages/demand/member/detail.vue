<template>
    <div class="section_right">
      <h4>查看详情</h4>

      <div class="panel panel-default flex-1">
         <div class="panel-heading">会员信息</div>
      </div>


      <div class="panel panel-default flex-1">
         <div class="panel-heading">认证信息</div>
         <div class="panel-body">
           <ul class="list-none-style">
             <li>真实姓名: 成小米</li>
             <li>证件类型: 身份证</li>
             <li>证件号码: 441283199310256245</li>
             <li>持证照片: </li>
           </ul>

         </div>
      </div>

      <div class="panel panel-default flex-1">
        <div class="panel-heading">历史认证信息</div>
        <div class="panel-body  admin-bg flex-1">
          <div class="admin-table table-responsive">
            <table class="table">
              <thead>

              <tr class="total">
                <th colspan="6" class="text-align-r">共<span class="text-danger">{{ total }}</span>条</th>
              </tr>
              <tr>
                <th class="text-align-c">申请时间</th>
                <th>认证类型</th>
                <th>审核结果</th>
                <th class="text-align-c">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for='message in messages'>
                <td class="message-time text-align-c">{{message.date}}</td>
                <td>{{message.type}}</td>
                <td>{{message.result}}{{message.reason}}</td>

                <td class="text-align-c" >
                  <span @click="" class="cursor"><i class="icon iconfont icon-oc-dropdown"></i></span>
                </td>

              </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>

      </div>


    </div>
</template>
<style lang="sass" scoped>
  ul {
    padding: 15px 15px 0 15px;
    font-size: 1.4rem;
  li {
    padding-bottom: 25px;
  }
  }

</style>
<script>
  export default {
    data(){
      return{
        messages :[
          {
            date: '2016-06-06 16:00',
            type: '个人认证',
            result: '审核不通过',
            reason: '（原因 ：上传的身份证照片不清晰）'
          },
          {
            date: '2016-06-06 16:00',
            type: '个人认证',
            result: '审核不通过',
            reason: '（原因 ：上传的身份证照片不清晰）'
          },
          {
            date: '2016-06-06 16:00',
            type: '个人认证',
            result: '审核不通过',
            reason: '（原因 ：上传的身份证照片不清晰）'
          }
        ]
      }
    }
  }
</script>
