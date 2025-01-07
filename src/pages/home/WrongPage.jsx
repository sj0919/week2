import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import Wrong from "../../assets/home/quiz_wrong.png";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
import { useNavigate } from "react-router";
const WrongPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <BackHeaderComponent />
      <Image src={Wrong} alt="IMAGE" />
      <BottomButtonComponent
        text="방으로 돌아가기"
        onClick={() => navigate(`/home`)}
      />
    </Layout>
  );
};

export default WrongPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;
const Image = styled.img`
  width: 375px;
`;
