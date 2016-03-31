import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { normalize, Schema, arrayOf } from 'normalizr';

const contentsSchema = new Schema('contents', { idAttribute: 'contentsId' });

function actionCreator(actionType, ...state) {
  return Object.assign({ type: actionType }, ...state);
}

function actionAddPerson(name) {
  return (dispatch) => {
    dispatch(actionRequest());
    setTimeout(() => {
      dispatch(actionRequestDone());
      dispatch(actionCreator('ADD_PERSON', { name }));
    }, 1000)
  }
}

function actionRequest() {
  return actionCreator('REQUEST');
}

function actionRequestDone() {
  return actionCreator('REQUEST_DONE');
}

function actionDeletePerson(id) {
  return actionCreator('DELETE_PERSON', { id });
}

function Person(props) {
  return <li id={ Math.random() }>{props.name} <span onClick={ () => console.log(`click ${props.id}`) }>=</span></li>
}

function Persons(props) {
  return <ul>{props.persons.map((person) => <Person key={person.id} name={person.name} />)}</ul>;
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { actionAddPerson, persons, request } = this.props, count = persons.length;

    return <div>
      <h1>사람이 { count }명</h1>
      <input type='text' ref='txtName' />
      <button onClick={ () => { actionAddPerson(this.refs.txtName.value) } }>Add</button>
        { request && <p>추가중...</p> }
        <Persons persons={persons} />
    </div>;
  }
}

App.propTypes = {
  persons: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    persons: state.persons,
    update: Date.now()
  };
}

export default connect(state => ({ ...state, update: Date.now() }), {
  actionAddPerson,
  actionRequest,
  actionRequest })(App);
