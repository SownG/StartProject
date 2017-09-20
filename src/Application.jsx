import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DrawingElement from './components/layout';
import RightContainer from './components/rightContainer';
import TextEditor from './components/textEditor';

require('../assets/style/css/styles.less')
export default class Application extends React.Component {
    render() {
        return <MuiThemeProvider>
            <div id="app">
                <div className="content-block-1">
                    <div className="content-ui">
                        <DrawingElement />
                    </div>
                </div>
                <div className="content-block-2">
                    <RightContainer/>
                </div>
            </div>
        </MuiThemeProvider>
    }
}


