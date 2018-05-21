import * as ValidstateConst from './ValidstateConst';
import ValidstateMessages from './ValidstateMessages';
import cloneDeep from 'lodash.clonedeep';

export default class Validstate {

  /*
  * @function constructor
  * @description Initilize component variables
  * @param 
  * @returns Validstate instance
  */
  constructor(){
    this.store = null;
    this.validationConfig = {};
    this.validations = [];
    this.properties = {};
    this.initialProperties = {};
    this.messages = {};
    this.messageTemplate = new ValidstateMessages();
    this.requireGroups = [];
  }

  /*
  * @function init
  * @description Initilize object with application rules
  * @param rules, store
  * @returns Validstate instance
  */
  init(validationConfig, store){
    this.validationConfig = validationConfig;
    this.store = store;

    //Parse validations for properties
    this.extract(); 

    this.initialProperties = cloneDeep(this.properties);

    this.store.dispatch({
      type: ValidstateConst.VALIDSTATE_INIT,
      payload: this.properties
    })
  }

  /*
  * @function extract
  * @description Extract Properties, validations and requireGroups from rules
  * @param
  * @returns Properties object
  */
  extract() {
    this.properties = {
      valid: null
    };

    // Sets validations
    for (const [validationKey, validation] of Object.entries(this.validationConfig)) {

      if (this.validations.includes(validationKey)) {
        throw new Error(`Duplicate validation key. ${validationKey} was already used.`);
      } else{
        this.validations.push(validationKey);  
      }

      this.properties[validationKey] = {
        valid: null
      };

      // Sets top level properties
      for (const [propertyKey, property] of Object.entries(validation)) {

        if (propertyKey === "_messages") {
          // Messages Property
          if (!this.thetypeof(this.messages[validationKey]).is('object')) {
            this.messages[validationKey] = {};
          }

          this.messages[validationKey] = property;

        } else if (Object.keys(property)[0] == "forEach") {
          this.properties[validationKey][propertyKey] = {
            valid: null,
            elements: []
          }
        } else {
          // Checks for nested properties
          if (this.depthOf(property) > 1) {
            this.properties[validationKey][propertyKey] = this.extractObj(property);
          } else {
            this.properties[validationKey][propertyKey] = {
              valid: null,
              reason: null,
              message: null
            }
          }
        }
      }
    }
  }

  /*
  * @function extractObj
  * @description extracts objects from supplied properties
  * @param property 
  * @returns object
  */
  extractObj(property) {
    let initialValues = {
      valid: null,
      reason: null,
      message: null
    }

    for (const [propertyKey, nextProp] of Object.entries(property)) {
      if (propertyKey === "_reducer") {
        continue;
      } else if (this.depthOf(nextProp) > 1) {
        initialValues[propertyKey] = this.extractObj(nextProp);
      } else {
        initialValues[propertyKey] = {
          valid: null,
          reason: null,
          message: null
        }
      }
    }
    return initialValues;
  }

  /*
  * @function validate
  * @description Run specified validations
  * @param validation 
  * @returns boolean
  */
  validate(validation){
    if(this.validationConfig[validation] == undefined){
      throw new Error(`${validation} validation does not exist.`);
      return false;
    }

    let mergedState = this.mergeState(this.store.getState());

    this.properties[validation].valid = true; 

    for (const [propertyKey, property] of Object.entries(this.validationConfig[validation])) {

      if(propertyKey == "_messages"){
        continue;
      } else if(propertyKey == "_reducer"){
        continue;
      } else {
        let propertyValidstate = {
          valid: true,
          reason: null,
          message: null
        }
        // Check top level property has children
        if (this.depthOf(property) > 1) {
          propertyValidstate = this.validateNestedProperties(property, mergedState[propertyKey]);
          if(propertyValidstate.valid == false) {
            this.properties[validation].valid = false
          }
        } else {
          for (const [ruleKey, rule] of Object.entries(property)){
            let value = mergedState[propertyKey];
            let valid 
      
            if(ruleKey == "_reducer"){
              continue;
            } else {
              valid = this[ruleKey](value, rule);
            }
            if(!valid){
              this.properties[validation].valid = false;
              propertyValidstate.valid = false;
              propertyValidstate.reason = ruleKey;
              propertyValidstate.message = this.getMessage(validation, propertyKey, ruleKey, rule);
              break;
            }
          }
        }
  
        this.properties[validation][propertyKey] = { ...propertyValidstate };
      }
    }

    if(this.properties[validation].valid){
      this.store.dispatch({
        type: ValidstateConst.VALIDSTATE_SUCCESS,
        payload: this.properties
      });
      return true;
    } else {
      this.store.dispatch({
        type: ValidstateConst.VALIDSTATE_FAIL,
        payload: this.properties
      });
      return false;
    }
  }

