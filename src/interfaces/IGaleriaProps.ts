import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IGaleriaProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  listGuid: string;
  errorListGuid: string;
  list: string; // Stores the list ID(s)
  selectedListName: string;
}