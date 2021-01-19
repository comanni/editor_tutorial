import { useEffect, useState, useMemo } from "react";
import { useRef } from "react";
import qs from "qs";
import ActionArea from "./ActionArea";
import Alert from "./Alert";

const Tutorial = ({ history, location }) => {
    const [num, setNum] = useState(0); // 현재 진행 중인 순서 번호
    const [percent, setPercent] = useState(0); // 튜토리얼 진행률
    const [transitionToggle, setTransitionToggle] = useState({
        background: false,
        alert: false,
        congraturation: false,
        congraturationButton: false,
    });
    const [subTaskNum, setSubTaskNum] = useState(1); // 개별 튜토리얼 내 여러 단게가 있을 시, 단계 표시
    const [alert, setAlert] = useState(false); // 종료 팝업 표시 여부
    const [dimPosition, setDimPosition] = useState({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
    });
    // <-- 이미지 올릴 height 계산-->

    const [screenUp, setScreenUp] = useState(false);
    let calHeight = window.innerWidth * 2.1653333333;
    let realHeight = window.innerHeight;
    let widthRatio;
    if (window.innerWidth >= 750) {
        widthRatio = 28;
    } else {
        widthRatio = window.innerWidth * 0.0373333333;
    }

    let upHeight = calHeight - realHeight + 12.8571428571 * widthRatio;

    if (upHeight <= 0) {
        upHeight = 0;
    }

    // <-------------------------------->

    const subtaskChange = (e) => {
        setSubTaskNum(subTaskNum + 1);
    };

    // action을 취하는 경우
    const handlechange = (e) => {
        setNum(num + 1);
        // 진행 퍼센트 계산
        setPercent((value.showPageNum * 100) / value.maxPageNum);

        // 배경화면 어둡게 한 것 제거
        setTransitionToggle({
            ...transitionToggle,
            background: false,
        });

        // 0.3초 후 congraturation 표시
        setTimeout(() => {
            setTransitionToggle({
                ...transitionToggle,
                background: false,
                congraturation: true,
            });
            if (value.showPageNum === value.maxPageNum) {
                nextButton.current.innerText = "완료";
            }
        }, 300);

        // 1초 후 다음 버튼 표시
        setTimeout(() => {
            setTransitionToggle({
                ...transitionToggle,
                background: false,
                congraturation: true,
                congraturationButton: true,
            });
        }, 1000);
    };

    // 다음으로 넘어갈 터치 영역 정의 함수
    const actionAreaMove = (width, height, top, left) => {
        setDimPosition({
            ...dimPosition,
            width: width,
            height: height,
            top: top,
            left: left,
        });
        setSubTaskNum(subTaskNum + 1);
    };

    const pagesList = [
        {
            id: 1,
            title: "촬영하고 싶은 소재 선택하기",
            body: "이번 영상에서 담아볼 소재를 선택해보세요. \n선택한 내용에 맞는 촬영 가이드를 제공해드립니다.",
            success: "선택한 순서에 따라서 촬영 순서도 결정되니 \n원하는 순서대로 선택해보세요.",
            position: [13, 5.8, 0.4, 0.8177777778],
            screenUp: false,
            actiondiv: [
                <div
                    onClick={() => {
                        actionAreaMove(17.5, 4, 0.063234811, 0.7902222222);
                    }}
                    className="fullsize"
                ></div>,
                <div onClick={handlechange} className="fullsize"></div>,
            ],
            backgroundDivBefore: ["tutorial_1_1", "tutorial_1_2"],
            backgroundDivAfter: "tutorial_1_3",
            tooltipDiv: [
                {
                    body: "촬영하고자 하는 내용을 확인해 보세요.",
                    length: "75",
                    arrowPosition: "bottom right",
                    x: "30",
                    y: "30",
                },
                {
                    body: "선택완료를 누르면 촬영가이드가 제공됩니다.",
                    length: "70",
                    arrowPosition: "top right",
                    x: "24",
                    y: "15",
                },
            ],
        },
        {
            id: 2,
            title: "촬영하기",
            body: "콘텐츠를 만들 때 필요한 내용들을 알려드립니다.\n가이드를 참고하여 소재 별로 촬영을 진행해보세요.",
            success: "가이드 내용 중 본인이 필요한 부분만 참고하세요.",

            position: [10, 4, 0.0541871921, 0.456],
            screenUp: false,
            actiondiv: [
                <div
                    onClick={() => {
                        actionAreaMove(17, 7.4, 0.2032019704, 0.5866666667);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(37, 6, 0.3571428571, 0.024);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(12, 5.5, 0.2967980296, 0.8533333333);
                    }}
                    className="fullsize"
                ></div>,
                <div onClick={handlechange} className="fullsize"></div>,
            ],
            backgroundDivBefore: ["tutorial_2_1", "tutorial_2_2", "tutorial_2_3", "tutorial_2_3"],
            backgroundDivAfter: "tutorial_2_3",
            tooltipDiv: [
                {
                    body: "촬영하고자 하는 소재를 선택하세요.",
                    length: "60",
                    arrowPosition: "top right",
                    x: "0",
                    y: "15",
                },
                {
                    body: "촬영하기를 눌러 촬영을 진행하세요.",
                    length: "70",
                    arrowPosition: "top right",
                    x: "8",
                    y: "33",
                },
                {
                    body: "이 주제 촬영이 끝났다면 다음 소재 촬영하기를 누르세요.",
                    length: "90",
                    arrowPosition: "top left",
                    x: "6",
                    y: "47",
                },
                {
                    body: "모든 촬영이 끝났다면 편집으로 이동하세요.",
                    length: "80",
                    arrowPosition: "top right",
                    x: "17",
                    y: "40",
                },
            ],
        },
        {
            id: 3,
            title: "클립 길이 조절하기",
            body: "클립을 선택한 후 시작점과 끝점을 \n원하는 위치까지 움직여보세요.",
            success: "세부적인 조절을 위해서는 하단 화살표를 이용해보세요.",
            position: [70, 5.5, 0.5233990148, 0.2266666667],
            screenUp: true,
            actiondiv: [
                <div
                    onClick={() => {
                        actionAreaMove(13, 5.4, 0.525862069, 0.8186666667);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(15.7, 7.1, 0.5123152709, 0.5333333333);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(50, 5.5, 0.59591133, 0.2508888889);
                    }}
                    className="fullsize"
                ></div>,
                <div onClick={handlechange} className="fullsize"></div>,
            ],
            backgroundDivBefore: ["tutorial_3_1", "tutorial_3_2", "tutorial_3_3", "tutorial_3_4"],
            backgroundDivAfter: "tutorial_3_5",
            tooltipDiv: [
                {
                    body: "편집을 원하는 클립을 선택하세요.",
                    length: "65",
                    arrowPosition: "top right",
                    x: "0",
                    y: "60",
                },
                {
                    body: "out 포인트를 터치해보세요.",
                    length: "65",
                    arrowPosition: "bottom right",
                    x: "24",
                    y: "44",
                },
                {
                    body: "포인트를 드래그하여 길이를 조절 할 수 있습니다.",
                    length: "80",
                    arrowPosition: "bottom right",
                    x: "0",
                    y: "44",
                },
                {
                    body: "1 프레임 단위 세밀한 편집이 필요할 때 사용하세요.",
                    length: "80",
                    arrowPosition: "bottom right",
                    x: "0",
                    y: "49",
                },
            ],
        },
        {
            id: 4,
            title: "클립 하단 기능 확인하기",
            body: "클립 하단에 있는 삭제, 음량, 복사, 추가 버튼을 사용해보세요.",
            success: "한 클립을 여러 개로 나누어 쓸 때 복사 기능이 유용합니다.",
            position: [11.7, 5.7, 0.907635468, 0.0473333333],
            screenUp: true,
            actiondiv: [
                <>
                    <div
                        onClick={() => {
                            actionAreaMove(11.7, 5.7, 0.907635468, 0.3073333333);
                        }}
                        className="fullsize"
                    ></div>
                </>,
                <div
                    onClick={() => {
                        actionAreaMove(100, 30.4, 0.7, 0);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(11.7, 5.7, 0.907635468, 0.5773333333);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(11.7, 5.7, 0.907635468, 0.84);
                    }}
                    className="fullsize"
                ></div>,
                <div onClick={handlechange} className="fullsize"></div>,
            ],
            backgroundDivBefore: ["tutorial_4_1", "tutorial_4_1", "tutorial_4_2", "tutorial_4_1", "tutorial_4_1"],
            backgroundDivAfter: "tutorial_4_1",
            tooltipDiv: [
                {
                    body: "해당 클립을 삭제하려면 터치하세요.",
                    length: "75",
                    arrowPosition: "bottom left",
                    x: "0",
                    y: "80",
                },
                {
                    body: "클립의 소리를 조절하려면 터치하세요.",
                    length: "70",
                    arrowPosition: "bottom left",
                    x: "24",
                    y: "80",
                },
                {
                    body: "음량 조절 후 확인을 누르면 적용됩니다.",
                    length: "80",
                    arrowPosition: "bottom left",
                    x: "24",
                    y: "60",
                },
                {
                    body: "클립의 다른 부분을 사용하려면 복사해서 사용하세요.",
                    length: "80",
                    arrowPosition: "bottom right",
                    x: "3",
                    y: "80",
                },
                {
                    body: "해당 클립 뒤에 클립을 추가할 때 터치하세요.",
                    length: "70",
                    arrowPosition: "bottom right",
                    x: "25",
                    y: "80",
                },
            ],
        },
        {
            id: 5,
            title: "자막 추가하기",
            body: "클립 위에 자막을 추가해보세요. \n클립 단위로 자막을 추가할 수 있습니다.",
            success: "더보기 버튼을 눌러 자막을 추가할 수 있어요",
            position: [25, 7, 0.8226600985, 0.752],
            screenUp: true,
            actiondiv: [
                <div
                    onClick={() => {
                        actionAreaMove(91, 8, 0.5098522167, 0.0453333333);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(60.7, 7.1, 0.486453202, 0.2266666667);
                    }}
                    className="fullsize"
                ></div>,
                <div onClick={handlechange} className="fullsize"></div>,
            ],
            backgroundDivBefore: ["tutorial_5_1", "tutorial_5_2", "tutorial_5_3"],
            backgroundDivAfter: "tutorial_5_3",
            tooltipDiv: [
                {
                    body: "자막 버튼을 눌러 자막 입력 화면으로 이동하세요.",
                    length: "75",
                    arrowPosition: "bottom right",
                    x: "15",
                    y: "73",
                },
                {
                    body: "입력을 원하는 클립을 선택하세요.",
                    length: "70",
                    arrowPosition: "bottom right",
                    x: "24",
                    y: "40",
                },
                {
                    body: "영상에 들어갈 자막 내용을 입력하세요.",
                    length: "70",
                    arrowPosition: "bottom right",
                    x: "10",
                    y: "38",
                },
            ],
        },
        {
            id: 6,
            title: "자막 스타일 지정하기",
            body: "원하는 자막 스타일을 선택해보세요.",
            success: "테마를 바꾸면 다른 자막을 사용할 수 있습니다.",
            position: [9, 4, 0.5283251232, 0.8293333333],
            screenUp: true,
            actiondiv: [
                <div
                    onClick={() => {
                        actionAreaMove(96, 8, 0.6502463054, 0.0213333333);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(100, 65, 0.35591133, 0);
                    }}
                    className="fullsize"
                ></div>,
                <div onClick={handlechange} className="fullsize"></div>,
            ],
            backgroundDivBefore: ["tutorial_6_1", "tutorial_6_2", "tutorial_6_3"],
            backgroundDivAfter: "tutorial_6_1",
            tooltipDiv: [
                {
                    body: "자막 옆 더보기 버튼을 누르세요.",
                    length: "75",
                    arrowPosition: "bottom right",
                    x: "15",
                    y: "44",
                },
                {
                    body: "스타일 변경 버튼을 누르세요.",
                    length: "60",
                    arrowPosition: "bottom right",
                    x: "24",
                    y: "56",
                },
                {
                    body: "원하는 자막 스타일을 선택하세요.",
                    length: "60",
                    arrowPosition: "bottom right",
                    x: "12",
                    y: "27",
                },
            ],
        },
        {
            id: 7,
            title: "자막 표시 시간 조절하기",
            body: "원하는 시간에만 자막을 표시해보세요.",
            success: "자막이 많아지는 경우 클립복사를 활용해보세요.",
            position: [9, 4, 0.5283251232, 0.8293333333],
            screenUp: true,
            actiondiv: [
                <div
                    onClick={() => {
                        actionAreaMove(96, 8, 0.5849753695, 0.0213333333);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(100, 22, 0.4704433498, 0);
                    }}
                    className="fullsize"
                ></div>,
                <div onClick={handlechange} className="fullsize"></div>,
            ],
            backgroundDivBefore: ["tutorial_7_1", "tutorial_7_2", "tutorial_7_3"],
            backgroundDivAfter: "tutorial_7_1",
            tooltipDiv: [
                {
                    body: "자막 옆 더보기 버튼을 누르세요.",
                    length: "65",
                    arrowPosition: "top right",
                    x: "25",
                    y: "64",
                },
                {
                    body: "시간 변경 버튼을 누르세요.",
                    length: "60",
                    arrowPosition: "bottom right",
                    x: "24",
                    y: "50",
                },
                {
                    body: "원하는대로 시간을 조절해보세요.",
                    length: "60",
                    arrowPosition: "top right",
                    x: "12",
                    y: "75",
                },
            ],
        },
        {
            id: 8,
            title: "여러 개의 자막 넣기",
            body: "원하는 자막을 순차적으로 표시해보세요. \n갯수에 따라 1/N만큼씩 노출이 됩니다.",
            success: "자막이 많아지는 경우 클립복사를 활용해보세요.",
            position: [9, 4, 0.5283251232, 0.8293333333],
            screenUp: true,
            actiondiv: [
                <div
                    onClick={() => {
                        actionAreaMove(96, 8, 0.7192118227, 0.0213333333);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(100, 27.5, 0.5837438424, 0);
                    }}
                    className="fullsize"
                ></div>,
                <div onClick={handlechange} className="fullsize"></div>,
            ],
            backgroundDivBefore: ["tutorial_8_1", "tutorial_8_2", "tutorial_8_3"],
            backgroundDivAfter: "tutorial_8_1",
            tooltipDiv: [
                {
                    body: "자막 옆 더보기 버튼을 누르세요.",
                    length: "65",
                    arrowPosition: "top right",
                    x: "25",
                    y: "64",
                },
                {
                    body: "추가 버튼을 클릭하세요.",
                    length: "60",
                    arrowPosition: "bottom right",
                    x: "25",
                    y: "63",
                },
                {
                    body: "원하는 내용을 작성하세요.",
                    length: "60",
                    arrowPosition: "bottom right",
                    x: "12",
                    y: "50",
                },
            ],
        },
        {
            id: 9,
            title: "화면 위 이미지 추가하기",
            body: "화면 위에 이미지를 추가해서 설명해보세요.",
            success: "한 화면에 하나의 이미지를 추가할 수 있습니다.",
            position: [84, 7, 0.552955665, 0.0826666667],
            screenUp: false,
            actiondiv: [
                <div
                    onClick={() => {
                        actionAreaMove(32, 15, 0.2623152709, 0.6746666667);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(15, 4, 0.0603448276, 0.8);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(100, 17.5, 0.4975369458, 0);
                    }}
                    className="fullsize"
                ></div>,
                <div onClick={handlechange} className="fullsize"></div>,
            ],
            backgroundDivBefore: ["tutorial_9_1", "tutorial_9_2", "tutorial_9_3", "tutorial_9_4"],
            backgroundDivAfter: "tutorial_9_4",
            tooltipDiv: [
                {
                    body: "이미지 추가하기를 누르세요.",
                    length: "65",
                    arrowPosition: "bottom right",
                    x: "20",
                    y: "46",
                },
                {
                    body: "원하는 이미지를 선택하세요.",
                    length: "60",
                    arrowPosition: "top right",
                    x: "24",
                    y: "48",
                },
                {
                    body: "선택 완료를 누르세요.",
                    length: "50",
                    arrowPosition: "top right",
                    x: "42",
                    y: "15",
                },
                {
                    body: "표시할 시간을 정하세요.",
                    length: "60",
                    arrowPosition: "bottom right",
                    x: "21",
                    y: "41",
                },
            ],
        },
        {
            id: 10,
            title: "음악 추가하기",
            body: "영상에 어울리는 음악을 추가해보세요.\n와이드가 음악을 제공해드립니다.",
            success: "음악의 시작점을 잘 골라보세요.",
            position: [84, 7, 0.552955665, 0.0826666667],
            screenUp: false,
            actiondiv: [
                <div
                    onClick={() => {
                        actionAreaMove(8, 3.5, 0.1896551724, 0.8746666667);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(15, 4, 0.0603448276, 0.8);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(100, 7.5, 0.4359605911, 0);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(100, 7.5, 0.513546798, 0);
                    }}
                    className="fullsize"
                ></div>,
                <div onClick={handlechange} className="fullsize"></div>,
            ],
            backgroundDivBefore: ["tutorial_10_1", "tutorial_10_2", "tutorial_10_3", "tutorial_10_4", "tutorial_10_5"],
            backgroundDivAfter: "tutorial_10_5",
            tooltipDiv: [
                {
                    body: "음악 추가하기를 누르세요.",
                    length: "75",
                    arrowPosition: "bottom right",
                    x: "15",
                    y: "44",
                },
                {
                    body: "원하는 음악을 선택하세요.",
                    length: "60",
                    arrowPosition: "top right",
                    x: "43",
                    y: "29",
                },
                {
                    body: "추가하기를 누르세요.",
                    length: "50",
                    arrowPosition: "top right",
                    x: "32",
                    y: "15",
                },
                {
                    body: "음악에서 어느 부분을 사용할 지를 선택하세요.",
                    length: "75",
                    arrowPosition: "bottom right",
                    x: "10",
                    y: "33",
                },
                {
                    body: "영상 어느 부분에 음악을 추가할 지 선택하세요.",
                    length: "75",
                    arrowPosition: "bottom right",
                    x: "10",
                    y: "41",
                },
            ],
        },
        {
            id: 11,
            title: "효과음 추가하기",
            body: "영상에 어울리는 효과음을 추가해보세요.\n와이드가 효과음을 제공해드립니다.",
            success: "효과음을 잘 사용하면 영상의 집중도가 높아집니다.",
            position: [84, 7, 0.552955665, 0.0826666667],
            screenUp: false,
            actiondiv: [
                <div
                    onClick={() => {
                        actionAreaMove(8, 3.5, 0.1896551724, 0.8746666667);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(15, 4, 0.0603448276, 0.8);
                    }}
                    className="fullsize"
                ></div>,
                <div
                    onClick={() => {
                        actionAreaMove(100, 11.5, 0.4359605911, 0);
                    }}
                    className="fullsize"
                ></div>,

                <div onClick={handlechange} className="fullsize"></div>,
            ],
            backgroundDivBefore: ["tutorial_11_1", "tutorial_11_2", "tutorial_11_3", "tutorial_11_4"],
            backgroundDivAfter: "tutorial_11_4",
            tooltipDiv: [
                {
                    body: "음악 추가하기를 누르세요.",
                    length: "75",
                    arrowPosition: "bottom right",
                    x: "15",
                    y: "44",
                },
                {
                    body: "원하는 음악을 선택하세요.",
                    length: "60",
                    arrowPosition: "top right",
                    x: "43",
                    y: "29",
                },
                {
                    body: "추가하기를 누르세요.",
                    length: "50",
                    arrowPosition: "top right",
                    x: "32",
                    y: "15",
                },
                {
                    body: "음악에서 어느 부분을 사용할 지를 선택하세요.",
                    length: "75",
                    arrowPosition: "bottom right",
                    x: "10",
                    y: "33",
                },
            ],
        },
        {
            id: 12,
            title: "음성 더빙하기",
            body: "영상에 나레이션을 추가해보세요. ",
            success: "설명하고자 하는 바를 말로 잘 풀어보세요.",
            position: [89, 9, 0.5036945813, 0.0533333333],
            screenUp: true,
            actiondiv: [
                <div
                    onClick={() => {
                        actionAreaMove(16, 7.5, 0.5997536946, 0.4213333333);
                    }}
                    className="fullsize"
                ></div>,
                <div onClick={handlechange} className="fullsize"></div>,
            ],
            backgroundDivBefore: ["tutorial_12_1", "tutorial_12_2"],
            backgroundDivAfter: "tutorial_12_3",
            tooltipDiv: [
                {
                    body: "녹음을 원하는 부분을 선택하세요.",
                    length: "75",
                    arrowPosition: "bottom right",
                    x: "15",
                    y: "42",
                },
                {
                    body: "녹음 버튼을 눌러 녹음하세요",
                    length: "60",
                    arrowPosition: "bottom left",
                    x: "34",
                    y: "52",
                },
            ],
        },
    ];

    // 진입 경로에 따라 보여줄 페이지 리스트 정의
    const typelist = [
        {
            type: "influencer",
            page: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        },
        {
            type: "dubbing",
            page: [1, 2, 3, 5, 10, 12],
        },
        {
            type: "chobo",
            page: [1, 2, 3, 5, 10],
        },
        {
            type: "test",
            page: [10,11, 12],
        },
        {
            type: "individual"
        },

    ];

    let selectedPage;
    let pages = [];

    // url에서 선택한 type 받아옴
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    const userType = useMemo(() => typelist.find((e) => e.type === query.type), [query.type]);

    // userType이 지정된 경우
    if (userType !== undefined) {

        // userType이 아닌 individual인 경우 해당 페이지를 호출한다.
        if (query.type === "individual") {
            pages.push(pagesList.find(e => e.id === Number(query.page)));
        }

        // 객체에 등록되어있는 페이지를 찾아서 리스트에 넣는다.
        else{
        selectedPage = userType.page;
        selectedPage.forEach((x, idx, array) => {
            pages.push(pagesList.find((e) => e.id === x));
        });
    }
    } 
    // Usertype이 지정되지 않은 경우 모든 페이지를 불러온다.
    else {
        pages = pagesList;
    }

    // 표시될 Value 저장
    const [value, setValue] = useState({
        title: "",
        body: "",
        pageNum: 0,
        showPageNum: 1,
        maxPageNum: pages.length,
        pageID: pages[0].id,
        success: pages[0].success,
        // nextPageID: pages[1] === undefined ? "" : pages[1].id,
    });

    const nextButtonClick = (e) => {
        // 튜토리얼 종료 여부 확인

        // 1. 튜토리얼 종료 시
        if (value.showPageNum === value.maxPageNum) {
            let chkNewUser;
            query.newUser === "true" ? (chkNewUser = true) : (chkNewUser = false);
            document.location.href = "./end.html?newUser=" + chkNewUser;
        }

        //2. 종료가 아닌 경우
        else {
            // setTimeout(() => {
            // let nextPageID;
            // if (num + 1 < pages.length) {
            //     // 문제 없으면 패스
            // } else {
            //     nextPageID = false;
            // }

            setTransitionToggle({
                ...transitionToggle,
                background: true,
                congraturation: false,
                congraturationButton: false,
            });

            setValue({
                ...value,
                title: pages[num].title,
                body: pages[num].body,
                pageNum: num,
                showPageNum: num + 1,
                percent: (value.showPageNum * 100) / value.maxPageNum,
                pageID: pages[num].id,
                // nextPageID: num+1 >= pages.length ? "" : false,
                success: pages[num].success,
            });

            setSubTaskNum(1);

            setDimPosition({
                ...dimPosition,
                width: pages[num].position[0],
                height: pages[num].position[1],
                top: pages[num].position[2],
                left: pages[num].position[3],
            });

            setScreenUp(pages[num].screenUp);
        }
    };
    // 페이지별 들어가야할 내용 정리

    const nextButton = useRef();
    const firework = <div className="after"></div>;

    // 로딩 시 어둡게 + 알럿바 표시
    useEffect(() => {
        setTransitionToggle({
            ...transitionToggle,
            background: true,
            alert: true,
        });
        setValue({
            ...value,
            title: pages[0].title,
            body: pages[0].body,
            success: pages[0].success,
        });

        setSubTaskNum(1);

        setDimPosition({
            ...dimPosition,
            width: pages[0].position[0],
            height: pages[0].position[1],
            top: pages[0].position[2],
            left: pages[0].position[3],
        });

        setScreenUp(pages[0].screenUp);
    }, []);

    return (
        <>
            <div className="image_wrap" style={{ transform: screenUp ? `translateY(-${upHeight}px)` : "translateY(0)" }}>
                <ActionArea
                    handlechange={handlechange}
                    transitionToggle={transitionToggle}
                    value={value}
                    array={pages}
                    subtaskChange={subtaskChange}
                    subTaskNum={subTaskNum}
                    dimPosition={dimPosition}
                />
            </div>

            <div className={`alert ${transitionToggle.alert ? "alerttoggle" : ""}`}>
                {transitionToggle.background ? (
                    ""
                ) : (
                    <div className={`congraturation ${transitionToggle.congraturation ? "congraturationToggle" : ""}`}>
                        <span className="title"> {value.title} 완료</span>
                        <span className="body"><AddEnter array={value.success} /></span>
                        <button type="button" onClick={nextButtonClick} className={transitionToggle.congraturationButton ? "toggle" : ""} ref={nextButton}>
                            다음
                        </button>
                        {firework}

                    </div>
                )}
                <div className="title">
                    {value.title}
                </div>

                <div className="body">
                    <AddEnter array={value.body} />

                </div>
                <div className="progressBar-root">
                    <div className="progressBar" style={{ transform: `translateX(${-100 + percent}%)` }}></div>
                    <div className="progressBar-text"><span className={percent >= 50 ? "white" : ""}>{Math.round(percent)}%</span><span className={percent >=57 ? "white" : ""}> 완료</span></div>
                </div>
                <div className="exit">
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                            setAlert(true);
                        }}
                    ></button>
                </div>
            </div>

            <Alert alert={alert} setAlert={setAlert} />
        </>
    );
};

function AddEnter({ array }) {
    return array.split("\n").map((line) => {
        return (
            <span>
                {line}
                <br />
            </span>
        );
    });
}
export default Tutorial;
