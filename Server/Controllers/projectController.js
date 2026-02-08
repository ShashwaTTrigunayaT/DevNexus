const express = require("express");
const Project = require("../models/projectModel");
const crypto = require("crypto");

async function showAllProjects(req, res) {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const projects = await Project.find({ $or: [ { owner: userId }, { collaborators: userId } ] }).sort({ updatedAt: -1 });
        res.status(200).json({ projects });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch projects" });
    }
}

async function createNewProject(req, res) {
    try {
        const { title, language } = req.body;
        const userId = req.user._id;
        const roomID = crypto.randomBytes(6).toString("hex");
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const project = await Project.create({
            title,
            
            language,
            roomID,
            code: "",
            owner: userId
        });
        res.status(201).json({ project });
    } catch (err) {
        return res.status(500).json({ error: "Failed to create project" });
    }
}

async function getProjectByroomID(req, res) {
    try {
        const { roomID } = req.params;
        const project = await Project.findOne({ roomID: roomID });
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ project });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch project" });
    }
}

async function updateProjectCode(req, res) {
    try {
        const { roomID } = req.params;
        const { code } = req.body;
        const project = await Project.findOneAndUpdate({ roomID: roomID }, { code: code }, { new: true });
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ project });
    } catch (err) {
        return res.status(500).json({ error: "Failed to update project code" });
    }

}

async function updateProjectLanguage(req, res) {
    try {
        const { roomID } = req.params;
        const { language } = req.body;
        const project = await Project.findOneAndUpdate({ roomID: roomID }, { language: language }, { new: true });
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ project });
    } catch (err) {
        return res.status(500).json({ error: "Failed to update project code" });
    }

}
async function deleteProject(req, res) {
    try {
        const { roomID } = req.params;
        const project = await Project.findOneAndDelete({ roomID: roomID });
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ project });
    } catch (err) {
        return res.status(500).json({ error: "Failed to delete project" });
    }
}
async function updateProjectTitle(req, res) {
    try {
        const { roomID } = req.params;
        const { title } = req.body;
        const project = await Project.findOne({ roomID: roomID });
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        project.title = title;
        await project.save();
        res.status(200).json({ project });
    } catch (err) {
        return res.status(500).json({ error: "Failed to update project title" });
    }
}
async function saveProjectCode(req, res) {
    try {
        const { roomID } = req.params;
        const { code } = req.body;
        const project = await Project.findOneAndUpdate({ roomID: roomID }, { code: code }, { new: true });
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ project });
    } catch (err) {
        return res.status(500).json({ error: "Failed to save project code" });
    }
}
async function getProjectsByUser(req, res) {
    try {
        const { userId } = req.params;

        // Find projects where 'owner' matches the userId
        const projects = await Project.find({ owner: userId })
            .select("title language updatedAt createdAt") // Only select fields we need
            .sort({ updatedAt: -1 }); // Newest first

        res.status(200).json({ projects });
    } catch (err) {
        console.error("Error fetching user projects:", err);
        return res.status(500).json({ error: "Failed to fetch user projects" });
    }
}
module.exports = { 
    showAllProjects, 
    createNewProject, 
    getProjectByroomID, 
    updateProjectCode,
    updateProjectLanguage,
    deleteProject,
    updateProjectTitle,
    saveProjectCode,
    getProjectsByUser
};