import axios from 'axios'
const apiKey = import.meta.env.VITE_API_KEY;
const url = 'https://api.openai.com/v1/chat/completions';

let latest_response = '';

const first_input = document.querySelector('#first-input');
first_input.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    let input = first_input.value;
    input = `Generate a 4 line poem following the ABAB rhyme scheme, with the first line being ${input}. After each line, add a <br>`

    document.querySelector('.response').innerHTML = "Loading...";

    const response = await getResponse(input);
    latest_response = response;

    document.querySelector('.response').innerHTML = String(response);

    console.log(response);
  }
});

const button = document.querySelector('#button');

button.addEventListener('click', async (e) => {
  let emotion = document.querySelector('#second-input').value;
  console.log(emotion);
  let input = `Make this entire poem \"${latest_response.replaceAll('<br>', '')}\" sound even more ${emotion}. After each line, add a <br>. Add no additional commentary.`
  console.log(input)

  document.querySelector('.response').innerHTML = "Loading...";

  const response = await getResponse(input);
  latest_response = await response;

  document.querySelector('.response').innerHTML = String(response);

  console.log(response);
})

async function getResponse(input) {
  const payload = {
    model: 'gpt-4o',
    messages: [{ role: 'user', content: input }],
    temperature: 0.7,
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);

    return 'Error during fetching';
  }
}