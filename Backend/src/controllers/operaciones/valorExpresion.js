const TIPO_VALOR = require('../enums/tipoValor')
const TIPO_DATO = require('../enums/tipoDato')

const valorExpresion = (expresion) => {
    if(expresion.tipo === TIPO_VALOR.ENTERO){
        return{
            valor: expresion.valor,
            tipo: TIPO_DATO.ENTERO,
            linea: expresion.linea,
            columna: expresion.columna
        }
    } else if(expresion.tipo === TIPO_VALOR.DECIMAL){
        return{
            valor: expresion.valor,
            tipo: TIPO_DATO.DECIMAL,
            linea: expresion.linea,
            columna: expresion.columna
        }
    } else if(expresion.tipo === TIPO_VALOR.CHAR){
        return{
            valor: expresion.valor,
            tipo: TIPO_DATO.CHAR,
            linea: expresion.linea,
            columna: expresion.columna
        }
    } else if(expresion.tipo === TIPO_VALOR.BOOL){
        return{
            valor: expresion.valor,
            tipo: TIPO_DATO.BOOL,
            linea: expresion.linea,
            columna: expresion.columna
        }
    } else if(expresion.tipo === TIPO_VALOR.CADENA){
        return{
            valor: expresion.valor,
            tipo: TIPO_DATO.CADENA,
            linea: expresion.linea,
            columna: expresion.columna
        }
    } else if(expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return{
            valor: expresion.valor,
            tipo: null,
            linea: expresion.linea,
            columna: expresion.columna
        }
    } 
}

module.exports = valorExpresion