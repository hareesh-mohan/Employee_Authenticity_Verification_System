const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/user");
const cors = require("cors");

const app = express();
app.use(cors());
mongoose.connect(
  "mongodb+srv://score-board:score%402024@cluster0.vu0ao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
app.use(express.json());
app.post("/signup", async (req, res) => {
  try {
    const { name, age, email, userType, institution, password } = req.body;
    const uniqueIds = [
      "0x84b6fb81d3ab6D69292346e7D4CA8607f67506C7",
      "0x0Cbf871c2d48ce0f0F92589AA09Ece2E8Defb080",
      "0xa9C72f276108f02F8C8f4d541f639f475D0BFfcb",
      "0xA0e104b2201a9dEBa1BF59Dd704448C0d3D967Fe",
      "0xDC873D7826D250830DE3cBA5b6e5E0a875d87c03",
      "0x8482F2fa3e7C7b676b30ac69D71C87a1F946CCdF",
      "0x793daa0E3ce53da4E71f974b45391Fc1B023Ef57",
      "0xDfAe2E2da6e967b5B3615F1C5C0b376DBB0e977f",
      "0x48C6dEed28ea7d2932a15DE0Df87e775F8923187",
      "0xd8972a8285916fA0ACb19D6FD43F2d5c06b6Be07"
    ];
    
    console.log(req.body);

    // Iterate over uniqueIds array
    for (const uniqueId of uniqueIds) {
      // Check if a user with this uniqueId already exists
      const existingUser = await User.findOne({ uniqueId: uniqueId });
      if (existingUser) {
        // If user exists, throw an error
        continue;
      }

      // If user does not exist, create and save the user
      const newUser = new User({ name, age, email, userType, institution, password, uniqueId });
      console.log(newUser);
      await newUser.save();
      break;
    }
    res.status(201).send({ message: "Users created successfully" });
  } catch (error) {
    // Handle errors
    res.status(400).send({ error: error.message });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log(user);
  if (user) {
    res.status(200).send({ message: "Logged in successfully", user });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

app.get("/document/:email", async (req, res) => {
  const userEmail = req.params.email;
  console.log(userEmail)
  try {
    const documents = await User.findOne({ email: userEmail });
    console.log(documents);
    if (!documents) {
      return res
        .status(404)
        .json({ message: "Documents not found for the user" });
    }
    res.status(200).json({ documents: documents.docHash, userId: documents.uniqueId });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/documents/:userId", async (req, res) => {
  const uniqueId = req.params.userId;
  const { docHash } = req.body; // Assuming docHash is passed in the request body
  console.log(docHash)
  try {
    // Find the user by userId
    const user = await User.findOne({ uniqueId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the docHash array
    user.docHash.push(docHash);
    
    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Document hash added successfully" });
  } catch (error) {
    console.error("Error adding document hash:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
