// WIP Edwardianiser app

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const edwardian = req.body.edwardian || '';
  if (edwardian.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid sentence",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(edwardian),
      temperature: 1.0,
      max_tokens: 100,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(edwardian) {
  const capitalizededwardian =
    edwardian[0].toUpperCase() + edwardian.slice(1).toLowerCase();
  return `Rewrite the text prompt to sound like it would fit in Downton Abbey or in Pride & Prejudice.

  Possible variations: like Bertie Wooster or a character from EM Forster's A Room with a View or Maurice. The prompt is:
${capitalizededwardian}`;
}
