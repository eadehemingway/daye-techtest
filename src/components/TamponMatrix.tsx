import React, { useEffect } from 'react'
import * as d3 from 'd3'
import { Tampon } from './TamponBox'
import styled from 'styled-components'

type TamponMatrixProps = {
  tampon: Tampon
  boxIndex: number
}

export const TamponMatrix = (props: TamponMatrixProps) => {
  const { tampon, boxIndex } = props

  useEffect(() => {
    const data = d3.range(0, tampon.amount)
    const svgWidth = 190
    const svgHeight = 130
    const svg = d3
      .select(`#${tampon.coating}${boxIndex}`)
      .attr('width', svgWidth)
      .attr('height', svgHeight)

    svg
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr(
        'd',
        'M486.359,25.664c-0.02-0.02-0.039-0.038-0.06-0.059c-34.19-34.159-89.768-34.131-123.904,0.027L152.458,235.585c-4.167,4.167-4.167,10.917,0,15.084l46.766,46.769c-20.493,19.346-34.505,27.023-49.182,34.956c-16.833,9.115-34.229,18.533-60.667,44.972c-26.437,26.429-35.854,43.847-44.958,60.681c-8.771,16.199-17.063,31.502-41.292,55.743c-4.167,4.167-4.167,10.917,0,15.084C5.208,510.958,7.938,512,10.667,512c2.729,0,5.458-1.042,7.542-3.125c26.438-26.429,35.854-43.847,44.958-60.681c8.771-16.199,17.062-31.502,41.292-55.743c24.229-24.231,39.542-32.523,55.75-41.284c15.379-8.327,31.313-17.066,54.095-38.647l47.009,47.012c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125l209.938-209.952C502.896,133.026,512,111.024,512,87.606C512,64.212,502.901,42.212,486.359,25.664z M191.797,259.859l-16.714-16.714L377.479,40.75c19.837-19.813,49.189-24.299,73.487-13.673c-17.199,4.938-40.198,15.234-63.466,37.09L191.797,259.859z M206.88,274.943L402.333,79.49c25.708-24.125,50.583-31.927,64.604-34.438c-2.521,14-10.292,38.906-34.188,64.365L237.057,305.12L206.88,274.943z M471.25,134.521L268.854,336.917l-16.714-16.714L448.063,124.26c21.773-23.185,32.013-46.122,36.913-63.28c3.656,8.307,5.691,17.307,5.691,26.655C490.667,105.354,483.771,122,471.25,134.521z'
      )
      .attr('fill', d =>
        tampon.coating === 'none' ? 'rgb(237, 169, 31)' : 'rgba(0, 59, 27, 0.5)'
      )
      .attr('transform', 'scale(0.07)')
      .transition()
      .duration(800)
      .attr('transform', (d, i) => {
        const dotsPerRow = 4
        const radius = 20
        const placeInCol = Math.floor(i / dotsPerRow)
        const placeInRow = i % dotsPerRow
        const x = placeInRow * (radius * 2)
        const y = placeInCol * (radius * 2)
        return 'translate(' + x + ',' + y + ') scale(0.07)'
      })
  }, [])

  const tamponType = tampon.coating === 'none' ? 'Normal' : 'CBD '
  return (
    <MatrixWrapper>
      <p>
        {tampon.amount} {tamponType}
      </p>
      <svg id={`${tampon.coating}${boxIndex}`}></svg>
    </MatrixWrapper>
  )
}

const MatrixWrapper = styled.div`
  padding: 0.5rem;
  margin: 0 1rem;
  letter-spacing: 0.2rem;
  @media (max-width: 500px) {
    margin: 0 0.5rem;
  }
`
