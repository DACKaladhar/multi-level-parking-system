import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// serve jokes

app.get("/api/jokes", (req, res) => {
  const data = [
    {
      id: 1,
      joke: "I told my wife she should embrace her mistakes. She gave me a hug.",
    },
    {
      id: 2,
      joke: "Why did the scarecrow win an award? Because he was outstanding in his field.",
    },
    {
      id: 3,
      joke: "I'm reading a book on the history of glue. I just can't seem to put it down.",
    },
    {
      id: 4,
      joke: "Why don't scientists trust atoms? Because they make up everything.",
    },
    {
      id: 5,
      joke: "What do you call a fish wearing a crown? A kingfish.",
    },
  ]
  res.send(data);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});


console.log(
  "This is just a mock backend folder's server.js file. Don't worry about this, It will be removed in further development"
);