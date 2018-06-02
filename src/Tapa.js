import React, { Component } from "react";

class Tapa extends Component {
  constructor(props) {
    super(props);
    this.state = { tapa: {} };
  }

  render() {
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
          <div className="date-thumb">{this.props.tapa.date}</div>
        </div>
      </div>
    );
  }
}

export default Tapa;
