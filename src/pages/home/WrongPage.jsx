import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import Wrong from "../../assets/home/quiz_wrong.png";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
import { useNavigate, useParams } from "react-router";
const WrongPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  return (
    <Layout>
      <BackHeaderComponent />
      <Image src={Wrong} alt="IMAGE" />
      <BottomButtonComponent
        text="방으로 돌아가기"
        onClick={() => navigate(`/roomdetail/${roomId}`)}
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
  margin-top: 200px;
`;
