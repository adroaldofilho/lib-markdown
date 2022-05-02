import fetch from "node-fetch";

function manejaErros(erro) {
    throw new Error(erro.message);
}

async function checaStatus(arrayURLs) {
    try {
        const arrayStatus = await Promise
        .all(arrayURLs
            .map(async url => {
                const res = await fetch(url);
                return res.status;
        }));
    }
    catch (erro) {
        manejaErros(erro);
    }
    
    return arrayStatus;
}

function geraArrayDeURLs(arrayLinks) {
    // loop para cada {valor: chave}
    // objeto -> [valor]
    // Object.values(objeto);
    return arrayLinks
        .map(objetoLink => Object
            .values(objetoLink).join());
}

export async function validaURLs(arrayLinks) {
    const links = geraArrayDeURLs(arrayLinks);
    const statusLinks = await checaStatus(links);
    // spread operator
    const resutados = arrayLinks.map((objeto, indice) => ({
        ...objeto,
        status: statusLinks[indice]
    }));

    return resutados;
}