import mongoose, { mongo } from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties that are required to create a new user
interface UserArgs {
  email: string;
  password: string;
}

// An interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(args: UserArgs): UserDoc;
}

// describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // remapping the json obj that mongo sends back. We don't want to return back the 
    // password or version and we want _id to be id
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);
userSchema.statics.build = (args: UserArgs) => {
  return new User(args);
};

// middleware that will run before saving a document to the db
// we use the function keyword here instead of arrow fn to get the
// proper 'this' value. Arrow functions change the this value to the document
// itself. The done exec is just a mongoose specific thing.
userSchema.pre("save", async function (done) {
  // this will return true if user enters a value for password
  if (this.isModified("password")) {
    // getting entered password, hashing it, then resetting password with hashed version
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  // once again, just a mongoose specific thing when working with async code.
  done();
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// this function ensures that the necessary user args are entered to create a user

export { User };
