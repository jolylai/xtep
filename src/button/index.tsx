import React from 'react';

import './index.less';

export interface ButtonProps {
  children: React.ReactChild;
  onClick: (e: React.MouseEvent) => void;
}

function Button(props: ButtonProps) {
  const { children, onClick } = props;
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
