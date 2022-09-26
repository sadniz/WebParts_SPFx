import { WebPartContext } from '@microsoft/sp-webpart-base';

// create File item to work with it internally
export interface IFile {
    Id: number;
    Title: string;
    Name: string;
    Size: number;
}

// create PnP JS response interface for File
export interface IResponseFile {
    Length: number;
}

// create PnP JS response interface for Item
export interface IResponseItem {
    Id: number;
    File: IResponseFile;
    FileLeafRef: string;
    Title: string;
}

export interface ISPLists {
    value: ISPList[];
}

export interface ISPList {
    Title: string;
    Id: string;
}

export interface IGaleriaProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  listGuid: string;
  errorListGuid: string;
}

export interface IPropertyControlsTestWebPartProps {
  lists: string | string[]; // Stores the list ID(s)
}