var bcrypt = require('bcryptjs');

// Creating our User model
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        hooks: {
            beforeCreate: function(user) {
                user.password = bcrypt.hashSync(
                    user.password,
                    bcrypt.genSaltSync(10),
                    null,
                );
            },
        },
    });

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    // User.hook('beforeCreate', function(user) {
    //     user.password = bcrypt.hashSync(
    //         user.password,
    //         bcrypt.genSaltSync(10),
    //         null,
    //     );
    // })
    return User;
} 