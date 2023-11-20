
export async function POST(request: Request, ) {
  const {messages }= await request.json();

  const apiKey = process.env.EDENAI_APIKEY;
  const url = 'https://api.edenai.run/v2/text/chat';

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer '+ apiKey,
    },
    body: JSON.stringify({
      response_as_dict: true,
      attributes_as_list: false,
      show_original_response: false,
      temperature: 0,
      max_tokens: 600,
      providers: 'openai',
      text: messages
    })
  };

  try{
    const response= await fetch(url, options);

    const data=  await response.json();
    return Response.json({data});
  }catch (error: any) {
    return new Response(error.message, {
      status: 500,
    })
  }
}