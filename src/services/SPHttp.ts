import {
    SPHttpClient,
    SPHttpClientResponse
} from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ISPLists } from '../interfaces/Interfaces';
import { Logger, LogLevel, ConsoleListener, IConsoleListenerColors } from "@pnp/logging";

export async function _getListPropertyById_Http(_this: any, context: WebPartContext, list_guid: string, list_property: string): Promise<any> {
    await new Promise(function (resolve, reject): any {
        context.spHttpClient.fetch(
            context.pageContext.web.absoluteUrl + `/_api/web/lists(guid'${list_guid}')?$filter=Hidden eq false`, SPHttpClient.configurations.v1,
            {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                }
            }
        ).then(response1 => {
            return response1.json();
        }).then(response2 => {
            console.log(response2);
            _this.setState({ listDescription: response2[list_property] });
            return response2[list_property];
        });
    });
}
