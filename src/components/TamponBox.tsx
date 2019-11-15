import React, { Component } from 'react'
const xml2js = require('xml2js')

export type TamponBoxType = {
  price: number
  currency: string
  productImage: string
  tampon: Tampon[] | string
}

export type TamponBoxNoXml = {
  price: number
  currency: string
  productImage: string
  tampon: Tampon[]
}

type TamponBoxProps = {
  data: TamponBoxNoXml
}

type Tampon = {
  size: string
  coating: string
  amount: string
}

export class TamponBox extends Component<TamponBoxProps> {
  render() {
    const { data } = this.props
    let tamponInfo = data.tampon

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
