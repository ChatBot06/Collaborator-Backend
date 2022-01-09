import mongoose from 'mongoose'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAGSwUqQPFPylJABPsGYsHq4qumyGZCoik",
  authDomain: "chatbot-9d118.firebaseapp.com",
  projectId: "chatbot-9d118",
  storageBucket: "chatbot-9d118.appspot.com",
  messagingSenderId: "318362548581",
  appId: "1:318362548581:web:9acc036f306b3ce910898c",
  measurementId: "G-0EGQQ4DC07"
};
const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI, {
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    // })
    const firebaseApp = await initializeApp(firebaseConfig);
    // console.log(firebaseApp)

    console.log(`Firebase Connected `.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB;
