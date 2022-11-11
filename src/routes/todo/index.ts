import { RequestHandler } from 'express'
import httpStatus from 'http-status-codes';
import Joi from 'joi'
import TodoModel from '../../models/Todo.models';
import TodoService from '../../service/todo.service';

export const createTodoHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  })

  const { error, value } = requestSchema.validate(req.body)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }

  try {
    const newTodo = await TodoService.createTodo(value);

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Todo created successfully!",
      data: {
        id: newTodo._id,
        name: newTodo.name,
        description: newTodo.description
      }
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export const addIemHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    listId: Joi.string().required(),
    itemName: Joi.string().required(),
    itemDescription: Joi.string().required(),
    from: Joi.date(),
    to: Joi.date()
  })

  const { error, value } = requestSchema.validate(req.body)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }

  try {
    const listExist = await TodoModel.findById({ _id: value.listId });

    if (!listExist) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: false,
        message: 'List does not exist',
      })
    }

    await TodoService.addItemToList(value)

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "list added successfully!",
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export const fetchTodosHandler: RequestHandler = async (req, res) => {

  try {

    const allTodos = await TodoService.fetchAllTodos()

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "list fetch successfully!",
      data: allTodos
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

