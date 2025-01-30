namespace Net8UnitTests
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            var cns = "michael.wolfgang.dev.client,CRMCustomerServiceClient,proper-apigee-prod,testdrive-service-prod-client,kmx-sms-convo-client-prod,partnership-appraisals-client-prod,CarmaxOnlineIdentityPreQualify,TransferMicrositeProd,CustomerLeadsMicrosite,ReservationService,CheckoutSiteV2Prod,CheckoutSiteV3Prod,SUYC-AppointmentsApiClient-PROD,DocumentCenter,appointmentserviceclient,SavedSearchAlertsProd,MobileAppsGateway-prod,esign-microsite-prod,picsy-client-prod,b2b-salesforce-contact-identity-prod,appraisalcheckout-client-prod,NextBestActionProd,vehicle-apigee-client-prod,SFtoInstantOfferProd,CustomerActivityMicrositeProd,instant-offers-client-prod,tndrhldrprod";

            var cnlist = cns.Split(",");
            Console.WriteLine(cnlist.Length);

            Assert.Equal(27, cnlist.Length);

        }

        [Fact]
        public void UmsClientCount()
        {
            var cns = "michael.wolfgang.dev.client,QA-Haseeb,CRMCustomerServiceClient,proper-apigee-prod,CustomerLeadsMicrosite,TransferMicrositeProd,MobileAppsGateway-prod,picsy-client-prod,b2b-salesforce-contact-identity-prod,vehicle-apigee-client-prod,SFtoInstantOfferProd,AppraisalPurchaseClientProd,prodorionapicert,crmcsalesforceclient,CustomerActivityMicrositeProd,tndrhldrprod";

            var cnlist = cns.Split(",");
            Console.WriteLine(cnlist.Length);

            Assert.Equal(27, cnlist.Length);

        }

        [Fact]
        public void TimeSpanCheck()
        {
            var ts = new TimeSpan(1, 2, 3, 4);
            var tsString = ts.ToString();
            Assert.Equal("01.02:03:04", tsString);
        }
    }
}