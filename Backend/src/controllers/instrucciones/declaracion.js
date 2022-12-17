const operacion = require('../operaciones/operacion')

const declaracion = (instruccion) => {
    
    let traduccion = ""
    if(instruccion.expresion == null){
        traduccion = instruccion.id + " = None" 
        console.log('Traduccion Declaracion:', traduccion)
        return traduccion
    } else {
        const valorOp = operacion(instruccion.expresion)
        traduccion = instruccion.id + " = " + valorOp.valor
        console.log('Traduccion Declaracion:', traduccion)
        return traduccion
    }
}

module.exports = declaracion