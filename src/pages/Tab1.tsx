import { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonSpinner, IonText } from '@ionic/react';
import { useIonViewWillEnter } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import GithubService from '../services/GithubService';
import { GithubRepo } from '../interfaces/Github';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [repositories, setRepositories] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const repos = await GithubService.getUserRepos();
      setRepositories(repos);
      setError(null);
    } catch {
      setError('No se pudieron cargar los repositorios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  useIonViewWillEnter(() => {
    fetchRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading && (
          <div className="loading-container">
            <IonSpinner name="crescent" />
          </div>
        )}

        {error && (
          <div className="error-message">
            <IonText color="danger">{error}</IonText>
          </div>
        )}

        {!loading && !error && (
          <IonList>
            {repositories.map((repo) => (
              <RepoItem
                key={repo.id}
                name={repo.name}
                description={repo.description || 'Sin descripción'}
                language={repo.language || 'N/A'}
                avatarUrl={repo.owner?.avatar_url || ''}
              />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
