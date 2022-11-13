import { RequestHandler } from 'express'
import httpStatus from 'http-status-codes';
import Joi from 'joi'
import { v4 as uuidv4 } from 'uuid';
import TodoModel, { Items, Status } from '../../models/Todo.models';
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
      message: "List created successfully!",
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

export const addItemHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    listId: Joi.string().required(),
    itemName: Joi.string().required(),
    itemDescription: Joi.string().required(),
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

    const items: any = listExist?.items;

    const listData = {
      itemId: uuidv4(),
      itemName: value.itemName,
      itemDescription: value.itemDescription,
      status: Status.NOT_STARTED
    }

    const addedItems = [...items, listData]
    
    await TodoService.addItemToList(addedItems, value.listId)

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

export const updateListHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    listId: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
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

    await TodoService.updateList(value)

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "List updated successfully!",
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export const updateListItemsHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    listId: Joi.string().required(),
    itemId: Joi.string().required(),
    itemName: Joi.string().required(),
    itemDescription: Joi.string().required(),
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

    const items: any = listExist?.items;

    const itemToUpdate = items?.filter((index) => {
      return index.itemId !== value.itemId 
    })

    const listData = {
      itemId: value.itemId,
      itemName: value.itemName,
      itemDescription: value.itemDescription,
      status: Status.NOT_STARTED
    }

    const update = [...itemToUpdate, listData]

    const updatedList = await TodoService.updateListItems(value.listId,  update)

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "List item updated successfully!",
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export const duplicateTodoHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    listId: Joi.string().required(),
  })

  const { error, value } = requestSchema.validate(req.body)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }

  try {
    const TodoExist = await TodoModel.findById({ _id: value.listId})
    .select({"_id": 0, "createdAt": 0, "updatedAt": 0, "__v": 0});

    if (!TodoExist) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: false,
        message: "List does not exist",
      })
    }

    const duplicatedTodo = await TodoService.createTodo({
      name: TodoExist.name,
      description: TodoExist.description,
      items: TodoExist.items
    });

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "List duplicated successfully!",
      data: duplicatedTodo
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export const duplicateTodoItemHandler: RequestHandler = async (req, res) => {
  const requestSchema = Joi.object({
    listId: Joi.string().required(),
    itemId: Joi.string().required(),
  })

  const { error, value } = requestSchema.validate(req.body)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }

  try {
    const TodoExist = await TodoModel.findById({ _id: value.listId})

    if (!TodoExist) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: false,
        message: "List does not exist",
      })
    }

    const items: any = TodoExist?.items;

    const itemToDuplicate = items?.filter((index) => {
      return index.itemId === value.itemId 
    })

    const listData = {
      itemId: uuidv4(),
      itemName: itemToDuplicate[0].itemName,
      itemDescription: itemToDuplicate[0].itemDescription,
      status: Status.NOT_STARTED
    }

    const duplicateItems = [...items, listData]

    const duplicatedItem = await TodoService.addItemToList(duplicateItems, value.listId);

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "Item duplicated successfully!",
      data: duplicatedItem
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export const getAllItemsInTodoHandler: RequestHandler = async(req, res) => {
  const requestSchema = Joi.object({
    listId: Joi.string().required(),
  })

  const { error, value } = requestSchema.validate(req.query)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }
  try {
    const listExist = await TodoModel.findById({ _id: value.listId});

    if (!listExist) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: false,
        message: 'List does not exist'
      })
    }

    const allTodoItems = await TodoService.fetchAllItemsInTodo(value.listId);

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Todo items fetch successfully!",
      data: allTodoItems
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export const getATodoHandler: RequestHandler = async(req, res) => {
  const requestSchema = Joi.object({
    listId: Joi.string().required(),
  })

  const { error, value } = requestSchema.validate(req.query)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }
  try {
    const listExist = await TodoModel.findById({ _id: value.listId});

    if (!listExist) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: false,
        message: 'List does not exist'
      })
    }

    const singleTodo = await TodoService.fetchATodo(value.listId);

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Todo fetch successfully!",
      data: singleTodo
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export const fetchOneItemInTodoHandler: RequestHandler = async(req, res) => {
  const requestSchema = Joi.object({
    listId: Joi.string().required(),
    itemId: Joi.string().required(),
  })

  const { error, value } = requestSchema.validate(req.query)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }
  try {
    const listExist = await TodoModel.findById({ _id: value.listId});

    if (!listExist) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: false,
        message: 'List does not exist'
      })
    }

    const item = await TodoService.fetchOneItemInTodo(value.listId, value.itemId);

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Item fetch successfully!",
      data: item
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export const deleteTodoHandler: RequestHandler = async(req, res) => {
  const requestSchema = Joi.object({
    listId: Joi.string().required(),
  })

  const { error, value } = requestSchema.validate(req.query)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }
  try {
    const listExist = await TodoModel.findById({ _id: value.listId});

    if (!listExist) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: false,
        message: 'List does not exist'
      })
    }

    await TodoService.deleteTodo(value.listId);

    return res.status(httpStatus.OK).json({
      success: true,
      message: "List deleted successfully!",
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export const deleteItemInTodoHandler: RequestHandler = async(req, res) => {
  const requestSchema = Joi.object({
    listId: Joi.string().required(),
    itemId: Joi.string().required(),
  })

  const { error, value } = requestSchema.validate(req.query)

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message })
  }
  try {
    const listExist = await TodoModel.findById({ _id: value.listId});

    if (!listExist) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: false,
        message: 'List does not exist'
      })
    }

    const items: any = listExist?.items;

    const filteredItems: Items = items?.filter((index) => {
      return index.itemId !== value.itemId 
    })

    await TodoService.deleteItemInTodo(value.listId, filteredItems);

    return res.status(httpStatus.OK).json({
      success: true,
      message: "Item deleted successfully!",
    });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}
