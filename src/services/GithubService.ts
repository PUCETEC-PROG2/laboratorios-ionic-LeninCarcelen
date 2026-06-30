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

export const getUserRepos = async (): Promise<GithubRepo[]> => {
  try {
    const response = await apiClient.get('/user/repos');
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
    const response = await apiClient.post('/user/repos', repoPayload);
    if (response.status !== 201) {
      throw new Error(`Error creating repository: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error al crear un nuevo repositorio:' + (error as Error).message);
    return null;
  }
};

export const updateRepository = async(owner: string, repoName: string, repoPayload: Partial<RepositoryPayload>): Promise<GithubRepo | null> => {
  try {
    const response = await apiClient.patch(`/repos/${owner}/${repoName}`, repoPayload);
    if (response.status !== 200) {
      throw new Error(`Error updating repository: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el repositorio:' + (error as Error).message);
    return null;
  }
};

export const deleteRepository = async(owner: string, repoName: string): Promise<boolean> => {
  try {
    const response = await apiClient.delete(`/repos/${owner}/${repoName}`);
    return response.status === 204;
  } catch (error) {
    console.error('Error al eliminar el repositorio:' + (error as Error).message);
    return false;
  }
};

const getUserInfo = async (): Promise<GithubUser | null> => {
  try {
    const response = await apiClient.get('/user');
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
  getUserInfo,
  createRepository,
  updateRepository,
  deleteRepository,
};

export default GithubService;
