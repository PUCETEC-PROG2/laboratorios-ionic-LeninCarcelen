import {Repository} from '../interfaces/Repository';
import './RepoItem.css';

const RepoItem: React.FC<Repository> = ({repository}) => {
    return (
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
    
    <div className="repo-item">
        );
        }


export default RepoItem;