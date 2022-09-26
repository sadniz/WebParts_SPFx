declare interface IGaleriaWebPartStrings {
  Title: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'GaleriaWebPartStrings' {
  const strings: IGaleriaWebPartStrings;
  export = strings;
}
