// URL base da API corrigido (apontando corretamente para a raiz da API)
const API_URL = "http://127.0.0.1:8000/api";

console.log("O ficheiro app.js está a carregar!");

// Função assíncrona para buscar os ativos
async function carregarAtivos() {
    const container = document.getElementById("ativos-container");

    try {
        const resposta = await fetch(`${API_URL}/ativos`);
        if (!resposta.ok) {
            throw new Error(`Erro ao comunicar com o servidor: ${resposta.status}`);
        }
        const ativos = await resposta.json();

        // Se a lista estiver vazia
        if (ativos.length === 0) {
            container.innerHTML = "<p>Nenhum ativo de T.I. cadastrado.</p>";
            return;
        }

        // Construir a tabela ou lista visual de ativos
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

        ativos.forEach(item => {
            html += `
                <tr>
                    <td>${item.id}</td>
                    <td><strong>${item.nome}</strong></td>
                    <td>${item.numero_serie}</td>
                    <td>${item.categoria}</td>
                    <td><span class="badge ${item.status === 'Disponível' ? 'success' : 'warning'}">${item.status}</span></td>
                </tr>
            `;
        });

        html += `</tbody></table>`;
        container.innerHTML = html;
        
    } catch (erro) {
        console.error("Erro na busca:", erro);
        container.innerHTML = `
            <p class="loading" style="color: #dc2626">
                Não foi possível carregar os ativos. Por favor, tente novamente mais tarde.
            </p>
        `;
    }
}

// Função para lidar com o envio do formulário de cadastro (POST)
async function registrarAtivo(evento) {
    evento.preventDefault(); // Evita que a página recarregue ao submeter

    const novoAtivo = {
        nome: document.getElementById("nome").value,
        numero_serie: document.getElementById("numero_serie").value,
        categoria: document.getElementById("categoria").value,
        status: document.getElementById("status").value
    };

    try {
        const resposta = await fetch(`${API_URL}/ativos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoAtivo)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar o ativo no servidor.");
        }

        // Limpar o formulário após o sucesso
        document.getElementById("form-ativo").reset();

        // Recarregar a lista de ativos para mostrar o novo equipamento adicionado
        carregarAtivos();
        
        alert("Ativo cadastrado com sucesso!");

    } catch (erro) {
        console.error("Erro ao enviar:", erro);
        alert("Ocorreu um erro ao tentar registar o ativo. Verifique a consola.");
    }
}

// Garantir que tudo é executado apenas quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM totalmente carregado!");
    carregarAtivos();

    // Associar o evento de envio ao formulário
    const form = document.getElementById("form-ativo");
    if (form) {
        console.log("Formulário 'form-ativo' detetado com sucesso! Evento 'submit' associado.");
        form.addEventListener("submit", registrarAtivo);
    } else {
        console.error("ERRO: O formulário com ID 'form-ativo' não foi encontrado no HTML!");
    }
});