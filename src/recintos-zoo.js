import { Animal } from "./animal.js";
import { Recinto } from "./recinto.js";

class RecintosZoo {
    constructor() {
      this.animaisPermitidos = Animal.animaisPermitidos();
      this.recintos = Recinto.listaDeRecintos();
    }

    validarAnimal(especie) {
        return this.animaisPermitidos.some(animal => animal.especie === especie.toUpperCase());
    }

    validarQuantidade(quantidade) {
        return Number.isInteger(quantidade) && quantidade > 0;
    }

    analisaRecintos(animal, quantidade) {
        if (!this.validarAnimal(animal)) {
            return { erro: 'Animal inválido' };
        }

        if (!this.validarQuantidade(quantidade)) {
            return { erro: 'Quantidade inválida' };
        }

        const especieInfo = this.animaisPermitidos.find(a => a.especie === animal.toUpperCase());
        const recintosViaveis = [];

        for (let recinto of this.recintos) {
            let espacoNecessario = (especieInfo.tamanho * quantidade) + (recinto.outraEspeciePresente(especieInfo.especie) ? 1 : 0);

            if (!especieInfo.biomaCompativel(recinto.biomas) || recinto.espacoLivre() < espacoNecessario) continue;

            if (especieInfo.carnivoro && recinto.outraEspeciePresente(especieInfo.especie)) continue;

            if (!especieInfo.carnivoro && recinto.outraEspeciePresente(especieInfo.especie)) {
                let carnivoroPresente = recinto.animais.some(animal => {
                    let animalPresente = this.animaisPermitidos.find(permitido => permitido.especie === animal.especie);
                    return animalPresente && animalPresente.carnivoro;
                });
                if (carnivoroPresente) continue;
            };

            if (especieInfo.especie === 'MACACO' && recinto.animais.length === 0 && quantidade <= 1) continue;

            if (especieInfo.especie === 'HIPOPOTAMO' && recinto.outraEspeciePresente(especieInfo.especie)) {
                let biomaSavanaERio = recinto.biomas.includes('savana') && recinto.biomas.includes('rio');
                if (!biomaSavanaERio) continue;
            }

            recintosViaveis.push({
                numero: recinto.numero,
                espacoLivre: recinto.espacoLivre() - espacoNecessario,
                tamanhoTotal: recinto.tamanhoTotal
            });
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