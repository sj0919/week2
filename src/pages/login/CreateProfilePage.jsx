import React, { useRef, useState, useEffect } from "react";
import { patchUserInfo } from "../../api/user";
import styled from "styled-components";
import { ReactComponent as Camera } from "../../assets/login/camera.svg";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
import { useNavigate } from "react-router";

const CreateProfilePage = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [name, setName] = useState("너");
  const [nickname, setNickname] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [kakaoId, setKakaoId] = useState("");

  useEffect(() => {
    const kakaoIdFromStorage = localStorage.getItem("kakao_id");
    console.log("kakao", kakaoIdFromStorage);
    if (kakaoIdFromStorage) {
      setKakaoId(kakaoIdFromStorage);
    }
    console.log(kakaoId);
  }, [kakaoId]);

  const UpdateUserInfo = async () => {
    try {
      const response = await patchUserInfo(kakaoId, name, nickname, introduce);
      navigate("/home");
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  //카메라 활성화
  const activateCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraActive(true);
      })
      .catch((err) => {
        console.log("카메라 접근 불가...", err);
      });
  };

  //사진찍기
  const takePicture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png");
    setImage(dataUrl);
    setIsCameraActive(false);
  };
  return (
    <Layout>
      <Form>
        <Fieldset>
          <Legend>이름</Legend>
          <Textarea value={name} onChange={(e) => setName(e.target.value)} />
        </Fieldset>
        <Fieldset>
          <Legend>닉네임</Legend>
          <Textarea
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Fieldset>
        <Fieldset>
          <Legend>한줄소개</Legend>
          <Textarea
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
            placeholder="한줄소개는 최대 10글자"
          />
        </Fieldset>
        <Fieldset>
          <Legend>
            사진촬영
            <Camera onClick={activateCamera} style={{ cursor: "pointer" }} />
          </Legend>
          <CameraImageContainer>
            {isCameraActive ? (
              <>
                <video ref={videoRef} autoPlay></video>
              </>
            ) : image ? (
              <img src={image} alt="촬영된 이미지" />
            ) : (
              <CameraImage>사진을 찍으세요</CameraImage>
            )}
          </CameraImageContainer>
        </Fieldset>
      </Form>
      <BottomButtonComponent text="완료" onClick={UpdateUserInfo} />
    </Layout>
  );
};

export default CreateProfilePage;

const Layout = styled.div`
  display: flex;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Fieldset = styled.fieldset`
  border: none;
  margin-top: 10px;
`;

const Legend = styled.legend`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
`;

const Textarea = styled.textarea`
  display: flex;
  width: 330px;
  height: 20px;
  padding: 10px;
  border-color: var(--gray-300);
  border-radius: 10px;
  font-size: 15px;
  resize: none;
`;

const CameraImageContainer = styled.div`
  display: flex;
  width: 330px;
  height: 330px;
  border-color: var(--gray-300);
  border-radius: 10px;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
  }
img{
    width:100%
    height:100%
    object-fit:cover;
  }
`;
const CameraImage = styled.div`
  display: flex;
  width: 330px;
  height: 330px;
  border-color: var(--gray-300);
  border-radius: 10px;
`;
