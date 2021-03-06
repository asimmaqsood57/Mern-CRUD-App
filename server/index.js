const express = require("express");

//cP8Fj8XVI8UIsXqv

//mongodb+srv://new-user_31:<password>@mern-app.ztkdk.mongodb.net/test
const mongoose = require("mongoose");

const cors = require("cors");

const FoodModel = require("./models/Food");
const app = express();

mongoose
  .connect(
    "mongodb+srv://new-user_31:cP8Fj8XVI8UIsXqv@mern-app.ztkdk.mongodb.net/food?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("database connection successful");
  });
app.use(express.json());
app.use(cors());

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;

  const food = new FoodModel({
    foodName: foodName,
    daysSinceIAte: days,
  });

  try {
    await food.save().then((result) => {
      console.log(result);
      res.send("record inserted");
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName;
      updatedFood.save();
      res.send("updated");
    }).then((result) => {
      console.log(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FoodModel.findByIdAndRemove(id).exec();
  res.send("Deleted Successfully");
  // res.send(id);
});

app.listen(3001, () => {
  console.log("server running at port 3001");
});
