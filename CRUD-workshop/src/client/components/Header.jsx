import React from 'react';
import Cookie from 'universal-cookie';
import { Link } from 'react-router-dom';

const cookie = new Cookie();

export const Header = ({ title, subtitle }) => (
  <header>
    <div className="header-titles">
      {title ? <div className="title"><Link to="/">{title}</Link></div> : null}
      {subtitle ? <div className="subtitle">{subtitle}</div> : null}
    </div>
    <button className="header-logout" onClick={() => {
      cookie.remove('token');
      window.location = '';
    }}>
      Logout
    </button>
  </header>
);
