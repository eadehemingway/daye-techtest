import React, { Component } from 'react'
import axios from 'axios'
import { TamponBox } from './TamponBox'

type TamponListState = {
  data: any[]
  size: string
}
export class TamponList extends Component<{}, TamponListState> {
  state = {
    data: [],
    size: 'all'
  }
  componentDidMount() {
    axios.get('https://front-end-test-bvhzjr6b6a-uc.a.run.app').then(res => {
      this.setState({ data: res.data })
    })
  }
  render() {
    const { data, size } = this.state

    return (
      <div>
        <h1>TAMPON LIST</h1>
        <div className="filter-panel">
          <select
            name="size"
            onChange={e => this.setState({ size: e.target.value })}
          >
            <option>all</option>
            <option>small</option>
            <option>regular</option>
          </select>
        </div>
        <div className="tampon-list">
          {data.length && data.map((t, i) => <TamponBox data={t} key={i} />)}
        </div>
      </div>
    )
  }
}
