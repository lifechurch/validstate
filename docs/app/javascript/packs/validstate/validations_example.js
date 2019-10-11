const VALIDATIONS = {
  account: {
    email: { email: true, _reducer: 'auth' },
    name: {
      _reducer: 'auth',
      firstname: { required: true },
      lastname: {
        surname: { required: true, min: "3" },
        maidenName: { required: true, excludes: 'smith, allen' },
      },
    },
    password: {
      _reducer: 'auth',
      token: { minLength: 8 },
    },
    _messages: {
      name: {
        required: "Please let us know your name so we can address you properly.",
      }
    }
  },
  contactRequest: {
    name: { required: true },
    message: { rangeLength: "15-500" },
    mobile: { phoneUS: true, requireGroup: "phoneNumber" },
    home: { phoneUS: true, requireGroup: "phoneNumber" },
    age: { digits: true, range: "18-35" },
    terms: { equalTo: true }
  },
  shoppingCart: {
    itemCount: { integer: true, step: 2 },
    couponCode: { regex: /^(?=\S+[a-zA-Z])(?=\S+\d)\S{8,8}$/ },
    creditCardNumber: { creditCard: true },
    paymentMethod: { elementOf: ["VISA", "MasterCard", "AMEX", "Discover"] },
    items: { forEach: {
      id: { numeric: true },
      quanity: { min: 1, integer: true },
      rating: { number: true }
    }},
    hasAccount: { isEqualTo: true }
  },
  adminAccess: {
    permissions: {
      includes: "ACCOUNT_CONTROL"
    }
  }
}

export default VALIDATIONS;


const STATE = {
  account: {
    valid: true,
    name: {
      valid: true,
      reason: null,
      message: null
    },
    email: {
      valid: true,
      reason: null,
      message: null
    },
    password: {
      valid: true,
      reason: null,
      message: null
    }
  },
  shoppingCart: {
    valid: false,
    itemCount: {
      valid: true,
      reason: null,
      message: null
    },
    items: {
      valid: false,
      elements: [
        {
          valid: false,
          quanity: {
            valid: false,
            reason: "integer",
            message: "Quanity must be an integer"
          },
          id: {
            valid: true,
            reason: null,
            message: null
          }
        }
      ]
    }
  }
}
