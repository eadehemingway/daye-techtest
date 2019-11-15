import React, { Component } from 'react'
import * as d3 from 'd3'
import { Tampon } from './TamponBox'

type TamponMatrixProps = {
  tampon: Tampon
}

export class TamponMatrix extends Component<TamponMatrixProps> {
  getY2Coordinate = (index: number, dotsPerRow: number, radius: number) => {
    const placeInCol = Math.floor(index / dotsPerRow)
    const padding = 5
    return placeInCol * (padding + radius * 2)
  }

  getX2Coordinate = (index: number, dotsPerRow: number, radius: number) => {
    const placeInRow = index % dotsPerRow
    const padding = 5
    return placeInRow * (radius * 2 + padding)
  }
  componentDidMount() {}
  render() {
    const { tampon } = this.props

    return (
      <div className="tampon-type">
        <p>coating: {tampon.coating}</p>
        <p>amount: {tampon.amount}</p>
        <svg></svg>
      </div>
    )
  }
}
