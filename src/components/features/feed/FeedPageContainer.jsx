//대연
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMbtiTodoListsChallengeFetch,
  getMbtiTodoListsCommentFetch,
  getMbtiTodoListsFetch,
  getTodoListsChallengeFetch,
  getTodoListsCommentFetch,
  getTodoListsFetch,
} from "../../../app/modules/todolistsSlice";
import ChallengeCard from "../../common/ChallengeCard";
import { tokenChecker } from "../../../utils/token";
// 무한스크롤 때 사용
import { useInView } from "react-intersection-observer";

function FeedPageContainer() {
  const [selectSort, setSelectSort] = useState(false);
  const [sortState, setSortState] = useState("최신순");
  const feedCard = useSelector((state) => state.todolists.data);
  const { mbti } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 무한스크롤때 사용
  // const [ref, inView] = useInView();
  // 무한 스크롤 때 사용
  // console.log(inView);
  // console.log(card.length);
  // console.log(mbti);
  console.log(feedCard);

  //feedCard.length 이슈 아래 주석 참조 mbti선택후 다른 페이지 이동후 다시 피드페이지 들어왔을 때 선택했던 mbti가 나타남
  // 첫 렌더링시 토큰/토큰x 에 따라 스토어에서 각각 리듀서 실행
  // useEffect(() => {
  //   console.log(mbti);
  //   // if ( feedCard.length === 0 && tokenChecker() === true) {
  //   if (tokenChecker() === true && mbti === undefined){
  //     dispatch(getTodoListsFetch(true));
  //   } else 
  //   dispatch(getTodoListsFetch(false));
  // }, []);

  // useEffect(() => {
  //   console.log(mbti);
  //   // if ( feedCard.length === 0 && tokenChecker() === true) {
  //     if (tokenChecker() === true && mbti === undefined) {
  //         dispatch(getMbtiTodoListsFetch({ login: true, mbti: mbti }));
  //   } else 
  //   dispatch(getMbtiTodoListsFetch({ login: false, mbti: mbti }));
  // }, []);

  useEffect(() => {
    if(tokenChecker() === false && mbti === undefined){
      console.log("1")
      dispatch(getTodoListsFetch(false))
    }else if(tokenChecker() === false && mbti !== undefined){
      console.log("2")
      dispatch(getMbtiTodoListsFetch({ login:false, mbti:mbti}))
    }else if(tokenChecker() === true && mbti === undefined){
      console.log("3")
    dispatch(getMbtiTodoListsFetch(true))
    }else if(tokenChecker() === true && mbti !== undefined)
    console.log("4")
    dispatch(getMbtiTodoListsFetch({login:true, mbti:mbti}))
  },[])

  useEffect(() => {
    if(mbti === undefined){
      console.log("11")
      dispatch(getTodoListsFetch(false))
    }else if(mbti !== undefined){
      console.log("22")
      dispatch(getMbtiTodoListsFetch({ login:false, mbti:mbti}))
    }else if(mbti === undefined){
      console.log("33")
    dispatch(getMbtiTodoListsFetch(true))
    }else if(mbti !== undefined)
    console.log("44")
    dispatch(getMbtiTodoListsFetch({login:true, mbti:mbti}))
  },[mbti])
  // useEffect(() => {
  //   console.log("갑니다");
  //   if ((feedCard.length !== 0 && inView) || tokenChecker() === true) {
  //     console.log("첫 로딩 이후 무한 스크롤");
  //     dispatch(getTodoListsFetch(true));
  //     dispatch(getMbtiTodoListsFetch({login:true,mbti:mbti}))
  //     console.log("첫 로딩 이후 무한 스크롤1");
  //   } else if ((feedCard.length !== 0 && inView) || tokenChecker() === false) {
  //   // } else if ( inView &&   tokenChecker() === false) {
  //     console.log("첫 로딩 이후 무한 스크롤2");
  //     dispatch(getTodoListsFetch(false));
  //     dispatch(getMbtiTodoListsFetch({login:false,mbti:mbti}))
  //     console.log("첫 로딩 이후 무한 스크롤3");
  //   }
  // }, [inView]);

  //checkOn의  초기값은 false로 설정
  const [checkOn, checkOff] = useState(false);
  // 도전완료 이미지 변경state
  const checkState = () => {
    if (tokenChecker() === false) {
      alert("로그인 후 이용해주세요");
      return;
    } else return checkOff(!checkOn);
  };
  //최신순 댓글순 도전순 이미지 및 커서 클릭시 선택한 값에 따라 값 출력  토큰유무-> mbti유무
  const toggleSortPopUp = (e) => {
    e.preventDefault();
    setSelectSort(!selectSort);
  };
  // 최신순
  const datebutton = (e) => {
    e.preventDefault();
    if (tokenChecker() === false) {
      if (mbti === undefined) {
        dispatch(getTodoListsFetch(false));
        console.log("1");
      } else if (mbti !== undefined) {
        dispatch(getMbtiTodoListsFetch({ login: false, mbti: mbti }));
        console.log("2");
      }
    } else {
      if (tokenChecker() === true) {
        if (mbti === undefined) {
          dispatch(getTodoListsFetch(true));
          console.log("3");
        } else if (mbti !== undefined) {
          dispatch(getMbtiTodoListsFetch({ login: true, mbti: mbti }));
          console.log("4");
        }
      }
    }
    setSortState("최신순");
    setSelectSort(!selectSort);
  };
  //댓글순
  const commentbutton = (e) => {
    e.preventDefault();
    if (tokenChecker() === false) {
      if (mbti === undefined) {
        dispatch(getTodoListsCommentFetch(false));
        console.log("1");
      } else if (mbti !== undefined) {
        dispatch(getMbtiTodoListsCommentFetch({ login: false, mbti: mbti }));
        console.log("2");
      }
    } else {
      if (tokenChecker() === true) {
        if (mbti === undefined) {
          dispatch(getTodoListsCommentFetch(true));
          console.log("3");
        } else if (mbti !== undefined) {
          dispatch(getMbtiTodoListsCommentFetch({ login: true, mbti: mbti }));
          console.log("4");
        }
      }
    }
    setSortState("댓글순");
    setSelectSort(!selectSort);
  };
  // //도전순
  const challengebutton = (e) => {
    e.preventDefault();
    if (tokenChecker() === false) {
      if (mbti === undefined) {
        dispatch(getTodoListsChallengeFetch(false));
        console.log("5");
      } else if (mbti !== undefined) {
        dispatch(getMbtiTodoListsChallengeFetch({ login: false, mbti: mbti }));
        console.log("6");
      }
    } else {
      if (tokenChecker() === true) {
        if (mbti === undefined) {
          dispatch(getTodoListsChallengeFetch(true));
          console.log("7");
        } else if (mbti !== undefined) {
          dispatch(getMbtiTodoListsChallengeFetch({ login: true, mbti: mbti }));
          console.log("8");
        }
      }
    }
    setSortState("도전순");
    setSelectSort(!selectSort);
  };

  const moveToSelectMBTI = () => {
    navigate("/selectmbtifeed");
    // window.location.assign("/selectmbtifeed")
  };
  console.log("리턴전콘솔");

  return (
    <>
      {selectSort === true ? (
        <StShadowBackgroundDiv>
          <StPopupBox>
            <StSlideDiv />
            <StSort>
              <StDate onClick={datebutton}>최신순</StDate>
              <StComment onClick={commentbutton}>댓글순</StComment>
              <StChallenge onClick={challengebutton}>도전순</StChallenge>
            </StSort>
            <StCommonBar />
          </StPopupBox>
        </StShadowBackgroundDiv>
      ) : (
        <></>
      )}
      <StTotalWrap>
        <StHideToggle>
          {/* 거짓이면 체크안한거 참이면 체크한거 */}
          {checkOn === false ? (
            <StHideImg
              onClick={checkState}
              src={process.env.PUBLIC_URL + `/images/Appear.png`}
              width="17"
              height="17"
              alt="AppearImg"
            />
          ) : (
            <StHideImg
              onClick={checkState}
              src={process.env.PUBLIC_URL + `/images/Hide.png`}
              width="17"
              height="17"
              alt="AppearImg"
            />
          )}
          <StHide>도전완료 가리기</StHide>
          <StToggle onClick={toggleSortPopUp}>{sortState}</StToggle>
          <StToggleImg
            onClick={toggleSortPopUp}
            src={process.env.PUBLIC_URL + `/images/Toggle.png`}
            width="12"
            height="6"
            alt="ToggleImg"
          />
        </StHideToggle>
        <StTodayMyCardWrap>
          {checkOn === true
            ? //isChallenged가 true이면 화면에 띄우면 안된다.
              //아래식이 isChallenged:true를 가지고있다를  어떻게 표현해야하는가
              feedCard
                ?.filter((elem) => elem.isChallenged === false)
                .map((it, idx) => (
                  <ChallengeCard
                    id={it.todoId}
                    data={it}
                    key={idx}
                  ></ChallengeCard>
                ))
            : feedCard?.map((it, idx) => (
                <ChallengeCard id={it.todoId} data={it} key={idx}>
                  ?
                </ChallengeCard>
              ))}
          <div className="hi" style={{ height: 80 }}></div>
          {/* <div ref={ref} /> 무한스크롤 때 사용 */}
        </StTodayMyCardWrap>
        <StSelectMbti onClick={moveToSelectMBTI}>MBTI 선택</StSelectMbti>
      </StTotalWrap>
    </>
  );
}

