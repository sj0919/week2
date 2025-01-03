import styled from "styled-components";
import { ReactComponent as BackBtn } from "../../assets/common/back_btn.svg";
import { useNavigate } from "react-router";

const BackHeaderComponent = ({ onClick }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Container>
      <BackBtn onClick={onClick ? onClick : goBack} />
    </Container>
  );
};

export default BackHeaderComponent;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
