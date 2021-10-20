import { LightningElement,api } from 'lwc';

export default class CarRentFilter extends LightningElement {
    @api filterName;
    rentPriceFilter = false;
    milesFilter = false;
    
    price = 250;
    miles= 25000;

    connectedCallback(){
        if(this.filterName === 'Price') {
            this.rentPriceFilter = true;
        }
        if(this.filterName === 'Miles') {
            this.milesFilter = true;
        }
    }
    handlePriceChange(event){
        this.price = event.detail.value;
        // Dispatches the priceRange event.
        this.dispatchEvent(new CustomEvent('pricerangechange', { detail: this.price}));
    }
    handleMilesChange(event){
        this.miles = event.detail.value;
        console.log('this.miles: '+this.miles);
        // Dispatches the priceRange event.
        this.dispatchEvent(new CustomEvent('pricerangechange', { detail: this.miles}));
    }

}