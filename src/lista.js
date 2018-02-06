import Nota from './nota';

class ListaNotas {
    constructor(observador) {
        this.listaNotas = [];
        this._observador = observador;
    }

    adiciona(novoTitulo, novoTexto) {
        let nota = new Nota(novoTitulo, novoTexto);
        this.listaNotas.push(nota);
        this._observador();
    }

    remove(posicao, quantidade) {
        this.listaNotas.splice(posicao, 1);
        this._observador();
    }

    edita(posicao) {
        this.listaNotas[posicao].editando = true;
        this._observador();
    }

    salva(posicao, novoTitulo, novoTexto) {
        this.listaNotas[posicao].titulo = novoTitulo;
        this.listaNotas[posicao].texto = novoTexto;
        this.listaNotas[posicao].editando = false;
        this._observador();
    }

    pega(posicao) {
        return this.listaNotas[posicao];
    }
 
    contaTotal() {
        return this.listaNotas.length;
    }
};

export default ListaNotas;