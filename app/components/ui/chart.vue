/**
 *
 这是查询的chart组件,还有一个实时chart组件
 *
 ***/

<template>
    <canvas :class="[uuid]"></canvas>
</template>
<script>
import Chart from 'chart.js';
import chance from 'chance'

  export default {
    data(){
      return {
        class: '',
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
      }
    },
    ready(){
      let self = this

      var data = {
        labels: ["1月", "2月", "3月","4月", "5月", "6月","7月", "8月", "9月","10月", "11月","12月"],
        datasets: [
          {
            label: "新增注册会员",
            type: self.type[0],
            // 曲线
            // lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,0.4)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 32, 11, 45, 35, 45],
            yAxisID: 'y-axis-1',
          },
          {
            label: "新增应用",
            // lineTension: 0.1,
            type: self.type[1],
            backgroundColor: "rgba(220,220,220,0.5)",
            borderColor: "rgba(75,168,192,0.4)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [15, 29, 30, 51, 26, 75, 80, 32, 46, 12, 56, 52],
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
            display:true,
            text:"Chart.js Line Chart - Stacked Area"
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
                  labelString: '会员数(个)'
                },
                position: "left",
                id: "y-axis-1"
              },
              {
                type: "linear",
                scaleLabel: {
                  display: true,
                  labelString: '应用数(个)',
                },
                display: true,
                position: "right",
                id: "y-axis-2"
              },
            ]
          }
        }
      })
    }
  }
</script>
