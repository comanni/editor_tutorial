import { useEffect, useState } from "react";

import Slider from "react-slick";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import qs from 'qs';

const Tutorial = ({ history, location }) => {

    const [num, setNum] = useState(1);
    const [transitionToggle, setTransitionToggle] = useState({
        background: false,
        alert: false,
        congraturation: false,
    });
    let newPageNum = 0;


    const pages1 = [
        {
            id: 1,
            title: "콘텐츠 소재 선택",
            body: "어떤 내용으로 콘텐츠를 만들고 싶은지 선택해보세요.\nwyd가 기획을 도와드릴께요.",
            bgImage: "",

        },
        {
            id: 2,
            title: "titleTest2",
            body: "테스트바디2",
            bgImage: "",
        },
        {
            id: 3,
            title: "titleTest3",
            body: "테스트 3번",
            bgImage: "",
        },
        {
            id: 4,
            title: "titleTest4",
            body: "테스트 4번",
            bgImage: "",
        },
        {
            id: 3,
            title: "titleTest5",
            body: "테스트 5번",
            bgImage: "",
        },
    ];

    const findgogo = [
        {
            type: "youtuber",
            page: [1, 2, 3, 4]
        }
    ]


    let pagelist;
    let pages = [];


        const query = qs.parse(location.search, {ignoreQueryPrefix: true});
        const chkType = query.type;
      //  const pages = pages1.filter( (x, idx, array) => {x.type === 1})
        const userType = findgogo.find((e) => e.type === query.type);
        if (userType !== undefined) {
            pagelist = userType.page;
            pagelist.forEach((x, idx, array) => {
                        pages.push(pages1.find((e) => e.id === x));})
            console.log(pages)
        }




    const [value, setValue] = useState({
        title: "",
        body: "",
        bgImage: "",
        fn: "",
        pageNum: 0,
        showPageNum: 1,
        maxPageNum: 5,
        percent: 0,
    });
    const handlechange = (e) => {
        setNum(num + 1);
        setValue({
            ...value,
            percent: (value.showPageNum * 100) / value.maxPageNum,
        });

        // 배경화면 어둡게 한 것 제거
        setTransitionToggle({
            ...transitionToggle,
            background: false,
        });

        // 0.5초 후 congraturation 표시
        setTimeout(() => {
            setTransitionToggle({
                ...transitionToggle,
                background: false,
                congraturation: true,
            });
        }, 500);

        // 튜토리얼 종료 여부 확인
        if (value.showPageNum === value.maxPageNum) {
            setTimeout(() => { history.push('/end');}, 500)
           
        }

        //종료가 아닌 경우
        else {

            setTimeout(() => {
                slideChange();
                setTransitionToggle({
                    ...transitionToggle,
                    background: true,
                    congraturation: false,
                });
                setValue({
                    ...value,
                    title: pages[num].title,
                    body: pages[num].body,
                    fn: pages[num].fn,
                    pageNum: num,
                    showPageNum: num + 1,
                    percent: (value.showPageNum * 100) / value.maxPageNum,
                });
                console.log(value);
            }, 3000);
        }





    };
    const testfn = (
        <div onClick={handlechange} test="qq" value="tt" style={{ width: "calc(100% - 40px)", height: "48px", margin: "10px 20px", border: "1px solid #333", borderRadius: "4px", lineHeight: "48px" }}>
            테스트
        </div>
    );

    // 페이지별 들어가야할 내용 정리




    const sliderArea = useRef();
    const settings = {
        dots : false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    const slideChange = () => {
        sliderArea.current.slickNext();
    }

    const firework = (
        <div className="after"></div>
    )
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
            fn: pages[0].fn,
        });
        console.log("useEFFECT");
    }, []);

    useEffect(() => {
        console.log(pages, value);
    }, [pages, value]);

    // const [data, setData] = useState({
    //     pageNum: 0,
    //     maxPageNum: 0
    // })
    // URL query에서 받아온 userType 확인
    // const userType = userTypeArray.find((e) => e.type === query.type);

    // Type에 맞게 정리된 페이지가 들어갈 배열
    // const pages = [];

    // useLayoutEffect(() => {
    //     // URL query에서 들어온 값이 유효한 값이라면, type에 맞는 페이지 추출
    //     if (userType !== undefined) {
    //         let pagelist = userType.page;

    //         pagelist.forEach(i => {
    //             pages.push(pages.find((e) => e.id === i));

    //         // for (let i = 0; i < pagelist.length; i++) {
    //         //     pages.push(pages.find((e) => e.id === pagelist[i]));
    //         // }

    //     })
    // }
    // },[]);

    
    return (
        <>
            
                <div className="image_wrap">
                    <Slider ref={sliderArea} {...settings}>
                        <div key={1}><img src="./img/test_image.png" style={{width: "100%"}}></img></div>
                        <div key={2}><img src="./img/test_image.png" style={{width: "100%"}}></img></div>
                        <div key={3}><img src="./img/test_image.png" style={{width: "100%"}}></img></div>
                        <div key={4}><img src="./img/test_image.png" style={{width: "100%"}}></img></div>
                        <div key={5}><img src="./img/test_image.png" style={{width: "100%"}}></img></div>
                    </Slider>
                    <div className={`actionArea ${transitionToggle.background ? "toggle" : ""}`}>
                        <div
                            onClick={handlechange}
                            test="qq"
                            value="tt"
                            style={{ width: "calc(100% - 40px)", height: "48px", margin: "10px 20px", border: "1px solid #333", borderRadius: "4px", lineHeight: "48px" }}
                        >
                            테스트
                        </div>
                    </div>
                </div>
                <div className={`dim ${transitionToggle.background ? "toggle" : ""}`}></div>

                <div className={`alert ${transitionToggle.alert ? "alerttoggle" : ""}`}>
                    <div className={`congraturation ${transitionToggle.congraturation ? "congraturationToggle" : ""}`}>
                        <span> {transitionToggle.congraturation ? "성공" : ""}</span>
                        {transitionToggle.congraturation ? firework : ""}
                    </div>
                    <div className="title">
                        {value.title} ({value.pageNum + 1}/{value.maxPageNum})
                    </div>
                    <div className="progressBar-root">
                        <div className="progressBar" style={{ backgroundColor: "rgb(0,115,240)", transform: `translateX(${-100 + value.percent}%)`, transition: "all 0.3s ease-in-out" }}></div>
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
                {/* <AreaRender pages={pages} maxPageNum={maxPageNum} ></AreaRender> */}
            
        </>
    );
};

export default Tutorial;
