class Animal {
    constructor(especie, tamanho, biomas = [], carnivoro) {
      this.especie = especie;
      this.tamanho = tamanho;
      this.biomas = biomas;
      this.carnivoro = carnivoro;
    }

    static animaisPermitidos() {
      return [
        new Animal('LEAO', 3, ['savana'], true),
        new Animal('LEOPARDO', 2, ['savana'], true),
        new Animal('CROCODILO', 3, ['rio'], true),
        new Animal('MACACO', 1, ['savana', 'floresta'], false),
        new Animal('GAZELA', 2, ['savana'], false),
        new Animal('HIPOPOTAMO', 4, ['savana', 'rio'], false),
      ];
    }

    biomaCompativel(biomasRecinto) {
        return this.biomas.some(bioma => biomasRecinto.includes(bioma));
    }
  }

  export { Animal as Animal };
