import BlogChip from '@/components/chip/chipCategory/BlogChip'
import DocChip from '@/components/chip/chipCategory/DocChip'
import ApprovePendingChip from '@/components/chip/chipStatus/ApprovePendingChip'
import ChallengeDeleteChip from '@/components/chip/chipStatus/ChallengeDeleteChip'
import SubmitApproveChip from '@/components/chip/chipStatus/SubmitApproveChip'
import SubmitRejectChip from '@/components/chip/chipStatus/SubmitRejectChip'
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
      <br />
      <BlogChip />
      <DocChip />
      <br />
      <ApprovePendingChip />
      <ChallengeDeleteChip />
      <SubmitApproveChip />
      <SubmitRejectChip />
    </div>
  )
}

export default preview