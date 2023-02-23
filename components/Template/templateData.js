export const widgetTypes = [
    { value: 'numberchart', label: 'Number Chart', direction: 'INPUT <-' },
    { value: 'indicator', label: 'Boolean Indicator', direction: 'INPUT <-' },
    { value: 'map', label: 'Map', direction: 'INPUT <-' },
    { value: 'switch', label: 'Switch', direction: 'OUTPUT ->' },
    { value: 'button', label: 'Button', direction: 'OUTPUT ->' },
    { value: 'weather', label: 'Weather', direction: 'OUTPUT ->' }
  ]
  
  // Enum with defaul config of Widgets
export const widgetConfigurations = {
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
      updateInterval: "30",
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


  export let templateId = null;
  export let temporalWidgetConfig = null;
  export let configSelectedWidget = {};
  export let isEditing = false;
  export let widgets = [];
  export let templates = [];
  export let widgetType = "";
  export let templateName = "";
  export let templateDescription = "";
  export const draggableOptions = {
    group: "widgets",
    animation: 150,
    direction: "horizontal"
  };
  export let errors = {};