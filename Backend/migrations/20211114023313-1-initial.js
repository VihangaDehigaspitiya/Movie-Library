'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "user", deps: []
 * createTable "wish_list", deps: [user]
 *
 **/

var info = {
    "revision": "20211114023313-1",
    "name": "initial",
    "created": "2021-11-13T21:03:13.881Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "user",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "allowNull": false,
                        "primaryKey": true
                    },
                    "first_name": {
                        "type": Sequelize.STRING,
                        "field": "first_name",
                        "allowNull": false
                    },
                    "last_name": {
                        "type": Sequelize.STRING,
                        "field": "last_name",
                        "allowNull": false
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email",
                        "allowNull": false
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password",
                        "allowNull": false
                    },
                    "is_verified": {
                        "type": Sequelize.BOOLEAN,
                        "field": "is_verified",
                        "defaultValue": false,
                        "allowNull": false
                    },
                    "created_at": {
                        "type": Sequelize.INTEGER,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.INTEGER,
                        "field": "updated_at",
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "wish_list",
                {
                    "id": {
                        "type": Sequelize.UUID,
                        "field": "id",
                        "allowNull": false,
                        "primaryKey": true
                    },
                    "user_id": {
                        "type": Sequelize.UUID,
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "user",
                            "key": "id"
                        },
                        "field": "user_id",
                        "allowNull": false
                    },
                    "movie_id": {
                        "type": Sequelize.INTEGER,
                        "field": "movie_id",
                        "allowNull": false
                    },
                    "created_at": {
                        "type": Sequelize.INTEGER,
                        "field": "created_at",
                        "allowNull": false
                    },
                    "updated_at": {
                        "type": Sequelize.INTEGER,
                        "field": "updated_at",
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["user", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["wish_list", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
