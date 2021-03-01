// Import stylesheets
// https://5dbc736530411e0014f26e5f.mockapi.io/api/tasks
import "./style.scss";
import HttpService from "./HttpService";
import TodoListController from "./TodoListController";
import TodoListService from "./TodoListService";

const http = new HttpService();
// http must be used on TodoListService
const todoListService = new TodoListService();
const todoListController = new TodoListController(todoListService);

todoListController.load();
