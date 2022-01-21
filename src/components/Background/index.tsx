import React from 'react'
import styled from 'styled-components'
import fuse from '../../assets/images/animation.png'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg6};
  overflow: hidden;
  li {
    position: absolute;
    display: block;
    list-style: none;
    width: 60px;
    height: 60px;
    animation: animate 35s linear infinite;
  }

  li:nth-child(1) {
    left: -5%;
    bottom: 18%;
    width: 400px;
    height: 400px;
    animation-delay: 0s;
  }

  li:nth-child(2) {
    right: -30%;
    width: 600px;
    height: 600px;
    animation-delay: 2s;
  }

  li:nth-child(3) {
    left: 50%;
    top: -3%;
    width: 150px;
    height: 150px;
    animation-delay: 4s;
  }

  @keyframes animate {
    0% {
      transform: rotate(0deg);
      opacity: 0.75;
      border-radius: 0;
    }

    25% {
      transform: rotate(30deg);
      opacity: 1;
      border-radius: 0;
    }

    50% {
      transform: rotate(0deg);
      opacity: 0.75;
      border-radius: 0;
    }

    100% {
      transform: rotate(-30deg);
      opacity: 1;
      border-radius: 50%;
    }
  }
`

export default function Background() {
  return (
    <>
      <Container>
        <li>
          <img src={fuse} alt="" width="100%" />
        </li>
        <li>
          <img src={fuse} alt="" width="100%" />
        </li>
        <li>
          <img src={fuse} alt="" width="100%" />
        </li>
      </Container>
    </>
  )
}
