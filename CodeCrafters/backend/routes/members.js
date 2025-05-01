const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const multer = require("multer");
const path = require("path");

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  }
});
const upload = multer({ storage: storage });

// POST /api/members – Add new member
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, role, email } = req.body;
    const image = req.file.filename;

    const newMember = new Member({ name, role, email, image });
    await newMember.save();
    res.status(201).json({ message: "Member added successfully", member: newMember });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add member" });
  }
});


router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch members" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ message: "Error fetching member details" });
  }
});

module.exports = router;

