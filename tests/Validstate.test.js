import Validstate from '../src';

test('checks if value is required', () => {
  expect(Validstate.required('')).toBe(false);
  expect(Validstate.required('   ')).toBe(false);
  expect(Validstate.required(null)).toBe(false);
  expect(Validstate.required(undefined)).toBe(false);
  expect(Validstate.required([])).toBe(false);
  expect(Validstate.required({})).toBe(false);
  expect(Validstate.required(NaN)).toBe(false);
  expect(Validstate.required('I am required')).toBe(true);
});

test('checks if value has minLength', () => {
  const string = 'test';
  const array = [1,2,3,4];
  const object = {1: '1', 2: '2'};
  expect(Validstate.minLength(string, 3)).toBe(true);
  expect(Validstate.minLength(array, 5)).toBe(false);
  expect(Validstate.minLength(object, 3)).toBe(false);
});

test('checks if value has maxLength', () => {
  const string = 'test';
  const array = [1,2,3,4];
  const object = {1: '1', 2: '2'};
  expect(Validstate.maxLength(string, 3)).toBe(false);
  expect(Validstate.maxLength(array, 5)).toBe(true);
  expect(Validstate.maxLength(object, 3)).toBe(true);
});

test('checks if value length is between given range length', () => {
  expect(Validstate.rangeLength('5', '0-6')).toBe(true);
  expect(Validstate.rangeLength('State', '0-6')).toBe(true);
  expect(Validstate.rangeLength(['City', 'State', 'Zip'], '0-3')).toBe(true);
  expect(Validstate.rangeLength([], '0-3')).toBe(true);
  expect(Validstate.rangeLength('email address', '0-6')).toBe(false);
  expect(Validstate.rangeLength(5, '6-10')).toBe(false);
});

test('checks if value is greater than min parameter', () => {
  expect(Validstate.min(4, 3)).toBe(true);
  expect(Validstate.min(100, 5)).toBe(true);
  expect(Validstate.min(100, '5')).toBe(true);
  expect(Validstate.min(5000, 5000)).toBe(true);
  expect(Validstate.min('5000', 4000)).toBe(true);
  expect(Validstate.min(5000, 5500)).toBe(false);
  expect(Validstate.min(5000, '5500')).toBe(false);
});

test('checks if value is less than max parameter', () => {
  expect(Validstate.max(100, 500)).toBe(true);
  expect(Validstate.max(100, 100)).toBe(true);
  expect(Validstate.max('500', 3000)).toBe(true);
  expect(Validstate.max(400, 300)).toBe(false);
  expect(Validstate.max(301, 300)).toBe(false);
  expect(Validstate.min('5000', 5500)).toBe(false);
});

test('checks if value is between given range', () => {
  expect(Validstate.range('5', '0-6')).toBe(true);
  expect(Validstate.range(5, '0-6')).toBe(true);
  expect(Validstate.range(0, '0-3')).toBe(true);
  expect(Validstate.range(3, '0-3')).toBe(true);
  expect(Validstate.range(7, '0-6')).toBe(false);
  expect(Validstate.range('5', '6-10')).toBe(false);
});

test('checks if value is in a given step', () => {
  expect(Validstate.step('20', '5')).toBe(true);
  expect(Validstate.step(15, '3')).toBe(true);
  expect(Validstate.step('1000', 10)).toBe(true);
  expect(Validstate.step(5, '3')).toBe(false);
  expect(Validstate.step(70, '50')).toBe(false);
  expect(Validstate.step('50', '100')).toBe(false);
});

test('checks if value is a valid email address', () => {
  expect(Validstate.email('test@example.com')).toBe(true);
  expect(Validstate.email('test@example.co.uk')).toBe(true);
  expect(Validstate.email('test.user@example12.io')).toBe(true);
  expect(Validstate.email('test.user.example.com')).toBe(false);
});

test('checks if value is a number', () => {
  expect(Validstate.number(1.0)).toBe(true);
  expect(Validstate.number(0)).toBe(true);
  expect(Validstate.number(-1)).toBe(true);
  expect(Validstate.number(-1.0)).toBe(true);
  expect(Validstate.number('-1.0')).toBe(false);
  expect(Validstate.number([-1.0])).toBe(false);
  expect(Validstate.number({1: 'one'})).toBe(false);
});

