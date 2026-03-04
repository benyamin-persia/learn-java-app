/**
 * Project model - Real-world projects linked to curriculum.
 * Expandable: add more projects per week or new weeks.
 */
import mongoose from 'mongoose';

const projectStepSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  concepts: [String],
  hints: [String],
}, { _id: true });

const projectSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  weekId: { type: mongoose.Schema.Types.ObjectId, ref: 'Week' },
  concepts: [String],
  steps: [projectStepSchema],
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);
