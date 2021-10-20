public with sharing class CarSearchFormController {
    @AuraEnabled(cacheable = true)
    public static List<Car_Type__c> getCarTypes(){
        System.debug('Searchhh');
        return[SELECT Id, Name FROM Car_Type__c];
    }
}
