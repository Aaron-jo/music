import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Icon} from 'antd';
import '../../App.less';

class PlayingSong extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    // 查看歌手
    checkArtist(id) {
        console.log(id)
    }

    // 收藏
    collectSong(id) {

    }

    // 分享
    share(id) {

    }

    render() {
        // const {} = this.state;
        if (!this.props.list.length) return <div className='playingSong-none'>暂无播放歌曲</div>;
        const {currentPlayIndex, list} = this.props;
        const currentSong = list[currentPlayIndex];
        let src = currentSong.al.picUrl;
        return (
            <div className='playingSong'>
                <div style={{position: 'relative'}}>
                    <img style={{width: 48, height: 48, cursor: 'pointer'}} alt='图片'
                         src={`${src}?param=48y48&quality=100`}/>
                    <div className='playIconInImg'>
                        <Icon type="arrows-alt"/>
                    </div>
                </div>
                <div style={{width: 155, padding: '0 5px', cursor: 'pointer',}}>
                    <div title={currentSong.name}
                         style={{
                             textOverflow: 'ellipsis',
                             overflow: 'hidden',
                             whiteSpace: 'nowrap',
                         }}>{currentSong.name}</div>
                    <div title={currentSong.ar.map(item => item.name).join('/')}
                         style={{
                             fontSize: '12px',
                             color: '#b7b9bb',
                             textOverflow: 'ellipsis',
                             overflow: 'hidden',
                             whiteSpace: 'nowrap',
                         }}>
                        {
                            currentSong.ar.map((item, index) => {
                                if (index === currentSong.ar.length - 1) {
                                    return <span onClick={this.checkArtist.bind(this, item.id)}
                                                 key={item.id}>{item.name}</span>
                                } else {
                                    return <Fragment key={item.id}>
                                        <span onClick={this.checkArtist.bind(this, item.id)}>{item.name}</span>/
                                    </Fragment>
                                }
                            })
                        }
                    </div>
                </div>
                <div style={{width: 15, fontSize: '15px'}}>
                    <div onClick={this.collectSong.bind(this, currentSong.id)}><Icon type="heart"/></div>
                    <div onClick={this.share.bind(this, currentSong.id)}><Icon type="share-alt"/></div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        ...state.currentPlayList
    })
)(PlayingSong);
