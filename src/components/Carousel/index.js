import React, { useState, useEffect } from 'react'
import './index.less';

function Carousel({ images }) {
    const [currentImg, setCurrentImg] = useState(0);
    const [tempImg, setTempImg] = useState();
    const imgs = [
        'http://p1.music.126.net/4c5V2FSe2bP8EkPKxZ4Nwg==/109951164140639152.jpg',
        'http://p1.music.126.net/ZUPv1SQUv5lQjTisjtC2mw==/109951164138099719.jpg',
        'http://p1.music.126.net/4c5V2FSe2bP8EkPKxZ4Nwg==/109951164140639152.jpg',
        'http://p1.music.126.net/ZUPv1SQUv5lQjTisjtC2mw==/109951164138099719.jpg',
    ];
    useEffect(() => {

    });
    const preView = () => {
        let preView = currentImg - 1;
        if (preView < 0) {
            preView = imgs.length - 1
        }
        setCurrentImg(preView);
    }
    const nextView = () => {
        let nextView = currentImg + 1;
        if (nextView > imgs.length - 1) {
            nextView = 0
        }
        setCurrentImg(nextView);
    }
    return (
        <div className='caroselWrapper'>
            <div className='pre' onClick={() => preView()} />
            <div className='preImg'>
                <div className='mask' />
                <img src={`${imgs[currentImg - 1 < 0 ? imgs.length - 1 : currentImg - 1]}?param=800y300`} alt={currentImg - 1} />
            </div>
            <div className='currentImg'><img src={`${imgs[currentImg]}?param=800y300`} alt={currentImg} /></div>
            <div className='tempImg'><img src={`${imgs[currentImg]}?param=800y300`} alt={currentImg} /></div>
            <div className='nextImg'>
                <div className='mask' />
                <img src={`${imgs[currentImg + 1 > imgs.length - 1 ? 0 : currentImg + 1]}?param=800y300`} alt={currentImg + 1} />
            </div>
            <div className='next' onClick={() => nextView()} />
        </div>
    )
}

export default Carousel;