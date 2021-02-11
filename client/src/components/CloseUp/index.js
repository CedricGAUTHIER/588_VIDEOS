import React from 'react';

import './CloseUp.scss';

function CloseUp({ setPage }) {
  setPage('la proposition du moment');
  return (
    <div className="CloseUp">
       Page CloseUp
    </div>
  );
}

export default CloseUp;
