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
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: OpenAIConstants.prompt + " " + inputText },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OpenAIConstants.apiKey}`,
        },
      },
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating story line:", error);
    throw error;
  }
};
