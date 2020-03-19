import Icon from 'antd/es/icon';
import React,{ useState } from 'react';
import './like.scss';
import host from '../../host';

const Like = (props)=>{
    const { id, likeDefault } = props;
    const [like, setLike] = useState(likeDefault);

    const fetchData=()=>{
        if(id){
            fetch(`${host}/article/like/${id}`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            mode: 'cors'
        }).then((res)=>res.json())
        .then(data => setLike(data))
        }
    }

    return <div className='like'><Icon type='like' onClick={fetchData}></Icon><div className='likeCount'>{like}</div></div>
}

export default Like;