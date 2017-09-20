import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker, GoogleMapLoader, InfoWindow } from "react-google-maps";
import SearchBox from 'react-google-maps/lib/places/SearchBox'
import canUseDOM from "can-use-dom";
import raf from "raf";
import LocationPopup from "../popup/locationPopup";
require('./styles.less');

const geolocation = (
    canUseDOM && navigator.geolocation ?
        navigator.geolocation :
        ({
            getCurrentPosition(success, failure) {
                failure(`Your browser doesn't support geolocation.`);
            },
        })
);

const GettingStartedGoogleMap = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={14}
        center={props.center}
        onClick={props.onMapClick}
        onBoundsChanged={props.onBoundsChanged}
    >
        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP}
            onPlacesChanged={props.onPlacesChanged}
            inputPlaceholder="Customized your placeholder"
            inputClassName="search-location"
        />
        {props.markers.map(marker => (
            <Marker
                {...marker}
                onRightClick={() => props.onMarkerRightClick(marker)}
                onClick={() => props.onMarkerClick(marker)}
            >
               {marker.showInfo && <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
                    <div><LocationPopup/></div>
                </InfoWindow>}
            </Marker>
        ))}

    </GoogleMap>
));

const isUnmounted = false;

export default class DrawingElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: null,
            content: null,
            bounds: null,
            markers: [],
        };

        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
        this.handleMapMounted = this.handleMapMounted.bind(this);
        this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
        this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
        this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
        this.handleMarkerClick = this.handleMarkerClick.bind(this);
        this.handleMarkerClose = this.handleMarkerClose.bind(this);
    }


    componentDidMount() {
        const tick = () => {
            if (this.isUnmounted) {
                return;
            }
            this.setState({ radius: Math.max(this.state.radius - 20, 0) });

            if (this.state.radius > 200) {
                raf(tick);
            }
        };
        geolocation.getCurrentPosition((position) => {
            if (this.isUnmounted) {
                return;
            }
            const nextMarkers = [
                ...this.state.markers,
                {
                    position: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    defaultAnimation: 2,
                    showInfo: false,
                    key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
                },
            ];
            this.setState({
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                },
                markers: nextMarkers,
                content: `Location found using HTML5.`,
            });

            raf(tick);
        }, (reason) => {
            if (this.isUnmounted) {
                return;
            }
            this.setState({
                center: {
                    lat: 60,
                    lng: 105,
                },
                content: `Error: The Geolocation service failed (${reason}).`,
            });
        });
    }
    handleMapLoad(map) {
        this._mapComponent = map;
        if (map) {
            console.log(map.getZoom());
        }
    }

    /*
     * This is called when you click on the map.
     * Go and try click now.
     */
    handleMapClick(event) {
        const nextMarkers = [
            ...this.state.markers,
            {
                position: event.latLng,
                defaultAnimation: 2,
                key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
            },
        ];
        this.setState({
            markers: nextMarkers,
        });

        if (nextMarkers.length === 3) {
            this.props.toast(
                `Right click on the marker to remove it`,
                `Also check the code!`
            );
        }
    }

    handleMarkerRightClick(targetMarker) {
        /*
         * All you modify is data, and the view is driven by data.
         * This is so called data-driven-development. (And yes, it's now in
         * web front end and even with google maps API.)
         */
        const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
        this.setState({
            markers: nextMarkers,
        });
    }

    // Map search function 
    handlePlacesChanged() {
        const places = this._searchBox.getPlaces();

        // Add a marker for each place returned from search bar
        const markers = places.map(place => ({
            position: place.geometry.location,
        }));

        // Set markers; set map center to first search result
        const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

        this.setState({
            center: mapCenter,
            markers,
        });
    }

    handleBoundsChanged() {

    }

    handleSearchBoxMounted(searchBox) {
        this._searchBox = searchBox;
    }


    handleMapMounted(map) {
        this._map = map;
    }

    // Toggle to 'true' to show InfoWindow and re-renders component
    handleMarkerClick(targetMarker) {
        this.setState({
            markers: this.state.markers.map(marker => {
                if (marker === targetMarker) {
                    return  Object.assign(marker, {showInfo: true})
                }
                return marker;
            }),
        });
    }

    handleMarkerClose(targetMarker) {
        this.setState({
            markers: this.state.markers.map(marker => {
                if (marker === targetMarker) {
                    return   Object.assign(marker, {showInfo: false})
                }
                return marker;
            }),
        });
    }

    render() {
        console.log(this.state.markers)
        return (
            <GettingStartedGoogleMap
                center={this.state.center}
                content={this.state.content}
                radius={this.state.radius}
                containerElement={
                    <div style={{ height: '100%' }} />
                }
                mapElement={
                    <div style={{ height: '100%' }} />
                }
                onMapLoad={this.handleMapLoad}
                onMapClick={this.handleMapClick}
                markers={this.state.markers}
                bounds={this.state.bounds}
                onPlacesChanged={this.handlePlacesChanged}
                onMarkerRightClick={this.handleMarkerRightClick}
                onMapMounted={this.handleMapMounted}
                onBoundsChanged={this.handleBoundsChanged}
                onSearchBoxMounted={this.handleSearchBoxMounted}
                onMarkerClose={this.handleMarkerClose}
                onMarkerClick={this.handleMarkerClick}
            />
        );
    }
}
