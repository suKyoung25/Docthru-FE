import ChipCategory from '@/components/chip/chipCategory/ChipCategory'
import ChipStatus from '@/components/chip/chipStatus/ChipStatus'
import ChipType from '@/components/chip/chipType/ChipType'
import React from 'react'

function review() {
  return (
    <div>
      <ChipCategory />
      <ChipStatus />
      <ChipType />
    </div>
  )
}

export default review