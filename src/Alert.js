const Alert = ({alert, setAlert}) => {
    const handleCancel = () => {
        setAlert(false);
    };

    const handleOk = () => {
        const UA = navigator.userAgent.toLowerCase();
        if (UA.indexOf("android") >-1){
            window.android.closePopupWindow();
        }
        else if (UA.indexOf("iphone")>-1||UA.indexOf("ipad")>-1||UA.indexOf("ipod")>-1){
            window.webkit.messageHandlers.closePopupWindow.postMessage("");
        }
       
    };
    return (
        <>
        {alert &&
            <div className="alert_area">
                <div className="alert_simple">
                    <div className="content">
                        <p className="alert_text">튜토리얼을 종료하시겠습니까?</p>
                    </div>
                    <div className="btn-area">
                        <button className="btn-primary-gray alert__simple__cancel" type="button" onClick={handleCancel}>
                            취소
                        </button>
                        <button className="btn-primary alert__simple__done" type="button" id="test" onClick={handleOk}>
                            종료
                        </button>
                    </div>
                </div>
            </div>
}
        </>
    );
};

export default Alert;
