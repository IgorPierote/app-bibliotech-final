import { Livro } from "./livro";

export interface Emprestimo {
    idEmprestimo?: string;
    livro: Livro;
    leitor: string;
    email: string;
    telefone: string;    
    status: string;
    dataEmprestimo?: string;    
    dataDevolucao?: Date;
    capa?: string;
}
