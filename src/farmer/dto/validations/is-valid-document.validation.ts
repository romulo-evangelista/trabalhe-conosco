import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

function isValidCPF(documentNumber: string): boolean {
  let cpf: string | number[] = documentNumber;

  // Remove todos os caracteres que não sejam números
  cpf = cpf.replace(/[^\d]+/g, '');

  // Se o CPF não tem 11 dígitos ou todos os dígitos são repetidos, o CPF é inválido
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  // Transforma de string para number[] com cada dígito sendo um número no array
  cpf = cpf.split('').map((el) => +el);

  // Cria uma função interna que calcula o dígito verificador do CPF atual:
  const rest = (count: number) =>
    // Pega os primeiros [count] dígitos
    ((cpf
      .slice(0, count - 12)
      // e calcula o dígito verificador de acordo com a fórmula da Receita Federal
      .reduce((soma, el, index) => soma + el * (count - index), 0) *
      10) %
      11) %
    10;

  // O CPF é válido se, e somente se, os dígitos verificadores estão corretos
  return rest(10) === cpf[9] && rest(11) === cpf[10];
}

function isValidCNPJ(documentNumber: string): boolean {
  let cnpj: string | number[] = documentNumber;

  // Remove todos os caracteres que não sejam números
  cnpj = cnpj.replace(/[^\d]+/g, '');

  // Se o CNPJ não tem 14 dígitos ou todos os dígitos são repetidos, o CNPJ é inválido
  if (cnpj.length !== 14 || !!cnpj.match(/(\d)\1{13}/)) return false;

  // Transforma de string para number[] com cada dígito sendo um número no array
  cnpj = cnpj.split('').map((el) => +el);

  // Define os pesos para os cálculos
  const firstDigitWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondDigitWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  // Calcula o primeiro dígito de verificação
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += cnpj[i] * firstDigitWeights[i];
  }
  let remainder = sum % 11;
  const firstCheckDigit = remainder < 2 ? 0 : 11 - remainder;

  // Calcula o segundo dígito de verificação
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += cnpj[i] * secondDigitWeights[i];
  }
  remainder = sum % 11;
  const secondCheckDigit = remainder < 2 ? 0 : 11 - remainder;

  // Validando se os dígitos de verificação estão corretos
  return cnpj[12] === firstCheckDigit && cnpj[13] === secondCheckDigit;
}

@ValidatorConstraint()
export class IsValidDocumentConstraint implements ValidatorConstraintInterface {
  validate(documentNumber: string) {
    return isValidCPF(documentNumber) || isValidCNPJ(documentNumber);
  }
}

export function IsValidDocument(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidDocumentConstraint,
    });
  };
}
