import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
          <IponicHeader>

            <div className="form-container">

              <IonicImput
                className="form-input"
                label="text"
                placeholder="Ingrese el nombre del repositorio"
                labelPacement="floating"
              />

              <IonicImput
                className="form-input"
                label="Description"
                placeholder="Ingrese la descripcion del repositorio"
                labelPacement="floating"
                rows={4}
                />

                <IonicButton 
                className="submit-button"
                expand="block"
                fill="solid"                color="primary"
                >
                  Guardar
                </IonicButton>
            </div>
        </IonHeader>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
