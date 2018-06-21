import ValidstateMessages from '../validstate/ValidstateMessages';

let message;
beforeAll(() => {
  message = new ValidstateMessages();
});

describe('`ValidstateMessages()`', () => {
  it('returns `required()` message', () => {
    expect(message.required('Name')).toBe('Name is required.');
  });

  it('returns `minLength()` message', () => {
    expect(message.minLength('Name', 5)).toBe('Name must be at least 5 characters.');
  });

  it('returns `maxLength()` message', () => {
    expect(message.maxLength('Name', 5)).toBe('Name can be no more than 5 characters.');
  });

  it('returns `rangeLength()` message', () => {
    expect(message.rangeLength('Name', '5-10')).toBe('Name must be between 5 and 10 characters.');
  });

  it('returns `min()` message', () => {
    expect(message.min('Name', 3)).toBe('Name must be greater than or equal to 3.');
  });

  it('returns `max()` message', () => {
    expect(message.max('Name', 3)).toBe('Name must be less than or equal to 3.');
  });

  it('returns `range()` message', () => {
    expect(message.range('Name', '3-10')).toBe('Name must be between 3 and 10.');
  });

  it('returns `step()` message', () => {
    expect(message.step('Name', 2)).toBe('Name must be divisable by 2.');
  });

  it('returns `email()` message', () => {
    expect(message.email('Name')).toBe('Name must be formatted as an email.');
  });

  it('returns `number()` message', () => {
    expect(message.number('Name')).toBe('Name must be a number.');
  });

  it('returns `numeric()` message', () => {
    expect(message.numeric('Name')).toBe('Name must be a number.');
  });

  it('returns `integer()` message', () => {
    expect(message.integer('Name')).toBe('Name must be a integer.');
  });

  it('returns `digits()` message', () => {
    expect(message.digits('Name')).toBe('Name must be a whole number.');
  });

  it('returns `equalTo()` message', () => {
    expect(message.equalTo('Name', 4)).toBe('Name must be equal to 4.');
  });

  it('returns `isEqualTo()` message', () => {
    expect(message.isEqualTo('Name', 4)).toBe('Name must be equal to 4.');
  });

  it('returns `custom()` message', () => {
    expect(message.custom('Name', 4)).toBe('Name is invalid.');
  });

  it('returns `regex()` message', () => {
    expect(message.regex('/\d/g', 'Test')).toBe("/\d/g does not match 'Test'.");
  });

  it('returns `creditCard()` message', () => {
    expect(message.creditCard(12345678)).toBe('12345678 is not a valid credit card.');
  });

  it('returns `includes()` message', () => {
    expect(message.includes([1,2,3], 4)).toBe('1,2,3 does not include 4.');
  });

  it('returns `phoneUS()` message', () => {
    expect(message.phoneUS(123456789)).toBe('123456789 is not a valid US phone number.');
  });

  it('returns `titleCase()`', () => {
    expect(message.titleCase('first name')).toBe('First Name');
  });
});
