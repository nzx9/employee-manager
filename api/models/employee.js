export default (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 10], 
        isAlpha: true, 
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 10],
        isAlpha: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^+94[0-9]{10}$/,
      },
    },
    gender: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: false,
    },
  }, {
    tableName: 'Employees',
    timestamps: true,
  });

  return Employee;
};
