import Container from "@/components/container/PageContainer";
import Notification from "@/components/modal/Notification";

const page = () => {
  return (
    <Container>
      회원가입 페이지
      <button>알림</button>
      <Notification />
    </Container>
  );
};

export default page;
