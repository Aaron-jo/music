import React, { useState, useEffect } from 'react'
import axios from '@/request/';
import '../../comm/index.less';

function SongListCollectors({ id }) {
    const [collectors, getCollectors] = useState([]);
    useEffect(() => {
        axios.get('/playlist/subscribers', { params: { id: id } }).then((response) => {
            console.log('收藏者列表：', response.data);
            getCollectors(response.data.subscribers)
        })
    }, [id]);
    return (
        <div className='collectors'>
            {
                collectors.map(item => (
                    <div key={item.userId} className='collector-avatar'>
                        <img src={item.avatarUrl} alt='' />
                        <div>{item.nickname}</div>
                    </div>
                ))
            }
        </div>
    )
}
export default SongListCollectors;
