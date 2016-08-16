/**
 *
 这是查询的chart组件,还有一个实时chart组件
 *
 ***/

<template>
    <canvas :class="[uuid]" height='100'></canvas>
</template>
<script>
import Chart from 'chart.js';
import chance from 'chance'
  export default {
    data(){
      return {
        class: '',
        month :["1日", "2日", "3日","4日", "5日", "6日","7日", "8日", "9日","10日", "11日","12日","13日","14日", "15日", "16日","17日", "18日", "19日","20日","21日","22日","23日","24日", "25日", "26日","27日", "28日", "29日","30日"],
        year : ["1月", "2月", "3月","4月", "5月", "6月","7月", "8月", "9月","10月", "11月","12月"]
      }
    },
    props: {
      type: {
        type: Array,
        default: ['line', 'line']
      },
      uuid: {
        require: true,
        type: String
      },
      label: {
        type: String
      },
      title: {
        type : Array,
        default: ['新增注册会员','新增应用']
      },
      xtitle: {
        type:Array,
        default: ['会员数(个)','应用数(个)']
      },
      color: {
        type: Array,
        default: function() {
         return  [['rgba(247,249,242,0.4)','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)'],
            ['rgba(235,238,204,1)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)']]
        }
      },
      xtype: {
        type:String,
        twoWays:true,
        default:'year'
      },
      ydata1: {
        twoWays:true,
        type:Array,
        default:function() {
          return []
        }
      },
      ydata2: {
        twoWays:true,
        type:Array,
        default: function() {
         return []
        }
      }
    },
    ready(){
      let self = this
      //计算当前月份日数

      console.log(self.ydata1)
      console.log(self.ydata2)


      var data = {
        labels: self.month,
        datasets: [
          {
            label: self.title[0],
            type: self.type[0],
            // 曲线
            // lineTension: 0.1,
            backgroundColor: self.color[0][0],
            borderColor: self.color[0][1],
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: self.color[0][2],
            pointBackgroundColor: self.color[0][3],
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: self.color[0][4],
            pointHoverBorderColor: self.color[0][5],
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: self.ydata1,
            yAxisID: 'y-axis-1',
          },
          {
            label: self.title[1],
            // lineTension: 0.1,
            type: self.type[1],
            backgroundColor: self.color[1][0],
            borderColor: self.color[1][1],
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: self.color[1][2],
            pointBackgroundColor: self.color[1][3],
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: self.color[1][4],
            pointHoverBorderColor: self.color[1][5],
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: self.ydata2,
            yAxisID: 'y-axis-2',
          }
        ]
      };


      const ctx = document.querySelector("."+self.uuid).getContext('2d')

      new Chart(ctx, {
        type: self.type[1] === 'bar' ? 'bar' : 'line',
        data: data,
        options: {
          responsive: true,
          title:{
            display:false,
            text:""
          },
          tooltips: {
            mode: 'label',
          },
          hover: {
            mode: 'label'
          },
          scales: {
            yAxes: [
              {
                type: "linear",
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: self.xtitle[0],
                },
                position: "left",
                id: "y-axis-1"
              },
              {
                type: "linear",
                scaleLabel: {
                  display: true,
                  labelString: self.xtitle[1],
                },
                display: true,
                position: "right",
                id: "y-axis-2"
              },
            ]
          }
        }
      })

      $(window).resize(function()
      {
        $('canvas').css('width','100%');
      });
    }
  }
</script>
