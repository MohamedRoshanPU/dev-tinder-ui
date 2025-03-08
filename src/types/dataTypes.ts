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

export interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO string format
  gender: "male" | "female" | "other"; // Adjust if needed
  designation: string;
  skills: string[];
  email: string;
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
  age: number;
  __v: number;
}

export interface UserFeedResponse {
  message: string;
  data: UserData[];
}

export interface ConnectionRequestDataType {
  id: string;
  status: "INTERESTED" | "NOT_INTERESTED" | "ACCEPTED" | "REJECTED";
}

export interface RequestResponseDataType {
  message: string;
  data: RequestData[];
}

export interface RequestData {
  _id: string;
  fromUserId: User;
  toUserId: string;
  status: "INTERESTED" | "PENDING" | "REJECTED" | "APPROVED"; // Adjust as needed
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserSafeData {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date format
  gender: "male" | "female" | "other"; // Adjust as needed
  designation: string;
  skills: string[];
  email: string;
}
