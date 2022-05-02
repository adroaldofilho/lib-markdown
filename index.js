import fs from 'fs';

function extraiLinks(texto) {
    const regex = /\[([^\]]*)\]\((http?s:\/\/[^$#\s]*.[^\s]*)\)/gm;
    const arrayResultados = [];
    let temp;
    while((temp = regex.exec(texto)) != null ) {
        arrayResultados.push({ [temp[1]]: temp[2]});
    }
    return arrayResultados.length === 0 ? 'Não há links' : arrayResultados;
}

function trataErro(erro) {
    throw new Error(erro.code, 'Arquivo inválido!');
}

export async function pegaArquivo(caminhoDoArquivo) {
    try {
        console.log('Caminho do Arquivo: ', caminhoDoArquivo);
        const enconding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, enconding);
        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro);
    }
}
