import ApiChip from '@/components/chip/chipType/ApiChip'
import CareerChip from '@/components/chip/chipType/CareerChip'
import ModernjsChip from '@/components/chip/chipType/ModernjsChip'
import NextjsChip from '@/components/chip/chipType/NextjsChip'
import WebChip from '@/components/chip/chipType/WebChip'
import React from 'react'

function preview() {
  return (
    <div>
      <NextjsChip />
      <ApiChip />
      <CareerChip />
      <ModernjsChip />
      <WebChip />
    </div>
  )
}

export default preview