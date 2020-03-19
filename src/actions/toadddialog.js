const toAddDialog = (data,index)=>{
    return {type: 'To_Add_Dialog',
    content: data,
    index: index
 }
}

export default toAddDialog;