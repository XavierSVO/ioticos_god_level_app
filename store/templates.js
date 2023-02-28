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

  setConfigSelectedWidget(state, newConfig) {
    state.configSelectedWidget = newConfig;
  },
  setTemplateId(state, templateId) {
    state.templateId = templateId;
  },
  addWidget(state, widget) {
    state.widgets.push(widget);
  },
  setTemplates(state, templates) {
    state.templates = templates;
  },
  setWidgetType(state, widgetType) {
    state.widgetType = widgetType;
  },
  setTemplateName(state, templateName) {
    state.templateName = templateName;
  },
  setTemplateDescription(state, templateDescription) {
    state.templateDescription = templateDescription;
  },
  setErrors(state, errors) {
    state.errors = errors;
  }
};

export const actions = {

  addNewWidget({ commit }, configSelectedWidget,){
    configSelectedWidget.variable = makeid(10);
    const widget = JSON.parse(JSON.stringify(configSelectedWidget));

    commit('addWidget', widget)
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
        commit('setTemplates', res.data.data);
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