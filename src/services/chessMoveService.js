import axios from "axios";
const baseUrl = "https://polyglot-spa-test.azurewebsites.net";
export async function getNextMove(gameFen) {
  const response = await axios.post(baseUrl, gameFen);
  return response.data;
}
