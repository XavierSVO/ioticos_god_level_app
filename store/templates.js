import Vue from 'vue';


const widgetTypes = [
    { value: 'numberchart', label: 'Number Chart', direction: 'INPUT <-' },
    { value: 'indicator', label: 'Boolean Indicator', direction: 'INPUT <-' },
    { value: 'switch', label: 'Switch', direction: 'OUTPUT ->' },
    { value: 'button', label: 'Button', direction: 'OUTPUT ->' },
    { value: 'weather', label: 'Weather', direction: 'OUTPUT ->' }
  ]
  
  // Enum with defaul config of Widgets
const widgetConfigurations = {
    button: {
      userId: "userid",
      selectedDevice: {
        name: "Home",
        dId: "8888",
        templateName: "Power Sensor",
        templateId: "984237562348756ldksjfh",
        saverRule: false
      },
      variableFullName: "Pump",
      variable: "var1",
      variableType: "output",
      icon: "fa-sun",
      column: "col-4",
      widget: "button",
      class: "danger",
      message: "{'fanstatus': 'stop'}"
    },
    numberchart: {
      userId: "sampleuserid",
      selectedDevice: {
        name: "Home",
        dId: "8888"
      },
      variableFullName: "temperature",
      variable: "varname",
      variableType: "input",
      variableSendFreq: "30",
      unit: "Watts",
      class: "success",
      column: "col-12",
      decimalPlaces: 2,
      widget: "numberchart",
      icon: "fa-sun",
      chartTimeAgo: 60,
      demo: true
    },
    switch: {
      userId: "userid",
      selectedDevice: {
        name: "Home",
        dId: "8888"
      },
      variableFullName: "Luz",
      variable: "varname",
      variableType: "output",
      class: "danger",
      widget: "switch",
      icon: "fa-bath",
      column: "col-6"
    },
    weather: {
      userId: "userid",
      selectedDevice: {
        name: "Home",
        dId: "8888"
      },
      variableFullName: "Clima",
      variable: "varname",
      variableType: "output",
      class: "danger",
      setInterval: "30",
      widget: "weather",
      icon: "fa-solid fa-cloud-sun",
      column: "col-10"
    },
    indicator: {
      userId: "userid",
      selectedDevice: {
        name: "Home",
        dId: "8888"
      },
      variableFullName: "temperature",
      variable: "varname",
      variableType: "input",
      variableSendFreq: "30",
      class: "success",
      widget: "indicator",
      icon: "fa-bath",
      column: "col-6"
    }
  };
// store/templateStore.js
const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return result;
};

export const state = () => ({
    templateId: null,
    templates: [],
    templateName: "",
    templateDescription: "",
    widgets: [],
    widgetTypes,
    widgetType: null,
    temporalWidgetConfig: null,
    configSelectedWidget: {},
    isEditing: false,
    widgetConfigurations
  });

export const mutations = {
  MOVE_WIDGET(state, { index, direction }) {
    if (direction === "up") {
      if (index > 0) {
        const [item] = state.widgets.splice(index, 1);
        state.widgets.splice(index - 1, 0, item);
      }
    } else if (direction === "down") {
      if (index < state.widgets.length - 1) {
        const [item] = state.widgets.splice(index, 1);
        state.widgets.splice(index + 1, 0, item);
      }
    }
  },
  SET_TEMPLATE_NAME(state, newName) {
    state.templateName = newName;
  },
  SET_CONFIG_SELECTED_WIDGET(state, newConfig) {
    state.configSelectedWidget = newConfig;
  },
  SET_TEMPLATE_WIDGETS(state, widgets){
    state.widgets = widgets
  },
  SET_TEMPLATE_ID(state, templateId) {
    state.templateId = templateId;
  },
  SET_TEMPLATES(state, templates) {
    state.templates = templates;
  },
  SET_IS_EDITING(state, bool) {
    state.isEditing = bool;
  },
  ADD_WIDGET(state, widget) {
    state.widgets.push(widget);
  },
  UPDATE_WIDGET(state, {widget, index}) {
    console.log(state.widgets[index])
    state.widgets[index] = widget;
    console.log(state.widgets[index]) 
  },
  SET_WIDGET_TYPE(state, widgetType) {
    state.widgetType = widgetType;
  },
  SET_TEMPORAL_WIDGET_CONFIG(state, bool) {
    state.temporalWidgetConfig = bool;
  },
  SET_TEMPLATE_DESCRIPTION(state, templateDescription) {
    state.templateDescription = templateDescription;
  }
};

export const actions = {
  updateConfigSelectedWidget({ commit }, config) {
    commit('SET_CONFIG_SELECTED_WIDGET', config);
  },
  updateTemporalWidgetConfig({ commit }, bool) {
    commit('SET_TEMPORAL_WIDGET_CONFIG', bool);
  },
  updateWigetType({ commit }, type) {
    commit('SET_WIDGET_TYPE', type);
  },
  updateWigets({ commit }, widgets) {
    commit('SET_TEMPLATE_WIDGETS', widgets);
  },
  updateTemplateName({ commit }, newName) {
    commit('SET_TEMPLATE_NAME', newName);
  },
  updateTemplateId({ commit }, id) {
    commit('SET_TEMPLATE_ID', id);
  },
  updateIsEditing({ commit }, boolean) {
    commit('SET_IS_EDITING', boolean);
  },
  updateTemplateDescription({ commit }, description) {
    commit('SET_TEMPLATE_DESCRIPTION', description);
  },
  addNewWidget({ commit }, configSelectedWidget){
    const widget = JSON.parse(JSON.stringify(configSelectedWidget));
    widget.variable = makeid(10);

    commit('ADD_WIDGET', widget)
  },
  updateWidget({ commit }, {newWidgetConfig, index}){
    const widget = JSON.parse(JSON.stringify(newWidgetConfig));

    commit('UPDATE_WIDGET', {widget, index})
  },
  async getTemplates({ commit, rootState }) {
    const axiosHeaders = {
      headers: {
        token: rootState.auth.token
      }
    };

    try {
      const res = await this.$axios.get("/template", axiosHeaders);
      if (res.data.status == "success") {
        commit('SET_TEMPLATES', res.data.data);
      }
    } catch (error) {
      Vue.prototype.$notify({
        type: "danger",
        icon: "tim-icons icon-alert-circle-exc",
        message: "Error getting templates..."
      });
      console.log(error);
      return;
    }
  },
}