import React, { useContext, useState } from 'react'
import { AlertCircle } from 'react-feather'
import styled, { ThemeContext } from 'styled-components'
import TokenMigrationModal from '../../components/TokenMigration'
import { Currency } from '@fuseio/fuse-swap-sdk'
import { ButtonDark } from '../../components/Button'

const RowFlex = styled('div')`
  display: flex;
`
const RowEnd = styled('div')`
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
`

const Icon = styled('div')`
  line-height: 21px;
  width: 24px;
`
const Title = styled('div')`
  font-weight: 500;
  line-height: 21px;
  font-size: 16px;
  width: 100%;
  color: ${({ theme }) => theme.secondary4};
  padding-left: 5px;
`

export default function DeprecatedPopup({ token, currency }: { token: string; currency?: Currency }) {
  const theme = useContext(ThemeContext)
  const [migrateModalOpen, setMigrateModalOpen] = useState(false)
  return (
    <div>
      <RowFlex>
        <Icon>
          <AlertCircle color={theme.red1} size={24} />
        </Icon>
        <Title>Your {token.replace(/\(Deprecated\)/, '')} is deprecated!</Title>
      </RowFlex>
      <RowEnd>
        <ButtonDark
          dark={true}
          width={'auto'}
          padding={'12px'}
          onClick={() => {
            setMigrateModalOpen(true)
          }}
        >
          Migrate {token}
        </ButtonDark>
      </RowEnd>
      <TokenMigrationModal
        token={currency}
        isOpen={migrateModalOpen}
        onDismiss={() => setMigrateModalOpen(false)}
        listType="Swap"
      />
    </div>
  )
}
