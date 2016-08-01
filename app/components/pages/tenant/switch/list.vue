<style lang="sass" scoped>
</style>
<template>
    <div>

        <div class="admin-table table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th class="text-align-c">功能</th>
                    <th>状态</th>
                    <th class="text-align-c">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for='message in messages'>
                    <td class="text-align-c">{{ message.name}}</td>
                    <td class="{{ message.status ? 'text-danger' : ''}}">{{message.status ? '关闭' : '开启'}}</td>
                    <td class="text-align-c">
                        <span><a href="#">编辑</a></span>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
</template>
<script>
    export default {
        data(){
            return {
                messages: [
                    {
                        name: '语音呼叫',
                        status: false,
                    },
                    {
                        name: '语音回拨',
                        status: false,
                    },
                    {
                        name: '会议服务',
                        status: false,
                    },
                    {
                        name: '语音验证码',
                        status: false,
                    },
                    {
                        name: '录音服务',
                        status: false,
                    },
                    {
                        name: 'IVR定制服务',
                        status: false,
                    },
                    {
                        name: '语音呼叫',
                        status: false,
                    },
                ]
            }
        },
        methods: {
            moreMessage(){

            }
        }
    }

</script>
