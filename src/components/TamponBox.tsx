import React from 'react'
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

export const TamponBox = (props: TamponBoxProps) => {
  const { data, boxIndex } = props
  let tamponInfo = data.tampon

  return (
    <div className="tampon-box">
      <img src={data.productImage} className="tampon-image"></img>
      <div className="tampon-box-writing">
        <p className="box-title">
          <span className="box-title-size">{tamponInfo[0].size} size | </span>
          <span className="box-title-price">
            {data.price} {data.currency}
          </span>
        </p>

        <div className="matrix-container">
          {tamponInfo &&
            tamponInfo.map((t: Tampon, i: number) => (
              <TamponMatrix tampon={t} key={i} boxIndex={boxIndex} />
            ))}
        </div>
      </div>
    </div>
  )
}
