interface EditProjectModalProps {
  projectId?: number;
  selectedProject?: ProjectListType;
  setIsEditProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setIsAlertModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface selectedProjectData {
  projectName: string;
  projectStatus: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  cate: string;
  subcate1: string[];
  subcate2: string[];
}

interface AllProjectOutModalProps {
  setIsAllProjectOutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProjectListBoxProps {
  projectId: number;
  filterProject: string;
  projectInfo: ProjectListType;
  idx: number;
}

interface ProjectDataType {
  name?: string;
  startDate?: string;
  endDate?: string;
  creatorId?: number;
}

interface SelectProjectProps {
  data: ProjectDataType[];
}

interface WriteProjectNameType {
  value: string;
  name?: string;
  newProjectNameValue?: string;
  setNewProjectNameValue?: React.Dispatch<React.SetStateAction<string>>;
  pageError?: boolean;
  setPageError?: React.Dispatch<React.SetStateAction<boolean>>;
}

//getProjectList API 반환값 타입 지정 (멤버이름, 프로필 객체로 수정될 예정)
interface ProjectType {
  id: number;
  name: string;
  createdAt: string;
  categoryName: string;
  subCategories: SubCategoryType[];
  startDate: string;
  endDate: string;
  status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED";
  members: ProjectMemberType[];
  chatRoomId: number;
  progressRate: number;
  colors: Colors;
}

interface ProjectMemberType {
  memberId: number;
  username: string;
  profile: string | null;
}

//postProject API 타입 지정
interface postProjectType {
  name: string;
  description?: string;
  categoryId: number;
  subCategories: {
    subCategoryId: number;
    tagIds: nubmer[];
  }[];
  startDate: string;
  endDate: string;
  invitedMemberIds: number[];
  colors: { background: string; text: string };
}

// getProjectById API 타입 지정
interface ProjectDetailType {
  projectId: number;
  projectName: string;
  categoryName: string;
  subCategories: subCategories[];
  status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED"; // 프로젝트 상태 Enum
  tasks: Task[];
  members: members[];
}

//patchProjectById  입력값 타입 지정
interface patchProjectRequestType {
  name: string;
  categoryId: number;
  subCategories: { subCategoryId: number; tagIds: number[] }[];
  startDate: string;
  endDate: string;
  status: string;
  memberIds: number[];
}

//patchProjectById 반환값 타입 지정
interface patchProjectResponseType {
  id: number;
  name: string;
  createdAt: string;
  category: string;
  subCategories1: string[];
  subCategories2: string[];
  startDate: string;
  endDate: string;
  status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED" | "HOLD";
  memberNames: string[];
  memberProfiles: (string | null)[];
  chatRoomId: number;
  progressRate: number;
}

//프로젝트 검색 api 반환값 타입 지정
interface ProjectSearchResult {
  projectId: number;
  projectName: string;
  creatorName: string;
  creatorEmail: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  projectStatus: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED" | "HOLD";
  deleteStatus: "ACTIVE" | "DELETED";
}

interface GetProjectById {
  id: number;
  name: string;
  categoryName: string;
  subCategories: {
    id: number;
    name: string;
    tags: { id: number; name: string }[];
  }[];
  startDate: string;
  endDate: string;
  status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED";
  members: { memberId: number; username: string; profile: string }[];
}
