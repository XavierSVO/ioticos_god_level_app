<template>
<!-- WIDGET CONFIGURATOR -->
  <form @submit.prevent="" class="row">
    <card>
      <div slot="header">
        <h4 class="card-title">Widgets {{ configSelectedWidget.column }}</h4>
      </div>

      <div class="row">
        <!-- WIDGET SELECTOR AND FORMS -->
        <div class="col-6">
          <!-- WIDGETS SELECTOR -->
          <!-- This will be render with widgetOptions -->
          <el-select v-model="widgetType" class="select-success" placeholder="Select Widget" style="width: 100%;">
            <el-option v-for="option in widgetTypes" :key="option.value" :value="option.value"
              :label="option.label + ' ' + option.direction">
            </el-option>
          </el-select>

          <br />

          <!-- FORMS NUMBER CHART TYPE -->
          <div v-if="widgetType == 'numberchart'">
            <base-input v-model="configSelectedWidget.variableFullName" label="Var Name" type="text">
            </base-input>

            <base-input v-model="configSelectedWidget.unit" label="Unit" type="text">
            </base-input>

            <base-input v-model.number="configSelectedWidget.decimalPlaces" label="Decimal Places" type="number">
            </base-input>

            <base-input v-model="configSelectedWidget.icon" label="Icon" type="text"></base-input>

            <br />

            <base-input v-model.number="configSelectedWidget.variableSendFreq" label="Send Freq"
              type="number"></base-input>

            <br />

            <base-input v-model.number="configSelectedWidget.chartTimeAgo" label="Chart Back Time (mins)"
              type="number"></base-input>

            <br />

          </div>

          <!-- FORM SWITCH TYPE -->
          <div v-if="widgetType == 'switch'">
            <base-input v-model="configSelectedWidget.variableFullName" label="Var Name" type="text">
            </base-input>

            <base-input v-model="configSelectedWidget.icon" label="Icon" type="text"></base-input>

            <br />

          </div>

          <!-- FORM BUTTON TYPE -->
          <div v-if="widgetType == 'button'">
            <base-input v-model="configSelectedWidget.variableFullName" label="Var Name" type="text">
            </base-input>

            <base-input v-model="configSelectedWidget.message" label="Message to send" type="text">
            </base-input>

            <base-input v-model="configSelectedWidget.text" label="Button Text" type="text">
            </base-input>

            <base-input v-model="configSelectedWidget.icon" label="Icon" type="text"></base-input>

            <br />

          </div>

          <!-- FORM INDICATOR TYPE -->
          <div v-if="widgetType == 'indicator'">

            <base-input v-model="configSelectedWidget.variableFullName" label="Var Name" type="text">
            </base-input>

            <base-input v-model="configSelectedWidget.icon" label="Icon" type="text"></base-input>

            <br />

            <base-input v-model="configSelectedWidget.variableSendFreq" label="Send Freq" type="text"></base-input>

            <br />

          </div>

          <!-- FORM weather TYPE -->
          <div v-if="widgetType == 'weather'">
            <base-input v-model="configSelectedWidget.variableFullName" label="Var Name" type="text">
            </base-input>

            <base-input v-model="configSelectedWidget.icon" label="Icon" type="text"></base-input>

            <br />
            <base-input v-model="configSelectedWidget.updateInterval" label="Update Interval" type="number" max="172800">
          </base-input>


            <br />
          </div>
          <template v-if="widgetType != ''">

            <el-select v-model="configSelectedWidget.class" class="select-success" placeholder="Select Class"
              style="width: 100%;">
              <el-option class="text-success" value="success" label="Success"></el-option>
              <el-option class="text-primary" value="primary" label="Primary"></el-option>
              <el-option class="text-warning" value="warning" label="Warning"></el-option>
              <el-option class="text-danger" value="danger" label="Danger"></el-option>
            </el-select>

            <br /><br /><br />

            <el-select v-model="configSelectedWidget.column" class="select-success" placeholder="Select Column Width"
              style="width: 100%;">
              <el-option v-for="i in 10" :key="i" :value="`col-${i + 2}`" :label="`col-${i + 2}`"></el-option>
            </el-select>

            <br /><br />
          </template>

        </div>

        <!-- WIDGET PREVIEW -->
        <div class="col-6">
          <Rtnumberchart v-if="widgetType == 'numberchart'" :config="configSelectedWidget"></Rtnumberchart>
          <Iotswitch v-if="widgetType == 'switch'" :config="configSelectedWidget"></Iotswitch>
          <Iotbutton v-if="widgetType == 'button'" :config="configSelectedWidget"></Iotbutton>
          <Iotindicator v-if="widgetType == 'indicator'" :config="configSelectedWidget"></Iotindicator>
          <Weather v-if="widgetType == 'weather'" :config="configSelectedWidget"></Weather>
        </div>
      </div>

      <!-- ADD WIDGET BUTTON -->
      <div class="row pull-right">
        <div class="col-12">
          <base-button v-if="!temporalWidgetConfig" native-type="submit" type="primary" class="mb-3" size="lg"
            @click="addNewWidget()">
            Add Widget
          </base-button>
          <base-button v-if="temporalWidgetConfig" native-type="submit" type="primary" class="mb-3" size="lg"
            @click="updateWidget()">
            Update Widget
          </base-button>
        </div>
      </div>
    </card>
  </form>
</template>


<script>

// import componets

import { Select, Option } from "element-ui";


//import config and scripts

import { configSelectedWidget, widgetType, temporalWidgetConfig, widgetTypes, widgetConfigurations, widgets} from './templateData.js';
import { makeid } from './scriptTemplates';


export default {
  name: 'template-configurator',
  components: {
    [Option.name]: Option,
    [Select.name]: Select,
  },

  data() {
    return {
      widgetConfigurations,
      configSelectedWidget,
      widgetType,
      temporalWidgetConfig,
      widgetTypes,
      widgets
    }
  },
  watch: {
    widgetType(newWidgetType) {
      try {
        if (!this.temporalWidgetConfig) {
          this.configSelectedWidget = JSON.parse(
            JSON.stringify(this.widgetConfigurations[`${newWidgetType}`])
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    temporalWidgetConfig(newWidgetConfig) {
      if (this.temporalWidgetConfig) {
        this.configSelectedWidget = newWidgetConfig;
      }
    }
  },
  methods: {
    //Add Widget
    addNewWidget() {
      this.configSelectedWidget.variable = makeid(10);
      this.widgets.push(JSON.parse(JSON.stringify(this.configSelectedWidget)));
    },
      //Update wiget from local
    updateWidget() {
      this.temporalWidgetConfig = null;
      this.widgetType = "";
    }
  }
}

</script>