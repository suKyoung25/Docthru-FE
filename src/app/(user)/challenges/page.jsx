import Container from "@/components/container/PageContainer";
import CallengeContainerd from "./_components/challengeCard/CallengeContainer";
import SearchInput from "@/components/input/SearchInput";

const page = () => {
  return (
    <>
      <Container>
        챌린지 컨테이너 (type="slim" or "" 가능)
        <CallengeContainerd height={"h-[176px]"} type={""} />
      </Container>
      <Container>
        챌린지 검색창
        <SearchInput text={"text-[14px]"} />
      </Container>
    </>
  );
};

export default page;
