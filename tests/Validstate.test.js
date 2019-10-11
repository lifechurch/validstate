import { createStore } from 'redux';
import validationConfig from './validations_config';
import reducers from './reducers';
import Validstate from '../src/';

import { emailChanged, passwordChanged, nameChanged, reset } from './actions';

const store = createStore(reducers);
let actual
let expected
beforeAll(() => {
  Validstate.init(validationConfig, store);
  actual = store.getState().validstate.account;
  expected = {
    "email": {"message": null, "reason": null, "valid": null},
    "name": {
      "firstname": {"message": null, "reason": null, "valid": null},
      "lastname": {
        "maidenName": {"message": null, "reason": null, "valid": null}, "message": null, "reason": null,
        "surname": {"message": null, "reason": null, "valid": null}, "valid": null},
        "message": null, "reason": null, "valid": null},
    "password": {"message": null, "reason": null,
      "token": {"message": null, "reason": null, "valid": null},
      "valid": null},
    "valid": null
  }
});

describe('Validstate', () => {
  it('Initializes correctly', () => {
    expect(actual).toEqual(expected);
  });

  it('`Extract()`, method extracts properties', () => {
    // Single level
    expect(actual.email).toEqual(expected.email);
    // Multi level
    expect(actual.name).toEqual(expected.name);
  });

  describe("`Validate()` method", () => {
    it('checks validation exists', () => {
      expect(() => { Validstate.validate('USERROLE') }).toThrow('USERROLE validation does not exist.');
    });

    describe("False values", () => {
      beforeEach(() => {
        Validstate.validate('account');

        // TODO change this whenever messages are extended into nested properties.
        // Currently if a property is nested then the parent property will have null values except for `valid`
        expected = {
          "email": {"message": "Email must be formatted as an email.", "reason": "email", "valid": false},
          "name": {
            "firstname": {"message": null, "reason": "required", "valid": false},
            "message": null, "reason": null, "valid": false
          },
          "password": {
            "message": null, "reason": null,
            "token": {"message": null, "reason": "minLength", "valid": false},
            "valid": false
          },
          "valid": false
        }
      });

      it('Invalidates `account` validation correctly', () => {
        const actual = store.getState().validstate.account;
        // Validation
        expect(actual.valid).toBe(false);

        // Single property
        expect(actual.email).toEqual(expected.email);

        // Nested properties
        expect(actual.name.firstname).toEqual(expected.name.firstname);
        expect(actual.password.token).toEqual(expected.password.token);
      });
    });

    describe("True values", () => {
      beforeEach(() => {
        store.dispatch(emailChanged("test@test.com"));
        store.dispatch(passwordChanged("password"));
        store.dispatch(nameChanged("Test User"));
        Validstate.validate('account');

        expected = {
          "email": {"message": null, "reason": null, "valid": true},
          "name": {
            "firstname": {"message": null, "reason": null, "valid": true},
            "message": null, "reason": null, "valid": true
          },
          "password": {
            "message": null, "reason": null,
            "token": {"message": null, "reason": null, "valid": true},
            "valid": true
          },
          "valid": true
        }
      });

      it('Validates `account` validation correctly', () => {
        const actual = store.getState().validstate.account;

        // Validation
        expect(actual.valid).toBe(true);
        // Single property
        expect(actual.email).toEqual(expected.email);

        // Nested properties
        expect(actual.name.firstname).toEqual(expected.name.firstname);
        expect(actual.password.token).toEqual(expected.password.token);
      });
    });
  });

  describe("Clear()", () => {
    beforeEach(() => {
      store.dispatch(emailChanged("test@test.com"));
      store.dispatch(passwordChanged("password"));
      store.dispatch(nameChanged("Test User"));
      Validstate.validate('account');
    });

    it('clears everything', () => {
      Validstate.clear();
      actual = store.getState().validstate;
      expect(actual).toEqual(Validstate.initialProperties);
    });

    it('clears specific validation', () => {
      actual = store.getState().validstate.account;
      expect(actual.valid).toBe(true); // Verify value was changed
      Validstate.clear('account') // Reset account
      actual = store.getState().validstate.account;
      expect(actual).toEqual(Validstate.initialProperties.account); // value was reset
    });
  });

  describe("getMessage()", () => {
    let validation
    let property
    let ruleKey
    let rule
    beforeEach(() => {
      validation = 'account';
      property = 'name';
      ruleKey = 'required';
      rule = 'Please let us know your name so we can address you properly.';
      Validstate.validate('account');
    });

    it('gets custom message', () => {
      const message = Validstate.getMessage(validation, property, ruleKey, rule)
      expect(message).toEqual(rule);
    });

    it('gets default message', () => {
      const rule = 'Name is required.'
      const message = Validstate.getMessage(undefined, property, ruleKey, rule)
      expect(message).toEqual(rule);
    });
  });

  describe("`mergeState()` Correctly merged state, excluding validstate", () => {
    const expected = {
      "email": "",
      "password": {
        "token": ""
      },
      "name": {
        "firstname": "",
        "lastname": {
          "surname": "Smith",
          "maidenName": "Jones"
        }
      },
      "permissions": [],
    }

    beforeEach(() => {
      store.dispatch(reset());
    });

    it('correctly merges state', () => {
      const actual = Validstate.mergeState(store.getState());
      expect(actual).toEqual(expected);
    });

    it('does not include validstate', () => {
      expect(actual).not.toHaveProperty('account');
    });
  });

  describe("`depthOf()`", () => {
    it('returns depth of object', () => {
      expect(Validstate.depthOf([])).toBe(1);
      expect(Validstate.depthOf(true)).toBe(1);
      expect(Validstate.depthOf('string')).toBe(1);
      expect(Validstate.depthOf(expected.email)).toBe(2);
      expect(Validstate.depthOf(expected.password)).toBe(3);
      expect(Validstate.depthOf(expected)).toBe(4);
    });
  });

  describe("`thetypeof()`", () => {
    it('`is()`', () => {
      expect(Validstate.thetypeof([]).is('array')).toBe(true);
      expect(Validstate.thetypeof([]).is('object')).toBe(false);
      expect(Validstate.thetypeof('test').is('string')).toBe(true);
      expect(Validstate.thetypeof({}).is('object')).toBe(true);
      expect(Validstate.thetypeof(10).is('number')).toBe(true);
      expect(Validstate.thetypeof(false).is('boolean')).toBe(true);
    });

    it('`isnt()`', () => {
      expect(Validstate.thetypeof({}).isnt('array')).toBe(true);
      expect(Validstate.thetypeof({}).isnt('object')).toBe(false);
      expect(Validstate.thetypeof(false).isnt('string')).toBe(true);
      expect(Validstate.thetypeof([]).isnt('object')).toBe(true);
      expect(Validstate.thetypeof('10').isnt('number')).toBe(true);
      expect(Validstate.thetypeof(10).isnt('boolean')).toBe(true);
    });

    it('`error()`', () => {
      expect(() => { Validstate.thetypeof(true).error('array') }).toThrow('The type of true is Boolean: it should be of type array');
      expect(() => { Validstate.thetypeof(10).error('array') }).toThrow();
    });
  });

  describe("`getLength()`", () => {
    it('gets length of supplied value', () => {
      expect(Validstate.getLength([1,2])).toBe(2);
      expect(Validstate.getLength({1: '1', 2: { 1: '1', 2: '2'} })).toBe(2);
      expect(Validstate.getLength('test')).toBe(4);
    });
  });

  describe("`convertStringToArray()`", () => {
    it('Takes a comma separated string and converts to a normalized array', () => {
      expect(Validstate.convertStringToArray('string,string')).toEqual(['string', 'string']);
      expect(Validstate.convertStringToArray('String, string')).toEqual(['string', 'string']);
      expect(Validstate.convertStringToArray('STRING, STRING')).toEqual(['string', 'string']);
    });
  });

  describe("`isEmpty()`", () => {
    it('Checks if value is empty. Deep-checks arrays and objects', () => {
      expect(Validstate.isEmpty([])).toBe(true);
      expect(Validstate.isEmpty({})).toBe(true);
      expect(Validstate.isEmpty('')).toBe(true);
      expect(Validstate.isEmpty([{0:false},"",0])).toBe(true);
      expect(Validstate.isEmpty({0:1})).toBe(false);
      expect(Validstate.isEmpty(NaN)).toBe(true);
      expect(Validstate.isEmpty(null)).toBe(true);
      expect(Validstate.isEmpty(undefined)).toBe(true);
    });
  });

  describe("`isPresent()`", () => {
    it('Determine\'s if a value is present', () => {
      expect(Validstate.isPresent([1,2])).toBe(true);
      expect(Validstate.isPresent({1: '1'})).toBe(true);
      expect(Validstate.isPresent('test')).toBe(true);
      expect(Validstate.isPresent(1)).toBe(true);
      expect(Validstate.isPresent('')).toBe(false);
      expect(Validstate.isPresent([])).toBe(false);
      expect(Validstate.isPresent([{}])).toBe(false);
      expect(Validstate.isPresent([false, {0:false}, ''])).toBe(false);
      expect(Validstate.isPresent({})).toBe(false);
      expect(Validstate.isPresent(NaN)).toBe(false);
      expect(Validstate.isPresent(null)).toBe(false);
      expect(Validstate.isPresent(undefined)).toBe(false);
    });
  });

});
