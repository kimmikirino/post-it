import notas from './scriptNew';

test('testa se está adicionado item', () => {
    notas.adiciona("Titulo teste", "Texto");
    expect(notas.contaItems()).toBe(1);
});