function realizarMaisCursos(aluno) {
    if (aluno.media > 7) {
        aluno.cursosRealizados += 3;
    }
}

function verificaSeOPlanoEstaAtivo(aluno) {
    if (!aluno.planoAtivo) {
        return 'Renove sua assinatura antes de realize mais cursos'
    }
        return 'Plano ativo'
}

function verificaSeExistemMaisCursosDisponiveis(aluno) {
    const quantidadeDeCursosDisponiveis = 10;

    if (aluno.cursosRealizados >= quantidadeDeCursosDisponiveis) {
        return {
            informacao: 'Aluno atingiu o limite de cursos disponíveis',
            valorBooleano: false,
        }
    }
        return {
            informacao: 'Aluno com cursos disponíveis',
            valorBooleano: true,
        }
}

describe('realizarMaisCursos', () => {
    it('não permite realizar mais 3 cursos se a média do aluno for menor ou igual a 7.0', function naoRealizarMaisCursosMediaBaixa() {
        const aluno = {
            nome: 'Maria',
            media: 8.0,
            cursosRealizados: 4,
            cursosAdicionais: false,
            planoAtivo: true,
        };

        realizarMaisCursos(aluno);

        expect(aluno.media).toBeLessThanOrEqual(7);
        expect(aluno.cursosRealizados).toBe(4);
    });

    it('permite realizar mais 3 cursos se a média do aluno for maior que 7.0', function realizarMaisCursosMediaAlta() {
        const aluno = {
            nome: 'João',
            media: 8.0,
            cursosRealizados: 2,
            cursosAdicionais: false,
            planoAtivo: true,
        };

        realizarMaisCursos(aluno);

        expect(aluno.media).toBeGreaterThan(7);
        expect(aluno.cursosRealizados).toBe(5);
    });
    it('permite realizar mais 3 cursos se a média do aluno for maior que 7.0 e ele ja realizou 3 cursos adicionais', function realizarMaisCursosSeAdicionais() {
        const aluno = {
            nome: 'João',
            media: 8.0,
            cursosRealizados: 5,
            cursosAdicionais: true,
            planoAtivo: true,
        };

        realizarMaisCursos(aluno);
        
        expect(aluno.cursosAdicionais).toBe(true);
    });
    it('não permite realizar mais cursos se o plano expirou e solicita a renovação da assinatura', function naoRealizarMaisCursosPlanoExplirou() {
        const aluno = {
            nome: 'João',
            media: 8.0,
            cursosRealizados: 5,
            cursosAdicionais: true,
            planoAtivo: false,
        };

        realizarMaisCursos(aluno);
        verificaSeOPlanoEstaAtivo(aluno);

        expect(aluno.planoAtivo).toBe(false);
        expect(verificaSeOPlanoEstaAtivo(aluno)).toBe('Renove sua assinatura antes de realize mais cursos');
    });
    it('não permite realizar mais cursos se não tiver mais cursos disponíveis', function naoRealizarMaisCursosPorIndisponibilidade() {
        const aluno = {
            nome: 'João',
            media: 8.0,
            cursosRealizados: 10,
            cursosAdicionais: true,
            planoAtivo: false,
        };

        const {informacao, valorBooleano } = verificaSeExistemMaisCursosDisponiveis(aluno);

        expect(valorBooleano).toBe(false);
        expect(informacao).toBe('Aluno atingiu o limite de cursos disponíveis');
        
    });
});