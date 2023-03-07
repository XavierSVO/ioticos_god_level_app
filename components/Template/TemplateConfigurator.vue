<template>
  <form @submit.prevent="" class="row">
    <card>
      <div slot="header">
        <h4 class="card-title">Widgets {{ configSelectedWidget.column }}</h4>
      </div>

      <div class="row">
        <div class="col-6">
          <el-select v-model="widgetType" class="select-success" placeholder="Select Widget" style="width: 100%;">
            <el-option v-for="option in widgetTypes" :key="option.value" :value="option.value"
              :label="option.label + ' ' + option.direction">
            </el-option>
          </el-select>

          <br />

          <template v-if="widgetType">
            <div v-for="(field, index) in widgetFields[widgetType]" :key="index">
              <base-input v-model="configSelectedWidget[field.model]" :label="field.label"
                :type="field.type"></base-input>
              <br />
            </div>

            <el-select v-model="configSelectedWidget.class" class="select-success" placeholder="Select Class"
              style="width: 100%;">
              <el-option v-for="option in classOptions" :key="option.value" :value="option.value"
                :label="option.label"></el-option>
            </el-select>

            <br /><br /><br />

            <el-select v-model="configSelectedWidget.column" class="select-success" placeholder="Select Column Width"
              style="width: 100%;">
              <el-option v-for="i in 10" :key="i" :value="`col-${i + 2}`" :label="`col-${i + 2}`"></el-option>
            </el-select>

            <br /><br />
          </template>

        </div>

        <div class="col-6">
          <component :is="widgetTypeMap[widgetType]" v-if="widgetType" :config="configSelectedWidget"></component>
        </div>
      </div>

      <div class="row pull-right">
        <div class="col-12">
          <base-button native-type="submit" type="primary" class="mb-3" size="lg"
            @click="temporalWidgetConfig ? updateWidget() : addNewWidget()" :disabled="!widgetType && enableAddWidget">
            {{ temporalWidgetConfig ? 'Update Widget' : 'Add Widget' }}
          </base-button>
        </div>
      </div>
    </card>
  </form>
</template>

<script>

// import componets

import { Select, Option } from "element-ui";

import Rtnumberchart from '@/components/Widgets/Rtnumberchart.vue';
import Iotswitch from '@/components/Widgets/Iotswitch.vue';
import Iotbutton from '@/components/Widgets/Iotbutton.vue';
import Iotindicator from '@/components/Widgets/Iotindicator.vue';
import Weather from '@/components/Widgets/Weather';
  

//import config and scripts


export default {

  name: 'template-configurator',
  components: {
    [Option.name]: Option,
    [Select.name]: Select,
    Rtnumberchart,
    Iotswitch,
    Iotbutton,
    Iotindicator,
    Weather,
  },
  data() {
    return {
      enableAddWidget: true,
      configSelectedWidget: {},
      widgetOptions: [
        { label: 'Number Chart', value: 'numberchart', direction: '(RT)' },
        { label: 'Switch', value: 'switch', direction: '' },
        { label: 'Button', value: 'button', direction: '' },
        { label: 'Indicator', value: 'indicator', direction: '' },
        { label: 'Weather', value: 'weather', direction: '' },
      ],
      classOptions: [
        { label: 'Success', value: 'success' },
        { label: 'Primary', value: 'primary' },
        { label: 'Warning', value: 'warning' },
        { label: 'Danger', value: 'danger' },
      ],
      widgetFields: {
        numberchart: [
          { label: 'Var Name', model: 'variableFullName' },
          { label: 'Unit', model: 'unit' },
          { label: 'Decimal Places', model: 'decimalPlaces', type: 'number' },
          { label: 'Icon', model: 'icon' },
          { label: 'Send Freq', model: 'variableSendFreq', type: 'number' },
          { label: 'Chart Back Time (mins)', model: 'chartTimeAgo', type: 'number' },
        ],
        switch: [
          { label: 'Var Name', model: 'variableFullName' },
          { label: 'Icon', model: 'icon' },
        ],
        button: [
          { label: 'Var Name', model: 'variableFullName' },
          { label: 'Message to send', model: 'message' },
          { label: 'Button Text', model: 'text' },
          { label: 'Icon', model: 'icon' },
        ],
        indicator: [
          { label: 'Var Name', model: 'variableFullName' },
          { label: 'Icon', model: 'icon' },
          { label: 'Send Freq', model: 'variableSendFreq' },
        ],
        weather: [
          { label: 'Var Name', model: 'variableFullName' },
          { label: 'Icon', model: 'icon' },
          { label: 'Update Interval', model: 'setInterval', type: 'number', minValue: 30, maxValue: 172800 },
        ],
      },
      widgetTypeMap: {
        numberchart: 'Rtnumberchart',
        switch: 'Iotswitch',
        button: 'Iotbutton',
        indicator: 'Iotindicator',
        weather: 'Weather',
        },
    }
  },
  computed: {
    widgetConfigurations() {
      return this.$store.state.templates.widgetConfigurations
    },
    widgetType: {
      get() {
        return this.$store.state.templates.widgetType
      },
      set(type) {
        this.$store.dispatch('templates/updateWigetType', type)
      }
    },
    temporalWidgetConfig: {
      get() {
        return this.$store.state.templates.temporalWidgetConfig
      },
      set(bool) {
        this.$store.dispatch('templates/updateTemporalWidgetConfig', bool)
      }
    },
    currentConfigSelectedWidget: {
      get() {
        return this.$store.state.templates.configSelectedWidget
      },
      set(config) {
        this.$store.dispatch('templates/updateConfigSelectedWidget', config)
      }
    },
    widgetTypes() {
      return this.$store.state.templates.widgetTypes
    },
  },
  watch: {
    widgetType(newWidgetType) {
      try {
        //verfica que newWidgetType no sea null
        if (!newWidgetType) return
        if (!this.temporalWidgetConfig) {
          this.configSelectedWidget = JSON.parse(
            JSON.stringify(this.widgetConfigurations[`${newWidgetType}`])
          );
        }
        if (this.temporalWidgetConfig) {
          this.configSelectedWidget = JSON.parse(
            JSON.stringify(this.temporalWidgetConfig.widget))
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  methods: {
    //Add Widget
    addNewWidget() {
      this.$store.dispatch('templates/addNewWidget', this.configSelectedWidget);
      this.widgetType = null;
      this.configSelectedWidget = {};
    },
    //Update wiget from local
    updateWidget() {
      const payload = {
        newWidgetConfig: this.configSelectedWidget,
        index: this.temporalWidgetConfig.index
      }
      this.$store.dispatch('templates/updateWidget', payload);
      this.widgetType = null;
      this.configSelectedWidget = {};
      this.temporalWidgetConfig = null;
    }
  }
}

</script>