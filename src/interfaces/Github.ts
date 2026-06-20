export interface GithubRepo {
  id: number;
  name: string;
  description: string ;
  language: string ;
  owner?: {
    login: string;
    avatar_url?: string;
  };
}

export interface GithubUser {
  avatar_url: string;
  name: string | null;
  login: string;
  bio: string | null;
  public_repos: number;
  followers: number;
}
