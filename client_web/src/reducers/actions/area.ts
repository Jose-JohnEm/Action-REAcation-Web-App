import axios from 'axios';
import MYAREALIST from '../../constants/myAreaList';

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
        .post(`http://127.0.0.1:8080/area?area_name=${params.area_name}&action_service=${params.action_service}&action_name=${params.action_name}&action_params=${JSON.stringify(params.action_params)}&reaction_service=${params.reaction_service}&reaction_name=${params.reaction_name}&reaction_params=${JSON.stringify(params.reaction_params)}`,
        null, {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
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
      while(MYAREALIST.length > 0) {
        MYAREALIST.pop();
      }
      localStorage.setItem('events', JSON.stringify(response.data.events));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const getWebhooksLinks = async () => {
  try {
    const response = await axios
      .get('http://127.0.0.1:8080/about.json', {
        headers: {
          'Content-Type' : 'application/json'
        }
      });
    if (response.status === 200) {
      localStorage.setItem('webhooksLinks', JSON.stringify({
        teams: response.data.server.url + '/webhooks/teams',
        pivotaltracker: response.data.server.url + '/webhooks/pivotaltracker',
        github: response.data.server.url + '/webhooks/github'
      }));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}