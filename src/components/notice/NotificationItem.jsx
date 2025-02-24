import styled from "styled-components";

const NotificationItem = ({ title, detail }) => {
  return (
    <Layout>
      <Text>{title}</Text>
      <Detail>{title}에 초대되었습니다</Detail>
    </Layout>
  );
};
export default NotificationItem;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--purple-thi);
  width: 355px;
  height: 45px;
  gap: 6px;
  padding: 11px;
`;

const Text = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const Detail = styled.span`
  font-size: 14px;
`;
