// Vendor
import React, { Component } from 'react';
import classNames from 'classnames';

// App

class StylishInput extends Component {

  constructor(props){
    super(props);

    this.state = {
      focused: false
    }
  }

  classes(){
    return {
      field: classNames({
        'field': true,
        'focused': this.state.focused,
        'has-value': !!this.props.value,
        'field_with_errors': this.props.valid == false,
        [this.props.fieldClassName]: this.props.fieldClassName ? true : false
      })
    }
  }

  focus(){
    this.textInput.focus();
  }

  onBlur(){
    this.setState({ focused: false });
  }

  onFocus(){
    this.setState({ focused: true });
  }

  render(){
    return (
      <div className={this.classes().field}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input
          ref={(input) => { this.textInput = input; }}
          style={[this.props.style]}
          id={this.props.id}
          value={this.props.value}
          onChange={this.props.onChange}
          name={this.props.name}
          type={this.props.type}
          autoComplete={this.props.autoComplete}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          disabled={this.props.disabled}
          autoFocus={this.props.autoFocus}
        />
      </div>
    );
  }
};

export { StylishInput };
