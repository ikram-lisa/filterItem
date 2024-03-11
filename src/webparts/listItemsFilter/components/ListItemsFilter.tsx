import React, { useState, useEffect } from 'react';
import { GetProjectList } from './spService';
import { IListItemsFilterProps } from './IListItemsFilterProps';
import { GetProjectListItem } from './ListItem/spServiceList';
import { DetailsList, DetailsListLayoutMode, IColumn } from '@fluentui/react/lib/DetailsList';
import styles from "./ListItemsFilter.module.scss";

interface IProjectItem {
  Id: string; 
  Title: string;
  City: string;
}

interface IProjectItemList {
  ProjectId: number;
  Id: string;
  Category0: string[];
  Title: string;
  Progress: string;
}

type IProgressTracking = Omit<IProjectItemList, 'ProjectId'> & { Project: string };


const columns: IColumn[] = [
  { key: 'column1', name: 'Work Item', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column3', name: 'Project', fieldName: 'Project', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column2', name: 'Category', fieldName: 'Category0', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column4', name: 'Progress', fieldName: 'Progress', minWidth: 100, maxWidth: 200, isResizable: true }
];

const ListItemsFilter: React.FunctionComponent<IListItemsFilterProps> = (props) => {
 
  const [projects, setProjects] = useState<IProjectItem[]>([]);
  const [progressItems, setProgressItems] = useState<IProgressTracking[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<IProjectItem[]>([]);
  const [progressItemsFilterd, setProgressItemsFilterd] = useState<IProgressTracking[]>([]);
 


  useEffect(() => {
    // Define an async function that can use the await keyword
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchAndCombineLists = async () => {
 
        // Fetch project list
        const projectList = await GetProjectList();
        setProjects(projectList);
        setFilteredProjects(projectList);
  
        // Fetch progress items list
        const itemList = await GetProjectListItem();
        console.log(itemList);
  
        // Map the itemList to the desired structure and set it to state
        const mappedProgressItems = itemList.map((item: IProjectItemList) => ({
          Id: item.Id,
          Category0: item.Category0,
          Project:  projectList.find(project => project.Id === item.ProjectId).Title,
          Title: item.Title,
          Progress: item.Progress 
        }));
  
        setProgressItems(mappedProgressItems);
        setProgressItemsFilterd(mappedProgressItems);
      
    };
  
    fetchAndCombineLists().catch( e => console.log(e));
    
  }, []); 
  
 
  return (
    <div className={styles.listItemsFilter}>
       <div className={styles['sidebar-filter']}>
      <input
        type="text"
        className={styles['input-field']}
        placeholder="Search by name or city"
        onChange={(e) => setFilteredProjects([...projects.filter(project =>
            project.Title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            project.City.toLowerCase().includes(e.target.value.toLowerCase())
          )])
        } 
      /> <br />
          <div>
          {filteredProjects.map((project) => (
                <button
                  key={project.Id}
                  className={styles['project-button']}
                  onClick={() => setProgressItemsFilterd([...progressItems.filter(item => item.Project.toLowerCase().startsWith(project.Title.toLowerCase()))])
                  }
                >
                  {project.Title}
                </button>
              ))}

          </div>

      </div>
      <DetailsList
      items={ progressItemsFilterd }
      columns={columns}
      setKey="set"
      layoutMode={DetailsListLayoutMode.justified}
      selectionPreservedOnEmptyClick={true}
      ariaLabelForSelectionColumn="Toggle selection"
      ariaLabelForSelectAllCheckbox="Toggle selection for all items"
    />
    </div>
  );
  
};

export default ListItemsFilter;
