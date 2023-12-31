const sqlInstance = require('../../database/mysql')
const constants = require('../../utils/constants')
const { Op } = require('sequelize')


//Save category details
exports.createCategory = async (requestData) => {
  console.log(requestData);
  try {
    const category = await sqlInstance.sequelize.models.categories.findOne({
      where:{category_name : requestData.category_name , user_id: requestData.user_id}
    })
    if(category && category.user_id === requestData.user_id ){
      throw new Error(constants.messageKeys.en.msg_data_already_exits)
    }
    else{
    await sqlInstance.sequelize.models.categories.create(requestData, { raw: true })
    console.log('Category Created Successfully of name', requestData.category_name)
    return true
    }
  } catch (error) {
    throw new Error(error)
  }
}

//Category List 
exports.getAllCategoryList = async (requestData ) => {
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
          where:{[Op.and]:[{ [Op.or]: [{user_id: requestData.user_id},{is_created_by_admin : true}]},Condition]},
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
exports.updateCategory = async (requestData) => {
    try {
      const category = await sqlInstance.sequelize.models.categories.findOne({
      where:{category_name : requestData.category_name , user_id: requestData.user_id}
    })
    if(category && category.user_id === requestData.user_id ){
      throw new Error(constants.messageKeys.en.msg_data_already_exits)
    }else{
      const data = await sqlInstance.sequelize.models.categories.update(requestData, { where: { category_id: requestData.category_id  }, raw: true })
      if (data[0] === 1) {
        console.log('Category Details Updated Successfully Of Category Id:', requestData.category_id)
        return true
      }  
      else {
        console.log('Failed To Update Category Details Of Category Id:', requestData.category_id)
        return false
      }
    }
    } catch (error) {
      console.log('Error in categories.updateCategory while updating category details. Error: %j', error.message)
      throw new Error(error)
    }
  }