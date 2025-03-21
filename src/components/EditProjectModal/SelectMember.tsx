import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMembers } from "../../api/search";
import { debounce } from "lodash";
import { useAuthStore } from "../../store/authStore";
import AlertModal from "../common/AlertModal";
import SimpleAlertModal from "../modals/SimpleAlertModal";
import defaultImg from "../../assets/defaultImg.svg";

type SelectMembersProps<T extends "업무" | "프로젝트"> = {
  selectedData?: T extends "프로젝트" ? ProjectDataType : UpdateTask;
  selectedMembers?: MemberType[];
  setSelectedMembers?: React.Dispatch<React.SetStateAction<MemberType[]>>;
  value: T;
  type?: string;
  memberData?: members[];
};

const SelectMember = <T extends "업무" | "프로젝트">({
  selectedData,
  selectedMembers,
  setSelectedMembers,
  value,
  type,
  memberData,
}: SelectMembersProps<T>) => {
  const loginUser = useAuthStore((state) => state.member);
  const [isModal, setIsModal] = useState<boolean>(false);

  useEffect(() => {
    console.log(selectedData);
  }, [selectedData]);

  // 인풋값 상태 관리
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log("selectedMembers", selectedMembers);
  }, [selectedMembers]);

  // 검색 함수
  const {
    data: searchMember,
    refetch,
    isLoading: searchLoading,
  } = useQuery<SearchMemberType[]>({
    queryKey: ["searchMember", inputValue],
    queryFn: () => searchMembers(inputValue),
    enabled: false,
  });

  useEffect(() => {
    console.log(searchMember);
  }, [searchMember]);

  /* 디바운스된 핸들러 */
  const debouncedSearch = useCallback(
    debounce(() => {
      if (inputValue.trim()) {
        refetch();
      }
    }, 500),
    [inputValue]
  );

  useEffect(() => {
    debouncedSearch();

    return () => debouncedSearch.cancel();
  }, [inputValue]);

  // 모달 적용
  const [modalText, setModalText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (text: string) => {
    setModalText(text);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  /* 검색 결과 클릭 시, 선택된 팀원 업데이트 */
  const handleMemberClick = (member: MemberType) => {
    if (type === "project") {
      if (loginUser?.id === member.memberId) {
        return openModal("프로젝트 생성자는 자동으로 참여인원에 포함됩니다");
      }
    }

    // 이미 선택된 팀원이 있는지 확인
    const isSelected = selectedMembers?.some(
      (selected) => selected.memberId === member.memberId
    );

    if (!isSelected && setSelectedMembers) {
      // 업무박스에선 한 명만 선택되도록 함
      if (value === "업무") {
        // 선택인원이 프로젝트 참여인원이 아닐 때 모달 오픈
        if (!memberData?.some((m) => m.memberId === member.memberId)) {
          setIsModal(true);
        } else setSelectedMembers([member]);
      } else {
        setSelectedMembers((prevSelected: MemberType[]) =>
          [...prevSelected, member].sort((a, b) =>
            a.username.localeCompare(b.username)
          )
        );
      }
    }
  };

  /* 취소 버튼 클릭 시 선택된 팀원에서 제거 */
  const handleCancelClick = (id: number) => {
    if (
      type === "project" &&
      selectedData &&
      "creatorId" in selectedData &&
      selectedData.creatorId === id
    ) {
      return openModal("프로젝트 생성자는 참여인원에서 제거할 수 없습니다");
    }

    if (setSelectedMembers)
      setSelectedMembers((prevSelected: MemberType[]) =>
        prevSelected
          .filter((member) => member.memberId !== id)
          .sort((a, b) => a.username.localeCompare(b.username))
      );
  };

  return (
    <div className="flex flex-col w-full gap-[5px]">
      {/* 팀원 검색 */}
      <p className="w-full font-bold">{value === "업무" ? "담당자" : "팀원"}</p>

      <input
        className="w-full py-[5px]
          border-[1px] border-gray01 rounded-[5px] text-center
          font-bold text-[14px] text-logo-green placeholder-gray01"
        placeholder={value === "업무" ? "담당자 검색" : "팀원 검색"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {/* 검색 결과 목록 */}
      {inputValue && (
        <div
          className="flex flex-col gap-[5px] w-full text-logo-green text-[14px]
          font-bold"
        >
          {/* (검색결과) 필터된 팀원 */}
          {searchLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-[40px] h-[40px] border-[4px] border-t-transparent border-main-green01 rounded-full animate-spin"></div>
            </div>
          ) : (
            searchMember?.map((member) => (
              <div
                key={member.id}
                className="flex justify-between items-center cursor-pointer
              font-medium"
                onClick={() => {
                  setInputValue("");
                  handleMemberClick({
                    username: member.username,
                    memberId: member.id,
                    profile: member.profile,
                    email: member.email,
                  });
                }}
              >
                {/* 이름 & 이메일 */}
                <div className="w-full px-[10px] py-[5px]">
                  <div className="text-main-green">@{member.username}</div>
                  <div className="text-gray01">{member.email}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* (선택결과) 선택된 팀원 이미지 */}
      <div className="flex">
        {selectedMembers?.map((member) => (
          <div
            key={member.memberId}
            className="w-[50px] h-[50px] relative cursor-pointer"
            onClick={() => handleCancelClick(member.memberId)}
          >
            <img
              src={member.profile ?? defaultImg}
              alt="프로필 이미지"
              className="w-full h-full rounded-[100px] 
              border-[1px] border-main-green "
            />
            <div
              className="flex justify-center items-center absolute inset-0
                  w-full h-full rounded-[100px] bg-main-green/70
                text-white text-[14px] text-center font-medium
                  opacity-0 hover:opacity-100 transition-opacity duration-300"
            >
              {member.username}
            </div>
          </div>
        ))}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <AlertModal text={modalText} onClose={closeModal} />
          </div>
        )}
      </div>

      {/* 참여인원 확인 모달 */}
      {isModal && (
        <div
          className="absolute inset-0 w-screen h-fit min-h-screen
            flex justify-center items-center bg-black/70 z-50"
          onClick={() => setIsModal(false)}
        >
          <SimpleAlertModal
            text="프로젝트 참여인원이 아닙니다."
            setIsModal={setIsModal}
          />
        </div>
      )}
    </div>
  );
};

export default SelectMember;