// <StCardSmallWrap key={idx}>
//   <StCard id={it.todoId} onClick={goFeedDetail}>
//     {it.todo.length < 10 ? it.todo : it.todo.substring(0, 10) + "..."}
//   </StCard>
//   <StNameCounterBox>
//     <StName id={it.userId} onClick={goUserProfile}>
//       {it.nickname}
//     </StName>
//     <StCommentCount>댓글{it.commentCounts}</StCommentCount>
//     <StChallengeCount>도전{it.challengedCounts}</StChallengeCount>
//   </StNameCounterBox>
// </StCardSmallWrap>
const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const StHideToggle = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 24px;
  margin: 60px 0px 18px;
  align-items: center;
  background-color: #edecec;
  width: 500px;
  position: fixed;
`;

const StHideImg = styled.img`
  justify-content: left;
  margin: 7px 8px 8px 25px;
  cursor: pointer;
`;
const StHide = styled.div`
  display: flex;
  margin-right: 235px;
  align-items: center;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #000000;
`;
const StToggle = styled.div`
  margin-right: 8px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #000000;
  cursor: pointer;
`;
const StToggleImg = styled.img`
  margin: 13px 0px 13px 0px;
  cursor: pointer;
  align-items: center;
`;
const StTodayMyCardWrap = styled.div`
  /* display: inline-block; */
  /* align-items: start; */
  flex-direction: column;
  /* position: relative; */
  margin-top: 135.33px;
