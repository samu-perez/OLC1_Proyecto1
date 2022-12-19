const operacion = require('../operaciones/operacion')

const asignacion = (instruccion) => {
    
    const valorOp = operacion(instruccion.expresion)
    const traduccion = instruccion.id + " = " + valorOp.valor
    return traduccion
}

module.exports = asignacion