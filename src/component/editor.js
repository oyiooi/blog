import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class TextEditor extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        let { value } = this.props;
        let { onChange } = this.props;
        return <Editor
        onEditorStateChange={editorState=>{
            onChange(editorState);
        }}
        editorState={value}
        wrapperStyle={{width: '100%',minHeight: '500px',border: '1px solid black'}}></Editor>
    }
   
}
 
export default TextEditor;