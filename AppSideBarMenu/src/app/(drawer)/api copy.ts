import axios, { AxiosError } from 'axios';

const api = axios.create({
    baseURL: 'https://odontoprev-api.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000 // 10 segundos de timeout
});

// Interfaces para tipagem
interface Clinica {
    id: string;
    nome: string;
    email: string;
    senha: string;
    responsavel: string;
}

interface AutenticacaoResponse {
    token: string;
    clinica: Clinica;
}

interface ErroAutenticacao {
    codigo: number;
    mensagem: string;
    detalhes?: string;
}

export const autenticacaoService = {
    async login(email: string, senha: string): Promise<AutenticacaoResponse> {
        try {
            const response = await api.post('/login', {
                email,
                senha
            });
            
            if (response.status !== 200) {
                throw {
                    codigo: response.status,
                    mensagem: 'Erro de autenticação',
                    detalhes: response.data?.mensagem
                };
            }
            
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.code === 'ECONNABORTED') {
                    throw {
                        codigo: 408,
                        mensagem: 'Tempo de conexão esgotado',
                        detalhes: 'Tente novamente mais tarde'
                    };
                }
                
                if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
                    throw {
                        codigo: 503,
                        mensagem: 'Servidor indisponível',
                        detalhes: 'Verifique se o servidor está online'
                    };
                }
                
                if (error.response) {
                    throw {
                        codigo: error.response.status,
                        mensagem: error.response.data?.mensagem || 'Erro na requisição',
                        detalhes: JSON.stringify(error.response.data)
                    };
                }
                
                throw {
                    codigo: 500,
                    mensagem: error.message,
                    detalhes: error.stack
                };
            }
            
            throw {
                codigo: 500,
                mensagem: 'Erro desconhecido',
                detalhes: String(error)
            };
        }
    },

    async cadastrar(
        nome: string,
        email: string,
        senha: string,
        responsavel: string
    ): Promise<Clinica> {
        try {
            const response = await api.post('/clinicas', {
                nome,
                email,
                senha,
                responsavel
            });
            
            if (response.status !== 201) {
                throw {
                    codigo: response.status,
                    mensagem: 'Erro ao cadastrar clínica',
                    detalhes: response.data?.mensagem
                };
            }
            
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.code === 'ECONNABORTED') {
                    throw {
                        codigo: 408,
                        mensagem: 'Tempo de conexão esgotado',
                        detalhes: 'Tente novamente mais tarde'
                    };
                }
                
                if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
                    throw {
                        codigo: 503,
                        mensagem: 'Servidor indisponível',
                        detalhes: 'Verifique se o servidor está online'
                    };
                }
                
                if (error.response) {
                    throw {
                        codigo: error.response.status,
                        mensagem: error.response.data?.mensagem || 'Erro na requisição',
                        detalhes: JSON.stringify(error.response.data)
                    };
                }
                
                throw {
                    codigo: 500,
                    mensagem: error.message || 'Erro ao cadastrar clínica',
                    detalhes: error.stack
                };
            }
            
            throw {
                codigo: 500,
                mensagem: 'Erro ao cadastrar clínica',
                detalhes: String(error)
            };
        }
    }
};