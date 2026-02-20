import mongoose from "mongoose";

const conditionSchema = new mongoose.Schema(
  {
    questionnaire: {
      lowMood: { type: Number, required: true, min: 0, max: 3 },
      anxiety: { type: Number, required: true, min: 0, max: 3 },
      fatigue: { type: Number, required: true, min: 0, max: 3 },
      sleepProblem: { type: Number, required: true, min: 0, max: 3 },
      concentrationIssue: { type: Number, required: true, min: 0, max: 3 },
    },

    totalScore: {
      type: Number,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Condition = mongoose.model("Condition", conditionSchema);

export default Condition;
