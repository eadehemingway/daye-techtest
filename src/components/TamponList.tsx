import React, { Component } from 'react'
import axios from 'axios'
import { TamponBox, TamponBoxType, TamponBoxNoXml, Tampon } from './TamponBox'
import xml2js from 'xml2js'

export type TamponBoxFromApi = {
  [key: string]: any
}
type TamponListState = {
  data: TamponBoxType[]
  size: string
}

type ParsedXmlTampons = {
  tapons: {
    tampon: Tampon[]
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

    const filteredData = data.filter((box: TamponBoxNoXml) => {
      if (size === 'all') return true
      return box.tampon[0].size === size
    })

    return (
      <div>
        <div className="filter-panel">
          <select
            name="size"
            onChange={({ target }) => this.setState({ size: target.value })}
            className="select-size"
          >
            <option value="all">show all sizes</option>
            <option value="small">show small tampons</option>
            <option value="regular">show regular tampons</option>
          </select>
        </div>
        <div className="tampon-list">
          {filteredData.length
            ? filteredData.map((t, i) => (
                <TamponBox data={t} key={i} boxIndex={i} />
              ))
            : null}
        </div>
      </div>
    )
  }
}
