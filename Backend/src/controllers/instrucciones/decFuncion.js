const Simbolo = require('../simbolos/simbolo')
const VarStatic = require('../simbolos/static')

const decFuncion = (instruccion) => {
    const bloque = require('../analisis.controller').bloque
    const traduccionBloque = bloque(instruccion.instrucciones)

    const nuevoSimbolo = new Simbolo(instruccion.id, 'NA', instruccion.tipoFunc, 'DEC_FUNCION', instruccion.linea, instruccion.columna)
    VarStatic.tablaSimbolos.push(nuevoSimbolo)

    if(instruccion.lista_parametros == null){
        const traduccion = "def " + instruccion.id + "():\n" + traduccionBloque
        return traduccion
    } else {
        let parametros = ""
        instruccion.lista_parametros.forEach(parametro => {
            parametros += parametro.id + ", "
        })
        const traduccion = "def " + instruccion.id + `(${parametros.slice(0,-2)}):\n` + traduccionBloque
        return traduccion
    }
}

module.exports = decFuncion