import { useEffect, useState } from "react";

const ActionArea = ({ handlechange, transitionToggle, value }) => {
    const [id, setId] = useState(value.pageID);
    const [extractedDiv, setExtractedDiv] = useState("");

    const test = [
        {
            id: 1,
            div: (
                <div
                    onClick={handlechange}
                    test="qq"
                    value="tt"
                    style={{ width: "calc(100% - 40px)", height: "48px", margin: "10px 20px", border: "1px solid #333", borderRadius: "4px", lineHeight: "48px" }}
                >
                    테스트1
                </div>
            ),
        },
        {
            id: 2,
            div: (
                <div
                    onClick={handlechange}
                    test="qq"
                    value="tt"
                    style={{ width: "calc(100% - 40px)", height: "48px", margin: "10px 20px", border: "1px solid #333", borderRadius: "4px", lineHeight: "48px" }}
                >
                    테스트2
                </div>
            ),
        },
        {
            id: 3,
            div: (
                <div
                    onClick={handlechange}
                    test="qq"
                    value="tt"
                    style={{ width: "calc(100% - 40px)", height: "48px", margin: "10px 20px", border: "1px solid #333", borderRadius: "4px", lineHeight: "48px" }}
                >
                    테스트3
                </div>
            ),
        },
        {
            id: 4,
            div: (
                <div
                    onClick={handlechange}
                    test="qq"
                    value="tt"
                    style={{ width: "calc(100% - 40px)", height: "48px", margin: "10px 20px", border: "1px solid #333", borderRadius: "4px", lineHeight: "48px" }}
                >
                    테스트4
                </div>
            ),
        },
        {
            id: 5,
            div: (
                <div
                    onClick={handlechange}
                    test="qq"
                    value="tt"
                    style={{ width: "calc(100% - 40px)", height: "48px", margin: "10px 20px", border: "1px solid #333", borderRadius: "4px", lineHeight: "48px" }}
                >
                    테스트5
                </div>
            ),
        },
    ];

    // div 내용 추출

    useEffect(() => {
        console.log(value)
        // if (value.nextPageID === false) {
        // } else {
            setId(value.nextPageID);
            console.log(id);
            setExtractedDiv(test.find((x, idx, array) => x.id === value.pageID).div);
        // }
    }, [value.pageID]);

    return (
        <>
            <div className={`actionArea ${transitionToggle.background ? "toggle" : ""}`}>{extractedDiv}</div>
        </>
    );
};

export default ActionArea;
