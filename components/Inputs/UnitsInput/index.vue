<template>
  <el-select v-model="unit" class="select-success" placeholder="Select Unit of Measure" filterable style="width: 100%;">
    <el-option-group v-for="group in unitsMeasu" :key="group.name" :label="group.name">
      <el-option v-if="group.units" v-for="unit in group.units" :key="unit.name" :value="unit.name" :label="unit.name">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
import { Select, Option, OptionGroup } from "element-ui";

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
      units: [],
    };
  },
  computed: {
    unitsMeasu() {
      return this.units;
    },
  },
  async mounted() {
    try {
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      };
      const response = await this.$axios.get('/units', axiosHeaders); // Hacer la solicitud GET utilizando Axios
      console.log(response.data.data)
      this.units = response.data.data; // Asignar los resultados a la variable 'units' del componente
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
