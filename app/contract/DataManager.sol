pragma solidity ^ 0.4.17;

contract DataManager{
    
    uint businessId;
    string brandSerialId; 
    string brandImageHash;
    
    struct business{
        string businessName;
        string businessAddress; 
        string businessCity; 
        string businessState;
        string businessCountryCode;
        string businessZipCode;
    }
    
    struct brand{
        uint businessId; 
        string additionalParametersJson; //includes : uint brandName, uint256 startDate, string classList, string brandDescription, string brandUseLocation
        bool isUsed; 
        bool isLive;
        uint256 expiredOn;
    }
    
    struct brandImage{
        string brandSerialId;
        string imageTitle;
        string imageDescription;
    }
    
    mapping(uint => business) businesses; 
    mapping(uint => bool) isBusinessRegistered; 
    mapping(string => brand) brands;
    mapping(string => bool) isBrandRegistered;
    mapping(string => brandImage) brandImages;
    mapping(string => bool) isBrandImageRegistered;
    
    event BusinessEvent(string _actionPerformed, uint _businessId, string _businessName, string _businessAddress, string _businessCity, string _businessState, string _businessCountryCode, string _businessZipCode, uint256 _timestamp);
    event BrandEvent(string _actionPerformed, uint _businessId, string _brandSerialId,  string _additionalParametersJson, bool _isUsed, bool _isLive, uint256 _expiredOn, uint256 _timestamp);
    event BrandImageEvent(string _actionPerformed, string _brandSerialId, string _brandImageHash, string _imageTitle, string _imageDescription, uint256 _timestamp);
    
    function registerBusiness(uint _businessId, string _businessName, string _businessAddress, string _businessCity, string _businessState, string _businessCountryCode, string _businessZipCode){
        require(isBusinessRegistered[_businessId] == false);
        businesses[_businessId].businessName = _businessName;
        businesses[_businessId].businessAddress = _businessAddress;
        businesses[_businessId].businessCity = _businessCity;
        businesses[_businessId].businessState = _businessState;
        businesses[_businessId].businessCountryCode = _businessCountryCode;
        businesses[_businessId].businessZipCode = _businessZipCode;
        isBusinessRegistered[_businessId] = true;
        
        BusinessEvent("REGISTERED", _businessId, _businessName, _businessAddress, _businessCity, _businessState, _businessCountryCode, _businessZipCode, now);
    }
    
    function updateBusiness(uint _businessId, string _businessName, string _businessAddress, string _businessCity, string _businessState, string _businessCountryCode, string _businessZipCode){
        require(isBusinessRegistered[_businessId] == true);
        businesses[_businessId].businessName = _businessName;
        businesses[_businessId].businessAddress = _businessAddress;
        businesses[_businessId].businessCity = _businessCity;
        businesses[_businessId].businessState = _businessState;
        businesses[_businessId].businessCountryCode = _businessCountryCode;
        businesses[_businessId].businessZipCode = _businessZipCode;
        
        BusinessEvent("UPDATED", _businessId, _businessName, _businessAddress, _businessCity, _businessState, _businessCountryCode, _businessZipCode, now);
    }
    
    function getBusinessDetails(uint _businessId) returns(string, string, string, string, string, string){
        if(isBusinessRegistered[_businessId] == true)
        return (businesses[_businessId].businessName, businesses[_businessId].businessAddress, businesses[_businessId].businessCity, businesses[_businessId].businessState, businesses[_businessId].businessCountryCode, businesses[_businessId].businessZipCode);
        else
        return ("null", "null", "null", "null", "null", "null");
    }
    
    function registerBrand(string _brandSerialId, uint _businessId, string _additionalParametersJson, bool _isUsed, bool _isLive){
        require(isBrandRegistered[_brandSerialId] == false && isBusinessRegistered[_businessId] == true);
        brands[_brandSerialId].businessId = _businessId;
        brands[_brandSerialId].additionalParametersJson = _additionalParametersJson;
        brands[_brandSerialId].isUsed = _isUsed;
        brands[_brandSerialId].isLive = _isLive;
        brands[_brandSerialId].expiredOn = 0; 
        isBrandRegistered[_brandSerialId] = true;
        
        BrandEvent("REGISTERED", _businessId, _brandSerialId, _additionalParametersJson, brands[_brandSerialId].isUsed, brands[_brandSerialId].isLive, brands[_brandSerialId].expiredOn, now);
    }
    
    function updateBrand(string _brandSerialId, uint _businessId, string _additionalParametersJson, bool _isUsed, bool _isLive){
        require(isBrandRegistered[_brandSerialId] == true);
        brands[_brandSerialId].businessId = _businessId;
        brands[_brandSerialId].additionalParametersJson = _additionalParametersJson;
        brands[_brandSerialId].isUsed = _isUsed;
        brands[_brandSerialId].isLive = _isLive;
        
        BrandEvent("UPDATED", _businessId, _brandSerialId, _additionalParametersJson, brands[_brandSerialId].isUsed, brands[_brandSerialId].isLive, brands[_brandSerialId].expiredOn, now);
    }
    
    function destroyBrand(string _brandSerialId){
        require(isBrandRegistered[_brandSerialId] == true);
        brands[_brandSerialId].isLive = false;
        brands[_brandSerialId].expiredOn = now; 
        
        BrandEvent("DESTROYED", brands[_brandSerialId].businessId, _brandSerialId, brands[_brandSerialId].additionalParametersJson, brands[_brandSerialId].isUsed, brands[_brandSerialId].isLive, brands[_brandSerialId].expiredOn, now);
    }
   
    function getBrandDetails(string _brandSerialId) returns(uint, string, bool, bool, uint256){
        if(isBrandRegistered[_brandSerialId] == true)
        return (brands[_brandSerialId].businessId, brands[_brandSerialId].additionalParametersJson, brands[_brandSerialId].isUsed, brands[_brandSerialId].isLive, brands[_brandSerialId].expiredOn);
        else
        return (0, "null", false, false, 0);
    }
    
    function registerBrandImage(string _brandImageHash, string _brandSerialId, string _imageTitle, string _imageDescription){
        require(isBrandImageRegistered[_brandImageHash] == false && isBrandRegistered[_brandSerialId] == true);
        brandImages[_brandImageHash].brandSerialId = _brandSerialId;
        brandImages[_brandImageHash].imageTitle = _imageTitle;
        brandImages[_brandImageHash].imageDescription = _imageDescription;
        isBrandImageRegistered[_brandImageHash] = true;
        brands[_brandSerialId].isUsed = true;
        
        BrandImageEvent("REGISTERED", _brandSerialId, _brandImageHash, _imageTitle, _imageDescription, now);
        BrandEvent("UPDATED", brands[_brandSerialId].businessId, _brandSerialId, brands[_brandSerialId].additionalParametersJson, brands[_brandSerialId].isUsed, brands[_brandSerialId].isLive, brands[_brandSerialId].expiredOn, now);
    }
    
    function updateBrandImage(string _brandImageHash, string _brandSerialId, string _imageTitle, string _imageDescription){
        require(isBrandImageRegistered[_brandImageHash] == true);
        brandImages[_brandImageHash].brandSerialId = _brandSerialId;
        brandImages[_brandImageHash].imageTitle = _imageTitle;
        brandImages[_brandImageHash].imageDescription = _imageDescription;
        
        BrandImageEvent("UPDATED", _brandSerialId, _brandImageHash, _imageTitle, _imageDescription, now);
    }
    
    function getBrandImageDetails(string _brandImageHash) returns(string, string, string){
        if(isBrandImageRegistered[_brandImageHash] == true)
        return (brandImages[_brandImageHash].brandSerialId, brandImages[_brandImageHash].imageTitle, brandImages[_brandImageHash].imageDescription);
        else
        return ("null", "null", "null");
    }
}



