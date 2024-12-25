
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Write a story about a magic backpack.";

const result = await model.generateContent(prompt);
console.log(result.response.text());


const config = {
  method: 'post', 
  url: 'https://api.example.com/endpoint',
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Token xác thực
    'Content-Type': 'application/json',         // Loại dữ liệu
    'Accept': 'application/json',               // Loại dữ liệu mong muốn từ server
    'Custom-Header': 'CustomHeaderValue'        // (Tùy chọn) Các header tùy chỉnh khác
  },
  data: { 
    name: 'John Doe',
    age: 30,
    preferences: {
      color: 'blue',
      language: 'English'
    }
  },
  timeout: 5000, 
};


