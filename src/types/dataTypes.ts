export interface LoginDataType {
  email: string;
  password: string;
}
export interface LoginResponseData {
  message: string;
  data: {
    token: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "others";
  designation: string;
  skills: string[];
  email: string;
};

export interface UserResponseData {
  message: string;
  data: User;
}
