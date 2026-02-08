const mongoose = require('mongoose');
const { createHmac, randomBytes } = require("crypto");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: 'I love coding!'
    },
    role: {
        type: String,
        default: 'Developer',
    },
    skills: {
        type: [String]
    },
    profileImage: {
        type: String,
        default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    },
    salt: {
        type: String,
    },
    githubLink: {
        type: String
    },
}, { timestamps: true });

// --- FIXED PRE-SAVE HOOK ---
UserSchema.pre("save", function(next) {
    const user = this;

    if (!user.isModified("password")) return next();

    // 1. Generate Salt
    const salt = randomBytes(16).toString("hex");

    // 2. Hash Password
    const hashpass = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    // 3. Assign values (Fixed the comma issue here)
    this.salt = salt;      // Changed , to ;
    this.password = hashpass;
    
    
    
});

// --- MATCH PASSWORD ---
UserSchema.statics.matchPassword = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) return null;

    // Safety check for old users without salt
    if (!user.salt) return null;

    const salt = user.salt;
    const hashpass = user.password;
    
    const userProvideHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
        
    if (userProvideHash !== hashpass) return null;
    
    return user;
}

module.exports = mongoose.model('user', UserSchema);