import { LightningElement, api, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import CAR_CHANNEL from '@salesforce/messageChannel/Car__c';

export default class CarTile extends LightningElement {
    @api car;
    @api carSelectedId;

    @wire(MessageContext)
    messageContext;

    handleCarSelect(event){
        event.preventDefault();
        const carId = this.car.Id;

        const carSelect = new CustomEvent('carselect', {detail:carId});
        this.dispatchEvent(carSelect);

        const payload = {
            carId: this.car.Id,
            car: this.car
        };
        publish(this.messageContext, CAR_CHANNEL, payload);
    }
    get isCarSelected(){
        if(this.car.Id === this.carSelectedId)
        {
            return "tile selected"
        }
        return "tile";
    }
}