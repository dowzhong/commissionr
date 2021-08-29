
exports.up = function (knex) {
    return knex.schema.table('users', function (table) {
        table.unique('email');
    });
};

exports.down = function (knex) {
    return knex.schema.table('users', function (table) {
        table.dropUnique('email');
    });
};
