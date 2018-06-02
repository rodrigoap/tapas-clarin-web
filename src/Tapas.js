import React, { Component } from "react";
import Tapa from "./Tapa";
import { Button } from "react-bootstrap";

class Tapas extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var from = this.props.from;
    var to = this.props.to;
    console.log(from + "->" + to);
    return (
      <div>
        <div className="page-nav">
          <Button bsStyle="primary" onClick={this.props.previousPage}>
            Página anterior
          </Button>
          <Button bsStyle="primary" onClick={this.props.nextPage}>
            Página siguiente
          </Button>
        </div>
        <div>
          {this.props.tapas.map(function(elem, index) {
            if (index >= from && index < to) {
              return <Tapa key={index} tapa={elem} />;
            }
          })}
        </div>
      </div>
    );
  }
}

export default Tapas;
