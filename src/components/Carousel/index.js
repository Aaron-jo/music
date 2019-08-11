import React, { useState, Fragment } from 'react'
import { Icon } from 'antd';
import './index.less';


function Carousel({ images }) {
    const [currentImg, setCurrentImg] = useState(0);

    const preView = () => {
        let preView = currentImg - 1;
        if (preView < 0) {
            preView = images.length - 1
        }
        setCurrentImg(preView);
    }
    const nextView = () => {
        let nextView = currentImg + 1;
        if (nextView > images.length - 1) {
            nextView = 0
        }
        setCurrentImg(nextView);
    }
    if (images.length === 0) {
        return <div className='caroselWrapper' />
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
                        <img src={`${images[images.length - 1].imageUrl}?param=800y300`} alt={currentImg} />
                    </div>
                )
            }
            {
                images.map((item, index) => (
                    <Fragment key={index}>
                        <div className={index === currentImg ? 'currentImg' : (index === currentImg - 1 ? 'preImg' : (index === currentImg + 1 ? 'nextImg' : 'tempImg'))}>
                            <div className='mask' />
                            <img src={`${item.imageUrl}?param=800y300`} alt={currentImg} />
                        </div>
                    </Fragment>
                ))
            }
            {
                currentImg === images.length - 1 && (
                    <div className='nextImg'>
                        <div className='mask' />
                        <img src={`${images[0].imageUrl}?param=800y300`} alt={currentImg} />
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