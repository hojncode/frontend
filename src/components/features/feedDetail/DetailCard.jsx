import {
  StCommonColumnBox,
  StCommonRowBox,
} from "../../interface/styledCommon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faStar } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { decodeMyTokenData } from "../../../utils/token";
import instance from "../../../app/modules/instance";

function DetailCard({ data }) {
  const [menuModal, setMenuModal] = useState(false);
  const params = useParams();
  const myData = decodeMyTokenData();
  const navigate = useNavigate();

  // 팝업창 열고 닫기 위한 함수
  function displayCardMenu(event) {
    event.stopPropagation();
    setMenuModal(!menuModal);
  }

  // 내가 제안한 미믹을 삭제함.
  function deleteMyTodayMakingChallenge(event) {
    event.stopPropagation();
    const deleteApply = async () => {
      try {
        const response = await instance.delete(`mytodos/${data.todoId}`);
        if (response.data.message === "success") {
          navigate("/todolists");
        }
      } catch (error) {
        alert(error.response.data.errorMessage);
      }
    };
    deleteApply();
  }

  // 이용 시, <DetailCard data={객체값} />로 작성해줄 것
  // map을 쓰지 않는 경우, key는 예외.
  return (
    <>
      {menuModal === true ? (
        <StShadowBackgroundDiv>
          {myData !== undefined && myData.userId === data.userId ? (
            <>
              <StPopUpWhiteButton
                onClick={deleteMyTodayMakingChallenge}
                transform="translateY(76vh)">
                삭제
              </StPopUpWhiteButton>
              <StPopUpWhiteButton
                onClick={displayCardMenu}
                transform="translateY(77vh)">
                닫기
              </StPopUpWhiteButton>
            </>
          ) : (
            <></>
          )}
        </StShadowBackgroundDiv>
      ) : (
        <></>
      )}
      <StChallengeCardDiv width="90%" id={data.todoId}>
        <StCommonColumnBox width="100%">
          <StCommonRowBox>
            <StChallengeNameSpan>{data.todo}</StChallengeNameSpan>
            {myData !== undefined ? (
              myData.userId === data.userId ? (
                <StMenuBtn onClick={displayCardMenu}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </StMenuBtn>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </StCommonRowBox>
          <StCommonRowBox alignItems="center">
            <StNickNameSpan>{data.nickname}</StNickNameSpan>
            <StCommonRowBox alignItems="center" style={{ marginRight: "5px" }}>
              <FontAwesomeIcon
                style={{ color: "#979797", margin: "0 4px" }}
                icon={faMessage}
              />
              <StCountSpan>{data.commentCounts}</StCountSpan>
            </StCommonRowBox>
            <StCommonRowBox alignItems="center" style={{ marginLeft: "5px" }}>
              <FontAwesomeIcon
                style={{ color: "#979797", margin: "0 0 0 0" }}
                icon={faStar}
              />
              <StCountSpan style={{ marginRight: "4px" }}>
                {data.challengedCounts}
              </StCountSpan>
            </StCommonRowBox>
          </StCommonRowBox>
        </StCommonColumnBox>
      </StChallengeCardDiv>
    </>
  );
}

export default DetailCard;

const StChallengeCardDiv = styled.div`
  background: #ffffff;

  display: flex;
  flex-direction: row;
  align-items: center;

  width: ${(props) => props.width || "100%"};
  border: 1px solid gray;
  border-radius: 6px;
  padding: 14px 20px;
  margin: 5px 25px;

  box-sizing: border-box;
`;

const StChallengeNameSpan = styled.span`
  font-size: 22px;
  font-weight: 600;
  text-align: left;
  color: #979797;
  line-height: 32px;

  margin-right: auto;
`;

const StNickNameSpan = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: ${(props) => props.color || "#979797"};

  margin-right: auto;
`;

const StMenuBtn = styled.button`
  background: none;
  font-size: 16px;
  line-height: 32px;
  color: #979797;

  border: none;
  outline: none;

  cursor: pointer;
`;

const StCountSpan = styled.span`
  font-size: 13px;
  font-weight: 500;
  line-height: 32px;
  color: #979797;

  margin: 0 8px;
`;

const StPopUpWhiteButton = styled.button`
  background: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;
  font-weight: 500;
  color: #979797;

  border: none;
  outline: none;
  margin: 0 25px;
  border-radius: 6px;

  width: 90%;
  height: 70px;
  transform: ${(props) => props.transform};
  cursor: pointer;
`;

const StShadowBackgroundDiv = styled.div`
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  width: 500px;
  height: 100%;
  z-index: 10;
`;
