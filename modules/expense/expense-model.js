const sqlInstance = require("../../database/mysql");
const constants = require("../../utils/constants");
const { Op, col } = require("sequelize");
const moment = require("moment");

// Create Expense
exports.createExpense = async (requestData) => {
  try {
    await sqlInstance.sequelize.models.expenses.create(requestData, {raw: true});
    console.log("Expense Created Successfully for the category",requestData.category);
    return true;
  } catch (error) {
    if (error.name.toLowerCase() === "sequelizeforeignkeyconstrainterror") {
      console.log(`Cannot Create Expense.The referenced category does not exist:`,error.message);
      throw new Error(constants.messageKeys.en.msg_ref_error);
    }
    console.log("Error in expense.createExpense while saving expense details. Error: %j",error.message);
    throw new Error(error);
  }
};

//update expense
exports.updateExpense = async (requestData) => {
  try {
    const findData = await sqlInstance.sequelize.models.expenses.findOne({
      where: {
        expense_id: requestData.expense_id,
        user_id: requestData.user_id,
      },
    });
    if (findData) {
      const data = await sqlInstance.sequelize.models.expenses.update(
        requestData,
        { where: { expense_id: requestData.expense_id }, raw: true }
      );
      if (data[0] === 1) {
        console.log("Expense Details Updated Successfully Of Expense Id:",requestData.expense_id);
        return true;
      } else {
        console.log("Failed To Updated expense Details Of Expense Id:",requestData.expense_id);
        return false;
      }
    }
  } catch (error) {
    console.log("Error in expense.updateExpense while updating expense details. Error: %j",error.message);
    throw new Error(error);
  }
};

//expense summery
exports.expenseSummery = async (requestData) => {
  console.log(requestData.user_id);
  try {

    let Condition = {};

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;

    switch (requestData.month) {
      case "current":
        Condition = {
          user_id: requestData.user_id,
          created_at: {
            [Op.between]: [
              new Date(previousYear, previousMonth, 1, 5, 29, 59),
              new Date(currentYear, currentMonth, 0, 5, 29, 59),
            ],
          },
        };
        break;
      case "previous":
        Condition = {
          user_id: requestData.user_id,
          created_at: {
            [Op.between]: [
              new Date(previousYear, previousMonth - 1, 1, 5, 29, 59),
              new Date(previousYear, previousMonth, 1, 5, 29, 59),
            ],
          },
        };
        break;
      default:
        Condition.user_id = 0;
        break;
    }
    let expense = await sqlInstance.expenses.findAndCountAll({
      where: Condition,
      attributes: [
        "expense_id",
        [col(`categoryName.category_name`), "category_name"],
        "description",
        "amount",
        "created_at",
        "updated_at",
      ],
      include: [
        {
          model: sqlInstance.categories,
          as: "categoryName",
          attributes: [],
        },
      ],
    });
    expense = JSON.parse(JSON.stringify(expense));
    if (expense.rows.length > 0) {
      const totalAmount = expense.rows.reduce((accumulator, row) => accumulator + row.amount,0);
      return {
        total_count: expense.count,
        expenseList: expense.rows,
        total_expense: totalAmount,
      };
    } else {
      return {
        total_count: 0,
        expenseList: [],
      };
    }
  } catch (error) {
    console.log("Error in expense.getAllExpenseList while fetching the all Expense list. Error: %j",error.message);
    throw new Error(error);
  }
};

