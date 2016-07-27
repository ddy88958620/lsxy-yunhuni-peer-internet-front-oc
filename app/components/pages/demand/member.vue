<style lang="sass" scoped>
  .app-main-tab{
    border-bottom: 1px solid #d3d7e4;
    height: 53px;
    .tab{
      padding:15px 28px;
    }
    a{
      padding:6px 25px 10px 19px ;
      color:#586381;
      text-decoration: none;
      &:hover{
         border-bottom:2px solid #586381;
      }
    }
    a.v-link-active {
       border-bottom:2px solid #586381;
    }
  }

</style>
<template>
    <div>
        <div class="flex flex-direction-column admin-table-header">
            <h4>会员认证审核</h4>

            <div class="flex flex-1 app-main-tab">
                <div class="tab"><a class="flex"  v-link="'/admin/demand/member'">待审核</a></div>
                <div class="tab"><a class="flex"  v-link="'/admin/demand/member/2'">已审核</a></div>
                <div class="tab"><a class="flex"  v-link="'/admin/demand/member/3'">审核不通过</a></div>
            </div>

            <div class="flex align-items-c  ">

                <input type="text" placeholder="请输入关键词，如会员名称" class="form-control flex flex-1" />

                <span class='datetime-picker-label clear-padding-left'>申请时间:</span>
                <datetime-picker></datetime-picker>
                <span class='datetime-picker-label'>至</span>
                <datetime-picker></datetime-picker>
                <span class='datetime-picker-label'>认证类型: </span>
                <select class="form-control">
                    <option>全部</option>
                    <option>已上线</option>
                    <option>未上线</option>
                </select>
                <a class="btn btn-primary admin-button-margin" v-link="'/new'">发布新消息</a>
            </div>
        </div>
        <div class="admin-table table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th class="text-align-c">发布时间</th>
                    <th>发布人</th>
                    <th>发布状态</th>
                    <th>发布标题</th>
                    <th class="text-align-c">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for='message in messages'>
                    <td class="message-time text-align-c">{{message.date}}</td>
                    <td>{{message.author}}</td>
                    <td class="{{ message.status ? 'text-danger' : ''}}">{{message.status ? '未上线' : '已上线'}}</td>
                    <td>{{message.title}}</td>
                    <td class="text-align-c">
                        <span><a href="#">编辑</a></span>
                        <span><a href="#">上线</a></span>
                        <span><a href="#">删除</a></span>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="more"><a @click="moreMessage">加载更多</a></divcjk>
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
        methods: {
            moreMessage(){
                this.messages.push(
                        {
                            date: '2016-06-06 16:00',
                            author: 'CPHJY',
                            status: false,
                            title: '云呼你有新的讯息，新的活动，市场活动，滚动播出-----点击查看详情'
                        }
                )
            }
        }
    }

</script>
