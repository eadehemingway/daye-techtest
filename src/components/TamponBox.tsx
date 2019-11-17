import React from 'react'
import { TamponMatrix } from './TamponMatrix'
import styled from 'styled-components'

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
    <TamponBoxWrapper>
      <TamponImage src={data.productImage}></TamponImage>
      <TamponBoxInfoWrapper>
        <TamponBoxTitle>
          <TamponTitleSize>{tamponInfo[0].size} size | </TamponTitleSize>
          <TamponTitlePrice>
            {data.price} {data.currency}
          </TamponTitlePrice>
        </TamponBoxTitle>

        <MatrixContainer>
          {tamponInfo &&
            tamponInfo.map((t: Tampon, i: number) => (
              <TamponMatrix tampon={t} key={i} boxIndex={boxIndex} />
            ))}
        </MatrixContainer>
      </TamponBoxInfoWrapper>
    </TamponBoxWrapper>
  )
}

const MatrixContainer = styled.div`
  display: flex;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`

const TamponBoxWrapper = styled.div`
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  margin: 1rem 0;
  display: flex;
  border-radius: 4px;
  align-items: center;
  background-image: linear-gradient(#fefce8, #fef1e8);
`

const TamponImage = styled.img`
  width: 183px;
  height: 200px;
  margin-left: 2rem;
  @media (max-width: 500px) {
    display: none;
  }
`

const TamponBoxInfoWrapper = styled.div`
  margin-left: 6rem;
  padding-top: 2rem;
  @media (max-width: 900px) {
    margin-left: 1rem;
  }
`

const TamponBoxTitle = styled.div`
  letter-spacing: 0.2rem;
  margin-bottom: 0.5rem;
  @media (max-width: 500px) {
    margin-bottom: 2rem;
  }
`

const TamponTitleSize = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  @media (max-width: 500px) {
    font-size: 1.3rem;
  }
`

const TamponTitlePrice = styled.span`
  font-weight: 50;
  font-size: 1rem;
  color: rgba(0, 59, 27, 0.5);
  @media (max-width: 500px) {
    font-size: 1.3rem;
  }
`
