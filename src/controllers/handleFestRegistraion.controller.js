import { Registration } from "../models/registration.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const handleFestRegistration = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(401, "Unauthorized");

  const {
    event1: { participants: quiz },
    event2: { participants: productLaunch },
    event3: { participants: ItManager },
    event4: { participants: gaming },
    event5: { participants: coding },
    event6: { participants: webDesigning },
    event7: { participants: photoAndVideo },
    event8: { participants: cultural },
  } = req.body.formFields;

  try {
    const data = await Registration.create({
      registeredUser: req.user,
      quiz,
      productLaunch,
      ItManager,
      gaming,
      coding,
      webDesigning,
      photoAndVideo,
      cultural,
    });
    res.status(201).json(new ApiResponse(201, "Registration Successful", data));
  } catch (err) {
    res.status(500).json(new ApiError(500, "Registration Failed", err.message));
    console.log(err);
  }
});

export { handleFestRegistration };
