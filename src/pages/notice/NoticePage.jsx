import { ReactComponent as TopBar } from "../../assets/home/top_bar.svg";
import styled from "styled-components";
import NavigationBar from "../../components/common/NavigationBar";

const NoticePage = () => {
  return (
    <Layout>
      <TopBar />
      <NavigationBar />
    </Layout>
  );
};

export default NoticePage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;
