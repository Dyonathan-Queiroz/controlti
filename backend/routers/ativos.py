from fastapi import APIRouter, HTTPException, status
from typing import List
from backend.schemas import AtivosCreate, AtivosResponse

router = APIRouter(prefix="/api/ativos", tags=["Ativos"])

banco_ativos = [
    {"id":1, "nome": "Notebook Dell latitude", "numero_serie": "123456", "categoria": "Notebook", "status": "Em uso"},
    {"id":2, "nome": "Monitor LG", "numero_serie": "789012", "categoria": "Monitor", "status": "Disponível"},
]

@router.get("/", response_model=List[AtivosResponse])
def listar_ativos():
    """Retorna todos os ativos cadastrados no banco de dados."""
    return banco_ativos

@router.post("/", response_model=AtivosResponse, status_code=status.HTTP_201_CREATED)
def criar_ativo(ativo: AtivosCreate):
    """Cadastrar um novo ativo de T.I no sistema."""
    novo_id = len(banco_ativos) + 1
    novo_ativo = {"id": novo_id, **ativo.model_dump()}
    banco_ativos.append(novo_ativo)
    return novo_ativo