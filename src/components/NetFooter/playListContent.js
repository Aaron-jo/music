import React, {Component} from 'react';
import './index.less';

class playListContent extends Component {

    state = {
        visible: this.props.visible || false
    };

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div id='play-list-content'>
                播放列表
            </div>
        );
    }
}

export default playListContent;
