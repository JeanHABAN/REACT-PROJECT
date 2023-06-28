import React, { useState } from "react";

function withExpandable(Component) {
  return function Expandable(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    function handleExpandClick() {
      setIsExpanded(!isExpanded);
    }

    return (
      <Component
        {...props}
        isExpanded={isExpanded}
        onExpandClick={handleExpandClick}
      />
    );
  };
}


function Paragraph(props) {
    const { text, isExpanded, onExpandClick } = props;
  
    return (
      <div>
        <p>{isExpanded ? text : `${text.slice(0, 100)}...`}</p>
        <button onClick={onExpandClick}>
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </div>
    );
  }

  const ExpandableParagraph = withExpandable(Paragraph);