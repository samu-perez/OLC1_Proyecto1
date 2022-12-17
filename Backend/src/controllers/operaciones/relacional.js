const TIPO_OPERACION = require('../enums/tipoOperacion')
const TIPO_VALOR = require('../enums/tipoValor')
const valorExpresion = require('./valorExpresion')
const aritmetica = require('./aritmetica')

const relacional = (expresion) => {
    if(expresion.tipo === TIPO_VALOR.ENTERO || expresion.tipo === TIPO_VALOR.DECIMAL || expresion.tipo === TIPO_VALOR.CHAR || 
        expresion.tipo === TIPO_VALOR.BOOL || expresion.tipo === TIPO_VALOR.CADENA || expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return valorExpresion(expresion)
    } else if(expresion.tipo === TIPO_OPERACION.SUMA || expresion.tipo === TIPO_OPERACION.RESTA || expresion.tipo === TIPO_OPERACION.MULTIPLICACION || expresion.tipo === TIPO_OPERACION.DIVISION){
        return aritmetica(expresion)
    } else if(expresion.tipo === TIPO_OPERACION.IGUALIGUAL){
        return igualIgual(expresion.opIzq, expresion.opDer)
    } else if(expresion.tipo === TIPO_OPERACION.DIFERENTE){
        return diferente(expresion.opIzq, expresion.opDer)
    } else if(expresion.tipo === TIPO_OPERACION.MENOR){
        return menor(expresion.opIzq, expresion.opDer)
    } else if(expresion.tipo === TIPO_OPERACION.MAYOR){
        return mayor(expresion.opIzq, expresion.opDer)
    } else if(expresion.tipo === TIPO_OPERACION.MENORIGUAL){
        return menorIgual(expresion.opIzq, expresion.opDer)
    } else if(expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return mayorIgual(expresion.opIzq, expresion.opDer)
    }
}

function igualIgual(expresionOpIzq, expresionOpDer){
    const opIzq = relacional(expresionOpIzq)
    const opDer = relacional(expresionOpDer)
    const resultado = opIzq.valor  + " == " + opDer.valor
    return {
        valor: resultado,
        tipo: opIzq.tipo,
        linea: opIzq.linea,
        columna: opIzq.columna
    }
}

function diferente(expresionOpIzq, expresionOpDer){
    const opIzq = relacional(expresionOpIzq)
    const opDer = relacional(expresionOpDer)
    const resultado = opIzq.valor  + " != " + opDer.valor
    return {
        valor: resultado,
        tipo: opIzq.tipo,
        linea: opIzq.linea,
        columna: opIzq.columna
    }
}

function menor(expresionOpIzq, expresionOpDer){
    const opIzq = relacional(expresionOpIzq)
    const opDer = relacional(expresionOpDer)
    const resultado = opIzq.valor  + " < " + opDer.valor
    return {
        valor: resultado,
        tipo: opIzq.tipo,
        linea: opIzq.linea,
        columna: opIzq.columna
    }
}

function mayor(expresionOpIzq, expresionOpDer){
    const opIzq = relacional(expresionOpIzq)
    const opDer = relacional(expresionOpDer)
    const resultado = opIzq.valor  + " > " + opDer.valor
    return {
        valor: resultado,
        tipo: opIzq.tipo,
        linea: opIzq.linea,
        columna: opIzq.columna
    }
}

function menorIgual(expresionOpIzq, expresionOpDer){
    const opIzq = relacional(expresionOpIzq)
    const opDer = relacional(expresionOpDer)
    const resultado = opIzq.valor  + " <= " + opDer.valor
    return {
        valor: resultado,
        tipo: opIzq.tipo,
        linea: opIzq.linea,
        columna: opIzq.columna
    }
}
function mayorIgual(expresionOpIzq, expresionOpDer){
    const opIzq = relacional(expresionOpIzq)
    const opDer = relacional(expresionOpDer)
    const resultado = opIzq.valor  + " >= " + opDer.valor
    return {
        valor: resultado,
        tipo: opIzq.tipo,
        linea: opIzq.linea,
        columna: opIzq.columna
    }
}

module.exports = relacional