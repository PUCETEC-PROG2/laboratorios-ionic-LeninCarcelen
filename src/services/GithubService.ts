import axios from 'axios';
import { GithubRepo, GithubUser } from '../interfaces/Github';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

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
