import React, { Component } from 'react'
import axios from 'axios'
import { TamponBox, TamponBoxType, TamponBoxNoXml, Tampon } from './TamponBox'
import xml2js from 'xml2js'
import styled from 'styled-components'

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
        <FilterPanelWrapper>
          <SelectSizeInput
            name="size"
            onChange={({ target }) => this.setState({ size: target.value })}
          >
            <option value="all">show all sizes</option>
            <option value="small">show small tampons</option>
            <option value="regular">show regular tampons</option>
          </SelectSizeInput>
        </FilterPanelWrapper>
        <TamponListWrapper>
          {filteredData.length
            ? filteredData.map((t, i) => (
                <TamponBox data={t} key={i} boxIndex={i} />
              ))
            : null}
        </TamponListWrapper>
      </div>
    )
  }
}

const TamponListWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  max-width: 870px;
  margin: auto;
  flex-wrap: wrap;
`
const FilterPanelWrapper = styled.div`
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 70%;
  max-width: 870px;
  margin: 3rem auto;
  border-bottom: 6px solid rgb(229, 242, 227);
`

const SelectSizeInput = styled.select`
  width: 300px;
  height: 30px;
  background: none;
  color: rgba(0, 59, 27, 0.8);
  border: rgba(0, 59, 27, 0.8);
  font-size: 1rem;
  letter-spacing: 0.2rem;
  margin-bottom: 1rem;
  outline-color: rgba(0, 59, 27, 0.5);
`
