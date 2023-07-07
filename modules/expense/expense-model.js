const sqlInstance = require("../../database/mysql");
const constants = require("../../utils/constants");
const { Op, col, } = require("sequelize");
const moment = require("moment");


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
    console.log("Error in expense.createExpense while saving expense details. Error: %j", error.message);
    throw new Error(error);
  }
};

exports.updateExpense = async (requestData) => {
  try {
    const findData = await sqlInstance.sequelize.models.expenses.findOne({where:{expense_id:requestData.expense_id, user_id:requestData.user_id}})
    if(findData){
      const data = await sqlInstance.sequelize.models.expenses.update(requestData,{ where: { expense_id: requestData.expense_id }, raw: true });
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

exports.expenseSummery = async (requestData) => {
  try {
    let Condition = {};

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const previousDate = new Date(currentYear, currentMonth - 2, 1);
    const previousYear = previousDate.getFullYear();
    const previousMonth = previousDate.getMonth() + 1;

    if (requestData.month === "current") {
      Condition = {
        user_id: requestData.user_id,
        created_at: {
          [Op.between]: [
            new Date(`${previousYear}-${previousMonth}-01 05:29:59`),
            new Date(`${currentYear}-${currentMonth}-31 05:29:59`),
          ],
        },
      };
    } else if (requestData.month === "previous") {
      const previousMonthDate = new Date(previousYear, previousMonth - 1, 1);
      const previousMonthYear = previousMonthDate.getFullYear();
      const previousMonthMonth = previousMonthDate.getMonth() + 1;

      Condition = {
        user_id: requestData.user_id,
        created_at: {
          [Op.between]: [
            new Date(`${previousMonthYear}-${previousMonthMonth}-01 05:29:59`),
            new Date(`${previousYear}-${previousMonth}-31 05:29:59`),
          ],
        },
      };
    } else {
      Condition.user_id = 0;
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
      let totalAmount = 0;
      expense.rows.forEach((row) => { totalAmount += row.amount });
      return {
        total_count: expense.count,
        expenseList: expense.rows,
        total_expense: totalAmount,
      };
    } else {
      console.log("No Expense Data Found ");
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
      Condition = { "$categoryName.category_name$": { [Op.like]: `%${requestData.search}%` } };
    }

    if (requestData.from_date && requestData.to_date) {
      const fromDate = moment(requestData.from_date).format("YYYY-MM-DD HH:mm:ss").split(" ")[0] + " 05:29:59";
      const toDate = moment(requestData.to_date).add(1, "days").format("YYYY-MM-DD") + " 05:29:59";
      if (moment(requestData.to_date).isSameOrAfter(requestData.from_date)) {
        Condition = { created_at: { [Op.between]: [fromDate, toDate]} };
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
        enable_next: parseInt(requestData.page) * parseInt(requestData.limit) < expense.count,
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
    console.log("Error in expense.getAllExpenseList while fetching the all Expense list. Error: %j",error.messag);
    throw new Error(error); 
  }
};


