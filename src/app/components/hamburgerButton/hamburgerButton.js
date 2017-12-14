import React, {Component} from 'react';
import sidebarResourcesStore from '../../sidebar/sidebarResources';

export class hamburgerButton extends Component {
  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
    this.state = {
      isActive: false
    };
  }

  _handleClick() {
    this.setState({isActive: !this.state.isActive});
    sidebarResourcesStore.sidebarShow = !this.state.isActive;
  }

  render() {
    const classNames = 'c-hamburger c-hamburger--htx';
    const isActive = this.state.isActive ? ' is-active' : '';
    return (
      <button className={classNames + isActive} onClick={this._handleClick}>
        <p>Menú</p>
        <span>toggle menu</span>
      </button>
    );
  }
}
