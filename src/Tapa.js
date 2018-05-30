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
            <img
              className="img-thumb"
              src={"/thumb/" + this.props.tapa.date + "_thumb.jpg"}
              alt={"Tapa " + this.props.tapa.date}
            />
          </div>
          <div className="date-thumb">{this.props.tapa.date}</div>
        </div>
      </div>
    );
  }
}

export default Tapa;
