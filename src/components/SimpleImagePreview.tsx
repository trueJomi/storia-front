import React from 'react'

const SimpleImagePreview: React.FC<{ url: string, alt: string, clas: string }> = ({ url, alt, clas }) => {
  return (
    <div className={`rounded-md h-44 w-44 m-2 ${clas} relative group`} >
        <img src={ url} alt={ `${alt}_image` } className='w-full rounded-md' />
    </div>
  )
}

export default SimpleImagePreview
