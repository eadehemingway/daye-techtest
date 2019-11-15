import React, { Component } from 'react'
import { TamponMatrix } from './TamponMatrix'

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
  boxIndex: number
}

export type Tampon = {
  size: string
  coating: string
  amount: number
}

export class TamponBox extends Component<TamponBoxProps> {
  render() {
    const { data, boxIndex } = this.props
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
              <TamponMatrix tampon={t} key={i} boxIndex={boxIndex} />
            ))}
        </div>
      </div>
    )
  }
}
