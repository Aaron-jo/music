import React, {Component} from 'react';
import {connect} from 'react-redux';
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

    render() {
        // const {} = this.state;
        if (!this.props.list.length) return <div className='playingSong-none'>暂无播放歌曲</div>;
        const {playWay, shuffleList, currentPlayIndex, list} = this.props;
        return (
            <div className='playingSong'>
                <div>
                    <img style={{width: 48, height: 48}} alt='图片'
                         src={`${playWay === 3 ? list[shuffleList[currentPlayIndex].originalIndex].al.picUrl : list[currentPlayIndex].al.picUrl}?param=48y48&quality=100`}/>
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
