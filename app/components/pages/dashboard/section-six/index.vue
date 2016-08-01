<template>
    <!-- 区负荷量 -->
    <section class='section_six bg-section-margin admin-padding'>

      <div class="flex flex-1 justify-content-e ">
        <div class="progress-box">
          <div class="progress">
            <div class="progress-bar bluebg " role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%">
              <span class="sr-only">20% Complete</span>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar orangebg " role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">
              <span class="sr-only">60% Complete (warning)</span>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar yellowbg " role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%">
              <span class="sr-only">80% Complete (danger)</span>
            </div>
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
    width: 10%;
  }
  .progress{
    margin-bottom:0;
    margin-top: 2px;
    background-color: rgba(255, 255, 255, 0.15);
    height: 10px;
  }

}
</style>
