import React, { useState, useEffect, Fragment } from 'react'
import { Icon } from 'antd';
import './index.less';

function Carousel({ images }) {
    const [currentImg, setCurrentImg] = useState(0);
    const [tempImg, setTempImg] = useState();
    const imgs = [
        'http://p1.music.126.net/GgfqR6NUUJMlMepN8XLnLw==/109951164142807189.jpg',
        'http://p1.music.126.net/jUEFisR1uze9UjLtal2bCw==/109951164142222205.jpg',
        'http://p1.music.126.net/-jz-grk0DBozDTbF2orZtA==/109951164142634416.jpg',
        'http://p1.music.126.net/6ph8Q-NtwgxynomxHinlUw==/109951164142187353.jpg',
        'http://p1.music.126.net/FF7_YzO3CBEBokR-yU5FYw==/109951164143042788.jpg',
        'http://p1.music.126.net/9isB89aPDDL9PnMpNUCdRQ==/109951164142178906.jpg',
        'http://p1.music.126.net/Q9Evu3psIdR4bBGgCNUXiQ==/109951164140641587.jpg',
        'http://p1.music.126.net/ZZQdj1w6N6FPlHgqSlpBJg==/109951164142095668.jpg',
        'http://p1.music.126.net/j2-AO4zWp9EQfEc1gGzPHQ==/109951164142080545.jpg',
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
            <div className='pre' onClick={() => preView()}>
                <Icon type="left" />
            </div>
            {
                currentImg === 0 && (
                    <div className='preImg'>
                        <div className='mask' />
                        <img src={`${imgs[imgs.length - 1]}?param=800y300`} alt={currentImg} />
                    </div>
                )
            }
            {
                imgs.map((item, index) => (
                    <Fragment key={index}>
                        <div className={index === currentImg ? 'currentImg' : (index === currentImg - 1 ? 'preImg' : (index === currentImg + 1 ? 'nextImg' : 'tempImg'))}>
                            <div className='mask' />
                            <img src={`${item}?param=800y300`} alt={currentImg} />
                        </div>
                    </Fragment>
                ))
            }
            {
                currentImg === imgs.length - 1 && (
                    <div className='nextImg'>
                        <div className='mask' />
                        <img src={`${imgs[0]}?param=800y300`} alt={currentImg} />
                    </div>
                )
            }
            <div className='next' onClick={() => nextView()}>
                <Icon type="right" />
            </div>
        </div>
    )
}

export default Carousel;