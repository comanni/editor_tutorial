import "~slick-carousel/slick/slick.css"; 
import "~slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef } from "react";

const Slide = () => {
    const sliderArea = useRef();
const settings = {
    dots : false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
}

const 
    return (
        <>
            <Slider ref={sliderArea} {...settings}>
                <div key={1}>
                    test1
                </div>
                <div key={2}>
                    test2
                </div>
                <div key={3}>
                    test3
                </div>
                <div key={4}>
                    test4
                </div>
                <div key={5}>
                    test5
                </div>
            </Slider>
        </>
    )
}

export default Slide