import React from 'react'
import styled from 'styled-components'
import AppBody from '../AppBody'
import Filter from '../../components/farm/FarmList/filter'
import FarmList from '../../components/farm/FarmList'
import { useParams } from 'react-router-dom'
import { ReactComponent as Arrow } from '../../assets/svg/arrow.svg'
import { ReactComponent as LinkIcon } from '../../assets/svg/link.svg'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  margin-bottom: 45px;
  text-align: left;
  min-height: 80vh;
  justify-content: flex-start;
`

const Header = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin: 0px;
  color: #77719f;
`

const SubHeader = styled.div`
  font-size: 16px;
  margin-top: 0;
  color: #77719f;
  line-height: 28px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-wrap: wrap;
  margin-top: 50px;

`

const Link = styled.a`
  padding-left: 3px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #3AD889;
  text-decoration: none;
  :hover{
    text-decoration: underline;
  }
`
const Text = styled.a`
  display: block;
  font-weight: 500;
  font-family: 'Inter';
  font-size: 13px;
  line-height: 14px;
  text-align: right;
  color: #f3fc1f;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`

export default function Farms() {
  const { networkId }: { networkId: string } = useParams()

  return (
    <AppBody>
      <Container>
        <Wrapper>
          <div>
            <Header>Farm</Header>
            <SubHeader>Let&apos;s farm FUSE and VOLT with your LP tokens!</SubHeader>
            <SubHeader>
              <Arrow />
              <Link href="https://tutorials.fuse.io/tutorials/fusefi-tutorials/what-are-lp-tokensgit">
                <span style={{ color: 'darkgreen' }}>What are LP Tokens?</span>
              </Link>
            </SubHeader>
          </div>
          <Filter networkId={Number(networkId)} />
        </Wrapper>
        <FarmList networkId={Number(networkId)} />
        <Text href="https://oldrewards.fuse.io/">
          Old farming page <LinkIcon />
        </Text>
      </Container>
    </AppBody>
  )
}
