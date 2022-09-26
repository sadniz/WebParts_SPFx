import * as React from 'react';
import styles from '../Galeria.module.scss';

export interface ICard{
  Name: string,
  key: any,
  Url: string,
  library_name: string,
  FileLeafRef: string
}

export class Card extends React.Component<ICard> {
  constructor(props: ICard) {
    super(props);
  }

  public render(): React.ReactElement<ICard> {
    return (<div className={styles.galleryCard}>
      <img alt={this.props.Name} key={this.props.key} className={styles.galleryImg} src={
        this.props.Url
        + '/' + this.props.library_name
        + '/' + this.props.FileLeafRef} />
      <p className={styles.galleryCardTitle}>{this.props.Name}</p>
    </div>)
  }
};