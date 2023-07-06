const sqlInstance = require('../../database/mysql')
const constants = require('../../utils/constants')
const { Op } = require('sequelize')
/**
 * @namespace
 */
const categories = function () {
}

//Save category details
categories.createCategory = async (requestData) => {
  try {
    await sqlInstance.sequelize.models.categories.create(requestData, { raw: true })
    console.log('Category Created Successfully of name', requestData.category_name)
    return true
  } catch (error) {
    if (error.name.toLowerCase() === 'sequelizeuniqueconstrainterror') {
      console.log(`Category With Same Name Exist: ${ error }`)
      throw new Error(constants.messageKeys.en.msg_data_already_exits)
    }
    console.log('Error in categories.createCategory while saving category details. Error: %j', error.message)
    throw new Error(error)
  }
}

//Category List 
categories.getAllCategoryList = async (requestData ) => {
    try {
        const sortBy = requestData.sort_by || 'category_id'
        const sortType = requestData.sort_type || 'desc'
        let Condition = {}        
        let offset
        if (requestData.limit && requestData.page) {
          offset = 0 + (parseInt(requestData.page) - 1) * parseInt(requestData.limit)
        } else {
          requestData.page = 1
          requestData.limit = 1000
    
          offset = 0 + ((requestData.page) - 1) * (requestData.limit)
        }
    
        if (requestData.search !== undefined) {
            Condition = { category_name: { [Op.like]: `%${requestData.search}%` } }
        }
    
        if (requestData.category_id) {
            Condition = { category_id: requestData.category_id }
          }
        
        const categories = await sqlInstance.sequelize.models.categories.findAndCountAll({
          where:{[Op.and]:[{ [Op.or]: [{user_id: requestData.user_id},{admin_id: 1}]},Condition]},
          attributes:["category_id","category_name", "created_at", "updated_at"],
          limit: parseInt(requestData.limit),
          offset: offset,
          order: [[sortBy, sortType]]
        })
        const findCategories = JSON.parse(JSON.stringify(categories))
    
        if (findCategories.rows.length > 0) {
          console.log('Fetched All categories List Successfully.')
          return {
            total_count: findCategories.count,
            categoryList: findCategories.rows,
            enable_next: ((parseInt(requestData.page) * parseInt(requestData.limit)) < findCategories.count)
          }
        } else {
          console.log('No category Data Found ')
          return {
            total_count: 0,
            categoryList: [],
            enable_next: false
          }
        }
      } catch (error) {
        console.log('Error in categories.getAllCategoriesList while fetching the all categories list. Error: %j', error.message)
        throw new Error(error)
      }
    }

// Update Category Details
categories.updateCategory = async (requestData) => {
    try {
      const data = await sqlInstance.sequelize.models.categories.update(requestData, { where: { category_id: requestData.category_id }, raw: true })
      if (data[0] === 1) {
        console.log('Category Details Updated Successfully Of Category Id:', requestData.category_id)
        return true
      } else {
        console.log('Failed To Update Category Details Of Category Id:', requestData.category_id)
        return false
      }
    } catch (error) {
      if (error.name.toLowerCase() === 'sequelizeuniqueconstrainterror') {
        console.log(`Category With Same Name Exist:`, error.message)
        throw new Error(constants.messageKeys.en.msg_data_already_exits)
      }
      console.log('Error in categories.updateCategory while updating category details. Error: %j', error.message)
      throw new Error(error)
    }
  }
  
module.exports = categories
