const operacion = require('../operaciones/operacion')
const TIPO_DATO = require('../enums/tipoDato')
const VarStatic = require('../simbolos/static')

const print = (instruccion) => {
    const valorOp = operacion(instruccion.expresion)
    
    if(valorOp.tipo === TIPO_DATO.ENTERO){
        const traduccion = "print(" + valorOp.valor + ")"
        VarStatic.salidaHTML += valorOp.valor + "\n"
        
        return traduccion
    } else {
        const traduccion = "print(" + (valorOp.valor).replaceAll('+', ',') + ")"

        let valorHTML = (valorOp.valor).replaceAll('+', '')
        valorHTML = (valorHTML).replaceAll('"', '')
        VarStatic.salidaHTML += valorHTML + "\n"

        return traduccion
    }
    
}

module.exports = print