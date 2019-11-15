import React, { Component } from 'react'
import axios from 'axios'
import { TamponBox } from './TamponBox'

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
        <div className="filter-panel"> </div>
        <div className="tampon-list">
          {data.length && data.map((t, i) => <TamponBox data={t} key={i} />)}
        </div>
      </div>
    )
  }
}
