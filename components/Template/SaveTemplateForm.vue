<template>
	<!-- SAVE TEMPLATE FORM-->
	<div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Save Template</h4>
        </div>

        <div class="row">
          <base-input class="col-4" v-model="templateName" label="Template Name" type="text">
          </base-input>

          <base-input class="col-8" v-model="templateDescription" label="Template Description" type="text">
          </base-input>
        </div>

        <br /><br />

        <div class="row">
          <div class="col-12">
            <base-button native-type="submit" type="primary" class="mb-3 pull-right" size="lg"
              @click="isEditing ? updateTemplate() : saveTemplate()" :disabled="widgets.length == 0">
              {{ isEditing ? 'Edit Template' : 'Save Template' }}
            </base-button>
          </div>
        </div>
      </card>
    </div>
</template>

<script>
import { templateName, templateDescription, isEditing, widgets, templateId } from './templateData';
import { getTemplates } from './scriptTemplates';
 

export default {
  name: 'save-template-form',

  data() {
    return {
      templateName,
			templateDescription,
			isEditing,
			widgets,
			templateId,
			templateDescription,
			templateName
    }
  },
	methods :{
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
					getTemplates();

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
					getTemplates();
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
		}
	}
}

</script>