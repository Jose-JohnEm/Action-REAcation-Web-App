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

    console.log(params);
    try {
      const response = await axios
        .post(`http://127.0.0.1:8080/area?area_name=${params.area_name}&action_service=${params.action_service}&action_name=${params.action_name}&action_params=${JSON.stringify(params.action_params)}&reaction_service=${params.reaction_service}&reaction_name=${params.reaction_name}&reaction_params=${JSON.stringify(params.reaction_params)}`,
        null, {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
        console.log(response.data.events)
        localStorage.setItem('events', JSON.stringify(response.data.events));
        return true;
    } catch (error : any) {
      console.error(error)
      return false;
    }
};

export const deleteArea = async (id: number) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios
      .delete(`http://127.0.0.1:8080/area?id=${id}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    if (response.status === 200) {
      localStorage.setItem('events', JSON.stringify(response.data.events));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const deleteAllAreas = async () => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios
      .delete('http://127.0.0.1:8080/area/all', {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type' : 'application/json',
        }
      });
    if (response.status === 200) {
      localStorage.setItem('events', JSON.stringify(response.data.events));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};