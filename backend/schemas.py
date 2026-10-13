from pydantic import BaseModel
from typing import Optional

class AtivoBase(BaseModel):
    nome: str
    numero_serie: str
    catergoria: str
    status: str = "Diponível"

class AtivosCreate(AtivoBase):
    pass
class AtivosResponse(AtivoBase):
    id: int

    class Config:
        from_atributes = True