  /*
  * @function validateNestedProperties
  * @description Reads tree and validates nested properties 
  * @param property, mergedState
  * @returns object
  */
  validateNestedProperties(property, mergedState) {
    let propertyValidstate = {
      valid: true,
      reason: null,
      message: null
    }
    
    for (const [propertyKey, nextProp] of Object.entries(property)) {

      if (propertyKey === "_reducer") {
        continue;
      } else if (this.depthOf(nextProp) > 1) { // Check top level property has children
        propertyValidstate[propertyKey] = this.validateNestedProperties(nextProp, mergedState[propertyKey])
        if (propertyValidstate[propertyKey].valid == false) {
          propertyValidstate.valid = false
        }
      } else {
        for (const [ruleKey, rule] of Object.entries(property[propertyKey])){
          propertyValidstate[propertyKey] = {
            valid: true,
            reason: null,
            message: null
          }

          let value = mergedState[propertyKey];
          let valid = this[ruleKey](value, rule);
          if(!valid){
            propertyValidstate.valid = false;
            propertyValidstate[propertyKey].valid = false;
            propertyValidstate[propertyKey].reason = ruleKey;
            // TODO add recursive method for child messages
            // propertyValidstate[propertyKey].message = this.getMessage(validation, propertyKey, ruleKey, rule);
            break;
          }
        }
      }
    }
    return propertyValidstate;
  }

  /*
  * @function clear
  * @description Clear validations 
  * @param validation 
  * @returns 
  */
  clear(validation = null){
    if(validation == null){
      this.store.dispatch({
        type: ValidstateConst.VALIDSTATE_CLEAR,
        payload: this.initialProperties
      });
    } else {
      this.store.dispatch({
        type: ValidstateConst.VALIDSTATE_CLEAR,
        payload: { [validation]: this.initialProperties[validation] }
      });
    }
  }

  /*
  * @function getMessage
  * @description Retrive a user specified message or build a default message.
  * @param validation, propertyKey, ruleKey, value
  * @returns string
  */
  getMessage(validation, propertyKey, ruleKey, rule){
    if(this.messages[validation] !== undefined && 
       this.messages[validation][propertyKey] !== undefined &&
       this.messages[validation][propertyKey][ruleKey] !== undefined){
      return this.messages[validation][propertyKey][ruleKey];
    } else {
      return this.messageTemplate[ruleKey](propertyKey, rule);
    }
  }

  /*
  * @function mergeState
  * @description Merge state into single object
  * @param state
  * @returns object
  */
  mergeState(state){
    let mergedState = {};
    for (const [key, reducer] of Object.entries(state)) {
      if(key != "validstate"){
        mergedState = { ...mergedState, ...reducer };  
      }
      debugger
    }
    debugger
    return mergedState;
  }

  /*
  * @function depthOf
  * @description Counts largest depth of object starting from 1
  * @param object 
  * @returns integer
  */
  depthOf(object) {
    let level = 1;
    let key;
    for(key in object) {
      if (!object.hasOwnProperty(key)) continue;

      if (typeof object[key] == 'object') {
        const depth = this.depthOf(object[key]) + 1;
        level = Math.max(depth, level);
      }
    }
    return level;
  }

  /*
  * @function thetypeof
  * @description returns the type of supplied parameter. e.g(thetypeof(obj).is('object'))
  * @param value
  * @returns boolean
  */
  thetypeof(name) {
    let obj = {};
    obj.object = 'object Object'
    obj.array = 'object Array'
    obj.string = 'object String'
    obj.boolean = 'object Boolean'
    obj.number = 'object Number'
    obj.type = Object.prototype.toString.call(name).slice(1, -1)
    obj.name = Object.prototype.toString.call(name).slice(8, -1)
    obj.is = (ofType) => {
        ofType = ofType.toLowerCase();
        return (obj.type === obj[ofType])? true: false
    }
    obj.isnt = (ofType) => {
        ofType = ofType.toLowerCase();
        return (obj.type !== obj[ofType])? true: false
    }
    obj.error = (ofType) => {
        throw new TypeError(`The type of ${name} is ${obj.name}: `
        +`it should be of type ${ofType}`)
    }
    return obj;
  };


  /*
  * @function getLength
  * @description returns length of supplied value
  * @param value
  * @returns length
  */
  getLength(value) {
    if(this.thetypeof(value).is('object')) {
      return Object.keys(value).length;
    } else {
      return value.length;
    }
  }

