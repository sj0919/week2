import styled from "styled-components";
import { ReactComponent as Delete } from "../../assets/home/delete_btn.svg";
import { ReactComponent as Profile } from "../../assets/home/profile.svg";

const MemberItem = ({ name, nickname }) => {
  return (
    <Layout>
      <DeleteButton>
        <Delete />
      </DeleteButton>
      <ProfileIcon>
        <Profile />
      </ProfileIcon>
      <Name>{name}</Name>
      <Nickname>{nickname}</Nickname>
    </Layout>
  );
};

export default MemberItem;

const Layout = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
`;

const DeleteButton = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const ProfileIcon = styled.div`
  margin-right: 10px;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

const Nickname = styled.span`
  font-size: 13px;
  color: var(--gray-300);
  margin-left: auto; /* 닉네임을 맨 오른쪽으로 이동 */
`;
