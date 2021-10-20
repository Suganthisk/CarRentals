
import { LightningElement,wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import CAR_CHANNEL from '@salesforce/messageChannel/Car__c';
import LL from '@salesforce/resourceUrl/Leaflet';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CarLocation extends LightningElement {
    car;
    leafletLoaded = false;
    leafletMap;
    subscription = null;

    @wire(MessageContext)
    messageContext;

    subscribeToMessageChannel(){
        this.subscription = subscribe(
            this.messageContext,
            CAR_CHANNEL,
            (message) => {
                this.car = message.car;
                this.fetchCarDetails();

            }
          );
    }
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    fetchCarDetails(){
        if(this.leafletLoaded){
            if(!this.leafletMap){
                const map = this.template.querySelector('.map');
                if(map){
                    this.leafletMap = L.map(map, {zoomControl : true}).setView([42.356045, -71.085650], 13);
                    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {attribution : 'Tiles For Rent A Car'}).addTo(this.leafletMap);
                }
            }
                if(this.car){
                    const location = [this.car.Geolocation__Latitude__s, this.car.Geolocation__Longitude__s];

                    const leafletMarker = L.marker(location);
                    leafletMarker.addTo(this.leafletMap);
                    this.leafletMap.setView(location);
                }

            
        }
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    renderedCallback(){
        if(!this.leafletLoaded){
            Promise.all([
                loadStyle(this, LL+'/leaflet.css'),
                loadScript(this, LL+'/leaflet-src.js')
            ]).then(()=>{
                this.leafletLoaded = true;
            }).catch((error)=>{
                this.showToast('ERROR', error.body.message, 'error');
            })
        }
        
    }
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    get hasCar(){
        if(this.car){
            return 'slds-is-expanded';
        }
        return 'slds-is-collapsed';
    }
    
}