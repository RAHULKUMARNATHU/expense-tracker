const PASSWORD_RULE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/
const PASSWORD_RULE_MESSAGE =
  "Password should have 1 uppercase, lowercase letter along with a number and special character.";

const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const EMAIL_FORMAT_MESSAGE = "Not a valid email address ";

exports.REGEX = {
  PASSWORD_RULE,
  EMAIL_FORMAT
};

exports.MESSAGES = {
  PASSWORD_RULE_MESSAGE,
  EMAIL_FORMAT_MESSAGE 
};


