const sqlInstance = require("../../database/mysql");
const { fn, col, Op } = require("sequelize");

const totalExpenseAmount = async (userId) => {
  let Condition = {};

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;

  Condition = {
    user_id: userId,
    created_at: {
      [Op.between]: [
        new Date(previousYear, previousMonth, 1, 5, 29, 59),
        new Date(currentYear, currentMonth, 0, 5, 29, 59),
      ],
    },
  };

  const expenses = await sqlInstance.sequelize.models.expenses.findAll({
    where: Condition,
    attributes: [[fn("SUM", col("amount")), "totalAmount"]],
    raw: true,
  });
  console.log(expenses[0].totalAmount);
  return expenses[0].totalAmount || 0;
};

exports.preSetExpenseAmount = async(setExpense) => {
    console.log(setExpense);
    return setExpense || 10000
}

exports.sendExpenseNotification = async (userId) => {
  const totalExpense = await totalExpenseAmount(userId);
  const setExpense = await this.preSetExpenseAmount();
  if (totalExpense > setExpense) {
    console.log(`Your Monthly Expense Limit Is Excited By ${totalExpense - setExpense}`);
  }
};
