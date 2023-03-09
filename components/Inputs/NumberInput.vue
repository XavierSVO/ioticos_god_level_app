<template>
	<BaseInput :label="label" :error="error" type="number" v-model="value" />
</template>

<script>
export default {
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
			default: 30,
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
	watch: {
		value() {
			let valueParse = Number(this.value);
			let error = null;

			// Validar si es un número
			if (isNaN(valueParse)) {
				error = 'Debe ser un número';
			} else {
				const numberValue = Number(valueParse);

				// Validar si el valor está dentro del rango
				if (numberValue <= this.minValue) {
					error = `El valor mínimo permitido es ${this.minValue}`;
					valueParse = this.minValue;
				}
				if (numberValue >= this.maxValue) {
					error = `El valor máximo permitido es ${this.maxValue}`;
					valueParse = this.maxValue;
				}
			}

			// Actualizar el valor y mostrar el error si lo hay
			this.error = error;
			this.$emit('input', valueParse)

			// Emitir el evento "error" si hay un mensaje de error
			if (error) {
				console.log(error)
				this.$emit('error', false);
			} else {
				this.$emit('error', true);
			}
		}
	}
}
</script>
  