import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isMobilePhone: {
          args: 'en-NG',
        },
      },
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'avatar',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin', 'inactive'],
      defaultValue: 'user',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  User.hashPassword = password => bcrypt.hash(password, 10);

  User.beforeCreate(async (user) => {
    user.password = await User.hashPassword(user.password);
  });

  return User;
};
