import * as React from 'react';
import styles from './Spfxfluentuidropdown.module.scss';
import { ISpfxfluentuidropdownProps } from './ISpfxfluentuidropdownProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ISpfxFluentuiDropdownState } from './ISpfxFluentuiDropdownState';
import { Dropdown, IDropdownOption, TextField, PrimaryButton } from 'office-ui-fabric-react';
//import { autobind } from 'office-ui-fabric-react/lib/u';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";



export default class Spfxfluentuidropdown extends React.Component<ISpfxfluentuidropdownProps, ISpfxFluentuiDropdownState> {
  constructor(props: ISpfxfluentuidropdownProps, state: ISpfxFluentuiDropdownState) {
    super(props);
    sp.setup({
      spfxContext: this.props.context
    });
    this.state = ({ projectlookupvalues: [], title: '', seletedprojects: null });
    this._getLookupvalues();
  }

   //@autobind
   private async _getLookupvalues() {
    const allItems: any[] = await sp.web.lists.getByTitle("Site Pages")
    .items
        
        .select("Title")
        .get();
    let projectarr: IDropdownOption[] = [];
    allItems.forEach(project => {
      projectarr.push({ key: project.ID, text: project.Title });
    });
    this.setState({
      projectlookupvalues: projectarr
    });
    console.log(projectarr);
  }

  public render(): React.ReactElement<ISpfxfluentuidropdownProps> {
    return (
      <div className={ styles.spfxfluentuidropdown }>
        {<Dropdown
          placeholder="Select projects"
          label="Projects"
          onChange={this.projects_selection}        
          options={this.state.projectlookupvalues}
         
        />}
      </div>
    );
  }
  
  //@autobind
  private projects_selection(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) {
    if (item.selected) {
      let seleteditemarr = this.state.seletedprojects;
      seleteditemarr.push(+item.key);
      this.setState({ seletedprojects: seleteditemarr });
    }
    else {
      let seleteditemarr = this.state.seletedprojects;
      let i = seleteditemarr.indexOf(+item.key);
      if (i >= 0) {
        seleteditemarr.splice(i, 1);
      }
      this.setState({ seletedprojects: seleteditemarr });
    }
  }
}
