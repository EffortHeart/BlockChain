import { useState, useEffect } from 'react'
import axios from 'axios'
import { FUSESWAP_SERVICE_URL } from '../constants'

const useTokenPrice = (tokenAddress?: string) => {
  const [price, setPrice] = useState('0')

  useEffect(() => {
    if (tokenAddress) {
      axios.get(`${FUSESWAP_SERVICE_URL}/api/v1/price/${tokenAddress}`).then(res => setPrice(res.data.data.price))
    }
  }, [tokenAddress])

  return price
}

export default useTokenPrice
