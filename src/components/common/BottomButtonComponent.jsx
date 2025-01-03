import styled from "styled-components";

const BottomButtonComponent = ({ text }) => {
  return (
    <Layout>
      <Button>{text}</Button>
    </Layout>
  );
};
export default BottomButtonComponent;

const Layout = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  width: 355px;
  height: 37px;
  background-color: var(--purple-pri);
  border-radius: 10px;
`;
