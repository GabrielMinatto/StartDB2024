class Recinto {
  constructor(numero, biomas = [], tamanhoTotal, animais = []) {
    this.numero = numero;
    this.biomas = biomas;
    this.tamanhoTotal = tamanhoTotal;
    this.animais = animais;
  }

  static listaDeRecintos() {
    return [
      new Recinto(1, ['savana'], 10, [{ especie: 'MACACO', quantidade: 3, tamanho: 1 }]),
      new Recinto(2, ['floresta'], 5, []),
      new Recinto(3, ['savana', 'rio'], 7, [{ especie: 'GAZELA', quantidade: 1, tamanho: 2 }]),
      new Recinto(4, ['rio'], 8, []),
      new Recinto(5, ['savana'], 9, [{ especie: 'LEAO', quantidade: 1, tamanho: 3 }]),
    ];
}

  outraEspeciePresente(novoAnimal) {
    return this.animais.some(a => a.especie !== novoAnimal);
  }

  espacoLivre() {
    let espacoOcupado = this.animais.reduce((total, a) => total + (a.quantidade * a.tamanho), 0);
    return this.tamanhoTotal - espacoOcupado;
  }
}

export { Recinto as Recinto };