import { Items, Status } from "../../models/Todo.models";

 export interface ListDto {
  name: string;
  description: string
  items?: Items
 }

 export interface AddItemDto {
  listId: string;
  itemName: string;
  itemDescription: string;
  from?: Date;
  to?: Date;
  status: Status.NOT_STARTED;
 }

 