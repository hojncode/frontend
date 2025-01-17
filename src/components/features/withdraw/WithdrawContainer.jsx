import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../../app/modules/instance";

function WithdrawContainer() {
  const passwordRef = useRef();
  const navigate = useNavigate();

  // 구글 폼 이동
  function moveToPageGoogleForm() {
    window.open("https://forms.gle/ByMhVrN7Gr9pUuBZ9");
  }

  // 탈퇴 처리
  function sendToWithdrawData(event) {
    event.preventDefault();
    const withdrawApply = async () => {
      try {
        const response = await instance.delete("/accounts", {
          data: { password: passwordRef.current.value },
        });
        if (response.data.message === "success") {
          window.localStorage.removeItem("token");
          navigate("/");
        }
      } catch (error) {
        alert("탈퇴 처리에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    };
    withdrawApply();
  }

  return (
    <StWithdrawContainer>
      <div style={{ margin: "30px 0", textAlign: "left" }}>
        <p>미믹을 떠난다니 아쉬워요.</p>
        <p>미믹을 떠나는 이유를 알려주세요.</p>
      </div>
      <StGoogleFormBtn onClick={moveToPageGoogleForm}>
        클릭하여 알려주기
      </StGoogleFormBtn>

      <div style={{ margin: "30px 0", textAlign: "left" }}>
        <p>회원님의 소중한 개인정보를 안전하게 보호하기 위해</p>
        <p>비밀번호를 입력해주세요.</p>
      </div>

      <StWithDrawForm onSubmit={sendToWithdrawData}>
        <label>비밀번호</label>
        <StCommonInput
          type="password"
          placeholder="비밀번호를 입력"
          ref={passwordRef}
        />
        <StCommonButton>떠나기</StCommonButton>
      </StWithDrawForm>
    </StWithdrawContainer>
  );
}

export default WithdrawContainer;

const StWithdrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  margin: 60px 25px;

  box-sizing: border-box;

  & > div > p {
    font-size: 18px;
    font-weight: 500;
    color: #999999;
    margin: 0;
  }
  @media screen and (max-width: 500px) {
    & > div > p {
      font-size: 14px;
    }
  }
`;

const StCommonInput = styled.input`
  display: flex;

  font-size: 18px;
  font-weight: 500;
  color: #000000;

  border: 1px solid #979797;
  border-radius: 6px;
  outline: none;
  margin: 8px 0;
  padding: 0 0 0 20px;

  width: 95%;
  min-width: 360px;
  height: 55px;

  &::placeholder {
    font-size: 18px;
    font-weight: 500;
    color: #979797;
  }
  @media screen and (max-width: 500px) {
    width: 93%;
    min-width: 200px;
    height: 48px;
    font-size: 16px;
    &::placeholder {
      font-size: 16px;
    }
  }
`;

const StCommonButton = styled.button`
  background: #ff6d53;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  font-weight: 500;
  color: #ffffff;

  border: none;
  border-radius: 6px;
  outline: none;
  margin: 30px 0 80px 0;
  padding: 0;

  width: 100%;
  height: 70px;

  cursor: pointer;

  transition: ease 0.05s;
  &:hover {
    background: #ffa595;
  }
  @media screen and (max-width: 500px) {
    height: 50px;
    font-size: 18px;
  }
`;

const StGoogleFormBtn = styled.div`
  background: none;

  font-size: 18px;
  font-weight: 500;
  text-decoration: underline;
  color: #ff6d53;
  text-align: left;

  border: none;
  outline: none;
  margin: 0 0 80px 0;

  cursor: pointer;

  transition: ease 0.05s;
  &:hover {
    color: #ffa595;
  }
  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

const StWithDrawForm = styled.form`
  & > label {
    font-size: 18px;
    font-weight: 500;
    color: #000000;
    display: block;
    text-align: left;
  }
  @media screen and (max-width: 500px) {
    & > label {
      font-size: 14px;
    }
  }
`;
