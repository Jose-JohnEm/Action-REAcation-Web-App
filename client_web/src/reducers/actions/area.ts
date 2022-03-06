import axios from 'axios';

export interface ICreateArea {
    area_name: string,
    action_service: string,
    action_name: string,
    action_params: {},
    reaction_service: string,
    reaction_name: string,
    reaction_params: {}
}

export const createArea = async (params: ICreateArea) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios
        .post('http://127.0.0.1:8080/area', params, {
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
