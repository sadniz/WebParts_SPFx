import * as React from 'react';
import styles from './Galeria.module.scss';
import { IGaleriaProps } from '../../../interfaces/IGaleriaProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { getSP } from '../../../config/pnPjsConfig';
import { SPFI } from "@pnp/sp";
import { Logger, LogLevel, ConsoleListener } from "@pnp/logging";
import { IResponseItem, IFile, ISPList } from '../../../interfaces/Interfaces';
import { IItemUpdateResult } from "@pnp/sp/items";
import { _getListPropertyById_Http } from '../../../services/SPHttp';
import { _getListById, _getImages } from '../../../services/SPService';
import { Card } from './Card/Card';
import { IList } from '@pnp/sp/lists';

export default class Galeria extends React.Component<IGaleriaProps, { [key: string]: any }> {
  private LOG_SOURCE = "Galeria";
  private LIBRARY_NAME = "Imagens";
  private _sp: SPFI;
  // private LoggerColors;

  constructor(props: IGaleriaProps) {
    super(props);
    // set initial state
    this.state = {
      imagens: [],
      errors: [],
      lists: [],
      listName: "",
      listDescription: ""
    };

    this._sp = getSP(this.props.context);
    Logger.subscribe(ConsoleListener(this.LOG_SOURCE));
  }

  public componentDidMount(): void {
    Logger.write(`componentDidMount`, LogLevel.Info);
    this._getListById(this._sp, this.props.list);
    this._getImages();
    this._getListPropertyById_Http();
    console.log(this.state);
  }

  public componentDidUpdate(prevProps: Readonly<IGaleriaProps>, prevState: Readonly<{ [key: string]: any; }>, snapshot?: any): void {
    Logger.write(`componentDidUpdate`);
    if (prevProps !== this.props) {
      this._getImages();
      this._getListById(this._sp, this.props.list);
      this._getListPropertyById_Http();
    }
    console.log(prevProps !== this.props);
  }

  private async _getListPropertyById_Http() {
    const retorno = await _getListPropertyById_Http(this, this.props.context, this.props.list, "Description");
    console.log(retorno)
    console.log("retorno")
  }

  private async _getImages() {
    const responseImages: any = await _getImages(this._sp, this.props.list, ["Id", "FileLeafRef", "File"]);
    console.log(responseImages);
    this.setState({ imagens: responseImages });
  }

  private async _getListById(_sp, _listId) {
    const responseList: any = await _getListById(this._sp, _listId, ["Title", "Description"]);
    console.log(responseList);
    this.setState({ listName: responseList.Title });
    this.setState({ listDescription: responseList.Description });
  }

  private _getFiles = async (): Promise<void> => {
    try {
      // const spCache = spfi(this._sp).using(Caching({ store: "session" }));
      Logger.write(`_getFiles`, LogLevel.Info);
      const response: IResponseItem[] = await this._sp.web.lists
        .getByTitle(this.LIBRARY_NAME)
        .items
        .select("Id", "Title", "FileLeafRef", "File", "File/Length")
        .expand("File")();

      console.log(response);
      // use map to convert IResponseItem[] into our internal object IFile[]
      const imagens: IFile[] = response.map((item: IResponseItem) => {
        if (item.File !== null &&
          item.File !== undefined) {
          return {
            Id: item.Id,
            Title: item.Title || "Unknown",
            Size: item.File?.Length || 0,
            Name: item.FileLeafRef
          };
        }
      }).filter(x => x !== undefined);

      // Add the items to the state
      this.setState({ imagens });
      Logger.write(`(_readAllFilesSize) - ${JSON.stringify(imagens)} - `, LogLevel.Info);
    } catch (err) {
      console.log(err);
      Logger.write(`${(err)} - `, LogLevel.Error);
    }
  }

  private _updateTitles = async (): Promise<void> => {
    try {
      //Will create a batch call that will update the title of each item
      //  in the library by adding `-Updated` to the end.
      const [batchedSP, execute] = this._sp.batched();

      //Clone items from the state
      const items = JSON.parse(JSON.stringify(this.state.items));

      const res: IItemUpdateResult[] = [];

      for (let i = 0; i < items.length; i++) {
        // you need to use .then syntax here as otherwise the application will stop and await the result
        batchedSP.web.lists
          .getByTitle(this.LIBRARY_NAME)
          .items
          .getById(items[i].Id)
          .update({ Title: `${items[i].Name}-Updated` })
          .then(r => res.push(r));
      }
      // Executes the batched calls
      await execute();

      // Results for all batched calls are available
      for (let i = 0; i < res.length; i++) {
        //If the result is successful update the item
        //NOTE: This code is over simplified, you need to make sure the Id's match
        const item = await res[i].item.select("Id, Title")<{ Id: number, Title: string }>();
        items[i].Name = item.Title;
      }

      //Update the state which rerenders the component
      this.setState({ items });
    } catch (err) {
      console.log(err);
      Logger.write(`${this.LOG_SOURCE} (_updateTitles) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
  }

  public render(): React.ReactElement<IGaleriaProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      context,
      listGuid,
      errorListGuid,
      list
    } = this.props;

    let { imagens } = this.state;
    try {
      return (
        <div className={styles.welcome}>
          <section className={`${styles.galeria} ${hasTeamsContext ? styles.teams : ''} `} >
            <h2>{escape(this.props.description + " - " + this.state.listName)}</h2>
            <h4>{escape(this.state.listDescription)}</h4>
            <div className={styles.galleryCardContainer}>
              {imagens.map((item: any, idx: number) => {
                return (
                  <Card
                    library_name={this.LIBRARY_NAME}
                    Name={item.File.Name}
                    Url={this.props.context.pageContext.web.absoluteUrl}
                    FileLeafRef={item.FileLeafRef}
                    key={idx} />
                );
              })}
            </div>
          </section >
          <div>{environmentMessage}</div>
        </div >
      );
    } catch (err) {
      console.log(err);
      Logger.write(`${this.LOG_SOURCE} (render) - ${JSON.stringify(err)} - `, LogLevel.Error);
    }
    return (
      <section className={`${styles.galeria} ${hasTeamsContext ? styles.teams : ''} `} >
        <div className={styles.welcome}>
          <h2>Erro!</h2>
        </div>
      </section >
    );
  }
}
