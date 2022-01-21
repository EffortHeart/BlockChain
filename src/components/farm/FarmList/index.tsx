import React from 'react'
import styled from 'styled-components'
import Loader from '../../Loaders/table'
import FarmListItem from '../FarmListItem'
import { TableWrapper, Table, Th, TBodyTr } from '../../Table'
import { useFarms } from '../../../state/farm/hooks'

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 12px;
`

export default function FarmList({ networkId }: { networkId: number }) {
  const [farms, isLoading] = useFarms()

  return (
    <Wrap>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Farm</Th>
              <Th style={{ textAlign: 'center' }}>APY</Th>
              <Th style={{ textAlign: 'right' }}>Total Staked</Th>
              <Th style={{ textAlign: 'right' }}>TVL</Th>
              <Th style={{ textAlign: 'right' }}>Rewards (Day)</Th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <Loader />
            ) : farms?.length ? (
              farms
                .filter((farm: any) => farm.networkId === networkId && !farm.isExpired)
                .map((farm: any) => <FarmListItem key={farm.conTBodyTractAddress} farm={farm} />)
            ) : (
              <TBodyTr>
                <td></td>
              </TBodyTr>
            )}
          </tbody>
        </Table>
      </TableWrapper>
    </Wrap>
  )
}
