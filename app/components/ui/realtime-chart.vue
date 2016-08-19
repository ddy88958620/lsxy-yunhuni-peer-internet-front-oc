/**
 *
 这是查询的chart组件,还有一个实时chart组件
 *
 ***/

<template>
    <canvas :class="[uuid]" height='100' ></canvas>
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
      uuid: {
        require: true,
        type: String
      },
	    value: {
      	type: Array,
        twoWay: true,
		    default: function () {
      		return []
        }
      },
      label: {
        type: Array
      },
      color: {
        type: Array,
        default:['#bde8ef','#f5f7c6','#f8c0a9','#129b0c','#361654']
      },
      title: {
        type: Array,
        default:['实时并发量','并发量']
      }
    },
    watch: {
    	value: function() {
    		console.log('watch initChart')
    		this.initChart()
      }
    },
    methods: {
      randomScalingFactor() {
        return (Math.random() > 0.5 ? 1.0 : 2.0) * Math.round(Math.random() * 100);
      },
      getDatasets(){
        let self = this
        let datasets = []
        let i = this.label.length
	      let fake =  [self.randomScalingFactor(),self.randomScalingFactor(),self.randomScalingFactor(),self.randomScalingFactor(),self.randomScalingFactor(),self.randomScalingFactor(),self.randomScalingFactor(),self.randomScalingFactor()]
        while(i) {
          i--
          let dataObj = {
              label: self.label[i],
              type: 'line',
              // 曲线
              // lineTension: 0.1,
              fill: false,
              borderDashOffset: 5.15,
              borderJoinStyle: 'miter',
              borderColor: self.color[i],
              pointBorderColor: "rgba(121,219,204,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 5,
              pointRadius: 1,
              pointHitRadius: 1,
              data: self.value.length === 0 ? fake : self.value[i]
            }
          datasets.push(dataObj)
        }
        return datasets
      },
      initChart(){
        let self = this
        var data = {
          labels: ["1时", "2时", "3时","4时","5时","6时","7时","8时"],
          datasets: self.getDatasets()
        };
  
        const ctx = document.querySelector("."+self.uuid).getContext('2d')
  
        if (this.chart) {
          this.chart.chart.config.data = data
          this.chart.update()
          return
        }
  
        this.chart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: {
            responsive: true,
            title:{
              display:true,
              text:self.title[0]
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
                    labelString: self.title[1]
                  },
                },
              ]
            }
          }
        })
     }
    },
    ready(){
      if (this.value.length !== 0) {
        console.log('ready initChart')
      	this.initChart()
      }
    }
  }
</script>
