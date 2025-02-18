const { createClient } = require('@supabase/supabase-js');

const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqc3hmc25oZ3JydW5icXZtaHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2ODQyNjcsImV4cCI6MjA1NTI2MDI2N30.9Ms15fNRXNazeMwVvaCwmVi4WZ4hxodD3-DVq8hQPvo"
const supabase = createClient("https://ujsxfsnhgrrunbqvmhse.supabase.co", apiKey);

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