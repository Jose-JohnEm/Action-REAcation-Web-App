import axios from 'axios';

export const deleteUser = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios
        .get('http://127.0.0.1:8080/deleteuser/', {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type' : 'application/json',
          }
        });
      if (response.status === 200) {
        localStorage.clear();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
};

export interface IEditUserData {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
}

export const editUser = async (body: IEditUserData) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios
      .post('http://127.0.0.1:8080/user/', body, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type' : 'application/json',
        }
      });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};