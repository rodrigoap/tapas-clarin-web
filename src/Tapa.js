import React, { Component } from 'react';

/**
 * Tapa
 */
class Tapa extends Component {
  /**
   * Render a Tapa
   * @returns {object} a Tapa
   */
  render() {
    const year = this.props.tapa.date.substring(0, 4);
    const month = this.props.tapa.date.substring(4, 6);
    const day = this.props.tapa.date.substring(6, 8);
    return (
      <div>
        <div className="box-thumb">
          <div className="tapa-thumb">
            <a
              href={`http://tapas.clarin.com/tapa.html#${this.props.tapa.date}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="img-thumb"
                src={`/thumb/${this.props.tapa.date}_thumb.jpg`}
                alt={`Tapa ${this.props.tapa.date}`}
              />
            </a>
          </div>
          <div className="date-thumb">{`${day}-${month}-${year}`}</div>
        </div>
      </div>
    );
  }
}

export default Tapa;
