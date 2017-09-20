import React from 'react';
import ReactQuill from 'react-quill';
require('./styles.less');

const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ]
}

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export default class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { editorHtml: '' }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(html) {
        console.log(html)
        this.setState({ editorHtml: html });
    }

    

    render() {
        return (
            <ReactQuill
                theme={'snow'}
                onChange={this.handleChange}
                value={this.state.editorHtml}
                modules={modules}
                formats={formats}
                placeholder={this.props.placeholder}
            />
        )
    }
}
