import axios from "axios";
import { OpenAIConstants } from "../constants/OpenAIConstants";
export const generateStoryline = async ({
  inputText,
}: {
  inputText: string;
}) => {
  try {
    const response = await axios.post(
      OpenAIConstants.apiURL,
      {
        prompt: OpenAIConstants.prompt + inputText,
        max_tokens: 50,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OpenAIConstants.apiKey}`,
        },
      },
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating story line:", error);
    throw error;
  }
};
