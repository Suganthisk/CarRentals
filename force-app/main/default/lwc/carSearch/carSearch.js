import { LightningElement, api } from 'lwc';

export default class CarSearch extends LightningElement {
    @api filterName;
    

    carTypeId = '';
    carRentPrice = '250';
    
    carTypeSelectHandler(event){
        this.carTypeId = event.detail;
    }
    carPriceChangeHandler(event){
        this.carRentPrice = event.detail;
        console.log('carRentPrice:'+this.carRentPrice);
    }
}

