import React, {useState, useEffect, Fragment} from 'react'
import {Button, Avatar} from 'antd';
import {convertToMillion} from "@/Utils";
import moment from 'moment';
import {getQueryString} from '@/Utils/index';
import {createHashHistory} from 'history';
import axios from '@/request/index';

function ArtisteDetail(props) {
    const ButtonGroup = Button.Group;
    const [artisteInfo, setArtisteInfo] = useState({});
    useEffect(() => {
        const history = createHashHistory();
        const artisteId = getQueryString(history.location.search, 'id');
        console.log(artisteId);
        axios.get(`/artists`, {params: {id: artisteId}}).then(response => {
            console.log(response);
            setArtisteInfo(response.data.artist)
        });
    }, []);
    return (
        <Fragment>
            <div style={{padding: '20px 0', display: 'flex'}}>
                <div style={{width: 250, height: 250, margin: '0 40px'}}>
                    <img src={`${artisteInfo.picUrl}?param=250y250`} alt={artisteInfo.name}/>
                </div>
                <div style={{flexGrow: 1, paddingRight: 20}}>

                </div>
            </div>
        </Fragment>
    )
}

export default ArtisteDetail;
