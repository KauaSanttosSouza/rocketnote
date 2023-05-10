const knex = require("../database/knex/index")

class NotesController{
   async create(request, response){
      const { title, description, tags, links } = request.body;
      const { user_id } = request.params;

      const [note_id] = await knex("notes").insert({
         title,
         description,
         user_id
      });

      const linksInsert = links.map(link => {
         return {
            note_id,
            url: link
         };
      });

      await knex("links").insert(linksInsert);

      const tagsInsert = tags.map(name => {
         return {
          note_id,
          name,
          user_id
         };
      });

      await knex("tags").insert(tagsInsert);

      response.json();
   };

   async Show(request, response){
      const {id} = request.params;

      const notes = knex("notes").where({ id }).first()
      const tags = knex("tags").where({ id }).orderBy("name")
      const links = knex("links").where({ id }).orderBy("created_at")

      return response.json({
         ...notes,
         tags,
         links
      })
   }
};

module.exports = NotesController;