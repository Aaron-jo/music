import React, {Fragment, useState, useEffect} from 'react';
import axios from '@/request/index';
import moment from 'moment';
import {Icon} from "antd";

function AlbumCover({ artistId }) {
    const [albums, setAlbums] = useState([]);
    useEffect(() => {
        const getAlbum = (id) => {
            axios.get(`/artist/album`, { params: { id: id } }).then(response => {
                setAlbums(response.data.hotAlbums)
            });
        };
        getAlbum(artistId);
    }, [artistId]);
    const play = (e, item) => {
        e.stopPropagation();
    };
    const gotoAlbumDetail = (e, item) => {
        e.stopPropagation();
    };
    return (
        <Fragment>
            <div style={{
                width: '100%',
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'space-between',
                padding: '20px'
            }}>
                {
                    albums.length > 0 && albums.map((item) => (
                        <div style={{ width: 180, height: 230, margin: '10px 50px' }} key={item.id}>
                            <div className='cover-container' style={{ position: 'relative', cursor: 'pointer' }}>
                                <img src={`${item.blurPicUrl}?param=140y140`} alt=''
                                     onClick={(e) => gotoAlbumDetail(e, item)}
                                     style={{ border: '1px solid #e8e8e8', width: 180, height: 180 }}/>
                                <div className='playIconInImg' style={{ bottom: 15 }}
                                     onClick={(e) => play(e, item)}>
                                    <Icon type="caret-right"/>
                                </div>
                            </div>
                            <div>
                                <div>{item.name}</div>
                                <div>{moment(item.publishTime).format('YYYY-MM-DD')}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Fragment>
    )
}

export default AlbumCover