`;
const StSelectMbti = styled.button`
  :hover {
    background-color: red;
  }
  display: flex;
  width: 200px;
  position: fixed;
  height: 60px;
  top: 80vh;
  margin-left: 150px;
  background: #979797;
  border-radius: 66px;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StShadowBackgroundDiv = styled.div`
  background: rgba(0, 0, 0, 0.3);

  position: fixed;
  display: block;

  top: 0;
  width: 500px;
  height: 100%;
  z-index: 10;
`;

const StPopupBox = styled.div`
  background: #ffffff;
  position: absolute;
  width: 500px;
  /* height: 683px; */
  height: 335px;
  box-shadow: 0px 2.66667px 26.6667px rgba(0, 0, 0, 0.25);
  border-radius: 21.3333px 21.3333px 0px 0px;
  z-index: 10;
  bottom: 0;
`;
const StSlideDiv = styled.div`
  background: #e8e8e8;
  width: 42.67px;
  height: 5.33px;
  border-radius: 133.333px;
  margin: 21px auto 28px auto;
`;
const StSort = styled.div`
  display: flex;
  flex-direction: column;
  height: 260px;
  width: 59px;
  position: absolute;
  font-family: "IBM Plex Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 65px;
  text-align: center;
  color: #000000;
  margin-left: 220px;
`;
const StDate = styled.div``;
const StComment = styled.div``;
const StChallenge = styled.div``;
const StCommonBar = styled.div`
  position: absolute;
  width: 178.23px;
  margin-top: 315px;
  height: 6.65px;
  left: calc(50% - 178.23px / 2 - 1.33px);
  background: #000000;
  border-radius: 133.005px;
`;

export default FeedPageContainer;
