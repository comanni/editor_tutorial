
import Slider from "react-slick";

const ImageSlide = ({sliderArea, transitionToggle}) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (

        <>
                <Slider ref={sliderArea} {...settings}>
                    <div key={1}>
                        <img src="./img/test_image.png" style={{ width: "100%" }}></img>
                        
                    </div>
                    <div key={2}>
                        <img src="./img/test_image.png" style={{ width: "100%" }}></img>
                    </div>
                    <div key={3}>
                        <img src="./img/test_image.png" style={{ width: "100%" }}></img>
                    </div>
                    <div key={4}>
                        <img src="./img/test_image.png" style={{ width: "100%" }}></img>
                    </div>
                    <div key={5}>
                        <img src="./img/test_image.png" style={{ width: "100%" }}></img>
                    </div>
                </Slider>
        </>
    )
}

export default ImageSlide