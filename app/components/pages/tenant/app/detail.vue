<template>
    <div class="bg-section-margin">

        <div class="admin-panel flex-1">
            <div class="panel-body">
                <ul class="list-none-style">
                    <li><button class="btn btn-primary"  v-link="'/admin/tenant/detail/'+$route.params.uid+'/app'">返回应用列表</button></li>
                    <li>应用名称: 飞飞语音</li>
                    <li>应用类型: 网页</li>
                    <li>应用描述: 这家伙很懒什么都没留下</li>
                    <li>所属行业: 金融</li>
                    <li>服务器白名单: 192.168.1.1</li>
                    <li>回调URL http://www.bibi.com/callback</li>
                    <li>监听通知: 启用监听 启用鉴权</li>
                    <li>绑定测试号: 1477777552 1477777552  1477777552  1477777552 1477777552 1477777552 </li>
                    <li>应用状态: 未上线</li>
                </ul>
                <div class="btn-group">
                    <button class="btn">放音媒体库</button>
                    <button class="btn">录音文件</button>
                </div>
            </div>
        </div>


        <div class="flex search-box bg-section-margin">
            <search></search>
        </div>



        <div class="panel panel-default flex-1">
            <div class="panel-body  admin-bg flex-1">
                <div class="admin-table table-responsive">
                    <table class="table remove-margin-bottom">
                        <thead>
                        <tr>
                            <th class="text-align-c">审核时间</th>
                            <th>文件</th>
                            <th>大小</th>
                            <th class="text-align-c">备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for='message in messages' >
                            <td class="message-time text-align-c">{{message.date}}</td>
                            <td>{{message.type}}</td>
                            <td>{{message.size}}</td>
                            <td class="text-align-c">{{message.remark}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>


    <modal :show.sync="showModal">
        <div slot="body">
            <div class="flex flex-1 ">
                <span class="flex flex-1 align-items-c justify-content-c">不通过原因</span>
                <span class="flex flex-2 "><input type="text" class="form-control " /></span>
            </div>
        </div>
    </modal>
</template>
<style lang="sass" scoped>
  ul {
    padding: 0 15px 0 15px;
    font-size: 1.4rem;
    li {
      padding-bottom: 25px;
    }
  }
  .search-box{
    width: 200px;
  }
</style>
<script>
    export default {
        components:{
          'modal': require('../../../ui/modal.vue'),
          'search': require('../../../ui/search-input.vue')
        },
        data(){
          return{
            showModal: false,
            messages :[
              {
                date: '2016-06-06',
                type: '1.wav',
                size: '1.1',
                remark: '语音通知推文件'
              },
              {
                date: '2016-06-06',
                type: '1.wav',
                size: '1.1',
                remark: '语音通知推文件'
              }
            ]
          }
        }
    }
</script>
