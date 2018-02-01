// a tela se atualizar sozinhanpm install babel-preset-env --save-dev
// class Notas {
//     constructor(lista) {
//         this.lista = lista;
//     }

//     adiciona(titulo, texto) {
//         let nota = {
//             titulo: titulo,
//             texto: texto,
//             editando: false
//         };

//         this.lista.push(nota);
//         atualizarSecao();
//     }

//     remove(posicao) {
//         this.lista.splice(posicao, 1);
//         atualizarSecao();
//     }

//     edita(posicao) {
//         this.lista.splice(posicao, 1);
//         atualizarSecao();
//     }

//     atualiza(titulo, texto, posicao){
//         this.lista[posicao].titulo = titulo;
//         this.lista[posicao].texto = texto;
//         this.lista[posicao].editando = false;
//         atualizarSecao();
//     }

//     pegaNota(posicao) {
//         return this.lista[posicao];
//     }

//     contaItems() {
//         return this.lista.length;
//     }
// }

const notas = {
    secao: document.getElementsByClassName('notes')[0],
    lista: [],
    adiciona(titulo, texto){
        let nota = {
            titulo: titulo,
            texto: texto,
            editando: false
        };

        this.lista.push(nota);
        atualizarSecao();
    },
    remove(posicao) {
        this.lista.splice(posicao, 1);
        atualizarSecao();
    },
    edita(posicao) {
        this.lista[posicao].editando = true;
        atualizarSecao();
    },
    atualiza(titulo, texto, posicao) {
        this.lista[posicao].titulo = titulo;
        this.lista[posicao].texto = texto;
        this.lista[posicao].editando = false;
        atualizarSecao();
    },
    pegaNota(posicao) {
        return this.lista[posicao];
    },
    contaItems() {
        return this.lista.length
    }
};

const atualizarSecao = () => {
    let conteudoSecao = "";

    // forEach, mapa, reduce
    for (let posicao = 0; posicao < notas.contaItems(); posicao++) {
        let notaAtual = notas.pegaNota(posicao);
        if (notaAtual.editando) {
            conteudoSecao += `<form class="note">
                                <input class="note__title" type="text" name="titulo" value="${notaAtual.titulo}" placeholder="Título">
                                <textarea class="note__body" name="texto" rows="5" placeholder="Criar uma nota...">${notaAtual.texto}</textarea>
                                <button class="note__control" type="button" onclick="atualizaNota(this.form.titulo, this.form.texto, ${posicao})">
                                    Atualizar
                                </button>
                             </form>`;
        } else {
            conteudoSecao += `<form class="note" onclick="editaFormulario(${posicao})">
                                <button class="note__control" type="button" onclick="removerNota(event, ${posicao})">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                </button>
                                <h1 class="note__title">${notaAtual.titulo}</h1>
                                <p class="note__body">${notaAtual.texto}</p>
                             </form>`;
        }
    }

    notas.secao.innerHTML = conteudoSecao;
}

const adicionarNota = (inputTitulo, textareaTexto, formulario) => {
    notas.adiciona(inputTitulo.value, textareaTexto.value);

    formulario.reset();
}

const atualizaNota = (inputTitulo, textareaTexto, posicao) => {
    notas.atualiza(inputTitulo.value, textareaTexto.value, posicao);
}

const removerNota = (evento, posicao) => {
    evento.stopPropagation();
    notas.remove(posicao);
}

const editaFormulario = posicao => notas.edita(posicao);