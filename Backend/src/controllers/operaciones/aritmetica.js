const TIPO_OPERACION = require('../enums/tipoOperacion')
const TIPO_VALOR = require('../enums/tipoValor')
const valorExpresion = require('./valorExpresion')

const aritmetica = (expresion) => {
    if(expresion.tipo === TIPO_VALOR.ENTERO || expresion.tipo === TIPO_VALOR.DECIMAL || expresion.tipo === TIPO_VALOR.CHAR || 
        expresion.tipo === TIPO_VALOR.BOOL || expresion.tipo === TIPO_VALOR.CADENA || expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return valorExpresion(expresion)
    }else if(expresion.tipo === TIPO_OPERACION.SUMA){
        return suma(expresion.opIzq, expresion.opDer)
    } else if(expresion.tipo === TIPO_OPERACION.RESTA){
        return resta(expresion.opIzq, expresion.opDer)
    } else if(expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        return multiplicacion(expresion.opIzq, expresion.opDer)
    } else if(expresion.tipo === TIPO_OPERACION.DIVISION){
        return division(expresion.opIzq, expresion.opDer)
    } else if(expresion.tipo === TIPO_OPERACION.NEGATIVO){
        return negativo(expresion.opDer)
    } 
}

function suma(expresionOpIzq, expresionOpDer){
    const opIzq = aritmetica(expresionOpIzq)
    const opDer = aritmetica(expresionOpDer)
    
    const resultado = opIzq.valor  + " + " + opDer.valor
    return {
        valor: resultado,
        tipo: opIzq.tipo,
        linea: opIzq.linea,
        columna: opIzq.columna
    }
}

function resta(expresionOpIzq, expresionOpDer){
    const opIzq = aritmetica(expresionOpIzq)
    const opDer = aritmetica(expresionOpDer)
    
    const resultado = opIzq.valor  + " - " + opDer.valor
    return {
        valor: resultado,
        tipo: opIzq.tipo,
        linea: opIzq.linea,
        columna: opIzq.columna
    }
}

function multiplicacion(expresionOpIzq, expresionOpDer){
    const opIzq = aritmetica(expresionOpIzq)
    const opDer = aritmetica(expresionOpDer)
    
    const resultado = opIzq.valor  + " * " + opDer.valor
    return {
        valor: resultado,
        tipo: opIzq.tipo,
        linea: opIzq.linea,
        columna: opIzq.columna
    }
}

function division(expresionOpIzq, expresionOpDer){
    const opIzq = aritmetica(expresionOpIzq)
    const opDer = aritmetica(expresionOpDer)
    
    const resultado = opIzq.valor  + " / " + opDer.valor
    return {
        valor: resultado,
        tipo: opIzq.tipo,
        linea: opIzq.linea,
        columna: opIzq.columna
    }
}

function negativo(expresionOpDer){
    const opDer = aritmetica(expresionOpDer)
    
    const resultado = "-" + opDer.valor
    return {
        valor: resultado,
        tipo: opDer.tipo,
        linea: opDer.linea,
        columna: opDer.columna
    }
}

module.exports = aritmetica