import { SPFI, spfi } from "@pnp/sp";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ISPLists } from '../interfaces/Interfaces';
import { Logger, LogLevel, ConsoleListener, IConsoleListenerColors } from "@pnp/logging";
import { IListProps } from "office-ui-fabric-react";

export async function _getListById(_sp: SPFI, _listId: string, _fieldSelect: string[]): Promise<any> {
    const list = _sp.web.lists.getById(_listId);
    const listSelected = await list.select(_fieldSelect.join(", "))();
    return listSelected;
}
export async function _getImages(_sp: SPFI, _listId: string, _filters: string[]): Promise<any> {
    return (await _sp.web
        .lists
        .getById(_listId)
        .items
        .select(_filters.join(", "))
        .expand("File")()).filter(x => x.File !== null && x.File !== undefined);
}