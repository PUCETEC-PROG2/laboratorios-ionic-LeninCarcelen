import { IonCard, IonCardContent, IonCardSubtitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <IonCard className="card">
            <img src="https://avatars.githubusercontent.com/u/173552925?v=4" alt="Imagen de perfil" className="profile-image"
            alt="Foto de perfil" />
            <ionicCardHeader>
              <IonCardTitle className="card-title">Lenin Carcelen</IonCardTitle>
              <IonCardSubtitle className="card-subtitle">Desarrollador de software</IonCardSubtitle>
            </ionicCardHeader>
            <IonCardContent className="card-content">
              <p>¡Hola! Soy Lenin Carcelen, un apasionado desarrollador de software con experiencia en el desarrollo de aplicaciones móviles e interfaces de usuario.</p>
            </IonCardContent>
          </IonCard>
        </div>
        <ExploreContainer name="Tab 3 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
