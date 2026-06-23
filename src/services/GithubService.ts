import axios from 'axios';
import { GithubRepo, GithubUser } from '../interfaces/GithubUser';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const apiClient = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json'
  }
});

const getUserRepos = async (): Promise<GithubRepo[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
      headers: { 
        Authorization: `Bearer ${GITHUB_TOKEN}` 
      }
    });
    if (response.status !== 200) {
      throw new Error(`Error obtenido repositorios: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
};

export const createRepository = async(repoPayload: RepositoryPayload) : Promise<GithubRepo | null> => {
  try {
    const response = await axios.post(`${GITHUB_API_URL}/user/repos`, repoPayload, {
      headers: { 
        Authorization: `Bearer ${GITHUB_TOKEN}` 
      }
    });
    if (response.status !== 201) {
      throw new Error(`Error creating repository: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error al crear un nuevo repositorio:' + (error as Error).message);
    return null;
  }
};

const getUserInfo = async (): Promise<GithubUser | null> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user`, {
      headers: { 
        Authorization: `Bearer ${GITHUB_TOKEN}` 
      }
    });
    if (response.status !== 200) {
      throw new Error(`Error obtenido usuario: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};

const GithubService = {
  getUserRepos,
  getUserInfo
};

export default GithubService;
