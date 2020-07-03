export default class ValidstateMessages {
  
  required(property) {
    return `${this.titleCase(property)} is required.`; 
  }

  minLength(property, minLength) {
    return `${this.titleCase(property)} must be at least ${minLength} characters.`;
  }

  maxLength(property, maxLength) {
    return `${this.titleCase(property)} can be no more than ${maxLength} characters.`;
  }

  rangeLength(property, rangeString) {
    const range = rangeString.split("-");
    return `${this.titleCase(property)} must be between ${range[0]} and ${range[1]} characters.`;
  }

  min(property, min) {
    return `${this.titleCase(property)} must be greater than or equal to ${min}.`;
  }

  max(property, max) {
    return `${this.titleCase(property)} must be less than or equal to ${max}.`;
  }

  range(property, rangeString) {
    const range = rangeString.split("-");
    return `${this.titleCase(property)} must be between ${range[0]} and ${range[1]}.`;
  }

  step(property, step) {
    return `${this.titleCase(property)} must be divisable by ${step}.`;
  }

  email(property) {
    return `${this.titleCase(property)} must be formatted as an email.`; 
  }

  number(property) {
    return `${this.titleCase(property)} must be a number.`; 
  }

  numeric(property) {
    return `${this.titleCase(property)} must be a number.`; 
  }

  integer(property) {
    return `${this.titleCase(property)} must be a integer.`; 
  }

  digits(property) {
    return `${this.titleCase(property)} must be a whole number.`; 
  }

  equalTo(property, value) {
    return `${this.titleCase(property)} must be equal to ${value}.`;
  }

  isEqualTo(property, value) {
    return `${this.titleCase(property)} must be equal to ${value}.`;
  }

  custom(property, value) {
    return `${this.titleCase(property)} is invalid.`;
  } 

  regex(property, value) {
    return `${this.titleCase(property)} does not match '${value}'.`;
  }

  creditCard(property) {
    return `${this.titleCase(property)} is not a valid credit card.`; 
  }

  includes(property, value) {
    return `${this.titleCase(property)} does not include ${value}.`;
  }

  phoneUS(property) {
    return `${this.titleCase(property)} is not a valid US phone number.`; 
  }

  elementOf(property, arr) {
    return `${this.titleCase(property)} is not an element of ${arr.toString()}.`;
  }

  titleCase(string){
    const str = String(string);
    return str.split(' ')
     .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
     .join(' ');
  }
}
