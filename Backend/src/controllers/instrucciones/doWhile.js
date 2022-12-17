const operacion = require('../operaciones/operacion')

const cicloDoWhile = (instruccion) => {
    const valorOp = operacion(instruccion.expresion)

    const bloque = require('../analisis.controller').bloque
    const traduccionBloque = bloque(instruccion.instrucciones)

    const traduccion = "while True:\n" +  traduccionBloque + "\tif "  + valorOp.valor + ":\n" + "\t\tbreak"
    return traduccion
}

module.exports = cicloDoWhile