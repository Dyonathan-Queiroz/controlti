from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import ativos

app = FastAPI(
    title="ControleTI API",
    description = "Api oficial para o sistema de gestão de ativos de T.I",
    version="1.0.0",
)

#Config de CORS (comunicação do Front com a API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Registando as rotas do modulo de ativos
app.include_router(ativos.router, prefix="/api", tags=["Ativos"])

@app.get("/")
def read_root():
    return {"message": "Bem-vindo a API de Controle de Ativos de T.I 🚀"}