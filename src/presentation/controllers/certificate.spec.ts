import { CertificateController } from './certificate'

describe('Certificate Controller', () => {
  test('Should return 400 if no studentId is provided', async () => {
    const sut = new CertificateController();
    
    const httpRequest = {
      body: {
        email: 'any_email@gmail.com',
        cursos: ['Curso 1', 'Curso 2', 'Curso 3'],
        cursosFinalizados: ['Curso 1', 'Curso 2'],
        quantidadeDeCursosDisponives: 1,
        planoAtivo: true,
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
})
})