const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_API_URL;
const supabaseAnonKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

exports.handler = async (event, context) => {
  const { path, httpMethod } = event;
  switch (httpMethod) {
    case 'POST':
      if (path === '/.netlify/functions/allmov/movies/create') {
        return await createMovie (event);
      }
      break;

    case 'DELETE':
      if (path === '/.netlify/functions/allmov/movies/delete') {
        return await deleteMovie (event);
      }
      break;

    case 'PUT':
      if (path === '/.netlify/functions/allmov/movies/update') {
        return await updateMovie (event);
      }
      break;

    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
  }
};

const createMovie  = async (event) => {
  const { id, title, imdb, description, thumbnailurl, remarks } = JSON.parse(event.body);
  const { data, error } = await supabase
    .from('movies')
    .insert([{ id, title, imdb, description, thumbnailurl, remarks }]);

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify("Create the movie successfully."),
  };
};

const deleteMovie  = async (event) => {
  const { id } = JSON.parse(event.body);
  const { data, error } = await supabase
    .from('movies')
    .delete()
    .match({ id });

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify("Deleted the movie with ID: " + id),
  };
};

const updateMovie  = async (event) => {
  const { id, title, imdb, description, thumbnailurl, remarks } = JSON.parse(event.body);
  const { data, error } = await supabase
    .from('movies')
    .update({ id, title, imdb, description, thumbnailurl, remarks })
    .match({ id });

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify("Updated the movie with ID :" + id),
  };
};