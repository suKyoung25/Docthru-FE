"use client";

import BtnText, { BtnRoundedWithIcon } from "@/components/btn/text/BtnText";
import Container from "@/components/container/PageContainer";
import Sort from "@/components/sort/Sort";
import RankingListItem from "@/components/list/RankingListItem";
import Reply from "@/components/reply/Reply";

const themesTitle = "mb-1 font-[600]";
const page = () => {
  return (
    <Container>
      <div>
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">BtnText</h2>
          <span>
            거의 모든 버튼이 BtnText.jsx에 포함되어 있으며 BtnText /
            BtnRoundedWithIcon 로 나뉘어져 있음, rounded-full 버튼 속성으로 인해
            분리함
          </span>
          <div>
            <div className={`${themesTitle}`}>theme = "tonal"</div>
            <BtnText theme="tonal">신청 거절</BtnText>
          </div>
          <div>
            <div className={`${themesTitle}`}>
              theme = "tonal" <br />
              icon = &#123;true&#125; 아이콘 노출
            </div>
            <BtnText theme="tonal" icon="true">
              포기
            </BtnText>
          </div>
          <div>
            <div className={`${themesTitle}`}>theme = "outline"</div>
            <BtnText theme="outline">임시저장</BtnText>
          </div>
          <div>
            <div className={`${themesTitle}`}>theme = "link"</div>
            <BtnText theme="link">링크 열기</BtnText>
          </div>
          <div>
            <div className={`${themesTitle}`}>theme = "solidblack"</div>
            <BtnText theme="solidblack">승인하기</BtnText>
          </div>
          <div>
            <div className={`${themesTitle}`}>theme = "solidwhite"</div>
            <BtnText theme="solidwhite">승인하기</BtnText>
          </div>
        </div>
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">BtnRoundedWithIcon</h2>
          <div>
            <div>
              <div className={`${themesTitle}`}>iconType = "goToMyWork"</div>
              <BtnRoundedWithIcon iconType="goToMyWork">
                내 작업물 보기
              </BtnRoundedWithIcon>
            </div>
            <div>
              <div className={`${themesTitle}`}>
                {" "}
                iconType = "continueChallenge" (default 설정)
              </div>
              <BtnRoundedWithIcon>도전 계속하기</BtnRoundedWithIcon>
            </div>
          </div>
        </div>
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">Sort</h2>
          <div className={themesTitle}>
            isAdminStatus: true - 승인대기 / false - 필터
            <br />
            isFiltered: true - 검은배경, 필터링 갯수(count)
            <br />
            onClick: params로 넘겨주시면 됩니다
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <Sort isAdminStatus={true} />
            </div>
            <div>
              <Sort />
            </div>
            <div>
              <Sort isFiltered={true} count={3} />
            </div>
          </div>
        </div>

        {/* RankingListItem 컴포넌트 설명 */}
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">RankingListItem</h2>
          <div className={themesTitle}>
            좋아요 수 기준으로 유저를 정렬한 랭킹 리스트 항목 UI
            <br />
            - 하트 아이콘 클릭 시 애니메이션 효과
            <br />
            - 1등인 경우 왕관 아이콘 표시
            <br />- 좋아요 수가 10000 이상인 경우 "9999+" 로 표시
          </div>
          <div className="flex flex-col gap-2">
            <RankingListItem
              item={{
                rank: 1,
                userName: "홍길동",
                userRole: "프로그래머",
                likes: 10000,
                isLiked: false,
                workId: 1,
              }}
              toggleLike={() => {}}
            />
            <RankingListItem
              item={{
                rank: 2,
                userName: "김코딩",
                userRole: "디자이너",
                likes: 8500,
                isLiked: true,
                workId: 2,
              }}
              toggleLike={() => {}}
            />
          </div>
        </div>

        {/* Reply 컴포넌트 설명 */}
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">Reply</h2>
          <div className={themesTitle}>
            댓글 컴포넌트
            <br />
            - 수정/삭제 버튼 클릭 시 모달 오픈 (기능은 콜백함수로 구현)
            <br />
            - 프로필 이미지, 작성자 이름, 작성 시간 표시
            <br />
            - 수정 모드에서 TextBox 컴포넌트 사용
            <br />- Enter로 제출, Shift + Enter로 줄바꿈
          </div>
          <div className="flex flex-col gap-2">
            <Reply
              userName="홍길동"
              timestamp="방금 전"
              content="이것은 예시 댓글입니다."
              onEdit={() => {}}
              onDelete={() => {}}
            />
            <Reply
              userName="김코딩"
              timestamp="1시간 전"
              content="여러 줄 작성이 가능한\n댓글 예시입니다."
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;
