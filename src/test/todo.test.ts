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
    TodoModel.find = jest
      .fn()
      .mockResolvedValue({ 
        _id: '6370f8c8c8b6ba143edb477f',
        name: 'New List',
        description: 'Testing the todo route',
        items: [{ 
          _id: '6370f8c8c8b6ba143edb477f',
          itemName: 'New List',
          itemDescription: 'Testing the todo route',
          status: Status.NOT_STARTED
        },
        {
          id: '6370f8c8c8b6ba143edb477f',
          itemName: 'New List',
          itemDescription: 'Testing the todo route',
          status: Status.NOT_STARTED
        }]
      })
      TodoModel.findById = jest
      .fn()
      .mockResolvedValue({ 
        _id: '6370f8c8c8b6ba143edb477f',
        name: 'New List',
        description: 'Testing the todo route',
        items: [{ 
          _id: '6370f8c8c8b6ba143edb4787',
          itemName: 'New List',
          itemDescription: 'Testing the todo route',
          status: Status.NOT_STARTED
        }]
      })

      TodoModel.updateOne = jest
      .fn()
      .mockResolvedValue({ 
        _id: '6370f8c8c8b6ba143edb477f',
        name: 'New List',
        description: 'Testing the todo route',
        items: [{ 
          _id: '6370f8c8c8b6ba143edb4787',
          itemName: 'New List',
          itemDescription: 'Testing the todo route',
          status: Status.NOT_STARTED
        }]
      })

      TodoModel.findByIdAndRemove = jest
      .fn()
      .mockResolvedValue({ 
        status: true,
        message: 'List Deleted Successfully',
      })
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
      it('it should add item list given the correct input', async () => {

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

    describe('fetctAll Todo List', () => {
      it('it should return oall todo list', async () => {

        const fetchAllTodos = await TodoService.fetchAllTodos()

        expect(fetchAllTodos).toEqual({ 
          _id: '6370f8c8c8b6ba143edb477f',
          name: 'New List',
          description: 'Testing the todo route',
          items: [{ 
            _id: '6370f8c8c8b6ba143edb477f',
            itemName: 'New List',
            itemDescription: 'Testing the todo route',
            status: Status.NOT_STARTED
          },
          {
            id: '6370f8c8c8b6ba143edb477f',
            itemName: 'New List',
            itemDescription: 'Testing the todo route',
            status: Status.NOT_STARTED
          }]
        })
      })
    })

    describe('fetct A single list', () => {
      it('it should return a single todo list', async () => {

        const fetchATodo = await TodoService.fetchATodo('6370f8c8c8b6ba143edb477f')

        expect(fetchATodo).toEqual({ 
          _id: '6370f8c8c8b6ba143edb477f',
          name: 'New List',
          description: 'Testing the todo route',
          items: [{ 
            _id: '6370f8c8c8b6ba143edb4787',
            itemName: 'New List',
            itemDescription: 'Testing the todo route',
            status: Status.NOT_STARTED
          }]
        })
      })
    })
    
    describe('update List', () => {
      it('it should update list', async () => {

        const updateList = await TodoService.updateList({
          _id: '6370f8c8c8b6ba143edb477f',
          name: 'New List',
          description: 'New Update List'
        })

        expect(updateList).toEqual({ 
          _id: '6370f8c8c8b6ba143edb477f',
          name: 'New List',
          description: 'Testing the todo route',
          items: [{ 
            _id: '6370f8c8c8b6ba143edb4787',
            itemName: 'New List',
            itemDescription: 'Testing the todo route',
            status: Status.NOT_STARTED
          }]
        })
      })
    })

    describe('delete List', () => {
      it('it should delete list', async () => {

        const updateList = await TodoService.deleteTodo('6370f8c8c8b6ba143edb477f',)

        expect(updateList).toEqual({ 
          status: true,
          message: 'List Deleted Successfully',
        })
      })
    })
  }
)
