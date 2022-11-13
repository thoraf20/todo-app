import TodoModel from '../models/Todo.models'
import TodoService from '../service/todo.service'


describe('TodoService', () => {

  beforeEach(() => {
    TodoModel.create = jest
      .fn()
      .mockResolvedValue({ 
        _id: '6370f8c8c8b6ba143edb477f',
        name: 'New List',
        description: 'Testing the todo route'
      })
  });

  it('should be defined', () => {
    expect(TodoService).toBeDefined();
  });

  describe('createTodo', () => {
    it('it should return outut given the correct input', async () => {

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
})
// })

//     // it('does not create todo given the incorrect input', async () => {
//     //   const mockRequest = httpMocks.createRequest({ 
//     //     body: { 
//     //       name: 'test', 
//     //     }
//     //   })
//     //   const mockResponse = httpMocks.createResponse()

//     //   const todoModelCreateMock = jest
//     //     .spyOn(TodoModel, 'create')
//     //     .mockImplementation()

//     //   await createTodoHandler(mockRequest, mockResponse, jest.fn())

//     //   expect(mockResponse._getStatusCode()).toEqual(400)
//     //   expect(todoModelCreateMock).toHaveBeenCalledWith({
//     //     name: 'test', 
//     //   })
//     // })
//   })
// })