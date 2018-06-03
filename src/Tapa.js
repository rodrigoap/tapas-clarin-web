import React, { Component } from "react";

class Tapa extends Component {
  constructor(props) {
    super(props);
    this.state = { tapa: {} };
  }

  render() {
    var year = this.props.tapa.date.substring(0, 4);
    var month = this.props.tapa.date.substring(4, 6);
    var day = this.props.tapa.date.substring(6, 8);
    return (
      <div>
        <div className="box-thumb">
          <div className="tapa-thumb">
            <a
              href={"http://tapas.clarin.com/tapa.html#" + this.props.tapa.date}
              target="_blank"
            >
              <img
                className="img-thumb"
                src={"/thumb/" + this.props.tapa.date + "_thumb.jpg"}
                alt={"Tapa " + this.props.tapa.date}
              />
            </a>
          </div>
          <div className="date-thumb">{day + "-" + month + "-" + year}</div>
        </div>
      </div>
    );
  }
}

export default Tapa;
