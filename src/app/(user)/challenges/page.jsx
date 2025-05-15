import Container from "@/components/container/PageContainer";
import CallengeContainerd from "./_components/challengeCard/CallengeContainer";

const page = () => {
  return (
    <>
      {" "}
      <Container>
        챌린지 컨테이너 (type="slim"/"" 가능)
        <CallengeContainerd
          width={"w-[343px]"}
          height={"h-[104px]"}
          type={"slim"}
        />
      </Container>
      ;
    </>
  );
};

export default page;
