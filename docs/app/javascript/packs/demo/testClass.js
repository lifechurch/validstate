class TestClass {
  constructor() {
    this.rules = {};
  }

  build(rules, store){
    this.rules = rules;
    store.dispatch({
      type: "validstate_init",
      payload: rules
    });
  }
}

export default new TestClass();