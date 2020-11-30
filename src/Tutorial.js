import { useEffect, useState } from "react";

import Slider from "react-slick";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import qs from "qs";
import ActionArea from "./ActionArea";
import ImageSlide from "./ImageSlide";
import pagesList from './Pagelist' ;

const Tutorial = ({ history, location }) => {
    const [num, setNum] = useState(0);
    const [percent, setPercent] = useState(0);
    const [transitionToggle, setTransitionToggle] = useState({
        background: false,
        alert: false,
        congraturation: false,
    });
    let newPageNum = 0;
    console.log("tutorial페이지로딩")
    const typelist = [
        {
            type: "influencer",
            page: [1, 2, 3, 4],
        },
        {
            type: "dubbing",
            page: [1, 3, 5],
        },
        {
            type: "chobo",
            page: [1, 2, 3],
        }
    ];

    let selectedPage;
    let pages = [];

    // url에서 선택한 type 받아옴
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    const userType = typelist.find((e) => e.type === query.type);

    // function searchParam(key) {
    //     return new URLSearchParams(location.search).get(key);
    // }
    // const userType = typelist.find((e) => e.type === searchParam('type'));
    //type에 맞는 튜토리얼 골라서 배열에 등록
    if (userType !== undefined) {
        selectedPage = userType.page;
        selectedPage.forEach((x, idx, array) => {
            pages.push(pagesList.find((e) => e.id === x));
        });
        console.log(pages);
    } else {
        pages = pagesList;
    }
    console.log(pages)
    // 표시될 Value 저장
    const [value, setValue] = useState({
        title: "",
        body: "",
        bgImage: "",
        fn: "",
        pageNum: 0,
        showPageNum: 1,
        maxPageNum: pages.length,
        percent: 0,
        pageID: pages[0].id,
        success: pages[0].success,
        nextPageID: pages[1].id
    });

    // action을 취하는 경우
    const handlechange = (e) => {
        console.log(value)
        setNum(num + 1);
        setPercent((value.showPageNum * 100) / value.maxPageNum)



        // setValue({
        //     ...value,
        //     percent: (value.showPageNum * 100) / value.maxPageNum,
        //     // title: pages[num-1].title,
        //     // body: pages[num-1].body
        // });

        // 배경화면 어둡게 한 것 제거
        setTransitionToggle({
            ...transitionToggle,
            background: false,
            alert: true,
            congraturation: false,
        });

        // 0.5초 후 congraturation 표시
        setTimeout(() => {
            setTransitionToggle({
                ...transitionToggle,
                background: false,
                alert: true,
                congraturation: true,
            });
            if (value.showPageNum === value.maxPageNum) {
                // setTimeout(() => {
                    nextButton.current.innerText = "완료"
                // }, 500);
            }
        }, 500);

    };

    const nextButtonClick = (e) => {
        
        // 튜토리얼 종료 여부 확인
        if (value.showPageNum === value.maxPageNum) {
            // setTimeout(() => {
                let chkNewUser;
                query.newUser === "true" ? chkNewUser = true : chkNewUser = false;
                document.location.href = "./end.html?newUser=" + chkNewUser
            // }, 500);
        }

        //종료가 아닌 경우
        else {
            // setTimeout(() => {
                let nextPageID;
                if (num+1 < pages.length) {
                    
                }
                else {
                    nextPageID = false
                }
                setTransitionToggle({
                    ...transitionToggle,
                    background: true,
                    congraturation: false,
                });
                setValue({
                    ...value,
                    title: pages[num].title,
                    body: pages[num].body,
                    pageNum: num,
                    showPageNum: num+1,
                    percent: (value.showPageNum * 100) / value.maxPageNum,
                    pageID: pages[num].id,
                    nextPageID: nextPageID,
                    success: pages[num].success,
                });
                sliderArea.current.slickNext();
                console.log(value);
            // }, 3000);
        }
    }
    // 페이지별 들어가야할 내용 정리

    const sliderArea = useRef();
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
        console.log(value)
    }, []);



    return (
        <>
            <div className="image_wrap">
                <ImageSlide sliderArea={sliderArea} transitionToggle={transitionToggle} />
                <ActionArea handlechange={handlechange} transitionToggle={transitionToggle} value={value} />
            </div>

            <div className={`dim ${transitionToggle.background ? "toggle" : ""}`}></div>

            <div className={`alert ${transitionToggle.alert ? "alerttoggle" : ""}`}>
                <div className={`congraturation ${transitionToggle.congraturation ? "congraturationToggle" : ""}`}>
                    <span className="title"> {transitionToggle.congraturation ? `${value.title} 완료` : ""}</span>
                    <span className="body">{transitionToggle.congraturation ? `${value.success}` : ""}</span>
                    {transitionToggle.congraturation ?<button type="button" onClick={nextButtonClick} ref={nextButton}>다음</button>:""}
                    
                    {transitionToggle.congraturation ? firework : ""}
                </div>
                <div className="title">
                    {value.title} ({value.pageNum + 1}/{value.maxPageNum})
                </div>
                <div className="progressBar-root">
                    <div className="progressBar" style={{ backgroundColor: "rgb(0,115,240)", transform: `translateX(${-100 + percent}%)`, transition: "all 0.3s ease-in-out" }}></div>
                </div>
                <div className="body">
                    {value.body.split("\n").map((line) => {
                        return (
                            <span>
                                {line}
                                <br />
                            </span>
                        );
                    })}
                </div>
            </div>

        </>
    );
};

export default Tutorial;
