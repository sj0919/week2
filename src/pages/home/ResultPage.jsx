import styled from "styled-components";
import BackHeaderComponent from "../../components/common/BackHeaderComponent";
import Result from "../../assets/home/result_img.png";
const ResultPage = () => {
  return (
    <Layout>
      <BackHeaderComponent />
      <Image src={Result} alt="IMAGE" />
    </Layout>
  );
};

export default ResultPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;
const Image = styled.img`
  width: 375px;
`;
