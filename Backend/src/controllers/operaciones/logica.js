const TIPO_OPERACION = require('../enums/tipoOperacion')
const TIPO_VALOR = require('../enums/tipoValor')
const valorExpresion = require('./valorExpresion')
const relacional = require('./relacional')

const logica = (expresion) => {
    if(expresion.tipo === TIPO_VALOR.ENTERO || expresion.tipo === TIPO_VALOR.DECIMAL || expresion.tipo === TIPO_VALOR.CHAR || 
        expresion.tipo === TIPO_VALOR.BOOL || expresion.tipo === TIPO_VALOR.CADENA || expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return valorExpresion(expresion)
    } else if(expresion.tipo === TIPO_OPERACION.IGUALIGUAL || expresion.tipo === TIPO_OPERACION.DIFERENTE || expresion.tipo === TIPO_OPERACION.MENOR || 
        expresion.tipo === TIPO_OPERACION.MAYOR || expresion.tipo === TIPO_OPERACION.MENORIGUAL || expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return relacional(expresion)
    } else if(expresion.tipo === TIPO_OPERACION.OR){
        return or(expresion.opIzq, expresion.opDer)
    } else if(expresion.tipo === TIPO_OPERACION.AND){
        return and(expresion.opIzq, expresion.opDer)
    } else if(expresion.tipo === TIPO_OPERACION.NOT){
        return not(expresion.opDer)
    }
}

function or(expresionOpIzq, expresionOpDer){
    const opIzq = logica(expresionOpIzq)
    const opDer = logica(expresionOpDer)

    const resultado = opIzq.valor  + " or " + opDer.valor
    return {
        valor: resultado,
        tipo: opIzq.tipo,
        linea: opIzq.linea,
        columna: opIzq.columna
    }
}

function and(expresionOpIzq, expresionOpDer){
    const opIzq = logica(expresionOpIzq)
    const opDer = logica(expresionOpDer)

    const resultado = opIzq.valor  + " and " + opDer.valor
    return {
        valor: resultado,
        tipo: opIzq.tipo,
        linea: opIzq.linea,
        columna: opIzq.columna
    }
}

function not(expresionOpDer){
    const opDer = logica(expresionOpDer)

    const resultado = " not " + opDer.valor
    return {
        valor: resultado,
        tipo: opDer.tipo,
        linea: opDer.linea,
        columna: opDer.columna
    }
}

module.exports = logica