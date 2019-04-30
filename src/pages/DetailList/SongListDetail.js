import React, {Component, Fragment} from 'react';
import {getQueryString} from '../../Utils/';
import SongTable from './Components/SongTable';
import SongListHeader from './Components/SongListHeader';
import axios from '../../request/';
import _ from 'lodash';

class SongListDetail extends Component {

    state = {
        id: getQueryString('id'),
        songList: [],
        songHeaderInfo: null,
    };

    componentWillMount() {
        if (!this.state.id) return;
        axios.get('/playlist/detail', { params: { id: this.state.id } }).then(response => {
            this.setState({
                songList: response.data.playlist.tracks,
                songHeaderInfo: _.pickBy(response.data.playlist, (value, key) => key !== 'tracks' && key !== 'trackIds')
            })
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        const { songList, songHeaderInfo } = this.state;
        return (
            <Fragment>
                <SongListHeader songHeaderInfo={songHeaderInfo}/>
                <SongTable tableData={songList}/>
            </Fragment>
        );
    }
}

export default SongListDetail;
