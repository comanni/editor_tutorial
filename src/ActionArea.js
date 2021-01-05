import { useEffect, useState } from "react";


const ActionArea = ({ transitionToggle, value, array, subTaskNum, dimPosition, setScreenUp }) => {
    const [actionDiv, setActionDiv] = useState("");
    const [backgroundDivBefore, setBackgroundDivBefore] = useState("");
    const [backgroundDivAfter, setBackgroundDivAfter] = useState("");
    const [toolTip, setToolTip] = useState("");
    const [url, setUrl] = useState(`./img/${backgroundDivBefore}.png`);
    const [dimTop, setDimTop] = useState(0);
    const [dimLeft, setDimLeft] = useState(0);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    // div 내용 추출

    useEffect(() => {
        console.log(value);

        let currentArray = array.find((x) => x.id === value.pageID);
        let backBefore = currentArray.backgroundDivBefore[subTaskNum - 1];
        let backAfter = currentArray.backgroundDivAfter;

        setActionDiv(currentArray.actiondiv[subTaskNum - 1]);
        setBackgroundDivBefore(backBefore);
        setBackgroundDivAfter(backAfter);
        setToolTip(currentArray.tooltipDiv[subTaskNum - 1]);
        setUrl(`./img/${backBefore}.png`);
        // }
    }, [value.pageID, subTaskNum]);

    // 단계별, 화면 width 변화에 따른 DIM 위치 계산
    useEffect(() => {
        setDimTop(dimPosition.top * innerWidth * 2.1653333333);
        setDimLeft(dimPosition.left * innerWidth);
    }, [dimPosition, innerWidth]);

    //화면 비율 변경에 따른 width 계산
    useEffect(() => {
        function reportWindowSize() {
            setInnerWidth(window.innerWidth);
        }
        // Trigger this function on resize
        window.addEventListener("resize", reportWindowSize);
        //  Cleanup for componentWillUnmount
        return () => window.removeEventListener("resize", reportWindowSize);
    }, []);

    return (
        <>
            <div className={`backgroundDivAfter${transitionToggle.background ? "" : " backgroundtoggle"}`}>
                <img src={`./img/${backgroundDivAfter}.png`} className="transition03s"></img>
            </div>
            <div className={`backgroundDivBefore${transitionToggle.background ? " backgroundtoggle" : ""}`}>

                {array
                    .find((x, idx, array) => x.id === value.pageID)
                    .backgroundDivBefore.map((e, i) => (
                        <>
                            <img src={`./img/${e}.png`} style={{ opacity: i === subTaskNum - 1 ? "1" : "0" }} className="transition03s backImg"></img>
                        </>
                    ))}
            </div>

            <div className="backgroundArea">
                <img src="./img/background.png"></img>
            </div>

            <div className={`actionArea${transitionToggle.background ? " toggle" : ""}`}>
                <div
                    className="content"
                    style={{
                        width: `${dimPosition.width}%`,
                        height: `${dimPosition.height}%`,
                        borderWidth: `${dimTop}px 2000px 2000px ${dimLeft}px`,
                        display: transitionToggle.background ? "block" : "none",
                    }}
                >
                    {actionDiv}
                </div>
                {toolTip.body === "" ? (
                    ""
                ) : (
                    <div className="arrow_wrap" style={{ width: `${toolTip.length}%`, left: `${toolTip.x}%`, top: `${toolTip.y}%` }}>
                        <div className={`arrow_box ${toolTip.arrowPosition}`}>{toolTip.body}</div>
                    </div>
                )}
            </div>
        </>
    );
};


export default ActionArea;
