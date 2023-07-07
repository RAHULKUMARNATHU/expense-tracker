const Validator = require("jsonschema").Validator;
const _validator = new Validator();

const schemas = function () {};

schemas.createCategory = {
  id: "/createCategory",
  type: "object",
  properties: {
    category_name: {
      type: "string",
      required: true,
    },
    user_id:{
      type:"Integer",
      required:true
    }
  },
};

schemas.getCategories = {
  id: "/getCategories",
  type: "object",
  properties: {
    category_name: {
      type: ["empty", "null", "integer"],
      required: false,
    },
    category_id: {
      type: ["empty", "null", "integer"],
      required: false,
    },
    search: {
      type: ["empty", "null", "string"],
      required: false,
    },
    sort_by: {
      type: ["empty", "null", "string"],
      required: false,
    },
    sort_type: {
      type: ["empty", "null", "string"],
      required: false,
    },
    page: {
      type: ["empty", "null", "string"],
      required: false,
    },
    limit: {
      type: ["empty", "null", "string"],
      required: false,
    },
    user_id:{
      type:"integer",
      required:true
    }
  },
};

schemas.updateCategory = {
  id: "/updateCategory",
  type: "object",
  properties: {
    category_id: {
      type: "integer",
      required: true,
    },
    category_name: {
      type: "string",
      required: false,
    },
  },
};

schemas.validate = function (object, schema) {
  const errors = _validator.validate(object, schema).errors;
  if (errors.length > 0) {
    console.log("Schema validation failed for id:- %s errors:- %j", schema.id, errors);
  }
  return errors.length <= 0;
};
module.exports = schemas;
