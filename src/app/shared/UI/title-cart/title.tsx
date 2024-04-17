import React from 'react';

interface NavTitleProps {
  className: string;
  title?: string | null;
}

const Title: React.FC<NavTitleProps> = ({title, className}) => {

  return (
    <>
     <span className={className}>{title}</span>
    </>
  )
}

export default Title;