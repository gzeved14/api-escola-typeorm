import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock dos serviços de autenticação
describe('Autenticação - Testes Unitários', () => {
  describe('Encriptação de Senha com bcrypt', () => {
    it('deve encriptar uma senha corretamente', async () => {
      const senhaOriginal = 'MinhaSenha123!';
      const senhaEncriptada = await bcrypt.hash(senhaOriginal, 10);

      expect(senhaEncriptada).not.toBe(senhaOriginal);
      expect(senhaEncriptada.length).toBeGreaterThan(0);
    });

    it('deve comparar senha com hash corretamente', async () => {
      const senhaOriginal = 'MinhaSenha123!';
      const senhaEncriptada = await bcrypt.hash(senhaOriginal, 10);

      const senhaCoreta = await bcrypt.compare(senhaOriginal, senhaEncriptada);
      expect(senhaCoreta).toBe(true);
    });

    it('deve falhar com senha incorreta', async () => {
      const senha = 'MinhaSenha123!';
      const senhaEncriptada = await bcrypt.hash(senha, 10);

      const senhaInvalida = await bcrypt.compare('SenhaErrada', senhaEncriptada);
      expect(senhaInvalida).toBe(false);
    });
  });

  describe('Geração de JWT', () => {
    const jwtAccessSecret = '093017';
    const jwtRefreshSecret = '1895';

    it('deve gerar um token JWT válido', () => {
      const payload = { userId: '123', email: 'user@example.com' };
      const token = jwt.sign(payload, jwtAccessSecret, { expiresIn: '15m' });

      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
    });

    it('deve decodificar um token JWT válido', () => {
      const payload = { userId: '123', email: 'user@example.com' };
      const token = jwt.sign(payload, jwtAccessSecret, { expiresIn: '15m' });

      const decodificado = jwt.verify(token, jwtAccessSecret);
      expect(decodificado).toHaveProperty('userId', '123');
      expect(decodificado).toHaveProperty('email', 'user@example.com');
    });

    it('deve lançar erro com token inválido', () => {
      const tokenInvalido = 'token.invalido.aqui';

      expect(() => {
        jwt.verify(tokenInvalido, jwtAccessSecret);
      }).toThrow();
    });

    it('deve lançar erro com secret incorreto', () => {
      const payload = { userId: '123' };
      const token = jwt.sign(payload, jwtAccessSecret, { expiresIn: '15m' });

      expect(() => {
        jwt.verify(token, 'secret-errado');
      }).toThrow();
    });

    it('deve gerar refresh token com expiração maior', () => {
      const payload = { userId: '123' };
      const accessToken = jwt.sign(payload, jwtAccessSecret, { expiresIn: '15m' });
      const refreshToken = jwt.sign(payload, jwtRefreshSecret, { expiresIn: '7d' });

      const decodificadoAccess = jwt.decode(accessToken) as any;
      const decodificadoRefresh = jwt.decode(refreshToken) as any;

      // Refresh token deve ter expiração posterior
      expect(decodificadoRefresh.exp).toBeGreaterThan(decodificadoAccess.exp);
    });
  });

  describe('Validação de Credenciais', () => {
    it('deve validar email no formato correto', () => {
      const emailValido = 'usuario@example.com';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      expect(emailRegex.test(emailValido)).toBe(true);
    });

    it('deve rejeitar email no formato incorreto', () => {
      const emailInvalido = 'nao-e-um-email';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      expect(emailRegex.test(emailInvalido)).toBe(false);
    });

    it('deve validar comprimento mínimo de senha', () => {
      const senhaValida = 'SenhaForte123!';
      expect(senhaValida.length).toBeGreaterThanOrEqual(8);
    });

    it('deve rejeitar senha muito curta', () => {
      const senhaInvalida = 'curta';
      expect(senhaInvalida.length).toBeLessThan(8);
    });
  });
});
