import { v4 as uuidv4 } from 'uuid';
import TodoModel, { Status } from "../models/Todo.models";
import { AddItemDto, ListDto } from "./interface/todo.interface";

export default class TodoService {
  static async createTodo(list: ListDto) {
    const createdTodo = await TodoModel.create(list);

    return createdTodo
  }

  static async addItemToList(item: AddItemDto) {  
    const listData = {
      itemId: uuidv4(),
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      from: item.from,
      to: item.to,
      status: Status.NOT_STARTED
    }  
    const addItem = await TodoModel.updateOne(
      {_id: item.listId},
      {items: [listData]},
      {upsert: true}
    )

    return addItem
  }

  static async fetchAllTodos() {
    const alllTodos = await TodoModel.find();

    return alllTodos
  }

  static async fetchAllItemsInTodo(listId: string) {
    const alllTodos = await TodoModel.findById({ _id: listId});

    return alllTodos.items
  }

  static async updateItem(itemId: string, data: Partial<typeof TodoModel>) {
    const updatedItem = await TodoModel.updateOne(
      {id: itemId},
      {items: data},
      {upsert: true}
    )

    return updatedItem
  }

  // static async duplicateListItems(itemId: string) {

  //   const duplilicatedList = await TodoModel.create(data)

  //   return duplilicatedList
  // }
}
