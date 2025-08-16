import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  createRoom,
  getOwnerRooms,
  getRooms,
  toggleRoomAvailability,
} from "../controllers/roomController.js";

const roomRouter = express.Router();

roomRouter.post(
  "/",
  protect,                     // Auth middleware
  upload.array("images", 4),   // Multer middleware
  createRoom                   // Controller
);
roomRouter.get("/", getRooms);
roomRouter.get("/owner", getRooms, protect, getOwnerRooms);
roomRouter.post(
  "/toggle-availabilty",
  protect,
  toggleRoomAvailability
);

export default roomRouter;
