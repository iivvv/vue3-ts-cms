<template>
  <div class="rose-echart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'
import type { IEchartValueType } from '../types'

interface IProps {
  roseData: IEchartValueType[]
}

const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
  return {
    // legend: {
    //   top: 'top'
    // },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    toolbox: {
      show: false,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        // name: 'Nightingale Chart',
        type: 'pie',
        //内外半径
        radius: [15, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 1
        },
        data: props.roseData
        // data: [
        //   { value: 40, name: 'rose 1' },
        //   { value: 38, name: 'rose 2' },
        //   { value: 32, name: 'rose 3' },
        //   { value: 30, name: 'rose 4' },
        //   { value: 28, name: 'rose 5' },
        //   { value: 26, name: 'rose 6' },
        //   { value: 22, name: 'rose 7' },
        //   { value: 18, name: 'rose 8' }
        // ]
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.rose-echart {
  color: red;
}
</style>
