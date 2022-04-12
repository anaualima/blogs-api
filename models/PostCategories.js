module.exports = (sequelize, _DataTypes) => {
  const PostCategories = sequelize.define('PostCategories', 
  {}, { timestamps: false, tableName: 'PostsCategories' });
    PostCategories.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category,
        {
          as: 'categories',
          through: 'PostCategories',
          foreignKey: 'postId',
          otherKey: 'categoryId',
        });
      models.Category.belongsToMany(models.BlogPost,
        {
          as: 'posts',
          through: 'PostCategories',
          foreignKey: 'categoryId',
          otherKey: 'postId',
        });
      }; return PostCategories;
};