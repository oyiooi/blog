import Page from '../page/';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    let articleId;
    if(state.getAllData){
        if(state.getAllData.list){
            const index = state.getAllData.list.items.length - 1;
            articleId = state.getAllData.list.items[index]['id'];
        }
    }else{
        articleId = 0;
    }
    return { articleId }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const LastArticle = connect(mapStateToProps,mapDispatchToProps)(Page)

export default LastArticle