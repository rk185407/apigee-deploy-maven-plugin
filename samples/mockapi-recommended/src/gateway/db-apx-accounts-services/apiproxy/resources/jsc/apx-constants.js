/* jshint ignore:start */
/*
 * Added jshint ignore as JS lint was complaining "'Constants' is defined but never used" even though its used in ResponseBuilder.js
 */
var Constants = Object.freeze({
	// Form params       
	FORM_PARAM_GRANT_TYPE                   : 'grant_type',
	FORM_PARAM_SCOPES                       : 'scopes',
	FORM_PARAM_USERNAME                     : 'username',
	FORM_PARAM_PASSWORD                     : 'password',
	FORM_PARAM_REFRESH_TOKEN                : 'refresh_token',
	FORM_PARAM_TOKEN                        : 'token',
	FORM_PARAM_INSTITUTION_USER_ID          : 'institution_user_id',
       
	//Query params       
	QUERY_PARAM_HOST_USER_ID                : 'hostUserId',
  QUERY_PARAM_LOGIN_ID                    : 'loginId',
       
	// Grant types          
	GRANT_TYPE_PASSWORD                     : 'password',
	GRANT_TYPE_REFRESH_TOKEN                : 'refresh_token',
	GRANT_TYPE_CLIENT_CREDENTIALS           : 'client_credentials',
	GRANT_TYPE_AUTH_CODE                    : 'authorization_code',
	GRANT_TYPE                              : 'grant_type',
	       
	// Access token custom attributes       
	ACCESS_TOKEN_INSTITUTION_USER_ID        : 'accesstoken.institutionUserId',
	ACCESS_TOKEN_INSTITUTION_ID             : 'accesstoken.institutionId',
  INSTITUTION_USER_ID                     : 'institutionUserId',
  USER_ID                                 : 'userId',
	INSTITUTION_ID                          : 'institutionId',
         
	// OA2 constants       
	ID_TYPE                                 : 'userIdType',
	ID_TYPE_HOST_USER_ID                    : 'HOST_USER_ID',
	ID_TYPE_INSTITUTION_USER_ID             : 'INSTITUTION_USER_ID',
	ID_TYPE_LOGIN_ID                        : 'LOGIN_ID',
	            
  // Headers       
  HEADER_AUTHORIZATION                    : 'Authorization',     
	HEADER_INSTITUTION_ID                   : 'institutionId',
	HEADER_TRANSACTION_ID                   : 'transactionId',
	HEADER_IP_ADDRESS                       : 'ipAddress',
	HEADER_ORIGINATING_IP                   : 'originatingIp',
  HEADER_MEMBER_NUMBER                    : 'memberNumber',
  HEADER_CONTENT_TYPE                     : 'Content-Type',
	HEADER_USER_AGENT                       : 'User-Agent',
	MAX_HEADER_SIZE                         :  8000,
	            
	// Apigee request prefix            
	REQUEST_HEADER_PREFIX                   : 'request.header.',
	REQUEST_FORM_PARAM_PREFIX               : 'request.formparam.',
	REQUEST_FORMS_STRING                    : 'request.formstring',
  REQUEST_QUERY_PARAM_PREFIX              : 'request.queryparam.',
  ACCESS_TOKEN_PREFIX                     : 'accesstoken.',
  RESPONSE_HEADER_PREFIX                  : 'response.header.',
  RESPONSE_HEADERS_NAMES                  : 'response.headers.names',
             
	// Regex            
	REGEX_UUID                              : /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
	REGEX_NON_ASCII                         : /^[\u0000-\u007f]*$/,
	REGEX_FIVE_DIGIT                        : /^[0-9]{5}$/,
	REGEX_VALID_IP_ADDRESS                  : /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
	REGEX_RESERVED_IP_ADDRESS               : [ /^(10|127)\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/,
                                           /^172\.(1[6-9]|2[0-9]|3[0-1])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/,
                                           /^192\.168\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/,
                                           
                                            ],
  REGEX_STATUS_CODE                       : new RegExp("^[2|3].*"),
                                          
  TOKEN_TYPE_BEARER                       : 'Bearer',
            
	// Lengths and sizes            
	INSTITUTION_ID_LENGTH                   : 5,
	INSTITUTION_ID_PAD_LENGTH               : 2,
	            
	// htpp status code            
	HTTP_STATUS_OK                          : 200,
	HTTP_STAUS_ERROR                        : 500,
	            
	// Other            
	CLIENT_IP                               : 'client.ip',
  EMPTY_STRING                            : '',
  DATE_FORMAT                             : '{year}-{month}-{day};{hour}:{minute}:{second}.{milliSecond}',
  PROXY_SERVER_IPS                        : [
                                              "63.172.232.5","63.172.233.5","208.68.43.9","208.68.43.10","206.108.40.179","206.108.40.183", 
                                              "199.16.139.32","199.16.139.33","12.149.174.11","12.149.174.12","12.149.174.13","12.149.174.14", 
                                              "12.149.174.15","12.149.174.16","199.16.139.34","199.16.139.35","206.108.44.14","206.108.44.15"
                                            ],
  NA                                      : 'N/A',
       
  // Response fields       
  TOKEN_RESPONSE_FIELDS                   : [ /*'institutionId','userId','institutionUserId','username',*/'access_token','expires_in','refresh_token','refresh_token_expires_in','token_type'],
         
  // Global Logging       
  GL_EVENT_TYPE                           : 'Audit',
  GL_EVENT_ID                             : 'apiUse',
  GL_USER_PRODUCT                         : 'API',
  PRODUCT_CODE                            : 'app.bill-prod-code',

  // Service Response headers
  ALLOWED_RESPONSE_HEADERS                : ['transactionId','Content-Type','Transfer-Encoding', 'Content-Encoding'],
  PARAM_ALLOWED_RESPONSE_HEADERS          : 'allowedResponseHeaders',

         
  // Flow name to prefix path
  PREFIX_PATH_MAP :  {
      // Accounts
      'GetAccounts-v1'                    : '/apx-accounts',
      'GetAccount-v1'                     : '/apx-accounts',
      'RegisterAccounts-v1'               : '/apx-accounts',
      'UpdateAccount-v1'                  : '/apx-accounts',
          
      // Transactions    
      'GetTransactions-v1'                : '/apx-transactions',
          
      // Bankimg Images    
      'GetBankingImages-v1'               : 'apx-banking-images',
      'GetBankingImage-v1'                : 'apx-banking-images',
          
      // Disclosures    
      'GetInstitutionDisclosures-v1'      : 'apx-disclosures',
      'CreateInstitutionDisclosure-v1'    : 'apx-disclosures',
      'UpdateInstitutionDisclosure-v1'    : 'apx-disclosures',
      'DeleteInstitutionDisclosure-v1'    : 'apx-disclosures',
      
      'GetInstitutionUserDisclosures-v1'  : 'apx-disclosures',
      'CreateInstitutionUserDisclosure-v1': 'apx-disclosures',
      'UpdateInstitutionUserDisclosure-v1': 'apx-disclosures',
      'DeleteInstitutionUserDisclosure-v1': 'apx-disclosures',
      
      // Recipients
      'GetRecipients-v1'                  : 'apx-recipients',
      'GetRecipient-v1'                   : 'apx-recipients',
      'CreateRecipient-v1'                : 'apx-recipients',
      'ValidateRecipient-v1'              : 'apx-recipients',
      'DeleteRecipient-v1'                : 'apx-recipients', 
      'UpdateRecipient-v1'                : 'apx-recipients',
          
      // Users    
      'GetInstitutionUser-v1'             : 'apx-users',
          
      //Transfers    
      'CreateTransfer-v1'                 : 'apx-transfers'
      
  }
  
});
/* jshint ignore:end */