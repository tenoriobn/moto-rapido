export const verificarPlaca = (placa) => {
  let contLetra = 0;
  let contNum = 0;

  if (placa.length === 7) {
    // Verifica se as letras e números estão nas posições corretas
    for (let i = 0; i < placa.length; i++) {
      let item = placa[i];
      if (isNaN(item) && (i === 0 || i === 1 || i === 2 || i === 4)) {
        contLetra += 1;
      } else if (!isNaN(item) && (i === 3 || i === 4 || i === 5 || i === 6)) {
        contNum += 1;
      }
    }
    // Verifica se a placa é válida, retornando true ou false
    return (
      (contLetra === 3 && contNum === 4) || (contLetra === 4 && contNum === 3)
    );
  }
  // Retorna false se a placa não tiver exatamente 7 caracteres
  return false;
};

//verifica se os quatro primeiros caracter tem formatos de placa
export const  isPlaca = (str) => {
   // Usa uma expressão regular para verificar os primeiros três caracteres
    // e se o quarto caractere é um número
    const regex = /^[A-Za-z]{3}\d.*$/;
    
    return regex.test(str);
};
