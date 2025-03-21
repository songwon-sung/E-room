import Button from "../components/common/Button";
import "../styles/AuthLayout.css";
// import KakaoLogo from "../assets/kakao_logo.svg";
import GoogleLogo from "../assets/google_logo.svg";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router";
// import useKakaoLogin from "../hooks/useKakaoLogin";
import useGoogleLogin from "../hooks/useGoogleLogin";

const SignIn = () => {
  // const login = useAuthStore((state) => state.login);
  // const { handleKakaoLogin, loading } = useKakaoLogin();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { handleGoogleLogin, isLoginLoading } = useGoogleLogin();

  if (isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  if (isLoginLoading) {
    return (
      <div
        className="w-[554px] min-h-[250px] px-[100px] py-[50px] 
        flex items-center justify-center rounded-[10px]"
      >
        <div className="w-[60px] h-[60px] border-[6px] border-t-transparent border-main-green01 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className="w-[554px] h-[200px] px-[100px] py-[0px] 
    flex flex-col justify-between gap-[30px] rounded-[10px]"
    >
      {/* LOGIN */}
      <div className="flex flex-col gap-[20px] text-center">
        <p className="text-[40px] font-bold">LOGIN</p>
        <p className="text-logo-green-light font-bold text-[18px]">
          E:room에 오신 것을 환영합니다!
        </p>
      </div>

      {/* 버튼 모음 */}
      {/* 버튼 글릭 시 회원가입 여부를 확인하는 로직 추가 필요 */}
      <div className="flex flex-col gap-[50px]">
        {/* (임시) 회원가입 된 상태 */}
        {/* <Button
          text="카카오 로그인"
          size="lg"
          css="bg-kakao border-gray01 text-black gap-[10px]"
          logo={KakaoLogo}
          // onClick={handleKakaoLogin} 카카오로그인
          //임시 세션값 통한 로그인
          onClick={async () => {
            try {
              // login({ username: "member1", userId: 1 });
            } catch (error) {
              console.error(error);
            }
          }}
        /> */}
        {/* (임시) 회원가입 되지 않은 상태 */}
        <Button
          text="구글 로그인"
          size="lg"
          css="bg-white border-gray01 text-black text-[18px] gap-[10px] h-[50px]"
          logo={GoogleLogo}
          onClick={() => handleGoogleLogin()}
        />
      </div>
    </div>
  );
};

export default SignIn;
