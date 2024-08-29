import { IUser } from '../User/User.interfaces';
import { User } from '../User/User.schema';

const register = async (payload: Partial<IUser>) => {
  /**
 * create user in the database
 *
 * @param payload : data for user registration
 * check if any user is already exists
 * hash the password

 */
  const user = await User.find({ email: payload.email });
  if (user) {
    throw new Error('User is already exist');
  }
};

export const userServices = {
  register,
};
