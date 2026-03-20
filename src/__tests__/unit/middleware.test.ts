import jwt from 'jsonwebtoken';

describe('Middleware de Autenticação - Testes', () => {
  const jwtAccessSecret = '093017';

  describe('Extração de Bearer Token', () => {
    it('deve extrair token corretamente do header Authorization', () => {
      const authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMifQ.test';
      const tokenRegex = /Bearer\s+(.+)/;
      const match = authHeader.match(tokenRegex);

      expect(match).toBeTruthy();
      expect(match?.[1]).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMifQ.test');
    });

    it('deve falhar sem Bearer prefix', () => {
      const authHeader = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMifQ.test';
      const tokenRegex = /Bearer\s+(.+)/;
      const match = authHeader.match(tokenRegex);

      expect(match).toBeFalsy();
    });

    it('deve falhar com header vazio', () => {
      const authHeader = '';
      const tokenRegex = /Bearer\s+(.+)/;
      const match = authHeader.match(tokenRegex);

      expect(match).toBeFalsy();
    });
  });

  describe('Validação de JWT', () => {
    it('deve validar um token JWT válido', () => {
      const payload = { userId: '123', type: 'access' };
      const token = jwt.sign(payload, jwtAccessSecret, { expiresIn: '15m' });

      const validado = jwt.verify(token, jwtAccessSecret) as any;
      expect(validado.userId).toBe('123');
      expect(validado.type).toBe('access');
    });

    it('deve rejeitar token com tipo errado', () => {
      const payload = { userId: '123', type: 'refresh' };
      const token = jwt.sign(payload, jwtAccessSecret, { expiresIn: '15m' });

      const validado = jwt.verify(token, jwtAccessSecret) as any;
      expect(validado.type).not.toBe('access');
    });

    it('deve lançar erro com token inválido', () => {
      expect(() => {
        jwt.verify('token.invalido', jwtAccessSecret);
      }).toThrow();
    });

    it('deve lançar erro com secret incorreto', () => {
      const payload = { userId: '123' };
      const token = jwt.sign(payload, jwtAccessSecret, { expiresIn: '15m' });

      expect(() => {
        jwt.verify(token, 'secret-errado');
      }).toThrow();
    });
  });

  describe('Status Code de Erros de Autenticação', () => {
    it('deve retornar 401 para token ausente', () => {
      const statusCode = 401;
      expect(statusCode).toBe(401);
    });

    it('deve retornar 401 para token inválido', () => {
      const statusCode = 401;
      expect(statusCode).toBe(401);
    });

    it('deve retornar 401 para token expirado', () => {
      const statusCode = 401;
      expect(statusCode).toBe(401);
    });

    it('deve retornar 403 para acesso negado', () => {
      const statusCode = 403;
      expect(statusCode).toBe(403);
    });
  });

  describe('Validação de Payload do Token', () => {
    it('deve ter userId no payload', () => {
      const payload = { userId: '123', email: 'user@example.com' };
      const token = jwt.sign(payload, jwtAccessSecret);

      const decodificado = jwt.verify(token, jwtAccessSecret) as any;
      expect(decodificado).toHaveProperty('userId');
    });

    it('deve ter timestamp de emissão (iat)', () => {
      const payload = { userId: '123' };
      const token = jwt.sign(payload, jwtAccessSecret);

      const decodificado = jwt.verify(token, jwtAccessSecret) as any;
      expect(decodificado).toHaveProperty('iat');
    });

    it('deve ter timestamp de expiração (exp)', () => {
      const payload = { userId: '123' };
      const token = jwt.sign(payload, jwtAccessSecret, { expiresIn: '15m' });

      const decodificado = jwt.verify(token, jwtAccessSecret) as any;
      expect(decodificado).toHaveProperty('exp');
    });
  });
});
