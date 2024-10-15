import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickMenuOpen } from '../../../redux/actions';
import { get } from 'lodash';

const Topbar = (props) => {
  const navigate = useNavigate();


  const handleLogout = (event) => {
    event.preventDefault();

    // Dispatch the Redux action with formData
    if (props.SignOut != undefined) {
      props.SignOut()
        .then(() => {
          navigate('/'); // Navigate to dashboard after registration
        })
        .catch((error) => {
          console.error('SignIn error:', error);
        });
    }
  };
  const handleProfileUpdate = (event) => {
    event.preventDefault();
    navigate('/profileupdate'); // Navigate to dashboard after registration
    // Dispatch the Redux action with formData
  };
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

      {/* Sidebar Toggle (Topbar) */ }
      <button onClick={ () => props.clickMenuOpen() } id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars"></i>
      </button>

      {/* Topbar Search */ }
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form>

      {/* Topbar Navbar */ }
      <ul className="navbar-nav ml-auto">

        {/* Nav Item - Search Dropdown (Visible Only XS) */ }
        <li className="nav-item dropdown no-arrow d-sm-none">
          <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-search fa-fw"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
            <form className="form-inline mr-auto w-100 navbar-search">
              <div className="input-group">
                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        {/* Nav Item - Alerts */ }
        <li className="nav-item dropdown no-arrow mx-1">
          <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-bell fa-fw"></i>
            <span className="badge badge-danger badge-counter">3+</span>
          </a>
          <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
            <h6 className="dropdown-header">
              Alerts Center
            </h6>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="mr-3">
                <div className="icon-circle bg-primary">
                  <i className="fas fa-file-alt text-white"></i>
                </div>
              </div>
              <div>
                <div className="small text-gray-500">December 12, 2019</div>
                <span className="font-weight-bold">A new monthly report is ready to download!</span>
              </div>
            </a>
            {/* Add more alerts as needed */ }
            <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
          </div>
        </li>

        {/* Nav Item - Messages */ }
        <li className="nav-item dropdown no-arrow mx-1">
          <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-envelope fa-fw"></i>
            <span className="badge badge-danger badge-counter">7</span>
          </a>
          <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
            <h6 className="dropdown-header">Message Center</h6>
            {/* Add message dropdown items here */ }
            <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
          </div>
        </li>

        <div className="topbar-divider d-none d-sm-block"></div>

        {/* Nav Item - User Information */ }
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{ `${get(props.profileDetails, "name", "")} - ${get(props.profileDetails, "surname", "")}` } </span>
            <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" alt="" />
          </a>
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            <a className="dropdown-item" href="#" onClick={ handleProfileUpdate }>
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              profile update
            </a>
            <a className="dropdown-item" href="#">
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
              Settings
            </a>
            <a className="dropdown-item" href="#">
              <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
              Activity Log
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" onClick={ handleLogout }>
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({ clickMenuOpen }, dispatch);

const mapStateToProps = store => ({
  toggled: store.menuState.menuOpen,
  profileData: store.profileDetails.profileData

});

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
