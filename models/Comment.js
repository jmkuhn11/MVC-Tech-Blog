const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Comment extends Model {}

Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    }
  },
  {
    sequelize
  }
);

module.exports = Comment;
