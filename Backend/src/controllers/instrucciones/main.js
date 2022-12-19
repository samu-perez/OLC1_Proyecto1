const main = (instruccion) => {
    const bloque = require('../analisis.controller').bloque
    const traduccionBloque = bloque(instruccion.instrucciones)

    let traduccion = "def main():\n" + traduccionBloque
    traduccion += "if __name__ == '__main__':\n"
    traduccion += "\tmain()"
    return traduccion
}

module.exports = main