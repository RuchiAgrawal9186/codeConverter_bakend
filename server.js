const express = require('express');
const axios = require('axios');
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

const { Configuration, OpenAIApi } = require("openai");
// const express = require("express");

// const converterRouter = express.Router()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
 
app.post('/convert', async (req, res) => { 
    try {
      
      const { language,code } = req.body;
  
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Convert the given code to the programming language ${language}, this is the code ${code}`,
        max_tokens: 2000,//setting the words limit
        temperature: 0.5,
      });
  
      res.json({msg:`Code converted to ${language}`,response:response.data.choices[0].text.trim()})

    } catch (error) {
      console.error(error);
      res.status(500).json({err:error.message});
    }
  }); 

  app.post('/debug', async (req, res) => { 
    try {
      
      const { language,code } = req.body;
  
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Debug the given javasript code and give corrected code with explanation, this is the code ${code}`,
        max_tokens: 2000,//setting the words limit
        temperature: 0.5,
      });
  
      res.json({msg:"Debugged response",response:response.data.choices[0].text.trim()})

    } catch (error) {
      console.error(error);
      res.status(500).json({err:error.message});
    }
  });
  app.post('/quality', async (req, res) => { 
    try {
      
      const { language,code } = req.body;
  
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Analyse the given javasript code and provide suggestions and improvements based on the syntax, quality of code and other parameters like function name etc,mention those areas of improvement as devoloper and list down it. this is the code ${code}`,
        max_tokens: 2000,//setting the words limit
        temperature: 0.5,
      });
  
      res.json({msg:"Areas of improvement",response:response.data.choices[0].text.trim()})

    } catch (error) {
      console.error(error);
      res.status(500).json({err:error.message});
    }
  }); 


app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});


