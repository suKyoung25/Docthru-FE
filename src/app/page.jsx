import Container, {RootLandingPageContainer} from "@/components/container/PageContainer";
import Gnb from "@/layout/_components/Gnb";


export default function Home() {
  // 랜딩에선 따로 헤더 넣어주기
  return (
    <Container maxWidth="w-full" padding="p-0 sm:p-0 lg:p-0" className="flex flex-col">
      <Gnb userRole="guest" />
      <div>랜딩페이지</div>
      {/* <Container maxWidth="w-full" className="bg-brand-black flex flex-col items-center" >
        <div className="w-[300px] flex flex-col items-center">
          <Image src={titleDoct} alt="docthru" />
          <div className="mt-3 text-white font-semibold text-xl text-center">
            함께 번역하며 성장하는<br />
            개발자의 새로운 영어 습관
          </div>
        </div>
      </Container>
      <Container maxWidth="w-full" className="bg-brand-black" >
          
      </Container> */}
    </Container>
  );
}
