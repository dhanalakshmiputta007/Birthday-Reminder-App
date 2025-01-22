import React from 'react';



const ParagraphComponent = ({ text, children,numberOfLines,fontFamily }) => {
  return (
    <span className={fontFamily} numberOfLines={numberOfLines} ellipsizeMode="tail">
      {text}
      {children} {/* Render children if provided */}
    </span>
  );
};

export default ParagraphComponent;


