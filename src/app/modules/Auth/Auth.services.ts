import { IUser } from '../User/User.interfaces';
import { User } from '../User/User.schema';

const register = async (payload: Partial<IUser>) => {
  /**
   * create user in the database
   *
   * @param payload : data for user registration
   * check if any user is already exists
   */

  try {
    const user = await User.find({ email: payload.email });
    if (user) throw new Error('User is already exist');
    const result = await User.create(payload);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const userServices = {
  register,
};
