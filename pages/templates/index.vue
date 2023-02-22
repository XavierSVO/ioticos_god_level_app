<template>
  <div>
    <!-- WIDGET CONFIGURATOR -->
    <div class="row">
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
              <el-option v-for="option in widgetsOptions" :key="option.value" :value="option.value" :label="option.label + ' ' + option.direction">
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
              <base-input v-model="configSelectedWidget.updateInterval" label="Update Interval" type="text" max="172800"
                @input="handleInput($event, 30, 172800, 'updateInterval')" :error="errors.updateInterval"></base-input>


              <br />
            </div>
            <template v-if="widgetType != ''">

            <el-select  v-model="configSelectedWidget.class" class="select-success" placeholder="Select Class"
                style="width: 100%;">
                <el-option class="text-success" value="success" label="Success"></el-option>
                <el-option class="text-primary" value="primary" label="Primary"></el-option>
                <el-option class="text-warning" value="warning" label="Warning"></el-option>
                <el-option class="text-danger" value="danger" label="Danger"></el-option>
              </el-select>

              <br /><br /><br />

              <el-select v-model="configSelectedWidget.column" class="select-success" placeholder="Select Column Width"
                style="width: 100%;">
                <el-option v-for="i in 10" :key="i" :value="`col-${i+2}`" :label="`col-${i+2}`"></el-option>
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
    </div>
    

    <!-- DASHBOARD PREVIEW -->
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
            @click="!temporalWidgetConfig ? editWidget(widget) : () => { }"
            style="margin-bottom: 10px; cursor:pointer"></i>

          <Rtnumberchart v-if="widget.widget == 'numberchart'" :config="widget"></Rtnumberchart>

          <Iotswitch v-if="widget.widget == 'switch'" :config="widget"></Iotswitch>

          <Iotbutton v-if="widget.widget == 'button'" :config="widget"></Iotbutton>

          <Iotindicator v-if="widget.widget == 'indicator'" :config="widget"></Iotindicator>

          <Weather v-if="widget.widget == 'weather'" :config="widget"></Weather>
        </div>
      </draggable>
    </div>

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

    <!-- TEMPLATES TABLE -->
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


  </div>
</template>

<script src="./script.js"></script>
