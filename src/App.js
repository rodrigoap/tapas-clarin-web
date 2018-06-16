/* global fetch */
/* global alert */
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FormControl, FormGroup, HelpBlock, Button } from 'react-bootstrap';
import Tapas from './Tapas';
import { WEB_CONFIG } from './config';

/**
 * App
 */
class App extends Component {
  /**
   * Construct an App
   * @param {object} props - properties
   */
  constructor(props) {
    super(props);
    this.state = {
      tapas: [],
      searchText: 'urss',
      message: '',
      pageNum: 0,
      pageSize: 10,
    };
    this.refreshData = this.refreshData.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  /**
   * componentDidMount
   * @returns {object} nothing
   */
  componentDidMount() {
    this.refreshData();
  }

  /**
   * onSearchChange
   * @param {event} e - js event
   * @returns {object} response
   */
  onSearchChange = e => this.setState({ searchText: e.target.value });

  /**
   * getValidationState
   * @returns {string} validation status success/error;
   */
  getValidationState() {
    const { length } = this.state.searchText;
    if (length > 3) return 'success';
    return 'error';
  }

  /**
   * fetch
   * @param {string} url - url to fetch
   * @param {object} options - fetch options
   * @returns {object} response
   */
  authFetch(url, options) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return fetch(url, { headers, ...options })
      .then(this.checkStatus)
      .then(response => response.json());
  }

  /**
   * refreshData
   * @param {event} e - js event
   * @returns {object} response
   */
  refreshData() {
    if (this.state.searchText.length > 3) {
      const queryString = `?text=${this.state.searchText}`;
      this.authFetch(`${WEB_CONFIG.apiUrl}/api/tapas${queryString}`)
        .then((data) => {
          if (data) {
            this.setState({ tapas: data, pageNum: 0 });
          } else {
            alert('Tapas not found.');
          }
        })
        .catch(error => this.setState({ message: error.message, tapas: [] }));
    }
  }

  /**
   * next page
   * @returns {number} new page number
   */
  nextPage() {
    const nextPageNum = this.state.pageNum + 1;
    if (nextPageNum * this.state.pageSize <= this.state.tapas.length) {
      this.setState({ pageNum: nextPageNum });
    }
    return this.state.pageNum;
  }

  /**
   * previous page
   * @returns {number} new page number
   */
  previousPage() {
    if (this.state.pageNum > 0) {
      const nextPageNum = this.state.pageNum - 1;
      this.setState({ pageNum: nextPageNum });
    }
    return this.state.pageNum;
  }

  /**
   * submitHandler
   * @param {object} e - event
   * @returns {object} nothing
   */
  submitHandler(e) {
    e.preventDefault();
    this.refreshData();
  }

  /**
   * render the App
   * @returns {object} rendered App
   */
  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <FormControl
              bsClass="searchBox"
              type="text"
              value={this.state.searchText}
              placeholder="Ingrese texto a buscar"
              onChange={this.onSearchChange}
            />
            <Button bsStyle="success" onClick={this.refreshData}>
              Buscar
            </Button>
            <FormControl.Feedback />
            <div>
              <HelpBlock>Ingrese más de tres caracteres</HelpBlock>
            </div>
          </FormGroup>
        </form>
        <Tapas
          tapas={this.state.tapas}
          from={this.state.pageNum * this.state.pageSize}
          to={this.state.pageNum * this.state.pageSize + this.state.pageSize}
          nextPage={this.nextPage}
          previousPage={this.previousPage}
        />
      </div>
    );
  }
}

export default App;
