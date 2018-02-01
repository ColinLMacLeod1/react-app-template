import React from 'react'
import axios from 'axios'

import HomeContainer from './containers/HomeContainer'



export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {

		}
	}

  render() {
    return(
      <div>
        <HomeContainer />
      </div>
    )
  }
}
