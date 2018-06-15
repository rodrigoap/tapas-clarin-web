import React, { Component } from 'react';
import { Button, Badge } from 'react-bootstrap';
import Tapa from './Tapa';

/**
 * Tapas
 */
class Tapas extends Component {
  /**
   * Renders a list of Tapas
   * @returns {object} list of Tapas
   */
  render() {
    const { from } = this.props;
    const { to } = this.props;
    console.log(`${from} -> ${to}`);
    return (
      <div>
        <div className="page-nav">
          <span className="button-nav-prev">
            <Button bsStyle="primary" onClick={this.props.previousPage}>
              &lt;
            </Button>
          </span>
          <span className="button-nav-next">
            <Button bsStyle="primary" onClick={this.props.nextPage}>
              &gt;
            </Button>
          </span>
          <Badge>{`${this.props.tapas.length} tapas`}</Badge>
        </div>
        <div>
          {this.props.tapas.map((elem, index) => {
            if (index >= from && index < to) {
              return <Tapa key={elem.date} tapa={elem} />;
            }
            return false;
          })}
        </div>
      </div>
    );
  }
}

export default Tapas;
