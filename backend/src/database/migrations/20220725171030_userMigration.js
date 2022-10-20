
exports.up = function(knex) {
  return knex.schema.createTable('user', function(table){
    table.string('id_user').primary();
    table.string('name_user').notNullable()
    table.string('email_user').unique()
    table.string('password_user').notNullable()
  })
};


 
exports.down = function(knex) {
  
};
