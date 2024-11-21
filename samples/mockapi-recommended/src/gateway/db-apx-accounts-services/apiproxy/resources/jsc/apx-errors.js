 /* jshint ignore:start */
/*
 * Added jshint ignore as JS lint was complaining "'Errors' is defined but never used" even though its used in ResponseBuilder.js
 */
 var Errors = Object.freeze({
  INTERNAL_SERVER_ERROR : {
      code : 'CMN_90000',
      message : 'Internal server error'
  },
  CROSS_TALK_ERROR : {
      code : 'CMN_90001',
      message : 'Internal server error'
  },
  QUOTA_LIMIT_VIOLATION : {
      code : 'CMN_90002',
      message : 'Quota limit violation'
  },
  SPIKE_LIMIT_VIOLATION : {
      code : 'CMN_90003',
      message : 'Spike limit violation'
  },
  INVALID_CLIENT_VALIDATION : {
      code : 'CMN_90004',
      message : 'Invalid client credentials'
  },
  INVALID_INSTITUTION_ID : {
      code : 'CMN_90005',
      message : 'Header institutionId is invalid'
  },
  INVALID_INSTITUTION_USER_ID : {
    code : 'CMN_90005',
    message : 'institutionUserId is invalid'
  },
  UNAUTHORIZED_INSTITUTION_ID : {
      code : 'CMN_90006',
      message : 'Not authorized to access this resource'
  },
  INVALID_GRANT_TYPE : {
      code : 'CMN_90007',
      message : 'Invalid grant type'
  },
  INVALID_TRANSACTION_ID : {
      code : 'CMN_90008',
      message : 'Header transactionId is invalid'
  },
  INVALID_IP_ADDRESS : {
      code : 'CMN_90009',
      message : 'Access blocked'
  },
  INVALID_HEADER : {
      code : 'CMN_90010',
      message : 'Header is invalid'
  },
  INVALID_REQUEST : {
      code : 'CMN_90011',
      message : 'Request is invalid'
  },
  INVALID_SCOPES : {
      code : 'CMN_90012',
      message : 'Request is invalid'
  },
  INVALID_USERNAME : {
      code : 'CMN_90013',
      message : 'Username is invalid'
  },
  INVALID_PASSWORD : {
      code : 'CMN_90014',
      message : 'Password is invalid'
  },
  INVALID_USER_CREDENTIALS : {
      code : 'CMN_90015',
      message : 'Invalid user credentials'
  },
  INVALID_USER : {
      code : 'CMN_90016',
      message : 'Invalid user'
  },
  NON_PRINTABLE_ASCII : {
      code : 'CMN_90017',
      message : 'Request contains non printable ASCII characters'
  },
  INVALID_TOKEN : {
      code : 'CMN_90018',
      message : 'Invalid token'
  },
  CREATE_TOKEN_ERROR : {
      code : 'CMN_90019',
      message : 'Error creating token'
  }
});
/* jshint ignore:end */