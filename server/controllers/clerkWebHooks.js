import { json } from "express";
import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWEbHooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    //verify webhook
    await whook.verify(JSON.stringify(req.body), headers);

    //Getting data from request type
    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

    //Switch cases for different events
    switch (type) {
      case "user.created": {
        await User.create(userData);
        break;
      }

      case "user.updated": {
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        break;
    }

    res.json({ success: true, message: "WebHook Received" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


export default clerkWEbHooks