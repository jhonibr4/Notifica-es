
exports.up = function(knex) {
    return knex.schema.createTable('shops', function(table){
        table.string('id_shops').primary();
        table.integer('marketplace').notNullable()
        table.string('name_shop').notNullable()
        table.string('id_user').references('id_user').inTable('user')
        table.string('access_token')

    })
  };
  
  
   
  exports.down = function(knex) {
    
  };
  