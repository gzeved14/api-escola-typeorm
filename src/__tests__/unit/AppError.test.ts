import { AppError } from '../../errors/AppError.js';

describe('AppError', () => {
  it('deve criar um erro com status code e mensagem', () => {
    const erro = new AppError(400, 'Erro de teste');
    
    expect(erro.statusCode).toBe(400);
    expect(erro.message).toBe('Erro de teste');
  });

  it('deve ter statusCode padrão se fornecido', () => {
    const erro = new AppError(500, 'Erro interno');
    
    expect(erro.statusCode).toBe(500);
  });

  it('deve ser uma instância de Error', () => {
    const erro = new AppError(422, 'Erro de validação');
    
    expect(erro).toBeInstanceOf(Error);
  });

  it('deve lidar corretamente com erro 401 Unauthorized', () => {
    const erro = new AppError(401, 'Token inválido');
    
    expect(erro.statusCode).toBe(401);
    expect(erro.message).toBe('Token inválido');
  });

  it('deve lidar corretamente com erro 403 Forbidden', () => {
    const erro = new AppError(403, 'Acesso negado');
    
    expect(erro.statusCode).toBe(403);
    expect(erro.message).toBe('Acesso negado');
  });

  it('deve lidar corretamente com erro 404 Not Found', () => {
    const erro = new AppError(404, 'Recurso não encontrado');
    
    expect(erro.statusCode).toBe(404);
    expect(erro.message).toBe('Recurso não encontrado');
  });
});
