const { query } = require("express");
const express = require("express");
const app = express();
const PORT = 8000;

const CatchAsync = require("./utilities/catchAsync");
const ExpressError = require("./utilities/ExpressError");

const fuzzySearch = require("fuzzy-search");
const cors = require("cors");

const Company = require("./models/Company");
const Ad = require("./models/Ad");

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

let storedAds = [];
const accessData = async () => {
  try {
    storedAds = await Ad.find({}).populate("company", {
      companyName: 1,
      companyUrl: 1,
    });
  } catch (e) {
    console.log(e);
  }
};

accessData();
const searchLocations = ["primaryText", "company.companyName"];

app.use(cors());

app.get(
  "/ads",
  CatchAsync(async (req, res, next) => {
    const { keyword } = req.query;
    if (keyword === "") {
      res.json({ ads: [], status: "Success" });
    } else {
      const searcher = new FuzzySearch(storedAds, searchLocations, {
        sort: true,
      });
      const result = searcher.search(keyword);

      res.json({ ads: result, status: "Success" });
    }
  })
);

app.use("*", () => {
  throw new ExpressError("Page Not Found", 404);
});

app.use((err, req, res, next) => {
  // console.log(err.message, err.name);
  const { status = 500, message = "Something went wrong", name } = err;
  res
    .status(status)
    .json({ status: "Failure", message: "Failed to gather resources" });
});

app.listen(PORT, () => {
  console.log("Server Running");
});
