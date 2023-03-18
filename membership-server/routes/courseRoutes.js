import express from "express";
import {
  addLecture,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLectures,
} from "../controllers/courseController.js";
import {
  authorizeAdmin,
  authorizeSubscribers,
  isAuthenticated,
} from "../middlewares/auth.js";
import singleupload from "../middlewares/multer.js";

const router = express.Router();

router.route("/courses").get(getAllCourses);

router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleupload, createCourse);

router
  .route("/course/:id")
  .get(isAuthenticated, authorizeSubscribers, getCourseLectures)
  .post(isAuthenticated, authorizeAdmin, singleupload, addLecture)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);

router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;
