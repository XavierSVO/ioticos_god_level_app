<template>
  <div class="row">
    <draggable v-bind="draggableOptions" v-model="widgets" class="d-flex flex-wrap w-100 h-100">
      <div v-for="(widget, index) in widgets" :key="index" :class="[widget.column]">
        <i role="button" aria-hidden="true" class="fa fa-trash text-warning pull-right" @click="deleteWidget(index)"
          style="margin-bottom: 10px; cursor:pointer"></i>
        <i v-if="index > 0" role="button" aria-hidden="true" class="fa fa-angle-up text-primary mr-3 pull-right"
          @click="moveWidget(index, 'up')" style="margin-bottom: 10px; cursor:pointer"></i>
        <i v-if="index < widgets.length - 1" role="button" aria-hidden="true"
          class="fa fa-angle-down text-primary mr-3 pull-right" @click="moveWidget(index, 'down')"
          style="margin-bottom: 10px; cursor:pointer"></i>
        <i role="button" aria-hidden="true" class="fa fa-pen text-success mr-3 pull-right"
          @click="!temporalWidgetConfig ? editWidget(widget) : () => { }" style="margin-bottom: 10px; cursor:pointer"></i>

        <Rtnumberchart v-if="widget.widget == 'numberchart'" :config="widget"></Rtnumberchart>

        <Iotswitch v-if="widget.widget == 'switch'" :config="widget"></Iotswitch>

        <Iotbutton v-if="widget.widget == 'button'" :config="widget"></Iotbutton>

        <Iotindicator v-if="widget.widget == 'indicator'" :config="widget"></Iotindicator>

        <Weather v-if="widget.widget == 'weather'" :config="widget"></Weather>
      </div>
    </draggable>
  </div>
</template>

<script>

import draggable from "vuedraggable";

import { widgets, temporalWidgetConfig, draggableOptions } from './templateData.js';


export default {
  name: 'dash-board-preview',

  data() {
    return {
      widgets,
      temporalWidgetConfig,
      draggableOptions
    }
  },
  components: {
    draggable
  },
  methods: {
        /**
     * moveWidget - Move the widget from one position to another
     *
     * @param {number} index - The index of the widget to move
     * @param {string} direction - The direction to move the widget: "up" or "down"
     *
     */
    moveWidget(index, direction) {
      if (direction === "up") {
        if (index > 0) {
          const [item] = this.widgets.splice(index, 1);
          this.widgets.splice(index - 1, 0, item);
        }
      } else if (direction === "down") {
        if (index < this.widgets.length - 1) {
          const [item] = this.widgets.splice(index, 1);
          this.widgets.splice(index + 1, 0, item);
        }
      }
    },
      //edit Widget from local
    editWidget(widget) {
      this.temporalWidgetConfig = widget;
      this.widgetType = widget.widget;
    },
    //Delete Widget
    deleteWidget(index) {
      this.widgets.splice(index, 1);
    }
  }
}

</script>