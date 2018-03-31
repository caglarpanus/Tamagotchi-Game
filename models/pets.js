module.exports = (sequelize, dataType) => {
  const Pets = sequelize.define(
    "Pets",
    {
      name:    { type: dataType.STRING, allowNull: false, unique: true },
      petType: { type: dataType.STRING, allowNull: false },
//    lastFed: { type: dataType.DATE,   allowNull: false }
      lastFed: { type: dataType.STRING, allowNull: false }
    },
    { timestamps: false }
  );

  Pets.associate = models => Pets.belongsTo(models.User, { foreignKey: { allowNull: true } });

  return Pets;
};
