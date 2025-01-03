import styled from "styled-components";
import { NavLink } from "react-router";
import { ReactComponent as Home } from "../../assets/common/home_icn.svg";
import { ReactComponent as Notice } from "../../assets/common/notice_icn.svg";
import { ReactComponent as My } from "../../assets/common/my_icn.svg";
import { ReactComponent as HomeP } from "../../assets/common/home_icn_purple.svg";
import { ReactComponent as NoticeP } from "../../assets/common/notice_icn_purple.svg";
import { ReactComponent as MyP } from "../../assets/common/my_icn_purple.svg";

const NavigationBar = () => {
  return (
    <Layout>
      <NavLinkS to="/home">
        {({ isActive }) => (
          <>
            {isActive ? <HomeP /> : <Home />}
            <Span $isActive={isActive}>홈</Span>
          </>
        )}
      </NavLinkS>
      <NavLinkS to="/notice">
        {({ isActive }) => (
          <>
            {isActive ? <NoticeP /> : <Notice />}
            <Span $isActive={isActive}>알림</Span>
          </>
        )}
      </NavLinkS>
      <NavLinkS to="/my">
        {({ isActive }) => (
          <>
            {isActive ? <MyP /> : <My />}
            <Span $isActive={isActive}>마이</Span>
          </>
        )}
      </NavLinkS>
    </Layout>
  );
};

export default NavigationBar;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 375px;
  background-color: var(--gray-100);
  gap: 110px;
  padding: 10px;
`;
const NavLinkS = styled(NavLink)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  svg {
    width: 26px;
    height: 26px;
  }
  text-decoration: none;
`;
const Span = styled.span`
  color: ${({ $isActive }) =>
    $isActive ? "var(--purple-pri)" : "var(--gray-300)"};
  font-size: 13px;
`;
