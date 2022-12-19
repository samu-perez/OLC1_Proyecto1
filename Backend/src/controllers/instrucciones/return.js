const operacion = require('../operaciones/operacion')

const sentenciaReturn = (instruccion) => {
    
    if(instruccion.expresion == null){
        const traduccion = "return"
        return traduccion
    } else {
        const valorOp = operacion(instruccion.expresion)
        const traduccion = "return " + valorOp.valor
        return traduccion
    }
}

module.exports = sentenciaReturn