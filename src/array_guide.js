// pagesList 작성법
{
id: 1, // 고유 키 값 부여
title: "촬영하고 싶은 소재 선택하기", // 하단 타이틀 영역에 표시될 문구 작성
body: "이번 영상에서 담아볼 소재를 선택해보세요. \n선택한 내용에 맞는 촬영 가이드를 제공해드립니다.", // 하단 바디 영역에 표시될 문구 작성
success: "선택한 순서에 따라서 촬영 순서도 결정되니 \n원하는 순서대로 선택해보세요.", // 성공 시 표시할 메세지 작성
position: [13, 5.8, 0.4, 0.8177777778], // width, height, top, left 순으로 작성. 각 수치는 이미지 기준 %로 환산하여 입력.
screenUp: false, // 이미지를 상단에 맞출 경우 false, 이미지를 하단 Alert 위로 붙게 할 경우 true.
actiondiv: [ // 사용자가 취해야할 액션을 작성, 추가할 경우 배열 형태로 계속 추가
    <div
        onClick={() => {
            actionAreaMove(17.5, 4, 0.063234811, 0.7902222222); // 눌렀을 때 다음 서브 액션이 있는 경우. width, height, top, left 순
        }}
        className="fullsize"
    ></div>,
    <div onClick={handlechange} className="fullsize"></div>, // 눌렀을 때 해당 튜토리얼이 종료되는 경우
],
backgroundDivBefore: ["tutorial_1_1", "tutorial_1_2"], // 서브 액션 별 배경 이미지 리스트. 파일명을 확장자 제외하고 작성. 동일 이미지를 사용하는 경우 동일 이미지 번호 기입
backgroundDivAfter: "tutorial_1_3", // 성공 시 표시될 이미지 파일명 작성.
tooltipDiv: [ // 서브 액션 별 툴팁 표시 리스트
    {
        body: "촬영하고자 하는 내용을 확인해 보세요.", //
        length: "75", // % 기준으로 작성
        arrowPosition: "bottom right", // 화살표 방향 설정. top/bottom, left/right 작성
        x: "30", // % 기준으로 작성
        y: "30", // % 기준으로 작성
    },
    {
        body: "", // 툴팁 표시가 필요없는 순서에는 body값을 ""로 처리하면 툴팁이 표시되지 않음

    },
],
},