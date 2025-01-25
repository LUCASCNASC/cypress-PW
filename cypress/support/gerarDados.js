//Função para gerar Dados


const gerarCNPJ = () => {
    const randomDigits = () => Math.floor(Math.random() * 10);
  
    // Gera os primeiros 8 dígitos aleatórios
    const baseCNPJ = Array.from({ length: 8 }, randomDigits).join('');
    const matriz = '0001'; // Para matriz
  
    // Função para calcular os dígitos verificadores
    const calculateDigit = (cnpj, position) => {
      const weights = position === 1 
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
      const total = cnpj.split('').reduce((sum, digit, index) => {
        return sum + digit * weights[index];
      }, 0);
  
      const remainder = total % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };
  
    const firstDigit = calculateDigit(baseCNPJ + matriz, 1);
    const secondDigit = calculateDigit(baseCNPJ + matriz + firstDigit, 2);
  
    // Monta o CNPJ no formato XX.XXX.XXX/0001-XX
    return `${baseCNPJ.substr(0, 2)}.${baseCNPJ.substr(2, 3)}.${baseCNPJ.substr(5, 3)}/${matriz}-${firstDigit}${secondDigit}`;
};

function gerarCpf() {
    const randomDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    const d1 = calcularDigito(randomDigits);
    const d2 = calcularDigito([...randomDigits, d1]);
    return [...randomDigits, d1, d2].join('');

    function calcularDigito(digits) {
        const soma = digits.reduce((acc, val, index) => acc + val * (digits.length + 1 - index), 0);
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }
}

function gerarEmailAleatorio() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let nomeUsuario = '';
  
    // Gerar um nome de usuário aleatório com 10 caracteres
    for (let i = 0; i < 10; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      nomeUsuario += caracteres[indiceAleatorio];
    }
  
    // Retorna o e-mail aleatório com o domínio @gmail.com
    return nomeUsuario + '@gmail.com';
}

function gerarNomeAleatorio() {
    const primeirosNomes = ['Ana', 'Carlos', 'João', 'Maria', 'Pedro', 'Beatriz', 'Lucas', 'Juliana', 'Rafael', 'Fernanda'];
    const sobrenomes = ['Silva', 'Oliveira', 'Santos', 'Pereira', 'Costa', 'Almeida', 'Rodrigues', 'Lima', 'Martins', 'Gomes'];
  
    // Escolhe um nome aleatório da lista de primeiros nomes
    const nome = primeirosNomes[Math.floor(Math.random() * primeirosNomes.length)];
  
    // Escolhe um sobrenome aleatório da lista de sobrenomes
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  
    // Retorna o nome completo
    return nome + ' ' + sobrenome;
}

function gerarNomeEmpresa() {
  const prefixos = ['Tech', 'Global', 'Next', 'Mega', 'Prime', 'Super', 'Creative', 'Vision', 'Future', 'Eco'];
  const sufixos = ['Solutions', 'Systems', 'Group', 'Enterprises', 'Industries', 'Services', 'Corporation', 'Labs', 'Inc', 'Consulting'];
  const setores = ['Consulting', 'Development', 'Design', 'Marketing', 'Software', 'Digital', 'E-commerce', 'Security', 'Finance', 'Health'];

  // Escolher aleatoriamente um prefixo, sufixo e setor
  const prefixo = prefixos[Math.floor(Math.random() * prefixos.length)];
  const sufixo = sufixos[Math.floor(Math.random() * sufixos.length)];
  const setor = setores[Math.floor(Math.random() * setores.length)];

  // Formar o nome da empresa de forma aleatória
  const nomeEmpresa = `${prefixo} ${setor} ${sufixo}`;

  return nomeEmpresa;
}

function gerarTelefoneAleatorio() {
  const ddd = 44; // DDD fixo 44
  // Gerar o número aleatório com '9' seguido de 8 dígitos aleatórios
  const celular = '9' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');

  // Formatar o número no formato (44) 9XXXX-XXXX
  return `(${ddd}) ${celular.slice(0, 5)}-${celular.slice(5)}`;
}
  
  
export { gerarCpf, gerarTelefoneAleatorio, gerarEmailAleatorio, gerarNomeAleatorio, gerarCNPJ, gerarNomeEmpresa }; 