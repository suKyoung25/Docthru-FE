import Container from "@/components/container/PageContainer";
import Gnb from "@/layout/_components/Gnb";

export default function Home() {
  // 랜딩에선 따로 헤더 넣어주기
  return (
    <>
      <Gnb userRole="guest" />
      <Container>
        <div className="bg-error">랜딩 페이지</div>
      </Container>
    </>
  );
}
