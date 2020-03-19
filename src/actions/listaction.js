 export function fetchingStart (kind) {
    return {
        type: 'fetchingStart',
        kind: kind    
    }
}

export function fetchingSuccess(kind,items) {
    return {
        type: 'fetchingSuccess',
        kind,
        items
    }
}

export function fetchingError(kind,error){
    return {
        type: 'fetchingError',
        kind,
        error
    }
}

export default function fetching(kind,url){

    return function(dispatch){
        dispatch(fetchingStart(kind));

        return fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(res => res.json())
        .then((data)=>{
            dispatch(fetchingSuccess(kind,data))
        }).catch((err)=>dispatch(fetchingError(kind,err)))
    } 
}