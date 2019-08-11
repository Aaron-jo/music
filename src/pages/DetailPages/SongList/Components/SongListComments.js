import React, { useState, useEffect } from "react";
import { Button, Input } from 'antd';
import axios from '@/request/';
import Comments from '@/components/Comments';
import PropTypes from 'prop-types'
import '../../comm/index.less';

function SongListComments({ id }) {
    const [comments, setComments] = useState([]);
    const [hotComments, setHotComments] = useState([]);

    useEffect(() => {
        axios.get('/comment/playlist', {
            params: {
                id: id
            }
        }).then((response) => {
            setComments(response.data.comments);
            setHotComments(response.data.hotComments);
        })
    }, [id]);

    const TextArea = Input.TextArea;
    return (
        <div style={{ padding: '20px 30px' }}>
            <div className='commentTextArea'>
                <TextArea rows={3} />
                <div className='comment-operator'><Button>评论</Button></div>
            </div>
            <Comments title='热门评论' comments={hotComments} reply={(commentId) => console.log(commentId)} />
            <Comments title='最新评论' comments={comments} style={{marginTop: 100}} reply={(commentId) => console.log(commentId)} />
        </div>
    )
}
SongListComments.propTypes = {
    id: PropTypes.string.isRequired
};
export default SongListComments
