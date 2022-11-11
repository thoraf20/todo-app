import { model, Schema } from 'mongoose'

export const enum Status {
  ONGOING = 'ongoing',
  NOT_STARTED = 'not_started',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned'
}

export type Items = {
  itemId :string;
  itemName: string;
  itemDescription: string;
  from?: Date;
  to?: Date;
  status?: Status;
}

type Todo = {
  name: string;
  description: string;
  items: Items
}




const schema = new Schema<Todo>({
  name: { type: String, required: true },

  description: { type: String, required: true},

  items: [],
},  
  { collection: 'todo', timestamps: true }
);
const TodoModel = model<Todo>('Todo', schema);

export default TodoModel;
