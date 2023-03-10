const units = [
  {
    name: "length",
    units: [
      {
        name: "meter",
        symbol: "m",
        type: "length",
        category: "SI",
        conversion_factor: 1
      },
      {
        name: "centimeter",
        symbol: "cm",
        type: "length",
        category: "SI",
        conversion_factor: 0.01
      },
      {
        name: "millimeter",
        symbol: "mm",
        type: "length",
        category: "SI",
        conversion_factor: 0.001
      },
      {
        name: "micrometer",
        symbol: "μm",
        type: "length",
        category: "SI",
        conversion_factor: 0.000001
      },
      {
        name: "nanometer",
        symbol: "nm",
        type: "length",
        category: "SI",
        conversion_factor: 0.000000001
      },
      {
        name: "kilometer",
        symbol: "km",
        type: "length",
        category: "SI",
        conversion_factor: 1000
      },
      {
        name: "inch",
        symbol: "in",
        type: "length",
        category: "imperial",
        conversion_factor: 0.0254
      },
      {
        name: "foot",
        symbol: "ft",
        type: "length",
        category: "imperial",
        conversion_factor: 0.3048
      },
      {
        name: "yard",
        symbol: "yd",
        type: "length",
        category: "imperial",
        conversion_factor: 0.9144
      }
    ]
  },
  {
    name: "mass",
    units: [
      {
        name: "kilogram",
        symbol: "kg",
        type: "mass",
        category: "SI",
        conversion_factor: 1
      },
      {
        name: "gram",
        symbol: "g",
        type: "mass",
        category: "SI",
        conversion_factor: 0.001
      },
      {
        name: "milligram",
        symbol: "mg",
        type: "mass",
        category: "SI",
        conversion_factor: 0.000001
      },
      {
        name: "microgram",
        symbol: "μg",
        type: "mass",
        category: "SI",
        conversion_factor: 0.000000001
      },
      {
        name: "pound",
        symbol: "lb",
        type: "mass",
        category: "imperial",
        conversion_factor: 0.453592
      },
      {
        name: "ounce",
        symbol: "oz",
        type: "mass",
        category: "imperial",
        conversion_factor: 0.0283495
      }
    ]
  },
  {
    name: "electric power",
    units: [
      {
        name: "watt",
        symbol: "W",
        type: "power",
        category: "SI",
        conversion_factor: 1
      },
      {
        name: "kilowatt",
        symbol: "kW",
        type: "power",
        category: "SI",
        conversion_factor: 1000
      },
      {
        name: "megawatt",
        symbol: "MW",
        type: "power",
        category: "SI",
        conversion_factor: 1000000
      },
      {
        name: "gigawatt",
        symbol: "GW",
        type: "power",
        category: "SI",
        conversion_factor: 1000000000
      },
      {
        name: "horsepower",
        symbol: "hp",
        type: "power",
        category: "imperial",
        conversion_factor: 745.7
      }
    ]
  },
  {
    name: "pressure",
    units: [
      {
        name: "pascal",
        symbol: "Pa",
        type: "pressure",
        category: "SI",
        conversion_factor: 1
      },
      {
        name: "bar",
        symbol: "bar",
        type: "pressure",
        category: "metric",
        conversion_factor: 100000
      },
      {
        name: "atmosphere",
        symbol: "atm",
        type: "pressure",
        category: "metric",
        conversion_factor: 101325
      },
      {
        name: "pounds per square inch",
        symbol: "psi",
        type: "pressure",
        category: "imperial",
        conversion_factor: 6894.76
      }
    ]
  },
  {
    name: "temperature",
    units: [
      {
        name: "celsius",
        symbol: "°C",
        type: "temperature",
        category: "metric",
        conversion_factor: {
          offset: 0,
          factor: 1
        }
      },
      {
        name: "kelvin",
        symbol: "K",
        type: "temperature",
        category: "SI",
        conversion_factor: {
          offset: -273.15,
          factor: 1
        }
      },
      {
        name: "fahrenheit",
        symbol: "°F",
        type: "temperature",
        category: "imperial",
        conversion_factor: {
          offset: -32,
          factor: 5 / 9
        }
      }
    ]
  },
	{
		name: "electricity",
		units: [
			{
				name: "ampere",
				"symbol": "A",
				"type": "electric current",
				"category": "SI",
				"conversion_factor": 1
			},
			{
				"name": "milliampere",
				"symbol": "mA",
				"type": "electric current",
				"category": "SI",
				"conversion_factor": 0.001
			},
			{
				"name": "microampere",
				"symbol": "μA",
				"type": "electric current",
				"category": "SI",
				"conversion_factor": 0.000001
			},
			{
				"name": "volt",
				"symbol": "V",
				"type": "electric potential",
				"category": "SI",
				"conversion_factor": 1
			},
			{
				"name": "millivolt",
				"symbol": "mV",
				"type": "electric potential",
				"category": "SI",
				"conversion_factor": 0.001
			},
			{
				"name": "microvolt",
				"symbol": "μV",
				"type": "electric potential",
				"category": "SI",
				"conversion_factor": 0.000001
			},
			{
				"name": "ohm",
				"symbol": "Ω",
				"type": "electric resistance",
				"category": "SI",
				"conversion_factor": 1
			},
			{
				"name": "milliohm",
				"symbol": "mΩ",
				"type": "electric resistance",
				"category": "SI",
				"conversion_factor": 0.001
			},
			{
				"name": "kiloohm",
				"symbol": "kΩ",
				"type": "electric resistance",
				"category": "SI",
				"conversion_factor": 1000
			}
		]
	},
	{
		"name": "magnetism",
		"units": [
			{
				"name": "tesla",
				"symbol": "T",
				"type": "magnetic field strength",
				"category": "SI",
				"conversion_factor": 1
			},
			{
				"name": "gauss",
				"symbol": "G",
				"type": "magnetic field strength",
				"category": "CGS",
				"conversion_factor": 0.0001
			},
			{
				"name": "ampere per meter",
				"symbol": "A/m",
				"type": "magnetic field strength",
				"category": "SI",
				"conversion_factor": 0.0000012566
			}
		]
	},
	{
		"name": "sound",
		"units": [
			{
				"name": "decibel",
				"symbol": "dB",
				"type": "sound pressure level",
				"category": "general",
				"conversion_factor": 1
			}
		]
	},
	{
		"name": "frequency",
		"units": [
			{
				"name": "hertz",
				"symbol": "Hz",
				"type": "frequency",
				"category": "SI",
				"conversion_factor": 1
			},
			{
				"name": "kilohertz",
				"symbol": "kHz",
				"type": "frequency",
				"category": "SI",
				"conversion_factor": 1000
			},
			{
				"name": "megahertz",
				"symbol": "MHz",
				"type": "frequency",
				"category": "SI",
				"conversion_factor": 1000000
			},
			{
				"name": "gigahertz",
				"symbol": "GHz",
				"type": "frequency",
				"category": "SI",
				"conversion_factor": 1000000000
			}
		]
	}
]

export default units;
