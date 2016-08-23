<template>
    <div>
      <div class="flex flex-direction-column admin-table-header">
          <h4>发布新消息</h4>
      </div>
      <div class="">
        <div class="admin-form flex flex-direction-row align-items-c">
          <label for="title">标题:</label>
          <div class="">
            <input type="text" name="title" class="form-control" v-model='title'/>
          </div>
        </div>
        <div class="admin-form flex flex-direction-row align-items-s">
          <label for="content">正文:</label>
          <div class="flex">
              <textarea v-model='content' id="editor" placeholder="Balabala" autofocus></textarea>
          </div>
        </div>
        <div class="admin-form flex flex-direction-row align-items-s">
          <label for="content"></label>
          <div class="flex align-items-c">
            选择上线时间 &nbsp;&nbsp;<datetimepicker :width="200" :type="'time'" :value.sync="line" uuid='newtime' ></datetimepicker>
          </div>
        </div>
        <div class="admin-form flex flex-direction-row align-items-s">
          <label for="content"></label>
          <div class="flex align-items-c">
            <button class="btn btn-primary" @click="newMessage">发布</button>
            <button class="btn btn-default admin-margin-l">取消</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Simditor from 'simditor'
import {showMsg} from '../../../vuex/actions.js'
import * as filter from '../../../utils/filters'
export default {
  vuex: {
    getters: {

    },
    actions :{
    	showMsg
    }
  },
  data(){
    return {
      text: 'test',
      title: '',
      content: '',
      line: ''
    }
  },
  components: {
    'datetimepicker': require('../../ui/datetimepicker.vue')
  },
  
  methods:{
    check(){
      // 标题不能为空
      if(this.title === ''){
        this.showMsg({content: '标题不能为空', type: 'danger'})
        return false
      }
      // 内容不能为空
      if(this.editor.getValue() === ''){
        this.showMsg({content: '正文内容不能为空', type: 'danger'})
        return false
      }
      // 时间不能为空
      if(this.line === ''){
        this.showMsg({content: '时间不能为空', type: 'danger'})
        return false
      }
      return true
    },
    newMessage(){
	    
      // 验证消息
      if (!this.check()) return
  
      console.log(this.editor.getValue())
	    
	    let params = {
    	  title: this.title,
        content: this.editor.getValue(),
        type: 1,
        status: 0,
        line: this.line
      }
	    
      $.post('/message/new',params).then((res)=>{
      	if(res.success){
      		this.$route.router.go('/admin/message/list')
				}
				else{
          this.showMsg({content: '提交失败', type: 'danger'})
        }
      })
    }
  },
  ready(){
    this.editor = new Simditor({
      textarea: $('#editor')
    });
  }
}
</script>
<style lang="sass">
@import '~simditor/styles/simditor.css';

.admin-form {
  margin-top: 20px;
  $input-width: 900px;
  label {
    width: 50px;
    margin-bottom: 0px;
  }

  input, .simditor {
    width: $input-width;
  }
}

</style>
