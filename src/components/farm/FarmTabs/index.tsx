import React, { useState } from 'react'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../../hooks'
import Stats from './stats'
import Withdraw from './withdraw'
import Deposit from './deposit'
import { Flex } from 'rebass'
import { Farm } from '../../../constants/farms'
import { NETWORK_LABELS } from '../../Header'

const Wrapper = styled('div')`
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  background: #242637;
  min-height: 342px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 12px;
  padding: 16px 16px 36px;
`

const TabGroup = styled.div`
  display: flex;
  background: ${({ theme }) => theme.secondary4};
  border-radius: 16px;
  width: 402px;
  max-width: 100%;
  height: 48px;
  margin: 0 auto 16px;
`

const Tab = styled.button<{ active: any }>`
  flex: 1;
  font-size: 14px;
  cursor: pointer;
  color: white;
  border: 0;
  outline: 0;
  position: relative;
  background: none;
  border-radius: 0;

  ${({ active }) =>
    active &&
    `
    font-weight: 500;
    
    :before{
      content:"";
      position:absolute;
      width: 95%;
      left:0;
      bottom:0;
      top:0;
      border-radius:16px; 
      padding:2px; 
      background:linear-gradient(110deg, #b1ffbf 7%, #fff16d);
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out; 
      mask-composite: exclude; 
        }
  `}
`

const tabs = ['Deposit', 'Withdraw', 'Stats']

function FarmTab(tab: string, farm: any) {
  switch (tab) {
    case 'Deposit':
      return <Deposit farm={farm} />
    case 'Withdraw':
      return <Withdraw farm={farm} />
    case 'Stats':
      return <Stats farm={farm} />
    default:
      return <div />
  }
}

export default function FarmTabIndex({ farm }: { farm?: Farm }) {
  const [activeTab, setActiveTab] = useState(tabs[0])
  const { chainId } = useActiveWeb3React()

  return chainId === farm?.networkId ? (
    <Wrapper>
      <TabGroup>
        {tabs.map(tab => (
          <Tab key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
            {tab}
          </Tab>
        ))}
      </TabGroup>
      {FarmTab(activeTab, farm)}
    </Wrapper>
  ) : (
    <Flex padding={'15px'}>Please, switch to {farm && NETWORK_LABELS[farm.networkId]} to interact with LP Farm</Flex>
  )
}
