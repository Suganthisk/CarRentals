public with sharing class CarSearchResultController {
    @AuraEnabled(cacheable = true)
    public static List<Car__c> getCars(String carTypeId, String carRentPrice, String fieldApi){
        Integer carRentalPrice = Integer.valueOf(carRentPrice);
        String queryStr;
        if(String.isEmpty(carTypeId)){
            queryStr = 'SELECT Id, Name, Picture__c, Contact__r.Name, Geolocation__latitude__s, Geolocation__longitude__s FROM Car__c'
            +' WHERE Available_For_Rent__c = true ';
        }else {
            queryStr = 'SELECT Id, Name, Picture__c, Contact__r.Name, Geolocation__latitude__s, Geolocation__longitude__s FROM Car__c'
            +' WHERE Available_For_Rent__c = true AND Car_type__c = :carTypeId ';
        }
        if(fieldApi.equals('Price'))
        {
            queryStr += 'AND Per_Day_Rent__c <' + carRentalPrice;
        }
        else if(fieldApi.equals('Miles'))
        {
            queryStr += 'AND Mileage__c <' + carRentalPrice;
        }
        System.debug('fieldApi'+fieldApi);
        System.debug('queryStr'+queryStr);

        List<Car__c> sobjList = Database.query(queryStr);
return sobjList;
        
        
    }
}
