interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  selectedTab: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, selectedTab, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={selectedTab !== index} {...other}>
      {selectedTab === index && children}
    </div>
  );
};

export default TabPanel;
