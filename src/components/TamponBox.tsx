import React, { Component } from 'react'
const xml2js = require('xml2js')

type TamponBoxProps = {
  data: {
    // if I specify the properties of this object causes problems when trying to access the tampon key
    // come back to...
    [key: string]: any
    // price: number
    // currency: string
    // productImage: string
    // tapons?: Tampon[] | string
    // tampons?: Tampon[] | string
  }
}

type ParsedXmlTampons = {
  tapons: {
    tampon: any[]
  }
}

type Tampon = {
  size: string
  coating: string
  amount: string
}

export class TamponBox extends Component<TamponBoxProps> {
  render() {
    const { data } = this.props

    const regexTampon = /ta\w+ons/
    const keys = Object.keys(data)
    const tamponKey = keys.find(k => k.match(regexTampon))

    let tamponInfo = tamponKey && data[tamponKey]

    if (typeof tamponInfo === 'string') {
      const parser = new xml2js.Parser({ explicitArray: false })
      parser.parseString(tamponInfo, function(
        err: Error,
        result: ParsedXmlTampons
      ) {
        if (err) console.log(err)
        let tampons = result.tapons.tampon
        if (!Array.isArray(tampons)) tampons = [tampons]
        tamponInfo = tampons
      })
    }

    return (
      <div className="tampon-box">
        <img src={data.productImage} className="tampon-image"></img>
        <div className="tampon-box-writing">
          <p>size: {tamponInfo[0].size}</p>
          <p>amount: 12 tampons</p>
          <p>
            price: {data.price} {data.currency}
          </p>
          {tamponInfo &&
            tamponInfo.map((t: Tampon, i: number) => (
              <div className="tampon-type" key={i}>
                <p>coating: {t.coating}</p>
                <p>amount: {t.amount}</p>
              </div>
            ))}
        </div>
      </div>
    )
  }
}
