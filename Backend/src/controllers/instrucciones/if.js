const operacion = require('../operaciones/operacion')

const sentenciaIf = (instruccion) => {
    const valorOp = operacion(instruccion.expresion)
    
    const bloque = require('../analisis.controller').bloque
    const traduccionBloque = bloque(instruccion.instrucciones)

    const traduccion = "if " + valorOp.valor + ":\n" + traduccionBloque
    return traduccion
}

module.exports = sentenciaIf