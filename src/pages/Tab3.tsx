import { useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSpinner, IonText } from '@ionic/react';
import GithubService from '../services/GithubService';
import { GithubUser } from '../interfaces/Github';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await GithubService.getUserInfo();
        setUser(data);
      } catch {
        setError('No se pudo cargar la información del usuario.');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil</IonTitle>
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

        {!loading && !error && user && (
          <div className="container">
            <IonCard className="card">
              <img src={user.avatar_url} alt="Foto de perfil" className="profile-image" />
              <IonCardHeader>
                <IonCardTitle className="card-title">{user.name || user.login}</IonCardTitle>
                <IonCardSubtitle className="card-subtitle">{user.bio || 'Desarrollador de software'}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className="card-content">
                <p>{user.bio || 'Información de perfil no disponible.'}</p>
                <p><strong>Usuario:</strong> {user.login}</p>
                <p><strong>Repositorios:</strong> {user.public_repos}</p>
                <p><strong>Seguidores:</strong> {user.followers}</p>
              </IonCardContent>
            </IonCard>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
