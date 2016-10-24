<style lang='sass' scope>
  @import '../../scss/variable.scss';
  .app-header{
    position: fixed;
    left: 200px;
    right: 0;
    top: 0;
    bottom: 0;
    height:$header-height;
    border-bottom: 1px solid #eeeeee;
    box-shadow: #eee 0px 1px 1px;
    background: #eff5fa;
    color:#666;
    font-size: 1.4rem;
    z-index: 999;
    .nav-left{
	    float: left;
      padding-top: 15px;
    }
    .nav-right{
      float: right;
      width: 200px;
      padding-right: 15px;
      padding-top: 15px;
    }
    .matter{
      height: 45px;
       &:hover {
        .tipbar{
          display: block;
        }
       }
    }

    .tipbar{
      position: absolute;
      display: none;
      min-width: 300px;
      #tringle-up{
        width: 0;
        height: 0;
        position: absolute;
        left:50%;
        margin-left: -5px;
        top:-5px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 5px solid #dbe2ee;
      }
      .admin-table{
        border-bottom: 1px solid #dbe2ee;
        table{
          margin-bottom: 0;
        }
      }
    }
    .topbar-btn{
      padding: 0px 10px;
      height: 45px;
      line-height: 30px;
    }
  }
</style>

<template>
  <header class='app-header '>
    <div class="nav-left  overflow">
      <div class="topbar-btn inline-block" >欢迎您来到云呼你运营中心

        <div class="matter inline-block">，您有 {{ num.awaitDemand + num.awaitInvoice + num.awaitService }} 件事项未处理&nbsp;&nbsp;
        <i class="iconfont icon-oc-handle"></i>
        <div class="tipbar">
          <div id="tringle-up">
          </div>
          <div class="admin-table">
            <table class="table">
              <thead>
              <tr>
                <th>序号</th>
                <th>事件</th>
              </tr>
              </thead>
              <tbody v-if="num.awaitDemand + num.awaitInvoice + num.awaitService>0">
                <tr v-for="n in num" track-by="$index" >
                  <td v-if="n>0 && ($key=='awaitService' || $key=='awaitInvoiceApply' || $key=='awaitInvoiceApplySend' || $key=='awaitTenant' || $key=='awaitPlayVoiceFile')" > {{ $index }} </td>
                  <td v-if="n>0 && $key=='awaitInvoiceApply'"><a v-link="'/admin/finance/invoice/list/pending'">您有{{ n }}个发票申请等待审核</a></td>
                  <td v-if="n>0 && $key=='awaitInvoiceApplySend'"><a v-link="'/admin/finance/delivery/list/unsend'">您有{{ n }}个发票寄送等待审核</a></td>
                  <td v-if="n>0 && $key=='awaitTenant'"><a v-link="'/admin/demand/member/list/await'">您有{{ n }}个会员认证等待审核</a></td>
                  <td v-if="n>0 && $key=='awaitPlayVoiceFile'"><a v-link="'/admin/demand/voice/list/await'">您有{{ n }}个放音文件等待审核</a></td>
                  <td v-if="n>0 && $key=='awaitService'"><a v-link="'/admin/service/list'">您有{{ n }}个客户反馈</a></td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="2" align="center">暂无事项处理</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
      </div>
    </div>
    <div class="nav-right">
      <search
        :value.sync= 'value'
        :action="search"
        placeholder='请输入会员名称'>
      </search>
    </div>
  </header>
</template>
<script>
export default {
  vuex:{
    getters:{
      num: ({message}) => message.num
    },
  },
  data(){
    return {
      value: ''
    }
  },
  components: {
    'search': require('../ui/search-input.vue'),
  },
  methods:{
    search: function() {
      this.$route.router.go({
        name: 'tenantlist',
        query: {searchName: this.value}
      })
    }
  },
  ready(){
  }
}
</script>
