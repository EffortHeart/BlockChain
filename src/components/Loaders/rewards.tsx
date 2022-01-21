import React from 'react'
import ContentLoader from 'react-content-loader'

const ResponsiveArticle = (props: any) => {
  return (
    <div>
      <ContentLoader
        speed={2}
        width={50}
        height={20}
        viewBox="0 0 88 20"
        backgroundColor="#f3f3f3"
        foregroundColor="#232638"
        {...props}
      >
        <rect x="0" y="8" rx="3" ry="3" width="75" height="6" />
      </ContentLoader>
    </div>
  )
}

export default ResponsiveArticle
