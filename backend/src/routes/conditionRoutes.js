import express from "express";
import Condition from "../models/Condition.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();


// ================================
// CREATE DAILY CHECK-IN
// ================================
router.post("/", protectRoute, async (req, res) => {
  try {
    console.log("POST /conditions - User:", req.user?._id, "Body:", req.body);

    const { questionnaire, totalScore, notes, date } = req.body;

    if (!questionnaire || totalScore === undefined) {
      return res.status(400).json({
        message: "Questionnaire and totalScore are required",
      });
    }

    const newCondition = new Condition({
      questionnaire,
      totalScore,
      notes: notes || "",
      user: req.user._id,
      date: date ? new Date(date) : new Date(),
    });

    await newCondition.save();

    res.status(201).json({
      success: true,
      message: "Check-in recorded successfully",
      condition: newCondition,
    });

  } catch (error) {
    console.log("Error creating condition check-in:", error);
    res.status(500).json({ message: error.message });
  }
});


// ================================
// GET ALL CHECK-INS (PAGINATED)
// ================================
router.get("/", protectRoute, async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const conditions = await Condition.find({ user: req.user._id })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Condition.countDocuments({ user: req.user._id });

    res.status(200).json({
      success: true,
      conditions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });

  } catch (error) {
    console.log("Error fetching conditions:", error);
    res.status(500).json({ message: error.message });
  }
});


// ================================
// GET CHECK-IN BY ID
// ================================
router.get("/:id", protectRoute, async (req, res) => {
  try {
    const condition = await Condition.findById(req.params.id);

    if (!condition) {
      return res.status(404).json({ message: "Check-in not found" });
    }

    if (condition.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json({
      success: true,
      condition,
    });

  } catch (error) {
    console.log("Error fetching condition:", error);
    res.status(500).json({ message: error.message });
  }
});


// ================================
// UPDATE CHECK-IN
// ================================
router.put("/:id", protectRoute, async (req, res) => {
  try {
    const { questionnaire, totalScore, notes } = req.body;

    let condition = await Condition.findById(req.params.id);

    if (!condition) {
      return res.status(404).json({ message: "Check-in not found" });
    }

    if (condition.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    condition.questionnaire = questionnaire || condition.questionnaire;
    condition.totalScore = totalScore ?? condition.totalScore;
    condition.notes = notes !== undefined ? notes : condition.notes;

    await condition.save();

    res.status(200).json({
      success: true,
      message: "Check-in updated successfully",
      condition,
    });

  } catch (error) {
    console.log("Error updating condition:", error);
    res.status(500).json({ message: error.message });
  }
});


// ================================
// DELETE CHECK-IN
// ================================
router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const condition = await Condition.findById(req.params.id);

    if (!condition) {
      return res.status(404).json({ message: "Check-in not found" });
    }

    if (condition.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Condition.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Check-in deleted successfully",
    });

  } catch (error) {
    console.log("Error deleting condition:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
