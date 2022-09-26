import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { PropertyFieldSPListPicker, PropertyFieldSPListPickerOrderBy } from 'sp-client-custom-fields/lib/PropertyFieldSPListPicker';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { ISPList } from '../../interfaces/Interfaces';
import * as strings from 'GaleriaWebPartStrings';
import Galeria from './components/Galeria';
import { IGaleriaProps } from '../../interfaces/IGaleriaProps';

export interface IGaleriaWebPartProps {
  description: string;
  context: WebPartContext;
  listGuid: string;
  errorListGuid: string;
  list: string; // Stores the list ID(s),
  selectedListName: string;
}

export default class GaleriaWebPart extends BaseClientSideWebPart<IGaleriaWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IGaleriaProps> = React.createElement(
      Galeria,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
        listGuid: this.properties.listGuid,
        errorListGuid: this.properties.errorListGuid,
        list: this.properties.list,
        selectedListName: this.properties.selectedListName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();
    return super.onInit();
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }
    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: this.properties.description
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.Title,
                }),
                // PropertyPaneTextField('test', {
                //   label: 'Multi-line Text Field',
                //   multiline: true
                // }),
                // PropertyPaneCheckbox('test1', {
                //   text: 'Checkbox'
                // }),
                // PropertyPaneDropdown('test2', {
                //   label: 'Dropdown',
                //   options: [
                //     { key: '1', text: 'One' },
                //     { key: '2', text: 'Two' },
                //     { key: '3', text: 'Three' },
                //     { key: '4', text: 'Four' }
                //   ]
                // }),
                // PropertyPaneToggle('test3', {
                //   label: 'Toggle',
                //   onText: 'On',
                //   offText: 'Off'
                // }),
                // PropertyFieldSPListPicker('listGuid', {
                //   label: "Insira a lista de Banners",
                //   selectedList: this.properties.listGuid,
                //   includeHidden: false,
                //   orderBy: PropertyFieldSPListPickerOrderBy.Title,
                //   disabled: false,
                //   onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                //   render: this.render.bind(this),
                //   disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                //   properties: this.properties,
                //   context: this.context,
                //   onGetErrorMessage: null,
                //   deferredValidationTime: 0,
                //   key: 'listPickerFieldId'
                // }),
                PropertyFieldListPicker('list', {
                  label: 'Select a list',
                  selectedList: this.properties.list,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                }),
                // PropertyFieldSPListPicker('errorListGuid', {
                //   label: "Insira a lista de erros",
                //   selectedList: this.properties.errorListGuid,
                //   includeHidden: false,
                //   orderBy: PropertyFieldSPListPickerOrderBy.Title,
                //   disabled: false,
                //   onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                //   render: this.render.bind(this),
                //   disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                //   properties: this.properties,
                //   context: this.context,
                //   onGetErrorMessage: null,
                //   deferredValidationTime: 0,
                //   key: 'listPickerFieldId'
                // })
              ]
            }
          ]
        }
      ]
    };
  }
}
