import React from 'react';
import Dropzone from 'react-dropzone';
require('./styles.less');
import axios from 'axios';

export default class LocationPopup extends React.Component {

    constructor() {
        super()
        this.state = { files: [] }
    }

    onDrop(files) {
        debugger
        let data = new FormData();
        this.setState({
            files
        })
        data.append('file', files[0]);
        var options = {
            urls: ['http://nodejs.org/'],
            directory: '/locationPopup',
        };

        // with promise
        scrape(options).then((result) => {
            debugger
        }).catch((err) => {
            /* some code here */
        });

        // or with callback
        scrape(options, (error, result) => {
            /* some code here */
        });
        // return axios({
        //     method: 'post',
        //     url: 'http://api.test.dev:8081/user/uploadFile/2',
        //     data,
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }).then((res) => {
        //     return res.data;
        // });

    }

    render() {
        let dropzoneRef;
        return (
            <section>
                <div >
                    <button type="button">
                        <Dropzone name="Upload" onDrop={this.onDrop.bind(this)} accept="image/jpeg, image/png" className="up-load-button">
                            <span>Upload</span>
                        </Dropzone>
                    </button>
                </div>
                <aside>
                    {
                        this.state.files.map(f => <img src={f.preview} className="image-preview" />)
                    }
                </aside>
            </section>
        );
    }
}