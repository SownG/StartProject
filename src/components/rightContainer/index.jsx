'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Bad from 'material-ui/svg-icons/Social/sentiment-very-dissatisfied';
import Good from 'material-ui/svg-icons/Social/sentiment-very-satisfied';
import Follow from 'material-ui/svg-icons/Action/supervisor-account';
import ListContent from './components/listContent';


const goodIcon = <Good />;
const badIcon = <Bad />;
const nearbyIcon = <IconLocationOn />;
const follow = <Follow />;

require('./styles.less');

export default class RightContainer extends React.Component {

    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.state = {
            selectedIndex: 0,
        };
    }
    select(index) {
        this.setState({ selectedIndex: index })
    }
    render() {
        return <div className="right-content">
            <div className="div-info">
                <img className="avar-picture" src="../../assets/images/lights.jpg"/>
                <div className="avar-username">
                    <p>Jane Doe </p>
                </div>
            </div>
            <div>
                <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="Location"
                            icon={nearbyIcon}
                            onClick={() => this.select(0)}
                        />
                        <BottomNavigationItem
                            label="Good"
                            icon={goodIcon}
                            onClick={() => this.select(1)}
                        />
                        <BottomNavigationItem
                            label="Bad"
                            icon={badIcon}
                            onClick={() => this.select(2)}
                        />
                        <BottomNavigationItem
                            label="Follow"
                            icon={follow}
                            onClick={() => this.select(3)}
                        />
                    </BottomNavigation>
                </Paper>
            </div>
            <div>
                <ListContent/>
            </div>
        </div>
    }
}
