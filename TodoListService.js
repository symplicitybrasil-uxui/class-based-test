const API_URL = "https://5dbc736530411e0014f26e5f.mockapi.io/api/tasks";
import TodoItemModel from "./TodoItemModel";

export default class TodoListService {
  getListItems() {
    return new Promise((resolve, reject) => {
      this.httpService
        .get(API_URL)
        .then(data => {
          if (data) {
            let todoItems = data.map(
              item =>
                new TodoItemModel(
                  item.id,
                  item.createdAt,
                  item.title,
                  item.done
                )
            );
            resolve(todoItems);
          } else {
            resolve({});
          }
        })
        .catch(error => reject(error));
    });
  }

  saveListItem(listItemObject) {
    // this method must be responsible for sending a request to the API
    // to save a new list item added by users
  }

  updateListItem(listItemObject, id) {
    return new Promise((resolve, reject) => {
      this.httpService
        .put(API_URL, listItemObject, id)
        .then(updatedItem => {
          if (updatedItem) {
            resolve(
              new TodoItemModel(
                updatedItem.id,
                updatedItem.createdAt,
                updatedItem.title,
                updatedItem.done
              )
            );
          } else {
            resolve({});
          }
        })
        .catch(error => reject(error));
    });
  }
}
