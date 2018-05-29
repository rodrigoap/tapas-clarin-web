import React, { Component } from 'react';
import Tapa from './Tapa'

class Tapas extends Component {

	constructor(props) {
		super(props);
	}

  render() {
    return (
			<div>
				{this.props.tapas.map(function(elem, index){
					return <Tapa key={index} tapa={elem} />;
				})}
			</div>
    );
  }
}

export default Tapas;
