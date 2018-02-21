class Nota {
    constructor(novoTitulo, novoTexto, novoEditando = false) {
        // modificadores visibilidade
        this.titulo = novoTitulo;
        this.texto = novoTexto;
        this.editando = novoEditando;
    }
}

export default Nota;