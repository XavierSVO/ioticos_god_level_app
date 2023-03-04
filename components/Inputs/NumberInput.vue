<template>
	 <BaseInput :label="label" :error="error" type="number" v-model="value" @input="handleInput" :min="minValue" :max="maxValue" />
</template>

  
<script>
export default {
	inheritAttrs: false,
  name: 'number-input',
	model: {
		prop: 'value',
		event: 'input'
	},
	props: {
		label: {
			type: String,
			required: true
		},
		value: {
			type: Number,
			default:30,
			required: true
		},
		minValue: {
			type: Number,
			default: 0
		},
		maxValue: {
			type: Number,
			default: 100
		}
	},
	data() {
		return {
			error: null
		};
	},
	methods: {
		handleInput() {
			const value = this.value;
			let error = null;

			// Validar si es un número
			if (isNaN(value)) {
				error = 'Debe ser un número';
			} else {
				const numberValue = Number(value);

				// Validar si el valor está dentro del rango
				if (numberValue <= this.minValue) {
					error = `El valor mínimo permitido es ${this.minValue}`;
					this.value = this.minValue;
				} 
				if (numberValue >= this.maxValue) {
					error = `El valor máximo permitido es ${this.maxValue}`;
					this.value = this.maxValue;
				}
			}

			// Actualizar el valor y mostrar el error si lo hay
			this.error = error;
			this.$emit('input', Number(value));
		}
	}
};
</script>
  