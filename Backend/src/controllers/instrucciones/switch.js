const operacion = require('../operaciones/operacion')

const sentenciaSwitch = (instruccion) => {
    const valorOpSwitch = operacion(instruccion.expresion)
    const bloque = require('../analisis.controller').bloque

    let traduccion = `def switch(${valorOpSwitch.valor}):\n`
    traduccion += "\t" + "switcher = {\n"

    instruccion.lista_case.forEach(case_ => {
        const valorOpCase = operacion(case_.expresion)
        const traduccionBloqueCase = bloque(case_.instruccionesCase)
        traduccion += "\t" + valorOpCase.valor + ":  " + traduccionBloqueCase.slice(1, -1) + ",\n"
    })
    
    if(instruccion.instruccionesDefault != null){
        const traduccionBloqueDefault = bloque(instruccion.instruccionesDefault)
        traduccion += "\t" + "'default':" + traduccionBloqueDefault
    }

    traduccion += "\t}\n"
    traduccion += `\treturn switcher.get(${valorOpSwitch.valor})\n`
    return traduccion
}

module.exports = sentenciaSwitch