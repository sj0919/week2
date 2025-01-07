import React, { useRef, useState, useEffect } from "react";
import { patchUserInfo } from "../../api/user";
import styled from "styled-components";
import { ReactComponent as Camera } from "../../assets/login/camera.svg";
import BottomButtonComponent from "../../components/common/BottomButtonComponent";
import { useNavigate } from "react-router";
import { api } from "../../api/api";

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
    console.log("Camera activated");
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraActive(true);
        console.log("Camera state:", isCameraActive);
      })
      .catch((err) => {
        console.log("카메라 접근 불가...", err);
      });
  };

  const deactivateCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsCameraActive(false);
  };

  //사진찍기
  const takePicture = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const renamedBlob = new File([blob], `${kakaoId}.jpg`, {
        type: "image/jpeg",
      });
      setImage(renamedBlob); // Blob 데이터를 File로 변환 후 상태에 저장
      setIsCameraActive(false);
      deactivateCamera();
    }, "image/jpeg");
  };

  const handleUpload = async () => {
    if (!image) {
      alert("사진을 찍어주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", image); // Blob 데이터를 'photo' 키로 추가

    try {
      const response = await api.patch(`users/image/${kakaoId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("이미지 업로드 성공:", response.data);
      alert("이미지 업로드 성공!");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드 실패.");
    }
  };

  const handleComplete = async () => {
    try {
      await handleUpload(); // handleUpload 실행
      await UpdateUserInfo(); // handleUpload 성공 후 UpdateUserInfo 실행
    } catch (err) {
      console.error("Error during completion:", err);
      alert("업로드 또는 사용자 정보 업데이트 중 오류가 발생했습니다.");
    }
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
                <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
                <CameraButton onClick={takePicture}>사진 촬영하기</CameraButton>
              </>
            ) : image ? (
              <img src={URL.createObjectURL(image)} alt="촬영된 이미지" />
            ) : (
              <CameraImage>사진을 찍으세요</CameraImage>
            )}
          </CameraImageContainer>
        </Fieldset>
      </Form>
      <BottomButtonComponent text="완료" onClick={handleComplete} />
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
    button {
  position: absolute; /* 또는 적절히 설정 */
  z-index: 10;        /* 부모 요소 위로 올리기 */
}
`;

const CameraButton = styled.button`
  display: flex;
  width: 100px;
  height: 25px;
  border-radius: 10px;
  border: 1px solid var(--gray-100);
  margin-top: 10px;
`;
const CameraImage = styled.div`
  display: flex;
  width: 330px;
  height: 330px;
  border-color: var(--gray-300);
  border-radius: 10px;
`;
