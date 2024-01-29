const openai = require("../config/openaiConfig");

exports.generateBestResponse = async (req, res) => {
  const { userName } = req.body;
  const { promot } = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `
    Compose a response (IN THE LANGUAGE BASED ON USER CLAIM) to ${userName} who has raised concerns or made claims about [${promot}]. The client is seeking reassurance and clarification. Craft a message that is empathetic, acknowledges their concerns, and provides a clear and positive resolution or plan moving forward. The company name is Keira, in case you might need to put it at the end., 
    `,
      },
    ],
  });

  res.status(200).json({
    status: "success",
    response: response.choices[0].message,
  });
};
