# 🧪 GUIA RÁPIDO DE TESTES

## ✅ Status Atual
- **✅ 61 testes passando**
- **✅ 5 suites de testes**
- **✅ 100% de sucesso**

---

## 🚀 Comandos de Teste

### Executar Todos os Testes
```bash
npm test
```
**Resultado esperado:** ✅ Test Suites: 5 passed / Tests: 61 passed

### Modo Observação (Watch)
```bash
npm run test:watch
```
Executa testes sempre que há mudanças de código. Perfeito para desenvolvimento.

### Gerar Relatório de Cobertura
```bash
npm run test:coverage
```
Gera relatório detalhado da cobertura de código em HTML e texto.

### Executar Apenas Testes Unitários
```bash
npm run test:unit
```
Executa somente testes de unidades isoladas (sem banco de dados).

### Executar Apenas Testes de Integração
```bash
npm run test:integration
```
Executa testes de estrutura e integração.

---

## 📋 Suites de Testes Implementadas

### 1️⃣ AppError Tests (6 testes)
**Arquivo:** `src/__tests__/unit/AppError.test.ts`
**O que testa:** 
- ✅ Criação de erros customizados
- ✅ Status codes corretos
- ✅ Mensagens de erro
- ✅ Instâncias de Error

### 2️⃣ Authentication Tests (16 testes)
**Arquivo:** `src/__tests__/unit/authentication.test.ts`
**O que testa:**
- ✅ Encriptação de senhas
- ✅ Geração de JWT
- ✅ Validação de tokens
- ✅ Refresh tokens

### 3️⃣ Validation Schemas Tests (15 testes)
**Arquivo:** `src/__tests__/unit/validationSchemas.test.ts`
**O que testa:**
- ✅ Schema de Área
- ✅ Schema de Pesquisador
- ✅ Schema de Sensor
- ✅ Schema de Leitura

### 4️⃣ Middleware Tests (16 testes)
**Arquivo:** `src/__tests__/unit/middleware.test.ts`
**O que testa:**
- ✅ Extração de tokens
- ✅ Validação de JWT
- ✅ Status codes de erro
- ✅ Payloads de token

### 5️⃣ API Structure Tests (8 testes)
**Arquivo:** `src/__tests__/integration/api-structure.test.ts`
**O que testa:**
- ✅ Estrutura REST
- ✅ Padrão de endpoints
- ✅ Status codes HTTP
- ✅ Métodos HTTP

---

## 📊 Cobertura de Testes

### Por Componente:
| Componente | Cobertura | Status |
|-----------|-----------|--------|
| AppError | 100% | ✅ Máxima |
| Validação Zod | 95.65% | ✅ Excelente |
| Middleware | 81.25% | ✅ Muito Bom |
| Autenticação | 87.5% | ✅ Muito Bom |

---

## 🔍 Como Ler o Relatório de Cobertura

Após executar `npm run test:coverage`, procure por:
1. **% Stmts** - Percentual de declarações executadas
2. **% Branch** - Percentual de ramificações testadas
3. **% Funcs** - Percentual de funções testadas
4. **% Lines** - Percentual de linhas testadas

### Interpretação:
- **100%** = Cobertura máxima ✅
- **80-99%** = Muito bom ✅
- **60-79%** = Bom ✅
- **<60%** = Precisa melhorar ⚠️

---

## 🐛 Troubleshooting

### Problema: "Cannot find module 'xyz'"
**Solução:**
```bash
npm install
```

### Problema: Testes falhando após mudanças
**Solução:**
```bash
npm run test:watch
```
Execute em modo observação para feedback imediato.

### Problema: Excesso de warnings do ts-jest
**Solução:** Ignorado - warnings são normais e não afetam os testes.

---

## 📈 Como Adicionar Novos Testes

1. Crie um arquivo `src/__tests__/unit/novo.test.ts`
2. Importe o módulo a testar
3. Use `describe()` e `it()` do Jest
4. Execute `npm test`

**Exemplo:**
```typescript
import { MinhaFuncao } from '../../services/Meu.Service';

describe('Meu Teste', () => {
  it('deve fazer algo', () => {
    const resultado = MinhaFuncao();
    expect(resultado).toBe(true);
  });
});
```

---

## 🎯 Checklist de Validação

- [ ] Executar `npm test` - Todos os testes passando ✅
- [ ] Verificar `npm run test:coverage` - Cobertura adequada
- [ ] Executar `npm run dev` - Servidor iniciando sem erros
- [ ] Testar endpoints manualmente com Postman/Insomnia
- [ ] Verificar Docker `docker-compose up`

---

## ✨ Dicas Importantes

1. **Sempre execute os testes antes de fazer push para produção**
2. **Use `npm run test:watch` durante desenvolvimento**
3. **Adicione testes para bugs encontrados**
4. **Mantenha cobertura acima de 80% para código crítico**
5. **Revise o relatório de cobertura regularmente**

---

**Last Updated:** 20/03/2026 | **All Tests Passing:** ✅
