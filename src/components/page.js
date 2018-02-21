import React from 'react';
import FormNotas from './formNotas';
import SecaoNotas from './secaoNotas';
import ListaNotas from '../lista';
import Nota from '../nota';

function montaFormNotas(listaNotas, posicao, adicionarNota, removerNota, editarFormulario) {
    const props = {
        key: posicao,
        notaAtual: listaNotas.pega(posicao),
        adicionarNota,
        removerNota,
        editarFormulario
    };
    return React.createElement(FormNotas, props);
}

function montaSecao(listaNotas, adicionarNota, removerNota, editarFormulario) {
    const props = {
        key: 'notes',
        className: 'notes'
    };

    const children = listaNotas.pegaTodos().map((notaAtual, posicao) => {
        montaFormNotas(listaNotas, posicao, adicionarNota, removerNota, editarFormulario)
    });
    return React.createElement(SecaoNotas, props, children);
}

class Page extends React.Component {
    constructor(props) {
        super(props);

        this.atualizaPagina = this.atualizaPagina.bind(this);
        this.adicionarNota = this.adicionarNota.bind(this);
        this.editarFormulario = this.editarFormulario.bind(this);
        this.removerNota = this.removerNota.bind(this);

        this.state = {
            listaNotas: new ListaNotas(this.atualizaPagina)
        }
    }

    atualizaPagina(novaLista) {
        this.setState({ 
            listaNotas: novaLista 
        });
    }

    editarFormulario(posicao) {
        this.state.listaNotas.edita(posicao)
    }

    adicionarNota(titulo, texto, formulario, posicao) {
        if (this.state.listaNotas.pega(posicao)) {
            this.state.listaNotas.salva(posicao, titulo, texto);
        } else {
            this.state.listaNotas.adiciona(titulo, texto);
            formulario.reset();
        }
    }

    removerNota(evento, posicao) {
        evento.stopPropagation();
        this.state.listaNotas.remove(posicao);
    }

    render() {
        const props = {
            className: 'container'
        }

        //let formNotas = montaFormNotas(this.state.listaNotas, this.adicionarNota, this.removerNota, this.editarFormulario );
        let secaoNotas = montaSecao(this.state.listaNotas, this.adicionarNota, this.removerNota, this.editarFormulario);
        
        const children = [secaoNotas];

        return React.createElement('main', props, children)
    }
}


export default Page;