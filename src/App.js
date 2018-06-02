import React, { Component } from "react";
import { WEB_CONFIG } from "./config";
import "bootstrap/dist/css/bootstrap.css";
import Tapas from "./Tapas";
import {
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Button
} from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tapas: [],
      searchText: "messi",
      message: "",
      pageNum: 0,
      pageSize: 10
    };
    this.refreshData = this.refreshData.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(event) {
    let pageNum = Math.trunc(window.scrollY / window.innerHeight);
    console.log("pageNum:" + pageNum);
  }

  refreshData(e) {
    if (this.state.searchText.length > 3) {
      var queryString = "?text=" + this.state.searchText;
      this.authFetch(WEB_CONFIG.apiUrl + "/api/tapas" + queryString)
        .then(data => {
          if (data) {
            this.setState({ tapas: data });
          } else {
            alert("Tapas not found.");
          }
        })
        .catch(error => this.setState({ message: error.message, tapas: [] }));
    }
  }

  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  };

  authFetch(url, options) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    return fetch(url, { headers, ...options })
      .then(this.checkStatus)
      .then(response => response.json());
  }

  getValidationState() {
    const length = this.state.searchText.length;
    if (length > 3) return "success";
    return "error";
  }

  nextPage() {
    var nextPageNum = this.state.pageNum + 1;
    this.setState({ pageNum: nextPageNum });
  }

  previousPage() {
    var nextPageNum = this.state.pageNum - 1;
    this.setState({ pageNum: nextPageNum });
  }

  render() {
    return (
      <div>
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <FormControl
              type="text"
              value={this.state.searchText}
              placeholder="Ingrese texto a buscar"
              onChange={this.onSearchChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Ingrese más de tres caracteres</HelpBlock>
            <Button bsStyle="success" onClick={this.refreshData}>
              Buscar
            </Button>
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
