import draggable from "vuedraggable";
import { Table, TableColumn } from "element-ui";
import { Select, Option } from "element-ui";

const widgetsRegisted = [
  { value: 'numberchart', label: 'Number Chart', direction: 'INPUT <-' },
  { value: 'indicator', label: 'Boolean Indicator', direction: 'INPUT <-' },
  { value: 'map', label: 'Map', direction: 'INPUT <-' },
  { value: 'switch', label: 'Switch', direction: 'OUTPUT ->' },
  { value: 'button', label: 'Button', direction: 'OUTPUT ->' },
  { value: 'weather', label: 'Weather', direction: 'OUTPUT ->' }
]

// Enum with config of Widgets
const configWidgets = {
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

export default {
  middleware: "authenticated",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Option.name]: Option,
    [Select.name]: Select,
    draggable
  },
  data() {
    return {
      templateId: null,
      temporalWidgetConfig: null,
      configSelectedWidget: {},
      isEditing: false,
      widgets: [],
      templates: [],
      widgetType: "",
      templateName: "",
      templateDescription: "",
      draggableOptions: {
        group: "widgets",
        animation: 150,
        direction: "horizontal"
      },
      errors: {},
      widgetsOptions: [...widgetsRegisted]

    };
    
  },
  watch: {
    widgetType(newWidgetType) {
      try {
        if (!this.temporalWidgetConfig) {
          this.configSelectedWidget = JSON.parse(
            JSON.stringify(configWidgets[`${newWidgetType}`])
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
  mounted() {
    this.getTemplates();
  },
  methods: {
    //Get Templates
    async getTemplates() {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };

      try {
        const res = await this.$axios.get("/template", axiosHeaders);
        console.log(res.data);

        if (res.data.status == "success") {
          this.templates = res.data.data;
          console.log(res);
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error getting templates..."
        });
        console.log(error);
        return;
      }
    },

    //Save Template
    async saveTemplate() {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };

      console.log(axiosHeaders);

      const toSend = {
        template: {
          name: this.templateName,
          description: this.templateDescription,
          widgets: this.widgets
        }
      };

      try {
        const res = await this.$axios.post("/template", toSend, axiosHeaders);

        if (res.data.status == "success") {
          this.$notify({
            type: "success",
            icon: "tim-icons icon-alert-circle-exc",
            message: "Template created!"
          });
          this.getTemplates();

          this.widgets = [];
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error creating template..."
        });
        console.log(error);
        return;
      }
    },

    //Delete Template
    async deleteTemplate(template) {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        },
        params: {
          templateId: template._id
        }
      };

      console.log(axiosHeaders);

      try {
        const res = await this.$axios.delete("/template", axiosHeaders);

        console.log(res.data);

        if (res.data.status == "fail" && res.data.error == "template in use") {
          this.$notify({
            type: "danger",
            icon: "tim-icons icon-alert-circle-exc",
            message:
              template.name +
              " is in use. First remove the devices linked to the template!"
          });
          return;
        }

        if (res.data.status == "success") {
          this.$notify({
            type: "success",
            icon: "tim-icons icon-check-2",
            message: template.name + " was deleted!"
          });
          this.getTemplates();
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error getting templates..."
        });
        console.log(error);
        return;
      }
    },
    //Edit Template
    // Envía una solicitud PUT al backend para modificar un documento en la colección "Template"
    async updateTemplate() {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        },
        params: {
          templateId: this.templateId
        }
      };
      const toSend = {
        name: this.templateName,
        description: this.templateDescription,
        widgets: this.widgets
      };
      try {
        const res = await this.$axios.put("/template", toSend, axiosHeaders);
        if (res.data.status == "success") {
          this.$notify({
            type: "success",
            icon: "tim-icons icon-alert-circle-exc",
            message: "Template update!"
          });
          this.$store.dispatch("getDevices");
          this.getTemplates();
          this.widgets = [];
          this.isEditing = false;
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error editing template..."
        });
        console.log(error);
        return;
      }
    },
    editTemplate(template) {
      console.log(template);
      this.widgets = template.widgets;
      this.templateDescription = template.description;
      this.templateName = template.name;
      this.templateId = template._id;
      this.widgetType = "";
      this.isEditing = true;
    },
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
    //Add Widget
    addNewWidget() {
      this.configSelectedWidget.variable = this.makeid(10);
      this.widgets.push(JSON.parse(JSON.stringify(this.configSelectedWidget)));
    },
    //edit Widget from local
    editWidget(widget) {
      this.temporalWidgetConfig = widget;
      this.widgetType = widget.widget;
    },
    //Update wiget from local
    updateWidget() {
      this.temporalWidgetConfig = null;
      this.widgetType = "";
    },
    //Delete Widget
    deleteWidget(index) {
      this.widgets.splice(index, 1);
    },

    makeid(length) {
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
    },
    handleInput(event, minValue, maxValue, errorVariable) {
      const value = ((event.target && event.target.value) || "30").trim();
      let error = null;
      // Validar si es un número
      if (isNaN(value)) {
        error = "Debe ser un número";
      } else {
        const numberValue = Number(value);

        // Validar si el valor está dentro del rango
        if (numberValue < minValue) {
          error = `El valor mínimo permitido es ${minValue}`;
        } else if (numberValue > maxValue) {
          error = `El valor máximo permitido es ${maxValue}`;
        }
      }

      // Actualizar la propiedad "error"
      this.errors.errorVariable = error;
    }
  }
};
