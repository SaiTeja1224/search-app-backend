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

const addToAd = async () => {
  await Ad.deleteMany({});
  const newData = [
    {
      company: "6337c8475c788ef267df7564",
      primaryText: "Customer Relationship Manager",
      description:
        "CRM for your application, Consultation fee is very offordable",
      cta: "Order Now",
      imgurl:
        "https://images.unsplash.com/photo-1635110982103-c918aa21d9b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    },
    {
      company: "6337c8475c788ef267df7566",
      primaryText: "Entertainment",
      description: "Discount on your first subscription. Learn more right here",
      cta: "Learn More",
      imgurl:
        "https://images.unsplash.com/photo-1635110982103-c918aa21d9b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    },
    {
      company: "6337c8475c788ef267df7565",
      primaryText: "Shoes",
      description: "Buy shoes which are high quality",
      cta: "Sign Up",
      imgurl:
        "https://images.unsplash.com/photo-1635110982103-c918aa21d9b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    },
    {
      company: "6337c8475c788ef267df7563",
      primaryText: "Clothing",
      description: "Buy 1 set of clothes and get another for free",
      cta: "Shop Now",
      imgurl:
        "https://images.unsplash.com/photo-1635110982103-c918aa21d9b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    },
    {
      company: "6337c8475c788ef267df7563",
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
      companyUrl: "levis.com",
    },
    {
      companyName: "Salesforce",
      companyUrl: "salesforce.com",
    },
    {
      companyName: "Puma",
      companyUrl: "puma.com",
    },
    {
      companyName: "Netflix",
      companyUrl: "netflix.com",
    },
  ];
  const newInsertions = await Company.insertMany(newData);
  console.log(newInsertions);
  mongoose.disconnect();
};

addToCompany();
addToAd();