test('checks if value is numeric', () => {
  expect(Validstate.numeric(1.0)).toBe(true);
  expect(Validstate.numeric(0)).toBe(true);
  expect(Validstate.numeric(-1)).toBe(true);
  expect(Validstate.numeric(-1.0)).toBe(true);
  expect(Validstate.numeric('-1.0')).toBe(true);
  expect(Validstate.numeric('1.0e65')).toBe(true);
  expect(Validstate.numeric(1.0e65)).toBe(true);
  expect(Validstate.numeric('1.0e65baba')).toBe(false);
  expect(Validstate.numeric([-1.0])).toBe(false);
  expect(Validstate.numeric({1: 'one'})).toBe(false);
});

test('checks if value is an integer', () => {
  expect(Validstate.integer(10)).toBe(true);
  expect(Validstate.integer(1.0)).toBe(true);
  expect(Validstate.integer(0)).toBe(true);
  expect(Validstate.integer(-1)).toBe(true);
  expect(Validstate.integer(-0)).toBe(true);
  expect(Validstate.integer('1.0e65')).toBe(false);
  expect(Validstate.integer('abcdef')).toBe(false);
  expect(Validstate.integer(-1.2)).toBe(false);
});

test('checks if value is a digit', () => {
  expect(Validstate.digits(10)).toBe(true);
  expect(Validstate.digits(0)).toBe(true);
  expect(Validstate.digits(1.0)).toBe(true);
  expect(Validstate.digits(1.01)).toBe(false);
  expect(Validstate.digits('abcdef')).toBe(false);
});

test('soft comparison of one value to another', () => {
  expect(Validstate.equalTo(10, '10')).toBe(true);
  expect(Validstate.equalTo('1', true)).toBe(true);
  expect(Validstate.equalTo(1, 5)).toBe(false);
  expect(Validstate.equalTo('abcdef', false)).toBe(false);
});

test('strong comparison of one value to another', () => {
  expect(Validstate.isEqualTo(10, 10)).toBe(true);
  expect(Validstate.isEqualTo(true, true)).toBe(true);
  expect(Validstate.isEqualTo(1, '1')).toBe(false);
  expect(Validstate.isEqualTo('true', true)).toBe(false);
});

test(' evaluates value and validates that it is a credit card', () => {
  expect(Validstate.creditCard('9999999999999999')).toBe(false); //Random 16 digit number
  expect(Validstate.creditCard('1234LIFE1234LIFE1234')).toBe(false); //Random 16 character value with letters
  expect(Validstate.creditCard('4540878849')).toBe(false); //Below Min Amount of Digits
  expect(Validstate.creditCard('4539406187884912')).toBe(true); //Visa with 16 digits and starts with 4
  expect(Validstate.creditCard('4916148526099378747')).toBe(true); //Visa with 19 digits
  expect(Validstate.creditCard('4916-1485-2609-9378-747')).toBe(true); //Visa with 19 digits with random dashes
  expect(Validstate.creditCard('4539 4061 8788 4912')).toBe(true); //Visa with spaces
  expect(Validstate.creditCard('4539.4061.8788.4912')).toBe(false); //Visa with periods
  expect(Validstate.creditCard('4539-4061-8788-4912')).toBe(true); //Visa with dashes
  expect(Validstate.creditCard('5565808771612969')).toBe(true); //MasterCard starts with 5
  expect(Validstate.creditCard('2221002984438668')).toBe(true); //MasterCard starts with 2
  expect(Validstate.creditCard('5565 8087 7161 2969')).toBe(true); //MasterCard with spacees
  expect(Validstate.creditCard('5565.8087.7161.2969')).toBe(false); //MasterCard with periods
  expect(Validstate.creditCard('5565-8087-7161-2969')).toBe(true); //MasterCard with dashes
  expect(Validstate.creditCard('6011081185882499')).toBe(true); //Discover with 16 digits and starts with 6011
  expect(Validstate.creditCard('6011776786520047744')).toBe(true); //Discover with 19 digits
  expect(Validstate.creditCard('6011 0811 8588 2499')).toBe(true); //Discover with spaces
  expect(Validstate.creditCard('6011.0811.8588.2499')).toBe(false); //Discover with periods
  expect(Validstate.creditCard('6011-0811-8588-2499')).toBe(true); //Discover with dashes
  expect(Validstate.creditCard('340067662593522')).toBe(true); //AMEX starts with 34
  expect(Validstate.creditCard('370737536289068')).toBe(true); //AMEX starts with 37
  expect(Validstate.creditCard('370 7375 3628 9068')).toBe(true); //AMEX with spaces
  expect(Validstate.creditCard('370.7375.3628.9068')).toBe(false); //AMEX with periods
  expect(Validstate.creditCard('370-7375-3628-9068')).toBe(true); //AMEX with dashes
});
