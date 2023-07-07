// const Validator = require("jsonschema").Validator;
// const _validator = new Validator();

const schemas = function () {};
schemas.createCategory = {
  id: "/createCategory",
  type: "object",
  properties: {
    category_name: {
      type: "string",
      required: true,
      message : "category name should of type string"
    },
    user_id:{
      type:"Integer",
      required:true,
      message:"user id should be of type integer"
    }
  },
};

schemas.getCategories = {
  id: "/getCategories",
  type: "object",
  properties: {
    category_name: {
      type: ["empty", "null", "string"],
      required: false,
      message : "category name should of type string"
    },
    category_id: {
      type: ["empty", "null", "string"],
      required: false,
      message: "category_id should be of type string"
      
    },
    search: {
      type: ["empty", "null", "string"],
      required: false,
      message: "search should be of type string"

    },
    sort_by: {
      type: ["empty", "null", "string"],
      required: false,
      message:"sort_by should be string"

    },
    sort_type: {
      type: ["empty", "null", "string"],
      required: false,
      message:"sort_by should be string"
    },
    page: {
      type: ["empty", "null", "string"],
      required: false,
      message:"page should be string"
    },
    limit: {
      type: ["empty", "null", "string"],
      required: false,
      message:"limit should be string"
    },
    user_id:{
      type:"integer",
      required:true,
      message:"user_id should be Integer"
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
      message: "category id should of type Integer"
    },
    category_name: {
      type: "string",
      required: false,
      message: "category name should of type string"
    },
  },
};

// schemas.validate = function (object, schema) {
//   const errors = _validator.validate(object, schema).errors;
//   if (errors.length > 0) {
//     console.log("Schema validation failed for id:- %s errors:- %j", schema.id, errors);
//   }
//   return errors.length <= 0;
// };
module.exports = schemas;
