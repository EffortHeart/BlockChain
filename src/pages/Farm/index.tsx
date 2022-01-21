import React from 'react'
import AppBody from '../AppBody'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import InfoPanel from '../../components/farm/FarmTabs/infoPanel'
import vector from '../../assets/svg/vector.svg'
import rewards from '../../assets/svg/rewardsAcc.svg'
import Icon from '../../components/farm/FarmList/icons'
import apyPurple from '../../assets/svg/questionmark.svg'
import apyLightGreen from '../../assets/svg/questionmark2.svg'
import apyGreen from '../../assets/svg/questionmark3.svg'
import depositIcon from '../../assets/svg/deposits.svg'
import FarmTabs from '../../components/farm/FarmTabs'
import { useFarm } from '../../state/farm/hooks'
import { tryFormatAmount, tryFormatDecimalAmount } from '../../utils'

const Container = styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-left: 24%;
  padding-right: 24%;
  margin-bottom: 50px;
  text-align: left;
  z-index: 3;
  > span {
    font-size: 32px;
    font-weight: 600;
    line-height: 38px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding-left: 1rem;
    padding-right: 1rem;
  `}
`

const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > span {
    font-size: 32px;
    font-weight: 600;
  }
`
const TabsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  > span {
    font-size: 32px;
    font-weight: 600;
  }
`

const Item = styled('div')`
  padding: 4px;
  width: 33%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

export default function Farm(props: RouteComponentProps<{ address: string }>) {
  const {
    match: {
      params: { address }
    }
  } = props

  const farm: any = useFarm(address)

  return (
    <AppBody>
      <Container>
        <Wrapper style={{ paddingBottom: '25px', alignItems: 'center' }}>
          <Icon height={60} name={''} pairName={farm?.pairName} /> <span>{farm?.pairName}</span>
        </Wrapper>
        <Wrapper style={{ paddingBottom: '10px' }}>
          <Item>
            <InfoPanel
              title="Deposit APY"
              data={(farm?.rewardsInfo[0].apyPercent * 100).toFixed(2)}
              icon={vector}
              apyIcon={apyPurple}
              label="%"
              txt="#8E6CC0"
              color="#473660"
              content='APY - Annual Percentage Yield (APY) is the estimated yearly yield for tokens locked. Our calculation is " $ locked * (1 year in second)/(total stake in $ * time remaining in seconds).'
            />
          </Item>
          <Item>
            <InfoPanel
              title="Your Deposits"
              data={tryFormatDecimalAmount(farm?.totalStaked, 18, 2) ?? '0'}
              icon={depositIcon}
              apyIcon={apyLightGreen}
              label={` ${farm?.pairName}`}
              txt="#0684A6"
              color="#034253"
              content="Your Deposits - Your deposits shows the total amount of FUSE you have deposited into the Staking Contract."
            />
          </Item>
          <Item>
            <InfoPanel
              title="Accrued Rewards"
              data={tryFormatAmount(farm?.rewardsInfo[0]?.accuruedRewards, 18) ?? ''}
              apyIcon={apyGreen}
              label=" WFUSE"
              icon={rewards}
              txt="#1C9E7E"
              color="#0E4F3F"
              content="Accrued Rewards - Accrued Rewards refers to the total FUSE you've earned for your stake"
            />
          </Item>
        </Wrapper>
        <TabsWrapper>
          <FarmTabs farm={farm} />
        </TabsWrapper>
      </Container>
    </AppBody>
  )
}
