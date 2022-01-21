import React from 'react'
import ContentLoader from 'react-content-loader'

const LoaderNews = (props: any) => {
  return (
    <div>
      <ContentLoader viewBox="0 0 500 475" height={475} width={500} {...props}>
        <circle cx="28" cy="32" r="16" fill="#B5B9D3" />
        <rect x="60" y="24" width="128" height="16" rx="4" fill="#B5B9D3" />
        <rect x="60" y="56" width="376" height="16" rx="4" fill="#B5B9D3" />
        <rect x="60" y="80" width="376" height="16" rx="4" fill="#B5B9D3" />
        <rect x="60" y="104" width="376" height="16" rx="4" fill="#B5B9D3" />

        <circle cx="28" cy="180" r="16" fill="#B5B9D3" />
        <rect x="60" y="172" width="128" height="16" rx="4" fill="#B5B9D3" />
        <rect x="60" y="204" width="376" height="16" rx="4" fill="#B5B9D3" />
        <rect x="60" y="228" width="376" height="16" rx="4" fill="#B5B9D3" />
        <rect x="60" y="254" width="376" height="16" rx="4" fill="#B5B9D3" />
      </ContentLoader>
    </div>
  )
}

export default LoaderNews
