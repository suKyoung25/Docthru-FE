import CategoryOpened from '@/components/dropdown/CategoryOpened'
import CategoryClosed from '@/components/dropdown/CategoryClosed'
import React from 'react'
import CategoryItems from '@/components/dropdown/CategoryItems'
import BlogChip from '@/components/chip/chipCategory/BlogChip'
import OfficialDocChip from '@/components/chip/chipCategory/OfficialDocChip'
import ApprovePendingChip from '@/components/chip/chipStatus/ApprovePendingChip'
import ChallengeDeleteChip from '@/components/chip/chipStatus/ChallengeDeleteChip'
import ApiChip from '@/components/chip/chipType/ApiChip'
import CareerChip from '@/components/chip/chipType/CareerChip'
import ModernjsChip from '@/components/chip/chipType/ModernjsChip'

function page() {
  return (
    <div>
      {/* <CategoryClosed />
      <CategoryOpened />
      <CategoryItems /> */}
      <BlogChip />
      <OfficialDocChip />
      <ApprovePendingChip />
      <ChallengeDeleteChip />
      <ApiChip />
      <CareerChip />
      <ModernjsChip />
    </div>
  )
}

export default page