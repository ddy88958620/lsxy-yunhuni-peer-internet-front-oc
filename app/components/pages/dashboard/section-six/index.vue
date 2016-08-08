<template>
    <!-- 区负荷量 -->
    <section class='section_six bg-section-margin admin-padding admin-border'>
      <div class="flex justify-content-e ">
        <button class="btn btn-primary ">刷新</button>
      </div>

      <div class="flex flex-1 bg-section-margin">
        <div class="flex flex-1 ">
          <div class="admin-small-toolbar flex normal-font-size small-font-color cursor" >
            <span class="toolbar" >全部区域</span>
            <span class="toolbar" >1区</span>
            <span class="toolbar" >2区</span>
            <span class="toolbar remove-border-right" >3区</span>
          </div>
        </div>
        <div class="flex flex-1  flex-direction-row">
          <div class="flex flex-1 justify-content-e align-items-c">
            <div class="progress-box">
              <div class="progress">
                <div class="progress-bar bluebg " role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%"></div>
                <span class=""></span>
              </div>
              <div class="progress">
                <div class="progress-bar orangebg " role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">
                </div>
                <span class="sr-only">60% Complete (warning)</span>
              </div>
              <div class="progress">
                <div class="progress-bar yellowbg " role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%">
                </div>
              </div>
            </div>
          </div>

          <div class="flex  flex-direction-column justify-content-c align-items-c area-box">
            <span class="area-span flex">1区</span>
            <span class="area-span flex">2区</span>
            <span class="area-span flex">3区</span>
          </div>
        </div>




      </div>


      <chart :uuid="'realtime-area-chart'" :title="['实时负荷量','负荷量']" :label="['1区','2区','3区']" :color="['#f5f7c6','#f8c0a9','#bde8ef']"></chart>
    </section>
</template>
<script>
export default {
  components: {
    'chart': require('../../../ui/realtime-chart.vue'),
  }
}
</script>

<style lang="sass" scoped>

.section_six {
  background-color: white;
  .progress-box{
    width: 30%;
  }

  .progress{
    margin-bottom:0;
    margin-top: 10px;
    background-color: rgba(255, 255, 255, 0.15);
    height: 10px;
  }

  .area-box{
    padding: 0 10px;
  }

  .area-span{
    margin-top: 10px;
    height: 10px;
  }



}
</style>
