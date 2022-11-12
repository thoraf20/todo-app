import TodoModel from '../models/Todo.models'
import { createTodoHandler } from '../routes/todo'
import httpMocks from 'node-mocks-http'


describe('Todo', () => {
  describe('createTodoHandler', () => {
    it('create todo given the correct input', async () => {
      const mockRequest = httpMocks.createRequest({ 
        body: { 
          name: 'test', 
          description: 'testing the todo endpoint' 
        }
      })
      const mockResponse = httpMocks.createResponse()

      const todoModelCreateMock = jest
        .spyOn(TodoModel, 'create')
        .mockImplementation()

      await createTodoHandler(mockRequest, mockResponse, jest.fn())

      expect(mockResponse._getStatusCode()).toEqual(201)
      expect(todoModelCreateMock).toHaveBeenCalledWith({
        name: 'test', 
        description: 'testing the todo endpoint' 
      })
    })

    it('does not create todo given the incorrect input', async () => {
      const mockRequest = httpMocks.createRequest({ 
        body: { 
          name: 'test', 
        }
      })
      const mockResponse = httpMocks.createResponse()

      const todoModelCreateMock = jest
        .spyOn(TodoModel, 'create')
        .mockImplementation()

      await createTodoHandler(mockRequest, mockResponse, jest.fn())

      expect(mockResponse._getStatusCode()).toEqual(400)
      expect(todoModelCreateMock).toHaveBeenCalledWith({
        name: 'test', 
      })
    })
  })
})