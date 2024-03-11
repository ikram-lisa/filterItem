import * as React from 'react';
import { useEffect, useState } from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn } from '@fluentui/react/lib/DetailsList';
import { GetProjectListItem } from './spServiceList';

interface IProjectItemList {
  Id: string;
  Project: string;
  Category: string;
  WorkItem: string;
  Progress: string;
}

export interface IListItemProps {
    items: IProjectItemList[];
  }

const columns: IColumn[] = [
  { key: 'column1', name: 'Work Item', fieldName: 'Work Item', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column2', name: 'Category', fieldName: 'Category', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column3', name: 'Project', fieldName: 'Project', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column4', name: 'Progress', fieldName: 'Progress', minWidth: 100, maxWidth: 200, isResizable: true }
];

const ListItem: React.FunctionComponent<IListItemProps> = ({ items }) => {
  const [list, setList] = useState<IProjectItemList[]>([]);

  useEffect(() => {
    const loadListItem = async () => {
      try {
        const projectList = await GetProjectListItem();
        setList(projectList.map((item: IProjectItemList) => ({
          Id: item.Id,
          Project: item.Project ? `(${item.Project})` : '',
          Category: item.Category ? `(${item.Category})` : '',
          WorkItem: item.WorkItem ? `(${item.WorkItem})` : '',
          Progress: item.Progress ? `(${item.Progress})` : ''
        })));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
  
    loadListItem();
  }, []);

  return (
    <DetailsList
      items={list}
      columns={columns}
      setKey="set"
      layoutMode={DetailsListLayoutMode.justified}
      selectionPreservedOnEmptyClick={true}
      ariaLabelForSelectionColumn="Toggle selection"
      ariaLabelForSelectAllCheckbox="Toggle selection for all items"
    />
  );
};

export default ListItem;
