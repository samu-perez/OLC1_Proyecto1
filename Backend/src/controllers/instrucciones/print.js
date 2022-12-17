const operacion = require('../operaciones/operacion')
const TIPO_DATO = require('../enums/tipoDato')

const print = (instruccion) => {
    
    const valorOp = operacion(instruccion.expresion)
    
    if(valorOp.tipo === TIPO_DATO.ENTERO){
        const traduccion = "print(" + valorOp.valor + ")"
        console.log('Traduccion PRINT:', traduccion)
        return traduccion
    } else {
        const traduccion = "print(" + (valorOp.valor).replace('+', ',') + ")"
        console.log('Traduccion PRINT:', traduccion)
        return traduccion
    }
    
}

module.exports = print