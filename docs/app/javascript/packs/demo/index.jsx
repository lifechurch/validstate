import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import Validstate from '../validstate';

//App
import validationConfig from '../validstate/validations_example';
import reducers from './reducers';
import BasicForm from './components/BasicForm';

const store = createStore(reducers,{}, applyMiddleware(ReduxThunk));

Validstate.init(validationConfig, store);

class Demo extends Component {
  render() {
    return (
      <Provider store={store}>
        <BasicForm />
      </Provider>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Demo />, document.body.appendChild(document.createElement('div')),
  )
})

