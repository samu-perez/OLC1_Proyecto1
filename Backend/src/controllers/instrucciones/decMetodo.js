
const decMetodo = (instruccion) => {
    const bloque = require('../analisis.controller').bloque
    const traduccionBloque = bloque(instruccion.instrucciones)

    if(instruccion.lista_parametros == null){
        const traduccion = "def " + instruccion.id + "():\n" + traduccionBloque
        return traduccion
    } else {
        let parametros = ""
        instruccion.lista_parametros.forEach(parametro => {
            console.log('Parametro', parametro)
            parametros += parametro.id + ", "
        })
        const traduccion = "def " + instruccion.id + `(${parametros.slice(0,-2)}):\n` + traduccionBloque
        return traduccion
    }
}

module.exports = decMetodo