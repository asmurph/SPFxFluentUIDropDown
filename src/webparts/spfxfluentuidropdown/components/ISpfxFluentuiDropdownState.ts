import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';

export interface ISpfxFluentuiDropdownState {
  projectlookupvalues: IDropdownOption[];
  title: string;
  seletedprojects: number[];
}
