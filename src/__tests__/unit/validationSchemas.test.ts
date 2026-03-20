import { createAreaSchema } from '../../validats/createAreaSchema.js';
import { createPesquisadorSchema } from '../../validats/createPesquisadorSchema.js';
import { createSensorSchema } from '../../validats/createSensorSchema.js';
import { createLeituraSchema } from '../../validats/createLeituraSchema.js';

describe('Zod Validation Schemas', () => {
  describe('createAreaSchema', () => {
    it('deve validar um objeto de área correto', () => {
      const areaValida = {
        nome: 'Área de Teste',
        bioma: 'Floresta',
        latitude: 10.5,
        longitude: -42.5,
        largura: 100.5,
        comprimento: 200.5
      };

      const resultado = createAreaSchema.safeParse(areaValida);
      expect(resultado.success).toBe(true);
    });

    it('deve falhar sem nome', () => {
      const areaInvalida = {
        bioma: 'Floresta',
        latitude: 10.5,
        longitude: -42.5,
        largura: 100.5,
        comprimento: 200.5
      };

      const resultado = createAreaSchema.safeParse(areaInvalida);
      expect(resultado.success).toBe(false);
    });

    it('deve rejeitar nome muito curto', () => {
      const areaInvalida = {
        nome: 'AB',
        bioma: 'Floresta',
        latitude: 10.5,
        longitude: -42.5,
        largura: 100.5,
        comprimento: 200.5
      };

      const resultado = createAreaSchema.safeParse(areaInvalida);
      expect(resultado.success).toBe(false);
    });

    it('deve rejeitar bioma inválido', () => {
      const areaInvalida = {
        nome: 'Área de Teste',
        bioma: 'BiomaPlanetário',
        latitude: 10.5,
        longitude: -42.5,
        largura: 100.5,
        comprimento: 200.5
      };

      const resultado = createAreaSchema.safeParse(areaInvalida);
      expect(resultado.success).toBe(false);
    });
  });

  describe('createPesquisadorSchema', () => {
    it('deve validar um pesquisador correto', () => {
      const pesquisadorValido = {
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'SenhaForte123',
        especialidade: 'Botânica',
        titulacao: 'Mestrado',
        matricula: '2024001',
        dataNascimento: '1980-01-15'
      };

      const resultado = createPesquisadorSchema.safeParse(pesquisadorValido);
      expect(resultado.success).toBe(true);
    });

    it('deve falhar com email inválido', () => {
      const pesquisadorInvalido = {
        nome: 'João Silva',
        email: 'email-invalido',
        senha: 'SenhaForte123',
        especialidade: 'Botânica',
        titulacao: 'Mestrado',
        matricula: '2024001',
        dataNascimento: '1980-01-15'
      };

      const resultado = createPesquisadorSchema.safeParse(pesquisadorInvalido);
      expect(resultado.success).toBe(false);
    });

    it('deve falhar com senha muito curta', () => {
      const pesquisadorInvalido = {
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: '123',
        especialidade: 'Botânica',
        titulacao: 'Mestrado',
        matricula: '2024001',
        dataNascimento: '1980-01-15'
      };

      const resultado = createPesquisadorSchema.safeParse(pesquisadorInvalido);
      expect(resultado.success).toBe(false);
    });
  });

  describe('createSensorSchema', () => {
    it('deve validar um sensor correto', () => {
      const sensorValido = {
        serialNumber: 'SEN12345',
        fabricante: 'DHT',
        modelo: 'DHT22',
        tipo: 'temperatura',
        status: 'Ativo',
        dataInstalacao: '2024-01-15',
        cicloLeitura: 60
      };

      const resultado = createSensorSchema.safeParse(sensorValido);
      expect(resultado.success).toBe(true);
    });

    it('deve falhar com serial number inválido', () => {
      const sensorInvalido = {
        serialNumber: 'sen12345',
        fabricante: 'DHT',
        modelo: 'DHT22',
        tipo: 'temperatura',
        status: 'Ativo',
        dataInstalacao: '2024-01-15',
        cicloLeitura: 60
      };

      const resultado = createSensorSchema.safeParse(sensorInvalido);
      expect(resultado.success).toBe(false);
    });

    it('deve falhar com status inválido', () => {
      const sensorInvalido = {
        serialNumber: 'SEN12345',
        fabricante: 'DHT',
        modelo: 'DHT22',
        tipo: 'temperatura',
        status: 'Falho',
        dataInstalacao: '2024-01-15',
        cicloLeitura: 60
      };

      const resultado = createSensorSchema.safeParse(sensorInvalido);
      expect(resultado.success).toBe(false);
    });
  });

  describe('createLeituraSchema', () => {
    it('deve validar uma leitura correta', () => {
      const leituraValida = {
        umidade: 75.5,
        temperatura: 25.3,
        dataHora: '2024-01-15T10:30:00Z'
      };

      const resultado = createLeituraSchema.safeParse(leituraValida);
      expect(resultado.success).toBe(true);
    });

    it('deve falhar com umidade inválida (> 100)', () => {
      const leituraInvalida = {
        umidade: 150,
        temperatura: 25.3,
        dataHora: '2024-01-15T10:30:00Z'
      };

      const resultado = createLeituraSchema.safeParse(leituraInvalida);
      expect(resultado.success).toBe(false);
    });

    it('deve falhar com temperatura inválida', () => {
      const leituraInvalida = {
        umidade: 75.5,
        temperatura: 150,
        dataHora: '2024-01-15T10:30:00Z'
      };

      const resultado = createLeituraSchema.safeParse(leituraInvalida);
      expect(resultado.success).toBe(false);
    });

    it('deve falhar sem campos obrigatórios', () => {
      const leituraInvalida = {
        umidade: 75.5
      };

      const resultado = createLeituraSchema.safeParse(leituraInvalida);
      expect(resultado.success).toBe(false);
    });
  });
});
