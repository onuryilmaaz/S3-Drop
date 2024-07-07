import { Auth } from 'aws-amplify';

export default async function useAllUsers() {
  try {
    const users = await Auth.listUsers();
    console.log("All users:", users);
    return users;
  } catch (error) {
    console.error('Error listing users:', error);
    return [];
  }
}
