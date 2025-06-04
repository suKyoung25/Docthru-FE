import Container from "@/components/container/PageContainer";
import Gnb from "@/layout/Gnb";

export default function AdminLayout({ children }) {
  return (
    <>
      <Gnb userRole="admin" />
      <Container maxWidth="max-w-[var(--container-challenge)]" className="px-4 md:px-6 2xl:px-0">
        {children}
      </Container>
    </>
  );
}
