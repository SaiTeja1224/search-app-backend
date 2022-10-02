const Company = require("./models/Company");
const Ad = require("./models/Ad");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/searchapp")
  .then(() => {
    console.log("Conected to local mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const ids = {
  salesforce: "63391c2e85c348d337c81f17",
  netflix: "63391c2e85c348d337c81f19",
  puma: "63391c2e85c348d337c81f18",
  levis: "63391c2e85c348d337c81f16",
};

const addToAd = async () => {
  await Ad.deleteMany({});
  const newData = [
    {
      company: ids.salesforce,
      primaryText: "Customer Relationship Manager",
      description:
        "CRM for your application, Consultation fee is very offordable",
      cta: "Order Now",
      imgurl:
        "https://images.unsplash.com/photo-1635110982103-c918aa21d9b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    },
    {
      company: ids.netflix,
      primaryText: "Entertainment",
      description: "Discount on your first subscription. Learn more right here",
      cta: "Learn More",
      imgurl:
        "https://images.unsplash.com/photo-1635110982103-c918aa21d9b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    },
    {
      company: ids.puma,
      primaryText: "Shoes",
      description: "Buy shoes which are high quality",
      cta: "Sign Up",
      imgurl:
        "https://images.unsplash.com/photo-1635110982103-c918aa21d9b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    },
    {
      company: ids.levis,
      primaryText: "Clothing",
      description: "Buy 1 set of clothes and get another for free",
      cta: "Shop Now",
      imgurl:
        "https://images.unsplash.com/photo-1635110982103-c918aa21d9b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    },
    {
      company: ids.levis,
      primaryText: "Clothing",
      description: "Sign up to get free dicount vouchers added to your account",
      cta: "Shop Now",
      imgurl:
        "https://images.unsplash.com/photo-1635110982103-c918aa21d9b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    },
  ];
  for (let data of newData) {
    await new Ad(data).save();
  }
  mongoose.disconnect();
};
const addToCompany = async () => {
  await Ad.deleteMany({});
  const newData = [
    {
      companyName: "Levi's",
      companyUrl: "www.levis.com",
    },
    {
      companyName: "Salesforce",
      companyUrl: "www.salesforce.com",
    },
    {
      companyName: "Puma",
      companyUrl: "www.puma.com",
    },
    {
      companyName: "Netflix",
      companyUrl: "www.netflix.com",
    },
  ];
  const newInsertions = await Company.insertMany(newData);
  console.log(newInsertions);
  mongoose.disconnect();
};

// addToCompany();

// After running the above function please update the ids in the ids array
// So as to allow mongoose to work on the Ads and populate without error.

addToAd();
