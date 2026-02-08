import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    language: language,
    code: sourceCode,
  });
  return response.data;
};