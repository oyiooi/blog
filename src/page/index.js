import React, { Component,Suspense } from 'react';
import './page.scss';
import Icon from 'antd/es/icon';
import Like from '../component/like/';
import {CommentCommit} from '../component/comment';
const StoreComments = React.lazy(()=>import(/*webpackChunkName: 'comments'*/'../component/singlecomment'));
import host from '../host';

class Page extends Component {

    constructor(props){
        super(props);
        const id = props.match?props.match.params.id:props.articleId;
        this.state = {
             id: id
         }
    }

    componentDidMount(){
        const id = this.state.id;
        const that = this;
        if(id){
            fetch(`${host}/article/${id}`,{
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            mode: 'cors'   
            }).then(function(res){
                return res.json()
            }).then(function(data){
                that.setState({
                    article: data
                })
            })   
        }   
    }

    componentDidUpdate(preProps){
        if(preProps.match){
            if(!(this.props.match.params.id===preProps.match.params.id)){
                const articleId = this.props.match.params.id;
                const that = this;
                if(articleId){
                    fetch(`${host}/article/${articleId}`,{
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                    mode: 'cors'   
                    }).then(function(res){
                        return res.json()
                    }).then(function(data){
                        that.setState({
                            article: data
                        })
                    })
                } 
            }
        };
        if(this.props.articleId){
                if(this.props.articleId !== preProps.articleId){
                    const articleId = this.props.articleId;
                    const that = this;
                    if(articleId){
                        fetch(`${host}/article/${articleId}`,{
                        method: 'GET',
                        headers: {
                            'content-type': 'application/json'
                        },
                        mode: 'cors'   
                        }).then(function(res){
                            return res.json()
                        }).then(function(data){
                            that.setState({
                                article: data
                            })
                        })
                }
            }
        }       
    }

    render() {
        const { article } = this.state;

        return article?( <div className='pageContainer'>
            <article>
                <h1>{article.title}</h1>
                <div className='details'><span><Icon type='user'/>作者:{article.author}</span><span><Icon type="clock-circle" />日期:2019-12-09</span></div>
                <div className='contentContainer' dangerouslySetInnerHTML = {{ __html:article.editorState }}></div>
                <Like id={article._id} likeDefault={article.like} />
            </article>
            <div className='commit'>
                <CommentCommit></CommentCommit>
            </div>
            <Suspense fallback={<div>loading...</div>}><StoreComments></StoreComments></Suspense>
        </div> ):<div>ing</div>;
    }
}
 
export default Page;