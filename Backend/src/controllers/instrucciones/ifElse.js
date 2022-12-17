const operacion = require('../operaciones/operacion')

const sentenciaIfElse = (instruccion) => {
    const valorOp = operacion(instruccion.expresion)

    const bloque = require('../analisis.controller').bloque
    const traduccionBloqueIf = bloque(instruccion.instruccionesIf)
    const traduccionBloqueElse = bloque(instruccion.instruccionesElse)

    const traduccion = "if " + valorOp.valor + ":\n" + traduccionBloqueIf + "else:\n" + traduccionBloqueElse
    return traduccion
}

module.exports = sentenciaIfElse