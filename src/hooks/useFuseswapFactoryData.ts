import { useState, useEffect } from 'react'
import { getFuseswapFactoryData } from '../graphql/queries'

const useFuseswapFactoryData = () => {
  const [data, setData] = useState({ pairCount: '0', totalLiquidityUSD: '0', totalVolumeUSD: '0' })

  useEffect(() => {
    getFuseswapFactoryData().then(data => setData(data))
  }, [])

  return data
}

export default useFuseswapFactoryData
