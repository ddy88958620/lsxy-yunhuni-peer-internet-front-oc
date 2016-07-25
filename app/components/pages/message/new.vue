<template>
    <div>
      <div class="flex flex-direction-column admin-table-header">
          <h4>发布新消息</h4>
      </div>
      <div class="">
        <div class="admin-form flex flex-direction-row align-items-c">
          <label for="title">标题:</label>
          <div class="">
            <input type="text" name="title" class="form-control"/>
          </div>
        </div>
        <div class="admin-form flex flex-direction-row align-items-s">
          <label for="content">正文:</label>
          <div class="flex">
              <textarea id="editor" placeholder="Balabala" autofocus></textarea>
          </div>
        </div>
        <div class="admin-form flex flex-direction-row align-items-s">
          <label for="content"></label>
          <div class="flex align-items-c">
            选择上线时间 &nbsp;&nbsp;<datetimepicker></datetimepicker>
          </div>
        </div>
        <div class="admin-form flex flex-direction-row align-items-s">
          <label for="content"></label>
          <div class="flex align-items-c">
            <button class="btn btn-primary">发布</button>
            <button class="btn btn-default admin-margin-l">取消</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Simditor from 'simditor'
export default {
  data(){
    return {
      text: 'test'
    }
  },
  components: {
    'datetimepicker': require('../../ui/datetimepicker.vue')
  },
  ready(){
    var editor = new Simditor({
      textarea: $('#editor')
      //optional options
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
