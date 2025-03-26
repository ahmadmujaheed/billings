import mongoose from "mongoose"
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        avatar: {type: String},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, enum: ["admin", "user"], default: "user", required:true},
        resetPasswordToken:String,
        resetPasswordExpiresAt:Date,
        verificationToken:String,
        verificationTokenExpiresAt:Date,
        isVerified:{type:Boolean, default:false},
        isOnline:{type:Boolean, default:false},
        lastLogin: {type:Date, default:Date.now()},

    },
    {timestamps:true}
);

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
userSchema.methods.comparePassword = function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password);
}


export default mongoose.model("User", userSchema)