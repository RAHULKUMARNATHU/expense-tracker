const Validator = require("jsonschema").Validator;
const _validator = new Validator();

const schemas = function () {};

schemas.createExpense = {
  id: "/createExpense",
  type: "object",
  properties: {
    category_id: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
      maxLength: 200,
    },
    amount: {
      type: "double",
      required: true,
    },
    user_id: {
      type: "integer",
      required: true,
    },
  },
};

schemas.updateExpense = {
  id: "/updateExpense",
  type: "object",
  properties: {
    expense_id: {
      type: "integer",
      require: true,
    },
    category: {
      type: "string",
      required: false,
    },
    description: {
      type: "string",
      required: false,
      maxLength: 200,
    },
    amount: {
      type: "double",
      required: false,
    },
  },
};

schemas.validate = function (object, schema) {
  const errors = _validator.validate(object, schema).errors;
  if (errors.length > 0) {
    console.log(
      "Schema validation failed for id:- %s errors:- %j",
      schema.id,
      errors
    );
  }
  return errors.length <= 0;
};
module.exports = schemas;
