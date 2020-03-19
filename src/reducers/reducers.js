import { combineReducers } from 'redux';

const comments=[
    {
        name: 'wang',
        content: 'xiedebucuo',
        dialog: [
            {
                name: 'zhegn',
                content: 'haodexiexie',
                to: 'wang'
            },
            {
                name: 'wang',
                content: 'waodfjliej;ljfdsf',
                to: 'zhege'
            }
        ]
    },{
        name: 'zhao',
        content: 'diertiaodfjla;sdjiojr ucuo',
        dialog: [
            {
                name: 'li',
                content: 'haodexfasdfasdfaiexie',
                to: 'zhoa'
            },
            {
                name: 'zhao',
                content: 'waodfjliejdfasdfafgfffff;ljfdsf',
                to: 'li'
            }
        ]
    }
];

function commentsReducer (state=comments,action){
    switch (action.type) {
        case 'To_Add_Dialog':
            return {comments:state.comments.map((item,index)=>{
                return index===action.index?Object.assign({},item,{dialog:(item.dialog||[]).concat([action.content])}):item
            })}
        case 'To_Add_Comment':
            return {comments: state.comments.concat([action.comment])} 
        default:
            return state
    }
}

function getData(state={
    fetching: false,
    isValidate: false,
    items: []
},action){
    switch (action.type){
        case 'fetchingStart' :
            return {fetching: true,isValidate: false,items: []};
        case 'fetchingSuccess' :
            return {fetching: false,isValidate: true, items: action.items};
        case 'fetchingError' :
            return { fetching: false, isValidate: false, items: action.error};
        default :
            return state
    }
}

function getAllData(state={},action){
    switch (action.type){
        case 'fetchingStart':
        case 'fetchingSuccess':
        case 'fetchingError':
            return Object.assign({},state,{[action.kind]: getData(state[action.kind],action)})
        default: 
            return state
    }
}

const reducers = combineReducers({
    comments: commentsReducer,
    getAllData
})

export default reducers;