import React from 'react'
import ContentLoader from 'react-content-loader'

const FadingLoader = () => {
  return <FadingLoaderCard />
}

const FadingLoaderCard = () => {
  return (
    <ContentLoader width={'245%'} height={65} backgroundColor="#ababab" foregroundColor="#fafafa">
      <rect x="975" y="15" rx="5" ry="5" width="160" height="15" />
      <rect x="975" y="39" rx="5" ry="5" width="160" height="15" />
      <rect x="800" y="15" rx="5" ry="5" width="160" height="15" />
      <rect x="800" y="39" rx="5" ry="5" width="160" height="15" />
      <rect x="480" y="20" rx="5" ry="5" width="80" height="25" />
      <rect x="680" y="20" rx="5" ry="5" width="80" height="25" />
      <rect x="140" y="25" rx="5" ry="5" width="260" height="15" />
      <rect x="40" y="10" rx="100" ry="100" width="40" height="40" />
      <rect x="20" y="10" rx="100" ry="100" width="40" height="40" />
    </ContentLoader>
  )
}

export default FadingLoader
