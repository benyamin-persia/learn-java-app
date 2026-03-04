/**
 * Week model - One document per week in the curriculum.
 * Expandable: add new weeks by inserting new documents with order.
 * Each week has many topics; topics contain lesson, activities, and quiz.
 */
import mongoose from 'mongoose';

const activityOptionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  correctOrder: { type: Number }, // for drag-and-drop ordering
  correctMatch: { type: String }, // for matching pairs
}, { _id: false });

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['drag-order', 'match-pairs', 'multiple-choice'] },
  instruction: { type: String, required: true },
  options: [activityOptionSchema],
  matchOptions: [activityOptionSchema], // for match-pairs: right column; options = left column
  correctAnswer: { type: mongoose.Schema.Types.Mixed }, // string (MC), array of ids in order (drag-order), or array of [leftId, rightId] (match-pairs)
  explanation: { type: String },
}, { _id: true });

const quizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ id: String, text: String }],
  correctOptionId: { type: String, required: true },
  explanation: { type: String },
}, { _id: true });

const topicSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  lessonContent: { type: String, required: true }, // Markdown or HTML string
  activities: [activitySchema],
  quizQuestions: [quizQuestionSchema],
}, { _id: true });

const weekSchema = new mongoose.Schema({
  order: { type: Number, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  topics: [topicSchema],
}, { timestamps: true });

export const Week = mongoose.model('Week', weekSchema);
