export async function getTemplates(){
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
  }

  export function makeid(length) {
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
  }

  export function handleInput(event, minValue, maxValue, errorVariable) {
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



