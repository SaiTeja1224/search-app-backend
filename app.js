const { query } = require("express");
const express = require("express");
const app = express();
const PORT = 8000;

const CatchAsync = require("../search-app-backend/utilities/catchAsync");
const ExpressError = require("../search-app-backend/utilities/ExpressError");

const cors = require("cors");

const Company = require("../search-app-backend/models/Company");
const Ad = require("../search-app-backend/models/Ad");

const mongoose = require("mongoose");
const FuzzySearch = require("fuzzy-search");
mongoose
  .connect("mongodb://localhost:27017/searchapp")
  .then(() => {
    console.log("Conected to local mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

app.get(
  "/ads",
  CatchAsync(async (req, res, next) => {
    const { keyword } = req.query;
    if (!keyword) {
      res.json({ ads: [], status: "Success" });
    } else {
      const regex = new RegExp(keyword, "i");
      const searchLocations = [
        {
          description: regex,
        },
        {
          primaryText: regex,
        },
        {
          "company.companyName": regex,
        },
      ];

      const result = await Ad.aggregate([
        {
          $lookup: {
            from: "companies",
            localField: "company",
            foreignField: "_id",
            as: "company",
          },
        },
        {
          $match: {
            $or: searchLocations,
          },
        },
      ]);

      res.json({ ads: result, status: "Success" });
    }
  })
);

app.use("*", () => {
  throw new ExpressError("Page Not Found", 404);
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong", name } = err;
  res
    .status(status)
    .json({ status: "Failure", message: "Failed to gather resources" });
});

app.listen(PORT, () => {
  console.log("Server Running");
});
