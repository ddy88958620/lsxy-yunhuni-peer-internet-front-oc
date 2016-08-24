<template>
    <div class="flex single-box" v-for="message in messages">
      <div class="panel panel-base flex flex-direction-column flex-1">
        <div class="panel-heading panel-base-heading">{{ box[$index].title}}</div>
          <div class="panel-body admin-bg flex-1">
            <ul class="list-none-style">
              <li v-for="b in box[$index].field">{{ b }}: {{ message[$index] }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default{
    data(){
      return {
        box: [
          {
            title: '基本信息',
            field:['会员名称','账号ID','注册时间','绑定手机号','邮箱绑定']
          },
          {
            title: '业务信息',
            field: ['应用行业','主营业务','网站']
          },
          {
            title: '联系信息',
            field: ['所在地区','通讯地址','联系号码']
          },
          {
            title: '认证信息',
            field: ['认证类型','公司名称','公司地址','所属行业','证件类型','统一社会信用代码','营业执照']
          }
        ]
      }
    },
    props: {
      messages: {
         type: Array
       }
    }
  }

</script>

<style lang="sass" scoped>
  .single-box{
    width: 49%;
    margin-bottom: 20px;
  }
  ul {
    padding: 15px 15px 0 15px;
    font-size: 1.4rem;
    li {
      padding-bottom: 25px;
    }
  }
</style>