//URL base da API
const API_URL = "http://127.0.0.1:8000/api/ativos";

//Função assincrona para buscar os ativos
async function carregarAtivos() {
    const container = document.getElementById("ativos-container");

    try{
        const resposta = await fetch(API_URL);
        if(!resposta.ok){
            throw new Error('Erro ao cominicar com o servidor: ${resposta.status}');
        }
        const ativos = await resposta.json();

        //se a lista estiver vazia
        if(ativos.length === 0){
            container.innerHTML = "<p>Nenhum ativo de T.I</p>";
            return;
        }

        //construir a tabela ou lista visual de ativos
        let html = `
            <table class="ativos-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Nº de Série</th>
                        <th>Categoria</th>
                        <th>Estado</th>
                    </tr>
                </thead>
            <tbody>
        `;

        ativos.forEach(ativos => {
            html += `
                <tr>
                    <td>${ativo.id}</td>
                    <td><strong>${ativo.nome}</strong></td>
                    <td>${ativo.numero_serie}</td>
                    <td>${ativo.categoria}</td>
                    <td><span class="badge ${ativo.status === 'Disponível' ? 'success' : 'warning'}">${ativo.status}</span></td>
                </tr>
            `;
        });

        html += `</tbody></table>`
        container.innerHTML = html;
    }catch (erro) {
        console.error("Erro na busca", erro);
        container.innerHTML = `
            <p class="loading" style="color: #dc2626">
                Não foi possível carregar os ativos. Por favor, tente novamente mais tarde.
            </p>
        `;
    }
}

//Função de lidar com o envio do formulário de cadastro(POST)
async function registrarAtivos(evento){
    evento.preventDefault(); // evita a pagina recarregar ao fazer o submit do formulario
    //pegar os valores do input do formulario
    const novoAtivo ={
        nome: document.getElementById("nome").value,
        numero_serie: document.getElementById("numero_serie").value,
        categoria: document.getElementById("categoria").value,
        status: document.getElementById("status").value
    };

    try{
        const resposta = await fetch(`${API_URL}/ativos`,{
            method: "POST",
            headers: {
                "Constent-Type": "application/json"
            },
            body: JSON.stringify(novoAtivo)
        });

        if (!resposta.ok){
            throw new erro("Erro ao cadastrar ativo no servidor");
        }
        //limpar o formulario após o sucesso
        document.getElementById("form-ativo").reset();
        //Listar ativos para mostrar o novo equipamento
        carregarAtivos()
        alert("Ativo cadastrado com sucesso! ")
    } catch (erro){
        console.erro("Erro ao enviar: ", erro)
        alert("Ocorreu um erro ao tentar registrar o ativo.")
    }
}
//Executa a função assim que a pagina for totalmete carregada
document.addEventListener("DOMContentLoaded", carregarAtivos);
//associar o evento de envio ao formulario
const form = document.getElementById("form-ativos");
if (form){
    form.addEventListener("Submit", registrarAtivo);
}
