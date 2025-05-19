import CategoryOpened from '@/components/dropdown/CategoryOpened'
import CategoryClosed from '@/components/dropdown/CategoryClosed'
import React from 'react'
import CategoryItems from '@/components/dropdown/CategoryItems'

function page() {
  return (
    <div>
      <CategoryClosed />
      <CategoryOpened />
      <CategoryItems />
    </div>
  )
}

export default page