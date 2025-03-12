var errors = [
    {
      "Error Code": "E1",
      "Description": "Fault with the room termperature sensor on the N# indoor unit",
      "Possible Causes": "Damage of the room temperature sensor on the indoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Poor contact of the room temperature sensor on the indoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of wiring of the room temperature sensor on the indoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the main PCB on the indoor unit"
    },
    {
      "Error Code": "E2",
      "Description": "Fault with the defrosting condenser temperature sensor on the outdoor unit",
      "Possible Causes": "Damage of the defrosting temperature sensor on the outdoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Poor contact of the defrosting temperature sensor on the outdoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the wiring of the defrosting temperature sensor on the outdoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the main PCB on the outdoor unit"
    },
    {
      "Error Code": "E3",
      "Description": "Fault with the temperature sensor in the middle of N# indoor evaporator",
      "Possible Causes": "Damage of the temperature sensor on the indoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Poor contact of the temperature sensor on the indoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of wiring of the temperature sensor on the indoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the main PCB on the indoor unit"
    },
    {
      "Error Code": "E4",
      "Description": "Fault with the fan motor of N# indoor unit",
      "Possible Causes": "Low voltage"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Poor wiring"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damange of the main PCB on the indoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the motor"
    },
    {
      "Error Code": "E5",
      "Description": "Communication error between the outdoor unit and the N# indoor unit",
      "Possible Causes": "Damage of the main PCB on the indoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damange of the main PCB on the outdoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Poor wiring"
    },
    {
      "Error Code": "E8",
      "Description": "Communication error between the display board and main PCB of the indoor unit",
      "Possible Causes": "Damange of the main PCB on the indoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damange of the display board on the indoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Poor wiring"
    },
    {
      "Error Code": "F0",
      "Description": "Fault with the fan motor of outdoor unit",
      "Possible Causes": "Damage of motor"
    },
    {
      "Error Code": "F1",
      "Description": "Module protection failure",
      "Possible Causes": "Compressor damage"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Compressor IPM module damage"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "System blockage"
    },
    {
      "Error Code": "F2",
      "Description": "Compressor drive PFC protection",
      "Possible Causes": "Damage of the PFC circuit components"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Reactor damage"
    },
    {
      "Error Code": "F3",
      "Description": "Compressor protection failure",
      "Possible Causes": "Compressor power line not connected"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Compressor sequence connection error"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of compressor"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "System blockage"
    },
    {
      "Error Code": "F4",
      "Description": "Fault with the discharge temperature sensor",
      "Possible Causes": "Damage of the discharge temperature sensor on the outdoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Poor contact of the discharge temperature sensor on the outdoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the wiring of the discharge temperature sensor on the outdoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the main PCB on the outdoor unit"
    },
    {
      "Error Code": "F5",
      "Description": "Temperature protection of compressor top cover",
      "Possible Causes": "Damage of compressor top cover switch"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "System blockage"
    },
    {
      "Error Code": "F6",
      "Description": "Fault with the environmental temperature sensor on the outdoor unit",
      "Possible Causes": "Damage of the environmental temperature sensor on the outdoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Poor contact of the environmental temperature sensor on the outdoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the wiring of the environmental temperature sensor on the outdoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the main PCB on the outdoor unit"
    },
    {
      "Error Code": "F7",
      "Description": "Fault with the over-voltage or low-voltage protection",
      "Possible Causes": "Excessive input voltage"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Lower input voltage"
    },
    {
      "Error Code": "F8",
      "Description": "Communication error between the driver PCB and main PCB of the outdoor unit",
      "Possible Causes": "Damage of the driver PCB on the outdoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the main PCB on the outdoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Poor wiring"
    },
    {
      "Error Code": "F9",
      "Description": "Fault with the outdoor unit EEPROM",
      "Possible Causes": "Fault with the EE chip on the outdoor PCB"
    },
    {
      "Error Code": "FA",
      "Description": "Fault with the suction temperature sensor",
      "Possible Causes": "Damage of the suction temperature sensor on the outdoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Poor contact of the suction temperature sensor on the outdoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the wiring of the suction temperature sensor on the outdoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the main PCB on the outdoor unit"
    },
    {
      "Error Code": "H1",
      "Description": "Fault with the drainage on N# indoor unit",
      "Possible Causes": "Float switch disconnected or poor wiring"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Error setting of model parameters"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Drain plug"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the pump"
    },
    {
      "Error Code": "H2",
      "Description": "Communication error between the wired controller and main PCB of the indoor unit",
      "Possible Causes": "Damange of the main PCB on the indoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damange of the display board on the indoor unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Poor wiring"
    },
    {
      "Error Code": "H3",
      "Description": "Fault of temperature sensor at N# evaporator inlet",
      "Possible Causes": "Damage of the temperature sensor at N# evaporator inlet"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Poor contact of the room temperature sensor at N# evaporator inlet"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of wiring of the room temperature sensor at N# evaporator inlet"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the main PCB on the outdoor unit"
    },
    {
      "Error Code": "H4",
      "Description": "Fault of temperature sensor at N# evaporator outlet",
      "Possible Causes": "Damage of the temperature sensor at N# evaporator outlet"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Poor contact of the room temperature sensor at N# evaporator outlet"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of wiring of the room temperature sensor at N# evaporator outlet"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the main PCB on the outdoor unit"
    },
    {
      "Error Code": "H5",
      "Description": "Protection low temperature discharge",
      "Possible Causes": "Temperature sensor shedding"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of the main PCB on the outdoor unit"
    },
    {
      "Error Code": "H6",
      "Description": "Low pressure switch protection",
      "Possible Causes": "Lack of refrigerant"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Stop valve unopened"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage of low pressure switch"
    },
    {
      "Error Code": "H7",
      "Description": "Low pressure protection",
      "Possible Causes": "Lack of refrigerant"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Heat exchange viscera"
    },
    {
      "Error Code": "H8",
      "Description": "Fault of four-way valve",
      "Possible Causes": "Damage of four-way valve"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Damage to coil of four-way valve"
    },
    {
      "Error Code": "H9",
      "Description": "Inter-computer communication line connection fault",
      "Possible Causes": ""
    },
    {
      "Error Code": "L0",
      "Description": "Overvoltage and undervoltage protection of indoor DC motor",
      "Possible Causes": "Excessive input voltage"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Lower input voltage"
    },
    {
      "Error Code": "L1",
      "Description": "Overvoltage protection of compressor",
      "Possible Causes": "Damage of compressor"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "System viscera"
    },
    {
      "Error Code": "L2",
      "Description": "Compressor operation failure",
      "Possible Causes": "Damage of compressor"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "System viscera"
    },
    {
      "Error Code": "L3",
      "Description": "Phase-absence protection of compressor",
      "Possible Causes": "Damage of compressor"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Compressor power line not connected"
    },
    {
      "Error Code": "L4",
      "Description": "IPM fault of compressor drive module",
      "Possible Causes": "Compressor drive module damage"
    },
    {
      "Error Code": "L5",
      "Description": "Compressor drive PFC hardware protection",
      "Possible Causes": "Damage of the PFC circuit components"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Reactor damage"
    },
    {
      "Error Code": "L6",
      "Description": "Compressor drive PFC software protection",
      "Possible Causes": "Excessive running current of the unit"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Voltage drops abruptly during operation"
    },
    {
      "Error Code": "L7",
      "Description": "AD abnormal protection for compressor current detection",
      "Possible Causes": "Sensor damage of compressor IPM module"
    },
    {
      "Error Code": "L8",
      "Description": "Compressor superpower protection",
      "Possible Causes": "Sampling resistance damage"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Excessive operating power of compressor"
    },
    {
      "Error Code": "L9",
      "Description": "IPM temperature sensor fault",
      "Possible Causes": "Compressor IPM module sensor damage"
    },
    {
      "Error Code": "",
      "Description": "",
      "Possible Causes": "Poor contact between compressor IPM module and radiator"
    }
  ]
  var newErrors = []
  errors.forEach(error=> {
    if(error["Error Code"] !== "") {
        newErrors.push(error)
    } else {
        var lastItem = newErrors[newErrors.length - 1]
        var previousPossibleCause = lastItem["Possible Causes"] 
        var currentPossibleCause = error["Possible Causes"]
        var newPossibleCause = `${previousPossibleCause}; ${currentPossibleCause}`
        lastItem["Possible Causes"] = newPossibleCause
    }
  })