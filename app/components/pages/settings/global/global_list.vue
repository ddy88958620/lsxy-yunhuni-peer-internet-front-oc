<template>
  <div>
    <!--<div class="alert alert-success" role="alert">-->
    <!--新增的号码默认为禁用状态，需要手动启用。号码一旦启用，即可被租户所使用-->
    <!--</div>-->
		<h4>全局参数配置管理</h4>
    <div class="admin-table ">
      <div class="table-total flex flex-1 justify-content-e float-r">
        共<span class="text-danger">{{origin.product.totalCount ? origin.product.totalCount : 0}}</span>条
      </div>
      <table class="table">
        <thead>
        <tr>
          <th class="text-align-c">配置项</th>
          <th>配置参数</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="l in list.product">
          <td class="text-align-c">{{ l.name }}</td>
          <td>{{ l.value }}</td>
          <td>
            <span @click="confirm($index, l.id)"><a>编辑</a></span>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="more">
        <a v-if='origin.product.currentPageNo >= origin.product.totalPageCount'>加载完毕</a>
        <a @click="query('more')" class="text-none" v-else>加载更多<i class="icon iconfont icon-oc-dropdown"></i></a>
      </div>
      <confirm v-ref:dialog>
    		<div slot="body">
    			<form class='form' v-reset-form="postData">
    				<div class="form-group">
    					<label class="control-label">配置项名称 : </label>
              <span>{{ selected.settings.name }}</span>
    				</div>
            <br/>
    				<div class="form-group">
    					<label class="control-label">配置参数 : </label>
    					<input type="number" class="form-control input-width-120" placeholder="" v-model="selected.settings.value" number>
    				</div>
    			</form>
    		</div>
      </confirm>
    </div>
  </div>
</template>
<script>
  import {showMsg} from 'actions'
  export default {
    vuex: {
      actions: { showMsg }
    },
    components: {
      'search': require('ui/search-input.vue'),
      'confirm': require('ui/confirm.vue'),
    },
    data(){
      return {
        list: {
          product: []
        },
        postData: {
          lineParams: {
            pageNo: 1
          },
          settings: {
            value: ''
          }
        },
        selected: {
          settings: {
            name: '',
            value: ''
          }
        },
        origin: {
          product: {}
        }
      }
    },
    methods: {
      confirm (index, id) {
        this.selected.settings.name = this.list.product[index].name
        this.selected.settings.value = this.list.product[index].value
        this.$refs.dialog.confirm().then(() => {
          // 点击确定按钮的回调处理
          const value = this.selected.settings.value
          this.save(index, id)
          this.$refs.dialog.show = false
        }).catch(() => {})
      },
      save (index, id) {
        $.put('config/global/edit/' + id, { value: this.selected.settings.value }).then((e) => {
          if (e.errorMsg) {
            this.showMsg({ content: e.errorMsg, type: 'danger' })
            return
          }
          this.showMsg({ content: '修改成功', type: 'success' })
          this.query()
        })
      },
      query(type) {
        const params = this.postData.lineParams
        if (type === 'more') {
          params.pageNo = this.originData.number.currentPageNo + 1
        }
        $.get('config/global/plist', params).then((res) => {
          this.origin.product = res.data
          this.list.product = type === 'more' ? this.list.product.concat(res.data.result) : res.data.result
          })
      },
    },
    ready() {
      this.query()
    }
  }
</script>
