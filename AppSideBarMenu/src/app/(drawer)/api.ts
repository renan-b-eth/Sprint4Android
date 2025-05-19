
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://odontoprev-api.com/api',
  headers: {
    'Content-Type': 'application/json',
  }
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

interface AutenticacaoService {
  login: (email: string, senha: string) => Promise<AutenticacaoResponse>;
  cadastrar: (
    nome: string,
    email: string,
    senha: string,
    responsavel: string
  ) => Promise<Clinica>;
}

export const autenticacaoService: AutenticacaoService = {
  async login(email: string, senha: string): Promise<AutenticacaoResponse> {
    try {
      const response = await api.post('/login', {
        email,
        senha
      });
      return response.data;
    } catch (error) {
      throw new Error('Erro ao fazer login');
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
      return response.data;
    } catch (error) {
      throw new Error('Erro ao cadastrar clínica');
    }
  }
};