import TodoModel, { Items } from "../models/Todo.models";
import { ListDto } from "./interface/todo.interface";

export default class TodoService {
  static async createTodo(list: ListDto) {
    const createdTodo = await TodoModel.create(list);

    return createdTodo
  }

  static async addItemToList(item: any, listId: string) {  
   
    const addItem = await TodoModel.findOneAndUpdate(
      {_id: listId},
      {items: item},
      { new: true},
    )

    return addItem
  }

  static async fetchAllTodos() {
    const allTodos = await TodoModel.find();

    return allTodos
  }

  static async fetchATodo(listId: string) {
    const todo = await TodoModel.findById({ _id: listId});

    return todo
  }

  static async fetchAllItemsInTodo(listId: string) {
    const todo = await TodoModel.findById({ _id: listId});

    return todo.items
  }

  static async fetchOneItemInTodo(listId: string, itemId: string) {
    const todo = await TodoModel.findById({ _id: listId});

    const items: any = todo?.items;

    const item = items?.filter((index) => {
      return index.itemId === itemId 
    })

    return item
  }

  static async updateList(data) {
    const updatedItem = await TodoModel.updateOne(
      { _id: data.listId },
      { $set:
        {
          name: data.name, 
          description: data.description
        }
      },
      { new: true},
    )

    return updatedItem
  }

  static async updateListItems(listId: string, item) {
    const updatedItem = await TodoModel.updateOne(
      { _id: listId },
      { $set:
        {items: item},
      },
      { new: true},
    )

    return updatedItem
  }

  static async deleteTodo(listId: string) {

    const duplilicatedList = await TodoModel.findByIdAndRemove({_id: listId})

    return duplilicatedList
  }

  static async deleteItemInTodo(listId: string, data: Items) {
    const updateList = await TodoModel.updateOne(
      {_id: listId},
      {items: data},
      {upsert: true}
    )

    return updateList
  }
}
