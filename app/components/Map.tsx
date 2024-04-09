"use client";
//leaflet needs the window object
import {MapContainer,TileLayer,Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCountries } from '../lib/getCountries';
import {icon } from 'leaflet';

const Icon = icon({
    iconUrl:'https://png.pngtree.com/png-clipart/20230805/original/pngtree-map-marker-flat-red-color-icon-ui-position-placement-vector-picture-image_9756810.png',
    iconSize:[30,30],

})

export default function Map({locationValue}:{locationValue:string}) {
    const {getCountryByValue} = useCountries();
    const latlang=getCountryByValue(locationValue)?.latLang;
    // if exists find the latitiude and longitude of the country
    return(
        <MapContainer 
            scrollWheelZoom={false} 
            className='h-[50vh] rounded-lg relative z-0'
            center={latlang?? [51.505, -0.09]}
            zoom={8}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={latlang?? [51.505, -0.09]} icon={Icon}/>
        </MapContainer>
    );
}