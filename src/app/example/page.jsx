"use client";
import BtnPage from "@/components/btn/pagination/BtnPage";
import BtnText, { BtnRoundedWithIcon } from "@/components/btn/text/BtnText";
import Container from "@/components/container/PageContainer";
import DeclineModal from "@/components/modal/DeclineModal";
import DeleteModal from "@/components/modal/DeleteModal";
import FilterModal from "@/components/modal/FilterModal";
import NotificationModal from "@/components/modal/NotificationModal";
import SignupModal from "@/components/modal/SignupModal";
import TemporaryStorage from "@/components/modal/TemporaryStorage";
import Sort from "@/components/sort/Sort";
import { useState } from "react";
import IconBtnRight, { IconBtnDown } from "@/components/btn/icon/BtnArrow";
import IconPasswordVisible from "@/components/btn/icon/BtnIcon";
import BtnCheckbox from "@/components/btn/form/BtnCheckbox";
import BtnRadio from "@/components/btn/form/BtnRadio";

const MODAL_COMPONENTS = {
  decline: DeclineModal,
  delete: DeleteModal,
  filter: FilterModal,
  notification: NotificationModal,
  signup: SignupModal,
  temp: TemporaryStorage,
};

const themesTitle = "mb-1 font-[600]";
const page = () => {
  const [openModal, setOpenModal] = useState(null);
  const [selected, setSelected] = useState("option1");

  const handleOpen = (modalName) => setOpenModal(modalName);
  const handleClose = () => setOpenModal(null);

  const ModalComponent = openModal ? MODAL_COMPONENTS[openModal] : null;
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
          <h2 className="text-3xl font-bold">BtnPage</h2>
          <div>
            <div>
              <div className={`${themesTitle}`}>
              </div>
              <BtnPage>1</BtnPage>
              <BtnPage theme="white">1</BtnPage>
            </div>
          </div>
        </div>
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">BtnArrow</h2>
          <div>
            <div>
              <div className={`${themesTitle}`}>
              </div>
              <IconBtnRight />
              <IconBtnDown />
              <IconBtnDown inactive={true} />
            </div>
          </div>
        </div>
        <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">BtnIcon</h2>
          <div>
            <div>
              <div className={`${themesTitle}`}>
              </div>
              <IconPasswordVisible />
              <IconPasswordVisible on={true}/>
            </div>
          </div>
        </div>
         <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">BtnCheckbox</h2>
          <div>
            <div>
              <div className={`${themesTitle}`}>
              </div>
              <BtnCheckbox isChecked={true}>테스트</BtnCheckbox>
            </div>
          </div>
        </div>
         <div className="m-10 flex flex-col gap-4 bg-white p-4">
          <h2 className="text-3xl font-bold">BtnRadio</h2>
          <div>
            <div>
              <div className={`${themesTitle}`}>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4">옵션 선택</h2>

                <BtnRadio
                  value="option1"
                  checked={selected === "option1"}
                  onChange={setSelected}
                >
                  옵션 1
                </BtnRadio>

                <BtnRadio
                  value="option2"
                  checked={selected === "option2"}
                  onChange={setSelected}
                >
                  옵션 2
                </BtnRadio>
              </div>
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
      </div>
      <div className="m-10 flex flex-col gap-4 bg-white p-4">
        <h2 className="text-3xl font-bold">Modal</h2>
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200"
            onClick={() => handleOpen("signup")}
          >
            회원가입
          </button>
          <button
            className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200"
            onClick={() => handleOpen("decline")}
          >
            거절 사유
          </button>
          <button
            className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200"
            onClick={() => handleOpen("delete")}
          >
            삭제
          </button>
          <button
            className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200"
            onClick={() => handleOpen("notification")}
          >
            알림
          </button>
          <button
            className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200"
            onClick={() => handleOpen("filter")}
          >
            필터
          </button>
          <button
            className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200"
            onClick={() => handleOpen("temp")}
          >
            임시저장
          </button>
        </div>
      </div>
      {ModalComponent && <ModalComponent onClose={handleClose} />}
    </Container>
  );
};

export default page;
