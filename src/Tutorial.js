import { useEffect, useState } from "react";


const Tutorial = () => {
    const [num, setNum] = useState(1)
    const [transitionToggle, setTransitionToggle] = useState({
        background: false,
        alert: false,
        congraturation: false
    });
    let newPageNum = 0;

    const [value, setValue] = useState({
        title: "",
        body: "",
        bgImage: "",
        fn:"",
        pageNum:0,
        showPageNum:1,
        maxPageNum: 3,
        percent: 0

    });
    const handlechange = (e) => {
        setNum(num + 1)
        setValue({
            ...value,
            percent: value.showPageNum * 100 / value.maxPageNum
        })
        setTransitionToggle({
            ...transitionToggle,
            background:false
        })
        setTimeout(() => {
            setTransitionToggle({
                ...transitionToggle,
                background:false,
                congraturation: true
            })
            setValue({
                ...value,
                title: pages[num].title,
                body: pages[num].body,
                fn: pages[num].fn,
                pageNum: num,
                showPageNum: num + 1,
                percent: value.showPageNum * 100 / value.maxPageNum
    
            })}, 500)


        console.log(value)

        setTimeout(() => {setTransitionToggle({
            ...transitionToggle,
            background: true,
            congraturation: false
        }); console.log(value)}, 7000)
    }
    const testfn = (
            <div onClick={handlechange} test="qq" value="tt" style={{ width: "calc(100% - 40px)", height: "48px", margin: "10px 20px", border: "1px solid #333", borderRadius: "4px", lineHeight: "48px" }}>테스트</div>
        )
    


    // 페이지별 들어가야할 내용 정리
    const pages = [
        {
            id: 1,
            title: "titleTest1",
            body: "테스트바디\nTest",
            bgImage: "",
            fn:testfn
        },
        {
            id: 2,
            title: "titleTest2",
            body: "테스트바디2",
            bgImage: "",
            fn:testfn
        },
        {
            id: 3,
            title: "titleTest3",
            body: "",
            bgImage: "",
        },
    ];





    useEffect(() => {
        setTransitionToggle({
            ...transitionToggle,
            background: true,
            alert: true
        });
        setValue({
            ...value,
            title: pages[0].title,
            body: pages[0].body,
            fn: pages[0].fn,
        });
        console.log("useEFFECT")
    },[])

    useEffect(() => {
        console.log(pages, value)
    }, [pages, value])
    



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
            <div>
            <div className="image_wrap">
                <img className="background" src="/img/test_image.png"></img>
                <div className={`actionArea ${transitionToggle.background ? "toggle" : ""}`}>
                <div onClick={handlechange} test="qq" value="tt" style={{ width: "calc(100% - 40px)", height: "48px", margin: "10px 20px", border: "1px solid #333", borderRadius: "4px", lineHeight: "48px" }}>테스트</div>
      
                </div>
            </div>
            <div className={`dim ${transitionToggle.background ? "toggle" : ""}`}></div>

            <div className={`alert ${transitionToggle.alert ? "alerttoggle" : ""}`}>
                <div className={`congraturation ${transitionToggle.congraturation ? "congraturationToggle" : ""}`}><span> {transitionToggle.congraturation ? "성공" : ""}</span></div>
    <div className="title">{value.title} ({value.pageNum + 1}/{value.maxPageNum})</div>
                <div className="progressBar-root">
                    <div className="progressBar" style={{ backgroundColor: "rgb(0,115,240)", transform: `translateX(${-100 + value.percent}%)` ,transition: "all 0.3s ease-in-out"}}></div>
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
            </div>
        </>
    );
};

export default Tutorial;
