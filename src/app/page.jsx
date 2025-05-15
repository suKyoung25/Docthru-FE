import BtnFilledTonal from "@/components/btn/filled-tonal/BtnFilledTonal";
import Container from "@/components/container/PageContainer";

export default function Home() {
  // 랜딩에선 따로 헤더 넣어주기
  return (
    <Container>
      <div className="bg-gray-100 xl:bg-red-500">랜딩 페이지</div>
      {/* 테스트 후 지울께요! */}
      <BtnFilledTonal>황수정</BtnFilledTonal>
    </Container>
  );
}
