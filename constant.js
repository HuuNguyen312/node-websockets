const TOKEN_VALID = "a51b0bf4-fd42-46eb-a316-4fb6c2c975d0";

const AppServiceType = {
  USER_LOGIN: "USER_LOGIN",
  MESSAGE: "MESSAGE",
  COMMENT: "COMMENT",
  MESSAGE_SYNCHRONIZE: "MESSAGE_SYNCHRONIZE",
  RESPONSE: "RESPONSE"
};

const ServiceType = {
  USER_LOGIN: 2,
  MESSAGE: 5,
  COMMENT: 10,
  MESSAGE_SYNCHRONIZE: 6,
  RESPONSE: 9
};

module.exports.TOKEN_VALID = TOKEN_VALID;
module.exports.AppServiceType = AppServiceType;
module.exports.ServiceType = ServiceType;
