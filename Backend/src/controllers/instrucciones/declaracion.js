const operacion = require('../operaciones/operacion')
const Simbolo = require('../simbolos/simbolo')
const VarStatic = require('../simbolos/static')

const declaracion = (instruccion) => {
    
    if(instruccion.expresion == null){
        const traduccion = instruccion.id + " = None" 

        const nuevoSimbolo = new Simbolo(instruccion.id, 'null', instruccion.tipo_dato, 'DEC_VARIABLE', instruccion.linea, instruccion.columna)
        VarStatic.tablaSimbolos.push(nuevoSimbolo)

        return traduccion
    } else {
        const valorOp = operacion(instruccion.expresion)
        const traduccion = instruccion.id + " = " + valorOp.valor

        const nuevoSimbolo = new Simbolo(instruccion.id, valorOp.valor, instruccion.tipo_dato, 'DEC_VARIABLE', instruccion.linea, instruccion.columna)
        VarStatic.tablaSimbolos.push(nuevoSimbolo)

        return traduccion
    }
}

module.exports = declaracion