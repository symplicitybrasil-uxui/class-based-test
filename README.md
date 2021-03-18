# Todo list App Requirements

Basic Structure:
- index.js -> Entry point file
- HttpService -> Ready-to-go Http Service
- TodoListService -> Service to consume from Todo List API
- TodoListModel -> Model class based on the API model
- TodoListView -> Class to hold and render view template
- TodoListController -> Main Class to hold business logic and interact with the other layers

1. Implement a simple model to the TodoItemModel class based on this data model:

API/GET
[
  {
    "id": "1",
    "createdAt": 1611779142,
    "title": "Welcome to our test! :)",
    "done": true
  },
  {
    "id": "2",
    "createdAt": 1614610294,
    "title": "I have to complete these items",
    "done": false
  }
]
Note: this is a fundamental piece to consume and process data across the App

1. Use `HttpService` to fix `TodoListService`;


3. Implement the `saveListItem` method on `TodoListService`;
4. Use the `renderList` method on `TodoListView` to render the view on `TodoListController`; 
5. Search for `#btnCreateTask` and save it as a class property on `TodoListController`;
6. Bind `TodoListController` method `_createListItem` to `#btnCreateTask`;
7. Finish the `_toggleSave` method on `TodoListController`;
