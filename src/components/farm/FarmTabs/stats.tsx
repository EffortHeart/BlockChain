import React, { useMemo } from 'react'
import styled from 'styled-components'
import Countdown from 'react-countdown'
import dayjs from 'dayjs'
import { Farm } from '../../../constants/farms'
import { tryFormatDecimalAmount } from '../../../utils'
import FarmInfoCard from './farmInfoCard'

const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
`

const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Card = styled(FarmInfoCard)`
  display: flex;
  width: 320px;
`

type StatsProps = {
  farm?: Farm
}

export default function Stats({ farm }: StatsProps) {
  const dateEnd = useMemo(() => {
    if (farm?.start && farm?.duration) {
      return Date.now() + dayjs.unix(farm?.start + farm?.duration).diff(dayjs())
    }
    return undefined
  }, [farm])

  return (
    <Container>
      <Wrapper>
        <Card
          title="Total Rewards"
          content="Total Rewards are the total $FUSE to be rewarded for the program duration."
          value={`${farm?.rewardsInfo && tryFormatDecimalAmount(farm?.rewardsInfo[0]?.totalRewards, 18)} - WFUSE`}
          width="310px"
        />
        <Card
          title="Total Deposits"
          content="Total Deposits are the total LP tokens deposited across all participants."
          value={`${tryFormatDecimalAmount(farm?.globalTotalStake, 18)} - FS ${farm?.pairName}`}
          width="310px"
        />
        <Card title="Program Duration" value={<Countdown date={dateEnd} />} width="310px" />
      </Wrapper>
    </Container>
  )
}
