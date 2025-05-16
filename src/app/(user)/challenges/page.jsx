import Container from "@/components/container/PageContainer";
import CallengeContainerd from "./_components/challengeCard/CallengeContainer";

const page = () => {
  return (
    <>
      <Container>
        챌린지 컨테이너 (type="slim" or "" 가능)
        <CallengeContainerd
          width={"w-[285px]"}
          height={"h-[176px]"}
          type={""}
        />
      </Container>
    </>
  );
};

export default page;
