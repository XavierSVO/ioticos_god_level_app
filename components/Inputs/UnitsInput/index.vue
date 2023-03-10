<template>
  <el-select v-model="unit" class="select-success" placeholder="Select Unit of Measure" filterable style="width: 100%;">
    <el-option-group v-for="group in unitsMeasu" :key="group.name" :label="group.name">
      <el-option v-for="unit in group.units" :key="unit.name" :value="unit.name" :label="unit.name">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
import { Select, Option, OptionGroup } from "element-ui";
import units from "./units";

export default {
  name: "units-input",
  components: {
    [Option.name]: Option,
    [OptionGroup.name]: OptionGroup,
    [Select.name]: Select,
  },
  data() {
    return {
      unit: "",
    };
  },
  computed: {
    unitsMeasu() {
      return units;
    },
  },
};
</script>
