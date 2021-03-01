import TodoListView from "./TodoListView";

export default class TodoListController {
  listContainer = document.getElementById("list-container");
  taskInput = document.getElementById("taskTitle");
  listItems = [];
  listElement;

  constructor(todoListService) {
    this.todoListService = todoListService;
    this.todoListView = new TodoListView();
  }

  load() {
    this.todoListService.getListItems().then(items => {
      this.listItems = items;
      this._renderList();
      this._bindCreateBtnEvent();
    });
  }

  _renderList() {
    if (this.listItems) {
      // render the list
      if (renderedList) {
        this.listContainer.innerHTML = renderedList;
        this.listElement = this.listContainer.querySelector(".todo-list");
        this._bindEditButtonsEvent();
        this._bindSaveButtonsEvent();
      }
    }
  }

  _bindCreateBtnEvent() {
    // this method must be responsible for binding a function to
    // a createBtnTask element
  }

  _bindEditButtonsEvent() {
    let editButtons = Array.from(this.listElement.querySelectorAll(".js-edit"));
    editButtons.forEach(element =>
      element.addEventListener("click", this._toggleEdit.bind(this))
    );
  }

  _bindSaveButtonsEvent() {
    let saveButtons = Array.from(
      this.listElement.querySelectorAll(".js-toggle-complete")
    );

    saveButtons.forEach(element =>
      element.addEventListener("click", this._toggleSave.bind(this))
    );
  }

  _createListItem(event) {
    event.preventDefault();
    // create the model
    const listItemData = {
      title: this.taskInput.value,
      done: false
    };

    this.todoListService
      .saveListItem(listItemData)
      .then(newItem => this._addItemToList(newItem));
  }

  _addItemToList(newItem) {
    this.taskInput.value = "";
    if (this.listElement) {
      this.listItems.push(newItem);
      this.listElement.innerHTML += this.todoListView.renderListItem(newItem);
      this.listElement
        .querySelector(`[data-id="${newItem.id}"] .js-edit`)
        .addEventListener("click", this._toggleEdit.bind(this));

      this.listElement
        .querySelector(`[data-id="${newItem.id}"] .js-toggle-complete`)
        .addEventListener("click", this._toggleSave.bind(this));
    }
    this.taskInput.focus();
  }

  _toggleEdit(event) {
    const taskElement = event.currentTarget.closest("li");
    const taskTitle = taskElement.querySelector(".task-title");
    const editField = taskElement.querySelector("input");
    const editIcon = taskElement.querySelector(".btn-edit > i");
    const isSaveOperation = taskTitle.style.display === "none";
    if (isSaveOperation) {
      this.todoListService
        .updateListItem({ title: editField.value }, taskElement.dataset.id)
        .then(updatedListItem => {
          this._updateListItem(updatedListItem);
          taskTitle.innerHTML = updatedListItem.title;
          editIcon.classList.add("fa-edit");
          editIcon.classList.remove("fa-save");

          taskTitle.style.display = "flex";

          editField.style.display = "none";
        });
    } else {
      taskTitle.style.display = "none";

      editField.style.display = "inline-block";
      editField.focus();

      editIcon.classList.add("fa-save");
      editIcon.classList.remove("fa-edit");
    }
  }

  _toggleSave(event) {
    const taskElement = event.currentTarget.closest("li"),
      isTaskDone = taskElement.classList.contains("completed"),
      taskId = taskElement.dataset.id,
      editObject = { done: !isTaskDone };

    this.todoListService
      .updateListItem(editObject, taskId)
      .then(updatedItem => {
        this._updateListItem(updatedItem);
        // update taskElement class based on the returned item
        // use the "completed" css class to indicate the state
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  _updateListItem(updatedItem) {
    const itemIndex = this.listItems.findIndex(
      item => item.id === updatedItem.id
    );
    this.listItems[itemIndex] = updatedItem;
  }
}
