import React from "react";
import { Avatar, Icon } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types'
import './index.less';

function Comments({ title, comments = [], style, reply }) {
    const nicknameClick = (userId) => {
        console.log(userId)
    }
    if (comments.length === 0) return '';
    return (
        <div className='comments' style={style}>
            <div style={{ paddingBottom: 10, width: '100%', borderBottom: '1px solid rgb(232,232,232)' }}>{title}</div>
            {
                comments.map(item => (
                    <div className='commentsChunck' key={item.commentId}>
                        <Avatar src={item.user.avatarUrl} style={{ marginRight: 10 }} />
                        <div style={{ width: '100%' }}>
                            <p style={{ marginBottom: 5 }}>
                                <span style={{ cursor: 'pointer', color: 'rgb(0,122,204)' }} onClick={() => nicknameClick(item.user.userId)}>
                                    {item.user.nickname}
                                </span>
                                ：{item.content}
                            </p>
                            {
                                item.beReplied.length ? (
                                    <div className='beReplied'>
                                        <span onClick={() => console.log(item.beReplied[0].user.userId)}>
                                            @{item.beReplied[0].user.nickname}：
                                        </span>
                                        {item.beReplied[0].content}
                                    </div>
                                ) : ''
                            }
                            <div>
                                <span style={{ color: 'rgb(136,136,136)', fontSize: '14px' }}>{moment(item.time).format('YYYY年MM月DD日 HH:mm:ss')}</span>
                                <div className='actionContainer'>
                                    <div style={{ cursor: 'pointer' }} className='tip-off'>举报</div>
                                    <div style={{ borderRight: '1px solid rgb(153,153,153)', margin: '0 10px', height: 10 }} className='tip-off' />
                                    <div style={{ cursor: 'pointer' }}><Icon type="like" style={item.liked ? { color: 'red' } : {}} />{item.likedCount ? `(${item.likedCount})` : ''}</div>
                                    <div style={{ borderRight: '1px solid rgb(153,153,153)', margin: '0 10px', height: 10 }} />
                                    <div style={{ cursor: 'pointer' }}>分享</div>
                                    <div style={{ borderRight: '1px solid rgb(153,153,153)', margin: '0 10px', height: 10 }} />
                                    <div style={{ cursor: 'pointer' }} onClick={() => reply(item.commentId)}>回复</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
Comments.propTypes = {
    title: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    style: PropTypes.object,
    reply: PropTypes.func.isRequired,
}
export default Comments