# ListItemsFilter Component

## Overview

The `ListItemsFilter` component provides a user-friendly interface for filtering and displaying items from a project list and a progress tracking list. It leverages the Fluent UI `DetailsList` component to show the combined and filtered data from both lists, allowing users to interact with the data effectively.

## Features

- **Search Functionality**: Users can search for projects by name or city. The search results dynamically display matching projects as buttons.
- **Dynamic Data Combining**: Combines data from the "Projects" list and "Progress Tracking" list based on related fields.
- **Interactive List**: Clicking on a project button filters the `DetailsList` to show only the progress items related to the selected project.
- **Responsive UI**: Implements Fluent UI for a consistent and accessible user experience.

## How It Works

1. **Data Fetching**: On component mount, `ListItemsFilter` fetches data from the "Projects" and "Progress Tracking" lists.
2. **Data Combination**: Each item from the "Progress Tracking" list is enhanced with the corresponding project's title and city from the "Projects" list.
3. **Filtering**: As the user types in the search field, the project buttons update in real-time. The `DetailsList` also updates based on the search input.
4. **Project Selection**: Clicking a project button filters the `DetailsList` to only show items from the "Progress Tracking" list that are associated with the selected project.

## Technical Details

- The component uses React hooks such as `useState` and `useEffect` for state management and side effects.
- The data fetching from SharePoint lists is performed using PnPjs library functions `GetProjectList` and `GetProjectListItem`.

## Usage

Place the `ListItemsFilter` component in your page where you need to display the combined list with filtering capabilities. Ensure that the required SharePoint lists ("Projects" and "Progress Tracking") are available and properly configured with the required fields.

```jsx
<ListItemsFilter />


Props
The following props are required for the ListItemsFilter component to function correctly:

context: The WebPart context object from the SharePoint Framework (SPFx).

Styles
The component's styling is handled by SCSS modules to ensure styles are scoped and do not clash with other global styles.

Dependencies
@fluentui/react: For the DetailsList and other UI components.
@pnp/sp: For fetching data from SharePoint lists using PnPjs library.
Please ensure these dependencies are installed and imported into your project to use the ListItemsFilter component.


This snippet provides a basic overview, feature set, and technical implementation details for the `ListItemsFilter` component, which can be tailored further to match the exact specifications and features of your application.
```
