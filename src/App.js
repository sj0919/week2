import "./App.css";
import { Route, Routes, Router } from "react-router";
//로그인
import Login from "./pages/login/kakaoLoginPage";
//redirect page
import OAuthRedirectPage from "./pages/login/Redirect";
//프로필 정보 입력
import CreateProfilePage from "./pages/login/CreateProfilePage";
//홈화면
import HomePage from "./pages/home/HomePage";
//팀 생성 페이지
import CreateRoomPage from "./pages/home/CreateRoomPage";
//팀 상세페이지
import RoomDetailPage from "./pages/home/RoomDetailPage";
//메뉴 선정페이지
import InputMenuPage from "./pages/home/InputMenuPage";
//이름 퀴즈 맞추기
import NameQuizPage from "./pages/home/NameQuizPage";
//퀴즈 틀림
import WrongPage from "./pages/home/WrongPage";
//퀴즈 맞음
import CorrectPage from "./pages/home/CorrectPage";
//메뉴 선정 결과 페이지
import ResultPage from "./pages/home/ResultPage";
//마이페이지
import MyPage from "./pages/My/MyPage";
//알림페이지
import NoticePage from "./pages/notice/NoticePage";
//멤버 추가초대페이지
import InviteMemberPage from "./pages/home/InviteMemberPage";

const App = () => {
  return (
    <Routes>
      <Route path="/auth/kakao/callback" element={<OAuthRedirectPage />} />
      <Route path="/" element={<Login />} />
      <Route path="/createprofile" element={<CreateProfilePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/createroom" element={<CreateRoomPage />} />
      <Route path="/roomdetail/:roomId" element={<RoomDetailPage />} />
      <Route path="/invitemember/:roomId" element={<InviteMemberPage />} />
      <Route path="/inputmenu/:roomId/:kakaoId" element={<InputMenuPage />} />
      <Route path="/namequiz/:roomId/:kakaoId" element={<NameQuizPage />} />
      <Route path="/wrong" element={<WrongPage />} />
      <Route path="/correct" element={<CorrectPage />} />
      <Route path="/result/:roomId" element={<ResultPage />} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/correct/:roomId/:kakaoId" element={<CorrectPage />} />
      <Route path="/wrong/:roomId/:kakaoId" element={<WrongPage />} />
    </Routes>
  );
};

export default App;
