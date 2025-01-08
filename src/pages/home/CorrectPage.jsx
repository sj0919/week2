import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import Correct from "../../assets/home/quiz_correct.png";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
import { useNavigate, useParams } from "react-router";
const CorrectPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  return (
    <Layout>
      <BackHeaderComponent />
      <Image src={Correct} alt="IMAGE" />
      <BottomButtonComponent
        text="방으로 돌아가기"
        onClick={() => navigate(`/roomdetail/${roomId}`)}
      />
    </Layout>
  );
};

export default CorrectPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;
const Image = styled.img`
  width: 375px;
  margin-top: 150px;
`;
