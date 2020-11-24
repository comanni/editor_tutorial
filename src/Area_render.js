import { useState, useEffect } from "react";

const AreaRender = ({ resultPages, maxpageNum }) => {
    const [transitionToggle, setTransitionToggle] = useState(false);
    const [value, setValue] = useState({
        title: "",
        body: "",
        bgImage: "",
        fn:"",
        pageNum:"0"

    });

    console.log(resultPages);
    // console.log(data.maxPageNum)
    useEffect(() => {
        setTransitionToggle(true);

        setValue({
            ...value,
            title: resultPages[value.pageNum].title,
            body: resultPages[value.pageNum].body,
            fn: resultPages[value.pageNum].fn,
        });
        console.log(value)

    }, []);
console.log(maxpageNum)
    // const testfn = () => {

    //     return(
    //         <div style={{ width: "calc(100% - 40px)", height: "48px", margin: "10px 20px", border: "1px solid #333", borderRadius: "4px", lineHeight: "48px" }}>테스트</div>
    //     )
    // }
    return (
        <>
            <div className="image_wrap">
                <img className="background" src="/img/test_image.png"></img>
                <div className={`actionArea ${transitionToggle ? "toggle" : ""}`}>
                   {value.fn}
                </div>
            </div>
            <div className={`dim ${transitionToggle ? "toggle" : ""}`}></div>

            <div className={`alert ${transitionToggle ? "alerttoggle" : ""}`}>
                <div className="title">{value.title} {maxpageNum}</div>
                <div className="progressBar-root">
                    <div className="progressBar" style={{ backgroundColor: "rgb(0,115,240)", transform: "translateX(-50%)" }}></div>
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

export default AreaRender;
