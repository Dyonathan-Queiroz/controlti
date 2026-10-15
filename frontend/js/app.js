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
        //limpa o container de carregamento 
        container.innerHTML = "";
        ativos.forEach(ativo => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "ativo-item";
            itemDiv.innerHTML = `
                <div>
                    <strong>${ativo.nome}</strong> 
                    <span style="color: #64748b; font-size: 0.9rem;">(Série: ${ativo.numero_serie})</span>
                </div>
                <div>
                    <span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">
                        ${ativo.categoria}
                    </span>
                    <span style="margin-left: 8px; color: ${ativo.status === 'Disponível' ? '#16a34a' : '#d97706'}; font-weight: 600; font-size: 0.85rem;">
                        ● ${ativo.status}
                    </span>
                </div>
            `;
            container.appendChild(itemDiv);
        });
    } catch (erro) {
        console.error("Erro na busca", erro);
        container.innerHTML = `
            <p class="loading" style="color: #dc2626">
                Não foi possível carregar os ativos. Por favor, tente novamente mais tarde.
            </p>
        `;
    }
}

//Executa a função assim que a pagina for totalmete carregada
document.addEventListener("DOMContentLoaded", carregarAtivos);
