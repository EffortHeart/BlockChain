import React, { Suspense } from 'react'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import Popups from '../components/Popups'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Web3ReactManager from '../components/Web3ReactManager'
import AddLiquidity from './AddLiquidity'
import './App.css';
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import Pool from './Pool'
import Farms from './Farms'
import Reward from './Farm'
import Lending from './Lending'
import Home from './Home'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import Bridge from './Bridge'
import { RedirectToDefault } from './redirects'
import Menu from '../components/Menu'
import MobileNav from '../components/MobileNav'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  align-items: stretch;
`
const LeftMenu = styled.div`
  height: 60px;
  ${({ theme }) => theme.mediaWidth.upToSmall`display: none;flex: 0 0 0`};
  ${({ theme }) => theme.mediaWidth.upToMedium`display: none;flex: 0 0 22%`};
`

const Sticky = styled.div`
  position: fixed;
  position: -webkit-fixed;
  top: 0;
  width: 260px;
  height: 100vh;
  ${({ theme }) => theme.mediaWidth.upToSmall`display: none;`};
`
const Content = styled.div`
  order: 1;
  width: 100%;
  position: relative;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
`

export default function App() {
  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <MobileNav />
          <LeftMenu>
            <Sticky>
              <Menu />
            </Sticky>
          </LeftMenu>
          <Content>
            <Route component={GoogleAnalyticsReporter} />
            <Popups />
            <Container>
              <Web3ReactManager>
                <Switch>
                  <Route exact strict path="/home" component={Home} />
                  <Route exact strict path="/swap" component={Swap} />
                  <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                  <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                  <Route exact strict path="/find" component={PoolFinder} />
                  <Route exact strict path="/pool" component={Pool} />
                  <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                  <Route exact path="/add" component={AddLiquidity} />
                  <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                  <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                  <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                  <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                  <Route exact strict path="/bridge" component={Bridge} />
                  <Route exact path="/farm/:networkId" component={Farms} />
                  <Route exact path="/farm/:networkId/:address" component={Reward} />
                  <Route exact strict path="/lending" component={Lending} />
                  <Route component={RedirectToDefault} />
                </Switch>
              </Web3ReactManager>
            </Container>
          </Content>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
