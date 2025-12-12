# Configuração do Arquivo .env

## Visão Geral

O arquivo `.env` contém as variáveis de ambiente necessárias para que a aplicação NestJS se conecte ao banco de dados MySQL. Este arquivo **deve estar localizado na raiz do projeto** (mesmo diretório do `package.json`).

## Como Criar o Arquivo .env

### Opção 1: Usando o arquivo .env.example (Recomendado)

1. Na raiz do projeto, copie o arquivo `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` com suas credenciais reais:
   ```bash
   nano .env
   ```

### Opção 2: Criando manualmente

1. Crie um arquivo chamado `.env` na raiz do projeto
2. Adicione o seguinte conteúdo:
   ```
   DB_HOST=172.21.0.2
   DB_PORT=3306
   DB_USER=devuser
   DB_PASS=12345
   DB_NAME=dev
   ```

## Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DB_HOST` | Endereço IP ou hostname do servidor MySQL | `172.21.0.2` |
| `DB_PORT` | Porta de conexão do MySQL | `3306` |
| `DB_USER` | Usuário do banco de dados | `devuser` |
| `DB_PASS` | Senha do usuário do banco de dados | `12345` |
| `DB_NAME` | Nome do banco de dados | `dev` |

## Estrutura do Projeto

```
/api-user (raiz do projeto)
├── .env                    ← Arquivo deve estar AQUI
├── .env.example           ← Template de exemplo
├── package.json
├── src/
│   ├── .env               ← NÃO usar este arquivo
│   ├── app.module.ts
│   └── ...
└── ...
```

## ⚠️ Aviso Importante

- **Nunca commit o arquivo `.env`** com credenciais reais no repositório Git
- O `.env` já está incluído no `.gitignore`
- Use o `.env.example` como template para desenvolvedor compartilharem a estrutura
- Atualize o `.env.example` quando novas variáveis forem adicionadas

## Verificação de Conexão

Após criar o arquivo `.env`, inicie a aplicação:

```bash
npm run start
```

Se a conexão for bem-sucedida, você verá:
```
✓ Database connection established
✓ Tables synchronized
✓ Database seeded successfully
```

## Troubleshooting

### Erro: "Access denied for user ''@'..."

Este erro indica que o arquivo `.env` não foi encontrado na raiz do projeto. Verifique:
- [ ] O arquivo existe em `/api-user/.env` (raiz)
- [ ] O arquivo não está em `src/.env`
- [ ] As credenciais estão corretas

### Erro: "Connection refused"

Verifique:
- [ ] O MySQL está rodando
- [ ] O `DB_HOST` e `DB_PORT` estão corretos
- [ ] Não há firewall bloqueando a conexão
