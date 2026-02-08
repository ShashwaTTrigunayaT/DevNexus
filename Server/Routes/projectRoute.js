const express = require("express");
const {isLoggedIn} = require("../middleware/auth");
const { getProjectsByUser } = require("../Controllers/projectController");
const { showAllProjects , createNewProject , getProjectByroomID , updateProjectCode, updateProjectLanguage, deleteProject, updateProjectTitle, saveProjectCode} = require("../Controllers/projectController");
const router = express.Router();

router.get("/", isLoggedIn(), showAllProjects);
router.post("/create", isLoggedIn(), createNewProject);
router.get("/:roomID", isLoggedIn(), getProjectByroomID);

router.patch("/:roomID/language", isLoggedIn(), updateProjectLanguage);
router.patch("/:roomID/rename", isLoggedIn(), updateProjectTitle);
router.delete("/:roomID", isLoggedIn(), deleteProject);
router.patch("/:roomID/code", isLoggedIn(), saveProjectCode);
router.get("/user/:userId", isLoggedIn(), getProjectsByUser);


module.exports = router;