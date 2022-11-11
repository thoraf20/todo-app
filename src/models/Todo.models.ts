import { model, Schema } from 'mongoose'

export const enum Status {
  ONGOING = 'ongoing',
  PENDING = 'pending',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned'
}

type Todo = {
  name: string;
  description: string;
  items: Items
}

type Items = {
  id :string;
  name: string;
  description: string;
  from: Date;
  to: Date;
  status?: Status;
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
