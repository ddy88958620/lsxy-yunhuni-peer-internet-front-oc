<template>
  <div class="headbox flex flex-1 align-items-c bg-section-margin whilebg">
    <span class='datetime-picker-label padding-right-20'>选择应用: </span>
    <select class="form-control flex select-box padding-right-20" v-model='seletedApp' >
      <option v-for="app in apps"  value="{{app.id}}">{{app.name}} </option>
    </select>
    <span class='datetime-picker-label padding-right-20 padding-left-20'>时间:</span>
    <datetime-picker :uuid="'sessionDate'"  :type.sync="startdate.type" :value.sync="startdate.value"></datetime-picker>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        selectApp: '',
        startDate: {
          type: '',
          value: ''
        }
      }
    },
  }
</script>