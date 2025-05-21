import ApplyChallenge from "./_components/ApplyChallenge";

function page() {
  return (
    <>
      <div className="mx-[16px] mt-[16px] mb-[65px]">
        <div className="font-pretendard flex flex-row items-center justify-between text-[20px] font-semibold">
          챌린지 목록 <ApplyChallenge />
        </div>
      </div>
    </>
  );
}

export default page;
