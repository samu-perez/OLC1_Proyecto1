const operacion = require('../operaciones/operacion')

const cicloWhile = (instruccion) => {
    const valorOp = operacion(instruccion.expresion)

    const bloque = require('../analisis.controller').bloque
    const traduccionBloque = bloque(instruccion.instrucciones)

    const traduccion = "while " + valorOp.valor + ":\n" + traduccionBloque
    return traduccion
}

module.exports = cicloWhile