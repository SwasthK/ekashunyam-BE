import mongoose from "mongoose";

const participantSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Participant name is required"],
  },
  contact: {
    type: String,
    required: [true, "contact number name is required"],
  },
});

// const eventSchema = mongoose.Schema({
//   eventName: {
//     type: String,
//     required: [true, "Event name is required"],
//   },
//   participants: {
//     type: [participantSchema],
//     required: [true, "Participants are required"],
//   },
// });

const registrationSchema = mongoose.Schema(
  {
    registeredUser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    quiz: {
      type: [participantSchema],
      required: [true, "quiz event details are required"],
    },
    productLaunch: {
      type: [participantSchema],
      required: [true, "product launch event details are required"],
    },
    ItManager: {
      type: [participantSchema],
      required: [true, "It manager event details are required"],
    },
    gaming: {
      type: [participantSchema],
      required: [true, "gaming event details are required"],
    },
    coding: {
      type: [participantSchema],
      required: [true, "coding event details are required"],
    },
    webDesigning: {
      type: [participantSchema],
      required: [true, "web designing event details are required"],
    },
    photoAndVideo: {
      type: [participantSchema],
      required: [
        true,
        "photography and videography event details are required",
      ],
      cultural: {
        type: [participantSchema],
        required: [true, "cultural event details are required"],
      },
    },
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);
export { Registration };
