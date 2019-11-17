import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
  children: any
}

export const AnimatedList = ({ children }: Props) => {
  const [child, setChild] = useState(children)
  const [animate, setAnimate] = useState(false)
  const [startAnimate, setStartAnimate] = useState(0)

  useEffect(() => {
    setAnimate(true)
  }, [children])

  useEffect(() => {
    if (animate) {
      setTimeout(() => {
        setChild(children)
        setStartAnimate(startAnimate + 1)
      }, 300)
    }
  }, [animate])

  useEffect(() => {
    setAnimate(false)
  }, [startAnimate])

  return <Animate animate={animate}>{child}</Animate>
}

interface Animate {
  animate: boolean
}

const Animate = styled.div`
  transition: all 300ms ease-in-out;
  opacity: ${({ animate }: Animate) => (animate ? 0 : 1)};
`
