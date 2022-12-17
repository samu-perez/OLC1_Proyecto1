const TIPO_OPERACION = require('../enums/tipoOperacion')
const TIPO_VALOR = require('../enums/tipoValor')
const valorExpresion = require('./valorExpresion')

const aritmetica = (expresion) => {
    if(expresion.tipo === TIPO_VALOR.ENTERO || expresion.tipo === TIPO_VALOR.DECIMAL || expresion.tipo === TIPO_VALOR.CHAR || 
        expresion.tipo === TIPO_VALOR.BOOL || expresion.tipo === TIPO_VALOR.CADENA || expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return valorExpresion(expresion)
    }else if(expresion.tipo === TIPO_OPERACION.SUMA){
        console.log('*SUMA*')
        return suma(expresion.opIzq, expresion.opDer)
    } else if(expresion.tipo === TIPO_OPERACION.RESTA){
        console.log('*RESTA*')
        return resta(expresion.opIzq, expresion.opDer)
    } else if(expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        console.log('*MULTIPLICACION*')
        return multiplicacion(expresion.opIzq, expresion.opDer)
    } else if(expresion.tipo === TIPO_OPERACION.DIVISION){
        console.log('*DIVISION*')
        return division(expresion.opIzq, expresion.opDer)
    } else if(expresion.tipo === TIPO_OPERACION.NEGATIVO){
        console.log('*NEGATIVO*')
        return negativo(expresion.opDer)
    } 
}

function suma(expresionOpIzq, expresionOpDer){
    const opIzq = aritmetica(expresionOpIzq)
    const opDer = aritmetica(expresionOpDer)
    
    const resultado = opIzq.valor  + " + " + opDer.valor
    console.log('RESULT SUMA:', resultado)
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
    console.log('RESULT RESTA:', resultado)
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
    console.log('RESULT MULTIPLICACION:', resultado)
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
    console.log('RESULT DIVISION:', resultado)
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
    console.log('RESULT DIVISION:', resultado)
    return {
        valor: resultado,
        tipo: opDer.tipo,
        linea: opDer.linea,
        columna: opDer.columna
    }
}

module.exports = aritmetica