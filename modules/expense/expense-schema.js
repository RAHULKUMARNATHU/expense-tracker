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
    user_id : {
      type: "integer",
      require: true
    }
  },
};

schemas.getAllExpense = {
    id: '/getAllExpense',
    type: 'object',
    properties: {
      expense_id: {
        type: ['empty', 'null', 'string'],
        required: false
      },
      search: {
        type: ['empty', 'null', 'string'],
        required: false
      },
      sort_by: {
        type: ['empty', 'null', 'string'],
        required: false
      },
      sort_type: {
        type: ['empty', 'null', 'string'],
        required: false
      },
      page: {
        type: ['empty', 'null', 'string'],
        required: false
      },
      limit: {
        type: ['empty', 'null', 'string'],
        required: false
      },
      user_id: {
        type:'integer',
        required: true
      },
      from_date: {
        type: ['empty', 'null', 'string'],
        required: false
      },
      to_date: {
        type: ['empty', 'null', 'string'],
        required: false
      }
    }
  }

  schemas.expenseSummery = {
    id: "/expenseSummery",
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
      user_id : {
        type: "integer",
        require: true
      },
      month: {
        type: 'string',
        required: false
      }
    },
  };

  schemas.setExpenseLimit = {
    id: "/setExpenseLimit",
    type: "object",
    properties: {
      setExpenseLimit: {
        type: "integer",
        required: true,
        message:"setExpenseLimit must be of type number"
      }
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
