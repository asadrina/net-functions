const { createClient } = require('@supabase/supabase-js');

// const apiKey = process.env.SUPABASE_API_KEY
const supabase = createClient(process.env.SUPABASE_API_URL, process.env.SUPABASE_API_KEY);

exports.handler = async (event, context) => {
  const { data, error } = await supabase
    .from('movies')
    .select('*');

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};