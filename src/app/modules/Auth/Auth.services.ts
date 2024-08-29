import httpStatus from 'http-status';
import { ApiError } from '../../Errors/ApiError';
import { authToken } from '../../middlewares/Auth.middleware';
import { IUser } from '../User/User.interfaces';
import { User } from '../User/User.schema';
import bcrypt from 'bcryptjs';

const register = async (payload: Partial<IUser>) => {
  /**
   * create user in the database
   *
   * @param payload : data for user registration
   * check if any user is already exists
   */

  try {
    const user = await User.find({ email: payload.email });
    if (user) throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
    const result = await User.create(payload);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// login user
type ILogin = {
  userName?: string;
  email?: string;
  password: string;
};
const login = async (payload: ILogin, ipAddress: string) => {
  // Step 1: Find user by email or username
  const query: Partial<IUser> = {};
  if (payload.email) {
    query.email = payload.email;
  }
  if (payload.userName) {
    query.userName = payload.userName;
  }
  const user = await User.findOne(query);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Step 2: Compare passwords
  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // Step 3: generate token
  const tokenPayload = {
    userId: user._id,
    role: user.role,
  };

  const token = authToken.generateToken(tokenPayload);
  // Ensure loginHistory is defined and handle updating it
  user.loginHistory = user.loginHistory || [];
  user.loginHistory.push({ ipAddress, loginAt: new Date() });
  user.loginCount = (user.loginCount || 0) + 1;
  await user.save();

  return { token };
};

export const userServices = {
  register,
  login,
};
