import Container from "@/components/container/PageContainer";
import Logo from "@/layout/_components/Logo";
import React from "react";

export default function page() {
  return (
    <Container maxWidth="max-w-4xl" className="bg-brand-yellow">
      <header className="flex items-center justify-between">
        <Logo />
      </header>
    </Container>
  );
}