//list All Expenses
exports.getAllExpenseList = async (requestData) => {
  try {
    const sortBy = requestData.sort_by || "created_at";
    const sortType = requestData.sort_type || "desc";
    let Condition = {};

    let offset;
    if (requestData.limit && requestData.page) {
      offset = 0 + (parseInt(requestData.page) - 1) * parseInt(requestData.limit);
    } else {
      requestData.page = 1;
      requestData.limit = 1000;
      offset = 0 + (requestData.page - 1) * requestData.limit;
    }

    if (requestData.search) {
      Condition = {"$categoryName.category_name$": {[Op.like]: `%${requestData.search}%`},
      };
    }

    if (requestData.from_date && requestData.to_date) {
      const fromDate = moment(requestData.from_date).format("YYYY-MM-DD HH:mm:ss").split(" ")[0] + " 05:29:59";
      const toDate = moment(requestData.to_date).add(1, "days").format("YYYY-MM-DD") + " 05:29:59";
      if (moment(requestData.to_date).isSameOrAfter(requestData.from_date)) {
        Condition = { created_at: { [Op.between]: [fromDate, toDate] } };
      } else {
        throw new Error("Invalid date range: to_date cannot be less than from_date");
      }
    }
    Condition.user_id = requestData.user_id;

    let expense = await sqlInstance.expenses.findAndCountAll({
      where: Condition,
      attributes: [
        "expense_id",
        [col(`categoryName.category_name`), "category_name"],
        "description",
        "amount",
        "created_at",
        "updated_at",
      ],
      include: [
        {
          model: sqlInstance.categories,
          as: "categoryName",
          attributes: [],
        },
      ],
      limit: parseInt(requestData.limit),
      offset: offset,
      order: [[sortBy, sortType]],
      logging: true,
      nest: true,
    });
    expense = JSON.parse(JSON.stringify(expense));

    if (expense.rows.length > 0) {
      console.log("Fetched All Expense List Successfully.");
      return {
        total_count: expense.count,
        expenseList: expense.rows,
        enable_next:
          parseInt(requestData.page) * parseInt(requestData.limit) <
          expense.count,
      };
    } else {
      console.log("No Expense Data Found ");
      return {
        total_count: 0,
        expenseList: [],
        enable_next: false,
      };
    }
  } catch (error) {
    console.log("Error in expense.getAllExpenseList while fetching the all Expense list. Error: %j",error.message);
    throw new Error(error);
  }
};

// Expense chart details
exports.chartDetails = async (requestData) => {
  try {
    const Condition = {};
    Condition.user_id = requestData;

    let chartDetails = await sqlInstance.expenses.findAll({
      where: Condition,
      attributes: [
        [sqlInstance.sequelize.literal("categoryName.category_name"),"category_name"],
        [sqlInstance.sequelize.fn("SUM", sqlInstance.sequelize.col("amount")),"total_expense"],
      ],
      include: [
        {
          model: sqlInstance.categories,
          as: "categoryName",
          attributes: [],
        },
      ],
      group: ["category_name"],
      raw: true
    });

    chartDetails = JSON.parse(JSON.stringify(chartDetails));

    return {
      chartDetails,
    };
  } catch (error) {
    throw new Error(error);
  }
};


// exports.chartDetails = async (requestData) => {
//   try {
//     const Condition = {};
//     Condition.user_id = requestData;

//     let chartDetails = await sqlInstance.expenses.findAll({
//       where: Condition,
//       attributes: [
//         [
//           sqlInstance.sequelize.literal('SUM(amount)'),
//           'total_expense'
//         ],
//         [
//           sqlInstance.sequelize.col('categoryName.category_name'),
//           'category_name'
//         ],
//         'created_at'
//       ],
//       include: [
//         {
//           model: sqlInstance.categories,
//           as: 'categoryName',
//           attributes: [],
//         },
//       ],
//       group: ['categoryName.category_name', 'expenses.created_at'],
//       raw: true, // Retrieve raw data
//     });

//     // Create a new array to store the modified chart details
//     let modifiedChartDetails = [];

//     // Iterate through the original chart details
//     for (const detail of chartDetails) {
//       // Check if there is already an entry for the category in the modified array
//       const existingEntry = modifiedChartDetails.find(entry => entry.category_name === detail.category_name);

//       // If an entry exists, update the total_expense value
//       if (existingEntry) {
//         existingEntry.total_expense += detail.total_expense;
//       } else {
//         // If no entry exists, add a new entry to the modified array
//         modifiedChartDetails.push({
//           total_expense: detail.total_expense,
//           category_name: detail.category_name,
//           created_at: detail.created_at
//         });
//       }
//     }

//     return {
//         chartDetails: modifiedChartDetails,
//     };
//   } catch (error) {
//     throw new Error(error);
//   }
// };





