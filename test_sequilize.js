const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('NODE_APP', 'root', 'root', {
    host: 'localhost',
    port: '8889',
    dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const User = sequelize.define('User', {
  // attributes
  tel: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mdp: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  prenom: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nom: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
}, {
  // options
});


User.findOne({ where: {id: 3} }).then(result => {
  console.log(result)
});
