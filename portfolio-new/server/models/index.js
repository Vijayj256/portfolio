// ============ User / Admin Model ============
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6, select: false },
  role:     { type: String, enum: ['admin'], default: 'admin' },
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.matchPassword = async function(entered) {
  return bcrypt.compare(entered, this.password);
};

UserSchema.methods.getSignedJwt = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

module.exports.User = mongoose.model('User', UserSchema);

// ============ Profile Model ============
const ProfileSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  title:       { type: String, required: true },
  bio:         { type: String },
  tagline:     { type: String },
  email:       { type: String },
  phone:       { type: String },
  location:    { type: String },
  avatar:      { type: String },
  resume:      { type: String },
  social: {
    github:    String,
    linkedin:  String,
    twitter:   String,
    instagram: String,
    website:   String,
  },
  stats: {
    yearsExp:   { type: Number, default: 0 },
    projects:   { type: Number, default: 0 },
    clients:    { type: Number, default: 0 },
    awards:     { type: Number, default: 0 },
  },
}, { timestamps: true });

module.exports.Profile = mongoose.model('Profile', ProfileSchema);

// ============ Project Model ============
const ProjectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  longDesc:    { type: String },
  image:       { type: String },
  tags:        [String],
  tech:        [String],
  github:      { type: String },
  live:        { type: String },
  featured:    { type: Boolean, default: false },
  category:    { type: String, enum: ['web', 'mobile', 'api', 'ai', 'other'], default: 'web' },
  order:       { type: Number, default: 0 },
}, { timestamps: true });

module.exports.Project = mongoose.model('Project', ProjectSchema);

// ============ Skill Model ============
const SkillSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  level:    { type: Number, min: 0, max: 100, required: true },
  category: { type: String, enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'other'], default: 'other' },
  icon:     { type: String },
  color:    { type: String },
  order:    { type: Number, default: 0 },
}, { timestamps: true });

module.exports.Skill = mongoose.model('Skill', SkillSchema);

// ============ Experience Model ============
const ExperienceSchema = new mongoose.Schema({
  company:     { type: String, required: true },
  role:        { type: String, required: true },
  type:        { type: String, enum: ['full-time', 'part-time', 'freelance', 'internship', 'contract'], default: 'full-time' },
  location:    { type: String },
  startDate:   { type: Date, required: true },
  endDate:     { type: Date },
  current:     { type: Boolean, default: false },
  description: { type: String },
  bullets:     [String],
  tech:        [String],
  logo:        { type: String },
}, { timestamps: true });

module.exports.Experience = mongoose.model('Experience', ExperienceSchema);

// ============ Education Model ============
const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree:      { type: String, required: true },
  field:       { type: String },
  startDate:   { type: Date },
  endDate:     { type: Date },
  current:     { type: Boolean, default: false },
  grade:       { type: String },
  description: { type: String },
  logo:        { type: String },
}, { timestamps: true });

module.exports.Education = mongoose.model('Education', EducationSchema);

// ============ Contact Message Model ============
const ContactSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  read:    { type: Boolean, default: false },
  replied: { type: Boolean, default: false },
}, { timestamps: true });

module.exports.Contact = mongoose.model('Contact', ContactSchema);

// ============ Testimonial Model ============
const TestimonialSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  role:     { type: String },
  company:  { type: String },
  avatar:   { type: String },
  message:  { type: String, required: true },
  rating:   { type: Number, min: 1, max: 5, default: 5 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports.Testimonial = mongoose.model('Testimonial', TestimonialSchema);
