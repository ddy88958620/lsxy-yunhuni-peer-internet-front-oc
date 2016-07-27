<template>
    <div>
        <div class="flex flex-direction-column admin-table-header">
            <h4>会员认证审核</h4>

            <div class="flex flex-1 admin-main-tab">
                <div class="tab"><a class="flex"  v-link="'/admin/demand/member/1'">待审核</a></div>
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
	      <router-view></router-view>
	    </div>
</template>
<script>
    export default {
        components: {
            'datetime-picker': require('../../../ui/datetimepicker.vue')
        },
    }
</script>
