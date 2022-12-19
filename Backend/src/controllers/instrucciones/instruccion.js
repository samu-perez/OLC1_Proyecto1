const TIPO_INSTRUCCION = require('../enums/tipoInstruccion')

function operacionBinaria(_opizq, _opDer, _tipo, _linea, _columna){
    return{
        opIzq:_opizq,
        opDer:_opDer,
        tipo:_tipo,
        linea:_linea,
        columna:_columna,
    }
}
function operacionUnaria(_opDer, _tipo, _linea, _columna){
    return{
        opDer: _opDer,
        tipo: _tipo,
        linea: _linea,
        columna: _columna,
    }
}

const instruccion = {
    nuevoValor: (_valor, _tipo, _linea, _columna) => {
        return {
            tipo: _tipo,
            valor: _valor,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaOperacionBinaria: (_opizq, _opDer, _tipo, _linea, _columna) => {
        return operacionBinaria(_opizq, _opDer, _tipo, _linea, _columna);
    },
    nuevaOperacionUnaria: (_opDer,_tipo, _linea, _columna) => {
        return operacionUnaria(_opDer, _tipo, _linea, _columna);
    },
    nuevaDeclaracion: (_id, _expresion, _tipo, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.DECLARACION,
            id: _id,
            expresion: _expresion,
            tipo_dato: _tipo,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaAsignacion: (_id, _expresion, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoPrint: (_expresion, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.PRINT,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    }, nuevoIf: (_expresion, _instrucciones, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.IF,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    }, nuevoIfElse: (_expresion, _instruccionesIf, _instruccionesElse, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.IF_ELSE,
            expresion: _expresion,
            instruccionesIf: _instruccionesIf,
            instruccionesElse: _instruccionesElse,
            linea: _linea,
            columna: _columna
        }
    }, nuevoIfConElseIf: (_expresion, _instruccionesIf, _lista_elseif, _instruccionesElse, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.IF_ELSE_IF,
            expresion: _expresion,
            instruccionesIf: _instruccionesIf,
            lista_elseif: _lista_elseif,
            instruccionesElse: _instruccionesElse,
            linea: _linea,
            columna: _columna

        }
    }, nuevoElseIf: (_expresion, _instruccionesElseIf, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.ELSE_IF,
            expresion: _expresion,
            instruccionesElseIf: _instruccionesElseIf,
            linea: _linea,
            columna: _columna
        }
    }, nuevoWhile: (_expresion, _instrucciones, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.WHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    }, nuevoDoWhile: (_expresion, _instrucciones, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.DOWHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    }, nuevoMetodo: (_id, _lista_parametros, _instrucciones, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.DEC_METODO,
            id: _id,
            lista_parametros: _lista_parametros,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    }, nuevaFuncion: (_tipoFunc, _id, _lista_parametros, _instrucciones, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.DEC_FUNCION,
            tipoFunc: _tipoFunc,
            id: _id,
            lista_parametros: _lista_parametros,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    }, nuevoMain: (_instrucciones, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.MAIN,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    }, nuevoReturn: (_expresion, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.RETURN,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    }, nuevoBreak: (_linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.BREAK,
            linea: _linea,
            columna: _columna
        }
    }, nuevoContinue: (_linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.CONTINUE,
            linea: _linea,
            columna: _columna
        }
    }, nuevoIncrementoDecremento: (_id, _tipoIncDec, _linea, _columna) => {
        return {
            tipo_dato: TIPO_INSTRUCCION.INCREMENTO_DECREMENTO,
            id: _id,
            tipoIncDec: _tipoIncDec,
            linea: _linea,
            columna: _columna

        }
    }, nuevoFor: (_inicio, _condicion, _actualizacion, _instrucciones, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.FOR,
            inicio: _inicio,
            condicion: _condicion,
            actualizacion: _actualizacion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    }, nuevoSwitchCase: (_expresion, _lista_case, _instruccionesDefault, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.SWITCH,
            expresion: _expresion,
            lista_case: _lista_case,
            instruccionesDefault: _instruccionesDefault,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoCase: (_expresion, _instruccionesCase, _linea, _columna) => {
        return {
            tipo: TIPO_INSTRUCCION.CASE,
            expresion: _expresion,
            instruccionesCase: _instruccionesCase,
            linea: _linea,
            columna: _columna
        }
    }
}

module.exports = instruccion