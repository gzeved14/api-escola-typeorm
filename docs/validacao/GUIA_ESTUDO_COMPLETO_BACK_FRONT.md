# GUIA DE ESTUDO COMPLETO — BACKEND + FRONTEND

Data: 20/03/2026  
Aluno: Gabriel

---

## 1) Visão geral da solução

### Backend (`api-escola-typeorm`)
- Stack: Node.js + TypeScript + Express + TypeORM + PostgreSQL
- Segurança: JWT, bcryptjs, Helmet, rate-limit, CORS
- Validação: Zod
- Testes: Jest + ts-jest + Supertest

### Frontend (`Reserva-IoT`)
- Stack: Angular 21 + TypeScript + RxJS + Tailwind + ApexCharts
- Autenticação: token access/refresh com interceptor HTTP
- Navegação: rotas protegidas por guard
- Build: `ng build`

---

## 2) Docker e execução

### Arquivos Docker (Backend)
- `docker-compose.yaml`
  - Serviço `db` (Postgres 16) com porta `5433:5432`
  - Serviço `api` com porta `3000:3000`
  - `depends_on` com `healthcheck` do banco
- `Dockerfile`
  - Base `node:20-alpine`
  - `npm ci`
  - `CMD ["npm", "run", "dev"]`

### Fluxo de execução recomendado
1. Subir banco: `docker compose up -d db`
2. Subir backend: `npm run dev`
3. Subir frontend: `npm start`

---

## 3) Backend — mapa completo por arquivo

## 3.1 Configuração
- `src/server.ts`
  - Inicializa Express, middlewares e `appDataSource`
  - Registra rotas em `/api`
  - Health check em `/health`
- `src/database/appDataSource.ts`
  - Configuração do TypeORM e conexão com PostgreSQL
- `src/config/jwt.config.ts`
  - `getEnvOrThrow(name)` valida variáveis obrigatórias
  - Exporta `jwtConfig` com secrets/expiração access e refresh

## 3.2 Entidades (TypeORM)
- `src/entities/Pesquisador.ts`
  - Classe `Pesquisador`
  - Campos: `id, nome, senha, especialidade, email, titulacao, matricula, linhaPesquisa, dataNascimento`
- `src/entities/RefreshToken.ts`
  - Classe `RefreshToken`
  - Campos de sessão: `jti, sessionId, userAgent, ipAddress, tokenhash, expireIn, revoked, createAt`
  - Relação `ManyToOne` com `Pesquisador`
- `src/entities/Area.ts`
  - Classe `Area`
  - Estrutura de área (dados geográficos/bioma)
- `src/entities/Sensor.ts`
  - Classe `Sensor`
  - Dados de sensor, status e relação com área
- `src/entities/Leitura.ts`
  - Classe `Leitura`
  - Dados de umidade/temperatura/data e relacionamento

## 3.3 Controllers
- `src/controllers/AuthController.ts` — classe `AuthController`
  - `login(req,res)`
  - `refreshToken(req,res)`
  - `logout(req,res)`
- `src/controllers/PesquisadorController.ts` — classe `PesquisadorController`
  - `findAll, findById, create, update, delete`
- `src/controllers/AreaController.ts` — classe `AreaController`
  - `findAll, findById, create, update, delete`
  - `getLeituras, sensoresAtivos`
- `src/controllers/SensorController.ts` — classe `SensorController`
  - `getAllSensors, addSensor, updateSensor, deleteSensor`
- `src/controllers/LeituraController.ts` — classe `LeituraController`
  - `findAll, findById, create, update, delete`
  - `listarLeiturasPorArea`

## 3.4 Services (regra de negócio)
- `src/services/AuthService.ts` — classe `AuthService`
  - `login(email, senha, userAgent, ip)`
  - `createRefreshToken(...)` (privado)
  - `generateRefreshToken(...)` (privado)
  - `generateAcessToken(...)` (privado)
- `src/services/RefreshTokenService.ts` — classe `RefreshTokenService`
  - `refresh(refreshToken, userAgent, ip)`
  - geração de novos access/refresh tokens
- `src/services/LogoutService.ts` — classe `LogoutService`
  - `logout(sessionId)`
  - `logoutAll(userId)`
- `src/services/PesquisadorService.ts` — classe `PesquisadorService`
  - `findAll, findById, create, update, delete`
  - `create`: hash da senha com bcrypt
- `src/services/AreaService.ts` — classe `AreaService`
  - `findAll, findById, create, update, delete`
  - `buscarLeiturasDaArea, contarSensorPorArea, findLeiturasByArea`
- `src/services/SensorService.ts` — classe `SensorService`
  - `getAllSensors, addSensor, updateSensor, deleteSensor`
- `src/services/LeituraService.ts` — classe `LeituraService`
  - `findAll, findById, create, update, delete`
  - `listarLeiturasPorArea`

