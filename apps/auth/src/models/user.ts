import { Document, Model, Schema, model } from "mongoose";

interface UserAttrs {
    email: string,
    password: string
}
interface UserDoc extends Document, UserAttrs {}

interface UserModel extends Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
    },{
    timestamps: true
})


userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = model<UserDoc,UserModel>('User',userSchema)


export default User
