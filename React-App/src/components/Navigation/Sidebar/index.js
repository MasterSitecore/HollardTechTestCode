import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickMenuOpen } from '../../../redux/actions';

class Sidebar extends Component {

  render() {
    const { clickMenuOpen, toggled } = this.props;
    return (
      <ul className={ toggled ? 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled' : 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion' } id="accordionSidebar">

        {/* <!-- Sidebar - Brand --> */ }
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          {/* <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div> */}
          <div className="sidebar-brand-text mx-3">Hollard Insurance</div>
        </a>

        {/* <!-- Divider --> */ }
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */ }
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></Link>
        </li>

        {/* <!-- Divider --> */ }
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */ }
        <div className="sidebar-heading">
          Menu Items
        </div>

        {/* <!-- Nav Item - Pages Collapse Menu --> */ }
        <li className="nav-item">
          <a className='nav-link collapsed' href="#" data-toggle="collapse" data-target="#collapseTwo" aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog"></i>
            <span>Quote</span>
          </a>
          <div id="collapseTwo" className='collapse' aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Quote Details:</h6>
              {/* <a className="collapse-item" href="buttons.html">Search Quotes</a> */ }
              <Link className="collapse-item" to="/viewQuote"> Search Quotes</Link>
              <Link className="collapse-item" to="/quotes"> Quotes Create</Link>
              {/* <Link className="collapse-item" to="/cards"> cards</Link> */ }
            </div>
          </div>
        </li>
      </ul>)
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickMenuOpen }, dispatch);

const mapStateToProps = store => ({
  toggled: store.menuState.menuOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);