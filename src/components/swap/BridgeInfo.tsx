import React, { useState } from 'react'
import { Link as RebassLink } from 'rebass'

import { AutoColumn } from '../Column'
import { RowCenter } from '../Row'
import { TYPE } from '../../theme'
import fuseLogo from '../../assets/svg/bridge-icon2.svg'
import infoIcon from '../../assets/svg/info.svg'
import styled from 'styled-components'
import ConnectFuseModal from '../ConnectFuseModal'
import useAddChain from '../../hooks/useAddChain'
import { FUSE_CHAIN } from '../../constants/chains'

const Link = styled(RebassLink)`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const FuseLogo = styled.img.attrs({
  src: fuseLogo
})`
  width: 120px;
  margin-top: 1rem;
  margin-bottom: 2rem;
`

const InfoIcon = styled.img.attrs({
  src: infoIcon
})`
  min-width: 18px;
  margin-right: 5px;
`

function BridgeInfo() {
  const [modalOpen, setModalOpen] = useState(false)
  const { error, addChain, isAddChainEnabled } = useAddChain()

  return (
    <>
      <ConnectFuseModal isOpen={modalOpen} setIsOpen={setModalOpen} />

      <AutoColumn style={{ padding: '0 20px 20px' }}>
        <RowCenter>
          <FuseLogo />
        </RowCenter>
        <RowCenter style={{ alignItems: 'flex-start' }}>
          <TYPE.body fontSize={18} fontWeight={500} textAlign="center" style={{ marginTop: '-3px' }}>
            <InfoIcon />
            To start using FuseFi please use the bridge to deposit your tokens Or{' '}
            {isAddChainEnabled ? (
              <Link id="fuse-connect-open" onClick={() => addChain(FUSE_CHAIN)}>
                Switch to Fuse Network
              </Link>
            ) : (
              <Link id="fuse-connect-open" onClick={() => setModalOpen(true)}>
                Switch to Fuse Network. Click to learn how
              </Link>
            )}
          </TYPE.body>
        </RowCenter>
        {error && (
          <RowCenter>
            <TYPE.error error={true} marginTop={16}>
              {error}
            </TYPE.error>
          </RowCenter>
        )}
      </AutoColumn>
    </>
  )
}

export default BridgeInfo
