import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

require('./styles.less');

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        overflowY: 'auto',
        margin: '0px 0px 0px -2px'
    },
};

const tilesData = [
    {
        img: '../../../assets/images/lights.jpg',
        title: 'Breakfast',
        author: 'jill111',
    },
    {
        img: '../../../assets/images/lights.jpg',
        title: 'Tasty burger',
        author: 'pashminu',
    },
    {
        img: '../../../assets/images/lights.jpg',
        title: 'Camera',
        author: 'Danson67',
    },
    {
        img: '../../../assets/images/lights.jpg',
        title: 'Morning',
        author: 'fancycrave1',
    },
    {
        img: '../../../assets/images/lights.jpg',
        title: 'Hats',
        author: 'Hans',
    },
    {
        img: '../../../assets/images/lights.jpg',
        title: 'Honey',
        author: 'fancycravel',
    },
];
export default class ListContent extends React.Component {


    render() {
        return <div style={styles.root}>
            <GridList
                cellHeight={180}
                style={styles.gridList}
            >
                {tilesData.map((tile) => (
                    <GridTile
                        key={tile.title}
                        title={tile.title}
                        subtitle={<span>by <b>{tile.author}</b></span>}
                        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                    >
                        <img src={tile.img} />
                    </GridTile>
                ))}
            </GridList>
        </div>
    }
}