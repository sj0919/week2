import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import Wrong from "../../assets/home/quiz_wrong.png";
const WrongPage = () => {
  return (
    <Layout>
      <BackHeaderComponent />
      <Image src={Wrong} alt="IMAGE" />
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
