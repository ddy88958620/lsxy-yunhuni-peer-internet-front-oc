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
    padding-right: 15px;
    padding-top: 15px;
  }
  .search-box, .current-tenant {
    display: inline-block;
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
      <div class="topbar-btn inline-block" >欢迎您来到壹耘运营中心

        <div class="matter inline-block">，您有{{ num.awaitDemand + num.awaitInvoice + num.awaitService }} 件事项未处理&nbsp;&nbsp;
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
                <tr v-for="n in nums">
                  <td>{{ $index+1}}</td>
                  <td>
                    <a v-link="item[$key].link">您有{{ n }}个{{ item[$key].title}}{{ item[$key].content}} </a>
                  </td>
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
      <div v-if="currentTenant && currentTenant.tenantName" class="current-tenant">
        当前租户:
        <a v-link="'/admin/tenant/detail/'+ $route.params.uid + '/preview'"> {{ currentTenant.tenantName}} </a>
        &nbsp;
        &nbsp;
      </div>
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
        num: ({message}) => message.num,
      },
    },
    data(){
      return {
        value: '',
        item:{
          awaitInvoiceApply:{ title:'发票申请',link:'/admin/finance/invoice/list/pending',content:'等待审核'},
          awaitInvoiceApplySend:{ title:'发票寄送',link:'/admin/finance/delivery/list/unsend',content:'等待审核'},
          awaitTenant:{ title:'会员认证',link:'/admin/demand/member/list/await',content:'等待审核'},
          awaitPlayVoiceFile:{ title:'放音文件',link:'/admin/demand/voice/list/await',content:'等待审核'},
          awaitService:{ title:'客户反馈',link:'/admin/service/list',content:''},
          awaitApp:{ title:'应用上线',link:'/admin/demand/app/list/await',content:'等待审核'},
          msgTemplat:{ title:'模板申请',link:'/admin/demand/template/list/await',content:'等待审核'},
        },
        currentTenant: undefined
      }
    },
    computed: {
      nums(){
        let num = this.num.son
        let temp = {}
        let {keys, values, entries} = Object;
        for (let [key, value] of entries(num)) {
          if(value>0){
            temp[key] = value
          }
        }
        return temp
      }
    },
    watch: {
      '$route.params.uid': function(uid) {
        this.getTenantInfo(uid)
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
      },
      getTenantInfo(uid){
        $.get('/tenant/tenants/' + uid + '/info').then((res) => {
          return res.data && (this.currentTenant = res.data)
        });
      },
    },
    ready(){
      let uid = this.$route.params.uid
      console.log('ready', this.$route.params.uid)
    }
  }
</script>
