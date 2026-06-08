async function buscarCep() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    const uf = document.getElementById('uf').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const resultado = document.getElementById('resultado');
    const titulo = document.getElementById('titulo');
    const rodape = document.getElementById('rodape');

    // Monta a URL da API (aceitando acentos e espaços)
    const url = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length === 0 || data[0].cep === undefined) {
            //resultado.innerHTML = "Endereço não encontrado ou CEP inexistente!";
            alert("Endereço não encontrado ou CEP inexistente! ⚠️");
            window.location.reload(true);
            return;
        }

        titulo.innerHTML = "CEP encontrado:"; // Exibe o título oculto
        resultado.innerHTML = `<strong>${data[0].cep}</strong>`; // Mostra o CEP encontrado
        resultado.style.color = "black";
        rodape.innerHTML = `${data[0].logradouro}, ${data[0].bairro}, ${data[0].localidade} - ${data[0].uf}`; // Exibe bairro, cidade e estado
        document.getElementById('div-dinamica').classList.remove('d-none'); // Exibe o botão de copiar

    } catch (error) {
        //resultado.innerHTML = "Ocorreu um erro ao buscar o endereço!";
        alert("Ocorreu um erro ao buscar o endereço! ⚠️");
        console.error("Erro:", error);
        window.location.reload(true);
    }
}

function limparCampos() {
    window.location.reload(true);
}


async function copiarTexto() {
    // 1. Seleciona o elemento HTML e pega o texto dele
    const elementoTexto = document.getElementById("resultado");
    const texto = elementoTexto.innerText; // ou .value se for um input

    try {
        // 2. Utiliza a Clipboard API para salvar o texto na área de transferência
        await navigator.clipboard.writeText(texto);
        
        alert("CEP copiado com sucesso! ✅");
        
    } catch (err) {
        console.error('Erro ao tentar copiar o cep: ', err);
    }
}