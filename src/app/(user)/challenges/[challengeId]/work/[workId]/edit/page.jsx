import Container from "@/components/container/PageContainer";
import React from "react";
import EditorHeader from "../../_components/EditorHeader";
import EditorSection from "../../_components/EditorSection";

export default function page() {
  return (
    <Container maxWidth="max-w-4xl">
      <EditorHeader isUpdate={true} />
      <EditorSection challengeTitle="챌린지 제목" />
    </Container>
  );
}
