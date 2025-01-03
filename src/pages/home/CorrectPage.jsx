import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import Correct from "../../assets/home/quiz_correct.png";
const CorrectPage = () => {
  return (
    <Layout>
      <BackHeaderComponent />
      <Image src={Correct} alt="IMAGE" />
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