## 3.5 Rotas
- `src/routes/index.routes.ts`
  - Composição central das rotas
- `src/routes/authRoutes.ts`
  - `POST /login`
  - `POST /refresh`
  - `POST /logout`
- `src/routes/pesquisadorRoutes.ts`
  - `POST /pesquisador`
  - `GET /pesquisador`
  - `GET /pesquisador/:id`
  - `PUT /pesquisador/:id`
  - `DELETE /pesquisador/:id`
- `src/routes/areaRouter.ts`
  - `POST /area`
  - `GET /area`
  - `GET /area/:id`
  - `PUT /area/:id`
  - `DELETE /area/:id`
  - `GET /area/sensor/:id`
- `src/routes/sensorRoutes.ts`
  - `GET /sensors`
  - `POST /sensors`
  - `PUT /sensors/:id`
  - `DELETE /sensors/:id`
- `src/routes/leituraRouter.ts`
  - `POST /leitura`
  - `GET /leitura`
  - `GET /leitura/:id`
  - `PUT /leitura/:id`
  - `DELETE /leitura/:id`
  - `GET /leitura/area/:areaId`

## 3.6 Middleware e utilitários
- `src/middleware/authMidd.ts`
  - `authMiddleware(req,res,next)`
  - Valida Bearer token JWT access e injeta `req.user`
- `src/middleware/validarBody.ts`
  - `validarBody(schema)`
  - Intercepta `ZodError` e responde `400`
- `src/middleware/errorHandler.ts`
  - Handler global de erros
- `src/errors/AppError.ts`
  - Classe `AppError extends Error`
- `src/utils/asyncError.ts`
  - Wrapper para async handlers
- `src/utils/sensorFile.ts`
  - `read(nameFile)`
  - `write(nameFile, data)`
- `src/types/createLeituraDTO.ts`
  - DTO de entrada para criação de leitura

## 3.7 Schemas de validação (Zod)
- `src/validats/createPesquisadorSchema.ts`
- `src/validats/createAreaSchema.ts`
- `src/validats/createSensorSchema.ts`
- `src/validats/createLeituraSchema.ts`

---

## 4) Backend — testes

### Configuração
- `jest.config.cjs`
  - `preset: ts-jest`
  - ESM habilitado
  - Cobertura em `coverage/`

### Arquivos de teste
- `src/__tests__/unit/AppError.test.ts`
  - Testa classe de erro customizado
- `src/__tests__/unit/authentication.test.ts`
  - Hash de senha, JWT e validações
- `src/__tests__/unit/middleware.test.ts`
  - Cenários de middleware/auth token
- `src/__tests__/unit/validationSchemas.test.ts`
  - Testes de schemas Zod
- `src/__tests__/integration/api-structure.test.ts`
  - Testes de estrutura REST da API

### Resultado validado
- Test Suites: 5/5
- Tests: 61/61
- Cobertura reportada:
  - Statements: 10.1%
  - Branches: 27.6%
  - Functions: 22.05%
  - Lines: 10.9%

---

## 5) Frontend — mapa completo por arquivo

## 5.1 Inicialização e configuração Angular
- `src/main.ts`
  - Bootstrap da aplicação
- `src/app/app.config.ts`
  - Providers globais
  - `provideRouter(routes)`
  - `provideHttpClient(withInterceptors([authInterceptor]))`
- `src/app/app.routes.ts`
  - Rotas públicas: `/login`, `/register`
  - Alias: `/cadastro` -> `/register`
  - Área protegida: `/app`, `/app/areas`, `/app/sensors`
  - Fallback para `/login`
- `src/environments/environment.development.ts`
  - `apiUrl: http://localhost:3000/api`
- `src/environments/environment.ts`
  - `apiUrl: http://localhost:3000/api`

## 5.2 Segurança e sessão
- `src/app/core/guards/auth.guard-guard.ts`
  - Guard de autenticação para rotas protegidas
- `src/app/core/models/auth.interceptor.ts`
  - Anexa `Authorization: Bearer <token>`
  - Em 401: tenta refresh token e reenvia requisição
  - Em falha de refresh: logout

## 5.3 Modelos (tipagem)
- `src/app/core/models/area.ts`
  - `type Bioma`
  - `interface Area`
- `src/app/core/models/sensor.ts`
  - `type SensorStatus`
  - `interface Sensor`
- `src/app/core/models/leitura.ts`
  - `interface Leitura`

## 5.4 Serviços (HTTP/API)
- `src/app/shared/services/auth-service.ts` — classe `AuthService`
  - `register(userData)` -> `POST /pesquisador`
  - `login(credentials)` -> `POST /login`
  - `refreshToken()` -> `POST /refresh`
  - `logout()`
  - `getAccessToken()`
  - sinal `_user` e `isAuthenticated`
