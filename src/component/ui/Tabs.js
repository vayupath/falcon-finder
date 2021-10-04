import React, { useEffect, useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState();

  const changeTab = (label) => {
    setActiveTab(label);
  };

  useEffect(() => {
    setActiveTab(children[0].props.label);
  }, [children]);

  const getcls = (label) => {
    return label === activeTab ? 'tabs__item--selected' : '';
  };
  return (
    <div>
      <ul className='tabs'>
        {children.map((child) => {
          return (
            <li
              className={`tabs__item ${getcls(child.props.label)}`}
              onClick={() => {
                changeTab(child.props.label);
              }}
            >
              {child.props.label}
            </li>
          );
        })}
      </ul>
      <div>
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return <div class='tab__content'>{child.props.children}</div>;
        })}
      </div>
    </div>
  );
};

Tabs.propTypes = {};

export { Tabs };
