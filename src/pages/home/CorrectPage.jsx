import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import Correct from "../../assets/home/quiz_correct.png";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
import { useNavigate } from "react-router";
const CorrectPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <BackHeaderComponent />
      <Image src={Correct} alt="IMAGE" />
      <BottomButtonComponent
        text="방으로 돌아가기"
        onClick={() => navigate(`/home`)}
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
`;
