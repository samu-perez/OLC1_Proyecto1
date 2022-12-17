const operacion = require('../operaciones/operacion')

const asignacion = (instruccion) => {
    
    console.log('ASIG INSTRUCCION', instruccion)
    const valorOp = operacion(instruccion.expresion)
    const traduccion = instruccion.id + " = " + valorOp.valor
    console.log('Traduccion Asignacion:', traduccion)
    return traduccion
}

module.exports = asignacion