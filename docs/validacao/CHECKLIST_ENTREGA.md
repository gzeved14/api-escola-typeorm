# CHECKLIST DE ENTREGA DA ATIVIDADE

## 1) Identificação
- Aluno: Gabriel
- Link do repositório (Backend/Testes):(https://github.com/gzeved14/api-escola-typeorm)
- Link do repositório (Frontend): (https://github.com/gzeved14/EnergyMonitor)

## 2) Estrutura do projeto (organização clara e funcional)

### Backend
- [x] Pasta backend organizada
- [x] README com instruções de execução
- [x] `.env` documentado (sem secrets reais)
- [x] Scripts de execução e teste funcionando

### Frontend
- [x] Pasta frontend organizada
- [x] README com instruções de execução
- [x] Integração com API funcionando
- [x] Rotas de login/cadastro funcionando

### Docker / Banco (se aplicável)
- [x] `docker-compose` configurado
- [x] Banco sobe corretamente
- [x] Healthcheck da API responde (`/health`)

## 3) Evidências de funcionamento (prints/logs/relatórios)

### Evidências mínimas (anexar print ou log)
- [x] Build do backend sem erro
- [x] Build do frontend sem erro
- [x] Cadastro de usuário funcionando
- [x] Login funcionando
- [x] Navegação para áreas/sensores funcionando
- [x] Endpoint de health funcionando

### Lista de anexos
1. Print/log de `npm test` backend (61 testes passando)
2. Print/log de `npm run test:coverage` backend
3. Print/log de `npm run build` frontend
4. Print do endpoint `http://localhost:3000/health` respondendo `{"status":"ok"}`
5. Print das telas: cadastro, login e navegação em áreas/sensores

## 4) Cobertura de testes

### Backend
- [x] Testes executados com sucesso
- [x] Relatório de cobertura gerado
- [x] Percentual de cobertura informado

Preencher:
- Statements: 10.1%
- Branches: 27.6%
- Functions: 22.05%
- Lines: 10.9%

Arquivo/print do relatório:
- [x] Caminho do relatório: `coverage/index.html`


## 5) Qualidade da solução
- [x] Código organizado em camadas/componentes
- [x] Nomes de arquivos e pastas claros
- [x] Tratamento de erros implementado
- [x] Boas práticas de segurança aplicadas
- [ ] Commits legíveis no repositório

## 6) Checklist final de submissão
- [x] Projeto sobe localmente sem erros
- [x] Instruções de execução testadas
- [ ] Evidências anexadas
- [x] Cobertura informada
- [ ] Link do repositório válido
- [ ] Entrega revisada

---

## Comandos usados na validação (preencher)
- Backend:
  - `npm install`
  - `npm run dev`
  - `npm test`
  - `npm run test:coverage`
- Frontend:
  - `npm install`
  - `npm start`
  - `npm run build`

