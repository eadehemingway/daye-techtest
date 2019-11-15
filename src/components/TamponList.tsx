import React, { Component } from 'react'
import axios from 'axios'

export class TamponList extends Component {
  state = {
    data: []
  }
  componentDidMount() {
    axios
      .get('https://front-end-test-bvhzjr6b6a-uc.a.run.app')
      .then(res => this.setState({ data: res.data }))
  }
  render() {
    const { data } = this.state

    return (
      <div>
        <h1>TAMPON LIST</h1>
      </div>
    )
  }
}
