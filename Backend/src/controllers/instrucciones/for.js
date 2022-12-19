const operacion = require('../operaciones/operacion')

const cicloFor = (instruccion) => {
    const id = instruccion.inicio.id
    const valorInicio = operacion(instruccion.inicio.expresion)
    const valorFin = instruccion.condicion.opDer.valor 
    const paso = (instruccion.actualizacion.tipoIncDec == 'INCREMENTO') ? 1: -1

    const bloque = require('../analisis.controller').bloque
    const traduccionBloque = bloque(instruccion.instrucciones)

    const traduccion = `for ${id} in range(${valorInicio.valor}, ${valorFin}, ${paso}):\n` + traduccionBloque
    return traduccion
}

module.exports = cicloFor