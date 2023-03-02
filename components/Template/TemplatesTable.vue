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


export default {
  name: 'templates-table',

  data() {
    return {
    }
  },
  mounted() {
      this.$store.dispatch('templates/getTemplates')
  },
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },

  computed: {
    templates() {
      return this.$store.state.templates.templates
    }
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
          this.$store.dispatch('templates/getTemplates')
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
      this.$store.dispatch('templates/updateWigets', template.widgets);
      this.$store.dispatch('templates/updateTemplateDescription', template.description);
      this.$store.dispatch('templates/updateTemplateName', template.name);
      this.$store.dispatch('templates/templateId', template.templateId);
      this.$store.dispatch('templates/updateWigetType', null);
      this.$store.dispatch('templates/updateIsEditing', true);
    },

  }
}
</script>