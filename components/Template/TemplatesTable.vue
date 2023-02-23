<template><!-- TEMPLATES TABLE -->
  <div class="row">
    <card>
      <div slot="header">
        <h4 class="card-title">Templates</h4>
      </div>

      <div class="row">
        <el-table :data="templates">
          <el-table-column min-width="50" label="#" align="center">
            <div class="photo" slot-scope="{ row, $index }">
              {{ $index + 1 }}
            </div>
          </el-table-column>

          <el-table-column prop="name" label="Name"></el-table-column>

          <el-table-column prop="description" label="Description"></el-table-column>

          <el-table-column prop="widgets.length" label="Widgets"></el-table-column>

          <el-table-column header-align="right" align="right" label="Actions">
            <div slot-scope="{ row, $index }" class="text-right table-actions">
              <el-tooltip content="Edit" effect="light" :open-delay="300" placement="top">
                <base-button @click="editTemplate(row)" type="warning" icon size="sm" class="btn-link">
                  <i class="fa fa-pen"></i>
                </base-button>
              </el-tooltip>
              <el-tooltip content="Delete" effect="light" :open-delay="300" placement="top">
                <base-button @click="deleteTemplate(row)" type="danger" icon size="sm" class="btn-link">
                  <i class="tim-icons icon-simple-remove "></i>
                </base-button>
              </el-tooltip>
            </div>
          </el-table-column>
        </el-table>
      </div>
    </card>
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui";
import { getTemplates } from "./scriptTemplates"

import {
  templates,
  widgets,
  templateDescription,
  templateName,
  templateId,
  widgetType,
  isEditing
} from './templateData.js';


export default {
  name: 'templates-table',

  data() {
    return {
      templates,
      widgets,
      templateDescription,
      templateName,
      templateId,
      widgetType,
      isEditing
    }
  },
  mounted() {
    getTemplates(this.$store.state.auth.token, this.$notify, this.$axios, this.templates);
  },
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  methods: {
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
          getTemplates(this.$store.state.auth.token, this.$notify, this.$axios, this.templates);
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
    editTemplate(template) {
      this.widgets = template.widgets;
      this.templateDescription = template.description;
      this.templateName = template.name;
      this.templateId = template._id;
      this.widgetType = "";
      this.isEditing = true;
    },

  }
}
</script>