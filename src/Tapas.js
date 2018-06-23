import React, { Component } from 'react';
import { Button, Badge } from 'react-bootstrap';
import Tapa from './Tapa';
import Histogram from './Histogram';

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
    console.log(`${from} -> ${to} of ${this.props.tapas.length}`);

    const labels = [];
    const data = [];
    let currentYear = 0;
    let currentIndex = -1;
    for (let i = 0; i < this.props.tapas.length; i++) {
      const tapa = this.props.tapas[i];
      if (tapa.year === currentYear) {
        data[currentIndex] = data[currentIndex] + 1;
      } else {
        currentIndex++;
        currentYear = tapa.year;
        labels.push(`${currentYear}`);
        data.push(1);
      }
    }
    return (
      <div>
        {this.props.tapas.length > 0 && (
          <Histogram xLabels={labels} yValues={data} />
        )}
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
