<template>
  <div class="modal-mask" v-show="show" transition="modal" >
    <div class="modal-wrapper">
      <div class="modal-container flex flex-1 flex-direction-column table-modal">

        <div class="modal-header flex flex-1 justify-content-b">
          <slot name="header">
            <div class="title">{{title}}</div>
            <i class="icon iconfont icon-oc-close-middle cursor close" @click="show = false"></i>
          </slot>
        </div>

        <div class="modal-body flex-1 flex">
          <slot name="body">
            你确认要执行这操作吗？
          </slot>
        </div>

        <div class="modal-footer justify-content-e flex flex-1 ">
          <slot name="footer">
            <button class="btn btn-primary margin-left-right-10" @click="show = false">确认</button>
            <button class="btn btn-default" @click="show = false">取消</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      show: {
        type: Boolean,
        required: true,
        twoWay:true
      },
      title:{
        default:'提示',
        required: false,
      }
    }
  }
</script>

<style lang="sass" scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .normal-modal{
    width: 600px;
  }

  .table-modal{
    width: 800px;
  }


  .modal-container {

    font-size: 1.4rem;
    margin: 0px auto;

    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }

  .modal-header {
    margin-top: 0;
    padding: 10px;
    color: #FFF;
    background-color: #008fd5;
  }

  .modal-body {
    padding: 30px;
  }

  .modal-footer{
    padding: 10px;
  }

  .close{
    color:#FFF
  }

  .margin-left-right-10{
    margin:0 10px;
  }

  .modal-enter, .modal-leave {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>