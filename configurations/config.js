const convict = require("convict");
const path = require("path")

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development"],
    default: "development",
    env: "NODE_ENV",
    arg: "env",
  },

  server: {
    port: {
      doc: "HTTP port on which server will run",
      format: Number,
      default: 8001,
      // env: "PORT", // default will be changed when supplied from command line
    },
    timeout: {
      doc: 'Server Timeout',
      format: 'Number',
      default: 60000
    },
    bodyParser: {
      limit: {
        doc: 'maximum request body size',
        format: String,
        default: '100kb'
      }
    }
  },
  
  mysql : {
    host: {
      doc: "DataBase host name",
      format: String,
      default: "localhost",
    },
    port: {
      doc: "SQL server port",
      format: Number,
      default: 3306,
    },
    username: {
      doc: "Username of the sql server",
      format: String,
      default: "root",
    },
    password: {
      doc: "Password of SQL server",
      formate: String,
      default: "root",
     },
    database: {
      doc: "Name of database",
      format: String,
      default: "expense_tracker",
    },
    dialect: {
      doc: "Holds the Dialect details that we are using for the connection",
      format: String,
      default: "mysql",
    },
    connectTimeout: {
      doc: "Holds the Connection Timeout Time in ms",
      format: Number,
      default: 10000,
    },
    pool: {
      max: {
        doc: "Holds the Maximum SQL Pool Size",
        format: Number,
        default: 5,
      },
      min: {
        doc: "Holds the Minimum SQL Pool Size",
        format: Number,
        default: 0,
      },
      acquire: {
        doc: "Holds the Value for the time to Acquire the SQL Connection.",
        format: Number,
        default: 30000,
      },
      idle: {
        doc: "Holds the Idle Time for SQL To Reset the Connection.",
        format: Number,
        default: 10000,
      },
    },
    dialectOptions: {
      multipleStatements: {
        doc: "Whether to allow Multiple SQL Statements or not",
        format: Boolean,
        default: true,
      },
      supportBigNumbers: {
        doc: "Whether to support BIG numbers in SQL Statements or not",
        format: Boolean,
        default: true,
      },
      decimalNumbers: true,
    },
    // logging: {
    //   doc: "Whether Logging is Enabled or not",
    //   format: Boolean,
    //   default: false,
    // },
    operatorsAliases: {
      doc: "Whether To Use Aliases For SQL Operations or not",
      format: Boolean,
      default: false,
    },
  },
  JWT_TOKEN: {
    SECRET:{
      doc: 'Holds the JWT secret',
      format: String,
      default: '$2a$10$e.oPc.dyrwRoQCpDvO9Rhe'
    },
    ExpireTime: {
      doc: 'Holds the JWT Token Expiration Time',
      format: String,
      default: '1d'
    },
  }
});





config.loadFile(path.join(__dirname, '/config-' + config.get('env') + '.json'))

// validate
config.validate();

module.exports = config;