  /*
  * Checks if value is empty. Deep-checks arrays and objects
  * Note: isEmpty([]) == true, isEmpty({}) == true, isEmpty([{0:false},"",0]) == true, isEmpty({0:1}) == false
  * @param value
  * @returns {boolean}
  */
  isEmpty(value){
    let _self = this;
    var isEmptyObject = function(a) {
      if (typeof a.length === 'undefined') { // it's an Object, not an Array
        var hasNonempty = Object.keys(a).some(function nonEmpty(element){
          return !_self.isEmpty(a[element]);
        });
        return hasNonempty ? false : isEmptyObject(Object.keys(a));
      }

      return !a.some(function nonEmpty(element) { // check if array is really not empty as JS thinks
        return !_self.isEmpty(element); // at least one element should be non-empty
      });
    };
    return (
      value == false
      || typeof value === 'undefined'
      || value == null
      || (typeof value === 'object' && isEmptyObject(value))
      || Object.is(value, NaN)
    );
  }

  /*
  * @function isPresent
  * @description Determine if a value is present
  * @parameter value
  * @return Boolean
  */
  isPresent(value) {
    return !this.isEmpty(value)
  }

  /*
  * @function required
  * @description  Determine if a value is required
  * @parameter value
  * @return Boolean
  */
  required(value) {
    return this.isPresent(value)
  }

  /*
  * @function minLength
  * @description  Determine if a value's length is >= supplied length
  * @parameter value, length
  * @return Boolean
  */
  minLength(value, length) {
    return this.getLength(value) >= length ? true : false;
  }

  /*
  * @function maxLength
  * @description  Determine if a value's length is <= supplied length
  * @parameter value, length
  * @return Boolean
  */
  maxLength(value, length) {
    return this.getLength(value) <= length ? true : false;
  }

  /*
  * @function rangeLength
  * @description Check value is between a given range of lengths. 
  * @parameter value, range(hyphenated string)
  * @return Boolean
  */
  rangeLength(value, range) {
    if(this.thetypeof(value).is('array') || this.thetypeof(value).is('string')) {
      const rangeValue = range.split("-")
      return this.minLength(value, rangeValue[0]) && this.maxLength(value, rangeValue[1]);
    } else { return false };
  }

  /*
  * @function min
  * @description  Determine if a value is >= min parameter
  * @parameter value, min
  * @return Boolean
  */
  min(value, min) {
    return value >= min ? true : false;
  }

  /*
  * @function max
  * @description  @description  Determine if a value is <= min parameter
  * @parameter value, max
  * @return Boolean
  */
  max(value, max) {
    return value <= max ? true : false;
  }

  /*
  * @function range
  * @description Check value is between a given range. 
  * @parameter value, range(hyphenated string)
  * @return Boolean
  */
  range(value, range) {
    const rangeValue = range.split("-")
    return this.min(value, rangeValue[0]) && this.max(value, rangeValue[1]);
  }

  /*
  * @function step
  * @description Check value in given step. 
  * @parameter value, step
  * @return Boolean
  */
  step(value, step) {
    return (value % step !== 0) ? false : true
  }

  /*
  * @function email
  * @description Check value is valid email. 
  * @parameter email
  * @return Boolean
  */
  email(email) {
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
  }

  /*
  * @function number
  * @description  Makes the element require a number. 
  * @parameter value
  * @return Boolean
  */
  number(value) {
    return this.thetypeof(value).is('number') ? true : false;
  }

  /*
  * @function numeric
  * @description Makes the element require a numberical value. 
  * @parameter value
  * @return Boolean
  */
  numeric(value) {
    if(this.thetypeof(value).is('number') || this.thetypeof(value).is('string')) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    } else { return false };
  }

  /*
  * @function integer
  * @description Checks for the value to be positive or negative non decimal. 
  * @parameter value
  * @return Boolean
  */
  integer(value) {
    if(this.thetypeof(value).is('number') || this.thetypeof(value).is('string')) {
      return Number.isInteger(value)
    }
  }

  /*
  * @function digits
  * @description Checks for the value to be positive non decimal numeral. 
  * @parameter value
  * @return Boolean
  */
  digits(value) {
    return /^\d+$/.test( value );
  }

  /*
  * @function equalTo
  * @description Soft compare of one value to another ==
  * @parameter value, comparison
  * @return Boolean
  */
  equalTo(value, comparison) {
    return value == comparison;
  }

  /*
  * @function isEqualTo
  * @description Strong comparison of one value to another ===
  * @parameter value, comparison
  * @return Boolean
  */
  isEqualTo(value, comparison) {
    return value === comparison;
  }

  /*
  * @function customFunction
  * @description evaluate user defined function
  * @parameter value, callback
  * @return Boolean
  */
  custom(value, callback) {
    return callback(value);
  }

}
