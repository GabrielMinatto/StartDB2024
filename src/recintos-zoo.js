class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: ['savana'], tamanho: 10, animais: [{ especie: 'macaco', quantidade: 3, tamanho: 1 }] },
            { numero: 2, bioma: ['floresta'], tamanho: 5, animais: [] },
            { numero: 3, bioma: ['savana', 'rio'], tamanho: 7, animais: [{ especie: 'gazela', quantidade: 1, tamanho: 2 }] },
            { numero: 4, bioma: ['rio'], tamanho: 8, animais: [] },
            { numero: 5, bioma: ['savana'], tamanho: 9, animais: [{ especie: 'leao', quantidade: 1, tamanho: 3 }] }
        ];

        this.animaisPermitidos = [
            { especie: 'leao', tamanho: 3, biomas: ['savana'], carnivoro: true },
            { especie: 'leopardo', tamanho: 2, biomas: ['savana'], carnivoro: true },
            { especie: 'crocodilo', tamanho: 3, biomas: ['rio'], carnivoro: true },
            { especie: 'macaco', tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            { especie: 'gazela', tamanho: 2, biomas: ['savana'], carnivoro: false },
            { especie: 'hipopotamo', tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        ];
    }

    // Valida se o animal informado é permitido
    validarAnimal(animal) {
        return this.animaisPermitidos.some(permitido => permitido.especie === animal.toLowerCase());
    }

    // Valida se a quantidade é um número válido
    validarQuantidade(quantidade) {
        return Number.isInteger(quantidade) && quantidade > 0;
    }

    analisaRecintos(animal, quantidade) {
        // Validação de animal
        if (!this.validarAnimal(animal)) {
            return {erro: 'Animal inválido'};
        }

        // Validação de quantidade
        if (!this.validarQuantidade(quantidade)) {
            return {erro: 'Quantidade inválida'};
        }

        const especieInfo = this.animaisPermitidos.find(permitido => permitido.especie === animal.toLowerCase());
        const recintosViaveis = [];

        for (let recinto of this.recintos) {
            // Reduz o array a um único valor(total que inicia em zero), no caso a soma da quantidade de animais(a) vezes o seu tamanho
            let espacoOcupado = recinto.animais.reduce((total, a) => total + a.quantidade * a.tamanho, 0);
            let espacoLivre = recinto.tamanho - espacoOcupado;
            // Itera sob os animais no array e compara as especies
            let outraEspeciePresente = recinto.animais.some(a => a.especie !== especieInfo.especie);
            // Itera sob o array de biomas para tentar encontrar um bioma válido
            let biomaCompativel = especieInfo.biomas.some(bioma => recinto.bioma.includes(bioma));
            // Quando há mais de uma espécie no mesmo recinto, é preciso considerar 1 espaço extra ocupado
            let regraEspaco = espacoLivre >= (especieInfo.tamanho * quantidade) + (outraEspeciePresente ? 1 : 0);

            // Animais carnívoros devem habitar somente com a própria espécie
            if (especieInfo.carnivoro && outraEspeciePresente) continue; // Pula para o próximo recinto

            // Regra de herbívoros com carnívoros
            if (!especieInfo.carnivoro && outraEspeciePresente) {
                let carnivoroPresente = recinto.animais.some(animal => {
                    let animalPresente = this.animaisPermitidos.find(permitido => permitido.especie === animal.especie);
                    return animalPresente && animalPresente.carnivoro;
                });
                if (carnivoroPresente) continue; // Pula para o próximo recinto
            }

            // Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
            if (especieInfo.especie === 'macaco' && recinto.animais.length === 0 && quantidade <= 1) continue; // Macacos não podem ficar sozinhos

            // Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
            if (especieInfo.especie === 'hipopotamo' && outraEspeciePresente) {
                let biomaSavanaERio = recinto.bioma.includes('savana') && recinto.bioma.includes('rio');
                if (!biomaSavanaERio) continue; //Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
            }

            // Se todas as condições forem atendidas, adiciona o recinto à lista
            if (biomaCompativel && regraEspaco) {
                recintosViaveis.push({
                    numero: recinto.numero,
                    espacoLivre: espacoLivre - (especieInfo.tamanho * quantidade) - (outraEspeciePresente ? 1 : 0),
                    tamanhoTotal: recinto.tamanho
                });
            }
        }

        if (recintosViaveis.length > 0) {
            return {
                recintosViaveis: recintosViaveis.map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.tamanhoTotal})`)
            };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }
}

export { RecintosZoo as RecintosZoo };