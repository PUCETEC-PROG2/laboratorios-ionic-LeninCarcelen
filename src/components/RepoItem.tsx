import { IonItem, IonLabel, IonThumbnail, IonImg } from '@ionic/react';
import { Repository } from '../interfaces/Repository';
import './RepoItem.css';

const RepoItem: React.FC<Repository> = ({ name, description, language, avatarUrl }) => {
  return (
    <IonItem>
      <IonThumbnail slot="start">
        <IonImg src={avatarUrl} alt={name} />
      </IonThumbnail>
      <IonLabel>
        <h2>{name}</h2>
        <p>{description}</p>
        <p><strong>Lenguaje:</strong> {language}</p>
      </IonLabel>
    </IonItem>
  );
}


export default RepoItem;