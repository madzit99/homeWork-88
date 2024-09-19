export interface RegisterMutation {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Post {
  _id: string;
  user: {
    username: string;
    _id: string;
  };
  title: string;
  description: string;
  image: string;
  date: Date;
}