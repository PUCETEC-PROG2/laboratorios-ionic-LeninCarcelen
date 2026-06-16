import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItemSliding>
              <IonItem>
                <IonThumbnail slot="start">
                  <IonImg src={repository.avatarUrl} />
                </IonThumbnail>
                <IonLabel>
                  <h3>{repository.name}</h3>
                  <p>{repository.description}</p>
                  <p><strong>Language:</strong> {repository.language}</p>
                </IonLabel>
              </IonItem>
              <IonItemOptions>
                <IonIcon={pencil} slot="icon-only" />
              </IonItemOptions color="danger">
              <Icon icon={trash} slot="icon-only" />
              
              </IonItemSliding>
            <IonList>
                {repositories.map((repo) => (
                    <RepoItem {...repo}/>
                ))}
            </IonList>
            </IonItemSliding>
    
    <div className="repo-item"></div>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
