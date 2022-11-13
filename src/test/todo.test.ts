import TodoModel, { Status } from '../models/Todo.models'
import TodoService from '../service/todo.service'


describe('TodoService', () => {

  beforeEach(() => {
    TodoModel.create = jest
      .fn()
      .mockResolvedValue({ 
        _id: '6370f8c8c8b6ba143edb477f',
        name: 'New List',
        description: 'Testing the todo route',
      })

    TodoModel.findOneAndUpdate = jest
    .fn()
    .mockResolvedValue([{ 
      _id: '6370f8c8c8b6ba143edb477f',
      itemName: 'New List',
      itemDescription: 'Testing the todo route',
      status: Status.NOT_STARTED
    }])
  });

    it('should be defined', () => {
      expect(TodoService).toBeDefined();
    });

    describe('createTodo', () => {
      it('it should return output given the correct input', async () => {

        const createList = await TodoService.createTodo({ 
          name: 'test', 
          description: 'testing the todo endpoint'
        })

        expect(createList).toEqual({ 
          _id: '6370f8c8c8b6ba143edb477f',
          name: 'New List',
          description: 'Testing the todo route'
        })
      })
    })

    describe('addItemToList', () => {
      it('it should return output given the correct input', async () => {

        const addItemToList = await TodoService.addItemToList(
          '6370f8c8c8b6ba143edb477f', 
          expect.anything()
        )

        expect(addItemToList).toEqual([{ 
          _id: '6370f8c8c8b6ba143edb477f',
          itemName: 'New List',
          itemDescription: 'Testing the todo route',
          status: Status.NOT_STARTED
        }])
      })
    })
  }
)
