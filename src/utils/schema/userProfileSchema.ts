import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required.",
  }),
  gender: z.enum(["male", "female", "others"], {
    required_error: "Please select a gender.",
  }),
  designation: z.string().min(2, {
    message: "Designation must be at least 2 characters.",
  }),
  skills: z.array(z.string()).min(1, {
    message: "Please add at least one skill.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});
