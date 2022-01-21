import React from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import Icon from '../FarmList/icons'
import { tryFormatDecimalAmount, tryFormatPercentageAmount } from '../../../utils'
import { Farm } from '../../../constants/farms'
import { Tr, TBodyTd } from '../../Table'
import lightningIcon from '../../../assets/svg/lightning-icon.svg'

const Text = styled.div`
  font-size: 14px;
`

const GreyText = styled.span`
  color: #a7a8af;
`

const NeonText = styled.span`
  color: #1afb2a;
  font-size: 16px;
  font-weight: bold;
  margin: 0 4px;
  vertical-align: top;
`
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;

  :hover {
    text-decoration: none;
  }
`

export default function FarmListItem({ farm }: { farm: Farm }) {
  const history = useHistory()
  const farmPath = `/farm/${farm.networkId}/${farm.contractAddress}`

  const selectFarm = () => {
    history.push(farmPath)
  }

  return (
    <Tr key={farm.contractAddress} onClick={selectFarm}>
      <TBodyTd>
        <StyledLink to={farmPath}>
          <Icon name="" pairName={farm.pairName} />
          {farm.pairName.replace('/', ' - ')}
        </StyledLink>
      </TBodyTd>
      <TBodyTd style={{ textAlign: 'center' }}>
        <NeonText>{farm.rewardsInfo ? tryFormatPercentageAmount(farm.rewardsInfo[0].apyPercent) : 0}%</NeonText>
        <img src={lightningIcon} alt="lightning icon" />
      </TBodyTd>
      <TBodyTd style={{ textAlign: 'right' }}>
        <Text>{tryFormatDecimalAmount(farm.totalStaked, 18, 10)}</Text>
      </TBodyTd>
      <TBodyTd style={{ textAlign: 'right' }}>
        <Text style={{ marginBottom: '2px' }}>
          {tryFormatDecimalAmount(farm.reserve0, 18)} <GreyText>{farm.token0?.symbol}</GreyText>
        </Text>
        <Text>
          {tryFormatDecimalAmount(farm.reserve1, 18)} <GreyText>{farm.token1?.symbol}</GreyText>
        </Text>
      </TBodyTd>
      <TBodyTd style={{ textAlign: 'right' }}>
        <Text style={{ marginBottom: '2px' }}>
          {farm.rewardsUSDPerDay?.toFixed(0)} <GreyText>USD</GreyText>
        </Text>
        <Text>
          {farm.rewardsPerDay?.toFixed(0)} <GreyText>FUSE</GreyText>
        </Text>
      </TBodyTd>
    </Tr>
  )
}
