import { Items, Status } from "../../models/Todo.models";

 export interface ListDto {
  name: string;
  description: string
  items?: Items
 }

 export interface AddItemDto {
  itemId: string;
  itemName: string;
  itemDescription: string;
  status: Status.NOT_STARTED;
 }

 