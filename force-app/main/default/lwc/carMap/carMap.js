import { LightningElement,wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import CAR_CHANNEL from '@salesforce/messageChannel/Car__c';
export default class CarMap extends LightningElement {

    car;
    mapMarkers;
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
        console.log('Fetch Car');
        
        if(this.car){
            console.log(this.car.Geolocation__Latitude__s);
            this.mapMarkers = [
                {
                    location: {
                        Latitude: this.car.Geolocation__Latitude__s,
                        Longitude: this.car.Geolocation__Longitude__s,
                    },
                },
            ];
        } 
        console.log(mapMarkers); 
        
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    
    
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    

    get hasCar(){
        if(this.car){
            return 'slds-is-expanded';
        }
        return 'slds-is-collapsed';
    }
    
}