- `src/app/shared/services/area-service.ts` — classe `AreaService`
  - `listarAreas()`
  - `buscarAreaPorId(id)`
  - `cadastrarArea(area)`
  - `sensorAtivoPorArea(id)`
- `src/app/shared/services/sensor-service.ts` — classe `SensorService`
  - `listar(), buscarPorId(), cadastrar(), atualizar(), remover()`
  - `ultimasLeituras(sensorId, limit)`
- `src/app/shared/services/leitura-service.ts` — classe `LeituraService`
  - `listarPorSensor(sensorId)`
  - `listarPorArea(areaId)`

## 5.5 Telas/Componentes de autenticação
- `src/app/features/auth/login/login.ts` — classe `Login`
  - Form com `email` + `senha`
  - `onSubmit()` chama `AuthService.login`
  - Navegação para `/app` no sucesso
- `src/app/features/auth/login/login.html`
  - Form de login + link para `/register`
- `src/app/features/auth/register/register.ts` — classe `Register`
  - Form completo de pesquisador
  - `onSubmit()` chama `AuthService.register`
- `src/app/features/auth/register/register.html`
  - Form de cadastro + link para `/login`

## 5.6 Dashboard e gestão
- `src/app/layout/main-layout/main-layout.ts` — classe `MainLayout`
  - Exibe layout autenticado e logout
- `src/app/layout/main-layout/main-layout.html`
  - Navegação: `/app`, `/app/areas`, `/app/sensors`
  - `routerLinkActiveOptions` com `exact: true`
- `src/app/features/dashboard/global-dashboard/global-dashboard.ts` — classe `GlobalDashboard`
  - Seleção de área
  - Carrega leituras por área
  - Configura gráficos ApexCharts
  - Métricas: sensores/alertas/temperatura média
- `src/app/features/dashboard/crud-area/crud-area.ts` — classe `CrudArea`
  - Listagem e cadastro de áreas
- `src/app/features/dashboard/crud-sensor/crud-sensor.ts` — classe `CrudSensorComponent`
  - Listagem e cadastro de sensores

## 5.7 Testes frontend (arquivos)
- `src/app/app.spec.ts`
- `src/app/core/guards/auth.guard-guard.spec.ts`
- `src/app/features/auth/login/login.spec.ts`
- `src/app/features/auth/register/register.spec.ts`
- `src/app/features/dashboard/crud-area/crud-area.spec.ts`
- `src/app/features/dashboard/crud-sensor/crud-sensor.spec.ts`
- `src/app/features/dashboard/global-dashboard/global-dashboard.spec.ts`
- `src/app/layout/main-layout/main-layout.spec.ts`
- `src/app/shared/services/*.spec.ts`

Observação: o frontend está com build validado (`npm run build`), mas sem relatório de cobertura anexado nesta entrega.

---

## 6) Scripts e comandos de estudo

## Backend
- Instalar: `npm install`
- Rodar API: `npm run dev`
- Testes: `npm test`
- Cobertura: `npm run test:coverage`
- Build TS: `npm run build`

## Frontend
- Instalar: `npm install`
- Rodar app: `npm start`
- Build: `npm run build`
- Testes: `npm test`

---

## 7) Fluxos para estudar (ordem recomendada)

1. **Requisição HTTP no backend**
   - route -> controller -> service -> repository/entity
2. **Autenticação JWT**
   - login -> token access/refresh -> interceptor -> refresh -> logout
3. **Validação de payload**
   - schema Zod + middleware `validarBody`
4. **CRUD completo (exemplo área)**
   - frontend form -> service HTTP -> backend route/controller/service -> banco
5. **Testes**
   - unitários e integração no backend, specs no frontend

---

## 8) Pontos de atenção didáticos

- Backend usa ESM (`"type": "module"`), por isso imports com `.js` no runtime TS/NodeNext.
- Alguns endpoints usam plural (`/sensors`) e outros singular (`/area`, `/leitura`, `/pesquisador`).
- Frontend tem import de `environment.development` em alguns serviços; ideal padronizar para `environment`.
- `authMiddleware` está comentado em `sensorRoutes` (ponto de segurança para evolução).

---

## 9) Checklist rápido de revisão para prova/apresentação

- [ ] Sei explicar arquitetura em camadas do backend
- [ ] Sei explicar fluxo JWT access + refresh
- [ ] Sei criar e validar payload Zod
- [ ] Sei explicar `authGuard` + `authInterceptor` no frontend
- [ ] Sei mostrar o caminho de uma tela até o banco
- [ ] Sei rodar testes e interpretar cobertura
- [ ] Sei explicar Docker Compose da solução

---

FIM — material de estudo consolidado para backend + frontend.
