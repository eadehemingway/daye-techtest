import React, { Component } from 'react'
import axios from 'axios'
import { TamponBox, TamponBoxType } from './TamponBox'
const xml2js = require('xml2js')

export type TamponBoxFromApi = {
  [key: string]: any
}
type TamponListState = {
  data: any[]
  size: string
}

type ParsedXmlTampons = {
  tapons: {
    tampon: any[]
  }
}
export class TamponList extends Component<{}, TamponListState> {
  state = {
    data: [],
    size: 'all'
  }
  componentDidMount() {
    axios.get('https://front-end-test-bvhzjr6b6a-uc.a.run.app').then(res => {
      const correctSpellingData = res.data.map((box: TamponBoxFromApi) => {
        // make spelling of tampon correct
        const regexTampon = /ta\w+ons/
        const keys = Object.keys(box)
        const tamponKey = keys.find(k => k.match(regexTampon))
        if (tamponKey && tamponKey !== 'tampon') {
          const value = box[tamponKey]
          box.tampon = value
          delete box[tamponKey]
        }

        // turn xml into js
        if (typeof box.tampon === 'string') {
          const parser = new xml2js.Parser({ explicitArray: false })
          parser.parseString(box.tampon, function(
            err: Error,
            result: ParsedXmlTampons
          ) {
            if (err) console.log(err)
            let tampons = result.tapons.tampon
            if (!Array.isArray(tampons)) tampons = [tampons]
            box.tampon = tampons
          })
        }
        return box
      })
      this.setState({ data: correctSpellingData })
    })
  }
  render() {
    const { data, size } = this.state

    const filteredData = data.filter((box: TamponBoxType) => {
      //   console.log(box)
      //   box.tampon[0].size
      return true
    })

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
