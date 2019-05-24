import React from "react";
import { Avatar } from 'antd';
import moment from 'moment';
import './index.less';

function Comments({ title, comments, style, reply }) {
    return (
        <div className='comments' style={style}>
            <div style={{ paddingBottom: 10, width: '100%', borderBottom: '1px solid rgb(232,232,232)' }}>{title}</div>
            {
                comments.map(item => (
                    <div className='commentsChunck' key={item.commentId}>
                        <Avatar src={item.user.avatarUrl} style={{ marginRight: 10 }} />
                        <div style={{ width: '100%' }}>
                            <p style={{ marginBottom: 5 }}>
                                <span style={{ cursor: 'pointer', color: 'rgb(0,122,204)' }} onClick={() => this.nicknameClick(item.user.userId)}>
                                    {item.user.nickname}
                                </span>
                                ：{item.content}
                            </p>
                            <div>
                                <span style={{ color: 'rgb(136,136,136)', fontSize: '14px' }}>{moment(item.time).format('YYYY年MM月DD日 HH:mm:ss')}</span>
                                <div style={{ float: 'right', display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: '12px', color: 'rgb(153,153,153)', marginRight: 20 }}>
                                    <div>赞</div>
                                    <div style={{ borderRight: '1px solid rgb(153,153,153)', margin: '0 10px', height: 10 }} />
                                    <div>分享</div>
                                    <div style={{ borderRight: '1px solid rgb(153,153,153)', margin: '0 10px', height: 10 }} />
                                    <div onClick={reply}>回复</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default Comments