import "./App.css";
import { Route, Routes } from "react-router";
//로그인
import Login from "./pages/login/kakaoLoginPage";
//프로필 정보 입력
import CreateProfilePage from "./pages/login/CreateProfilePage";
//홈화면
import HomePage from "./pages/home/HomePage";
//팀 생성 페이지
import CreateRoomPage from "./pages/home/CreateRoomPage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/createprofile" element={<CreateProfilePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/createroom" element={<CreateRoomPage />} />
    </Routes>
  );
};

export default App;
