import styled from "styled-components";

const BottomButtonComponent = ({ text, onClick }) => {
  return (
    <Layout>
      <Button onClick={onClick}>{text}</Button>
    </Layout>
  );
};
export default BottomButtonComponent;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  margin-left: 3px;
`;
const Button = styled.button`
  width: 355px;
  height: 37px;
  background-color: var(--purple-pri);
  border-radius: 10px;
  color: var(--white);
  font-weight: 600;
`;
