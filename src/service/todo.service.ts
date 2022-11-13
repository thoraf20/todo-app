import TodoModel, { Items } from "../models/Todo.models";
import { ListDto } from "./interface/todo.interface";

export default class TodoService {

/*
  @param  {object} list        'it contains name and description'
*/
 
  static async createTodo(list: ListDto) {
    const createdTodo = await TodoModel.create(list);

    return createdTodo
  }


/*
  @param  {object} item        'it contains itemId,itemName and itemDescription'
  @param {string} listId       'id of the list'
*/
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


/*
  @param {string} listId       'id of the list'
*/
  static async fetchATodo(listId: string) {
    const todo = await TodoModel.findById({ _id: listId});

    return todo
  }


/*
  @param {string} listId       'id of the list'
*/
  static async fetchAllItemsInTodo(listId: string) {
    const todo = await TodoModel.findById({ _id: listId});

    return todo.items
  }


/*
  @param {string} listId       'id of the list'
  @param {string} itemId           'id of the list'
*/
  static async fetchOneItemInTodo(listId: string, itemId: string) {
    const todo = await TodoModel.findById({ _id: listId});

    const items: any = todo?.items;

    const item = items?.filter((index) => {
      return index.itemId === itemId 
    })

    return item
  }


/*
  @param  {object} data     'it contains listId, name and or description to be updated'
*/
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

/*
  @param {string} listId          'id of the list'
  @param  {object} item     'it contains itemId, itemName and or itemDescription to be updated'
*/
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


/*
  @param {string} listId       'id of the list'
*/
  static async deleteTodo(listId: string) {

    const duplilicatedList = await TodoModel.findByIdAndRemove({_id: listId})

    return duplilicatedList
  }

/*
  @param {string} listId       'id of the list'
  @param  {object} data     'it contains itemId, itemName and or itemDescription to be updated'
*/
  static async deleteItemInTodo(listId: string, data: Items) {
    const updateList = await TodoModel.updateOne(
      {_id: listId},
      {items: data},
      {upsert: true}
    )

    return updateList
  }
}
