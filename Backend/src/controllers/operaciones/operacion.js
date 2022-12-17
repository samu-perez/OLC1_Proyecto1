const TIPO_OPERACION = require('../enums/tipoOperacion')
const TIPO_VALOR = require('../enums/tipoValor')
const valorExpresion = require('./valorExpresion')
const aritmetica = require('./aritmetica')
const logica = require('./logica')
const relacional = require('./relacional')


const operacion = (expresion) => {
    if(expresion.tipo === TIPO_VALOR.ENTERO || expresion.tipo === TIPO_VALOR.DECIMAL || expresion.tipo === TIPO_VALOR.CHAR || 
        expresion.tipo === TIPO_VALOR.BOOL || expresion.tipo === TIPO_VALOR.CADENA || expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return valorExpresion(expresion)
    } else if(expresion.tipo === TIPO_OPERACION.SUMA){
        return aritmetica(expresion)
    } else if(expresion.tipo === TIPO_OPERACION.RESTA){
        return aritmetica(expresion)
    } else if(expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        return aritmetica(expresion)
    } else if(expresion.tipo === TIPO_OPERACION.DIVISION){
        return aritmetica(expresion)
    } else if(expresion.tipo === TIPO_OPERACION.NEGATIVO){
        return aritmetica(expresion)
    } else if(expresion.tipo === TIPO_OPERACION.OR || expresion.tipo === TIPO_OPERACION.AND || expresion.tipo === TIPO_OPERACION.NOT){
        return logica(expresion)
    } else if(expresion.tipo === TIPO_OPERACION.IGUALIGUAL || expresion.tipo === TIPO_OPERACION.DIFERENTE || expresion.tipo === TIPO_OPERACION.MENOR || 
        expresion.tipo === TIPO_OPERACION.MAYOR || expresion.tipo === TIPO_OPERACION.MENORIGUAL || expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return relacional(expresion)
    }
}

module.exports = operacion