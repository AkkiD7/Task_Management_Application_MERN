const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Operations related to todos
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the todo
 *                   description:
 *                     type: string
 *                     description: The description of the todo
 *                   status:
 *                     type: string
 *                     description: The status of the todo
 *                   orderNumber:
 *                     type: integer
 *                     description: The order number of the todo
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The creation date of the todo
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The last update date of the todo
 *       500:
 *         description: Internal server error
 */
router.get("/", todoController.getTodos);

/**
 * @swagger
 * /filter:
 *   get:
 *     summary: Filter todos by status
 *     tags: [Todos]
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         description: The status to filter todos by
 *         schema:
 *           type: string
 *           example: "completed"
 *     responses:
 *       200:
 *         description: A list of todos filtered by status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                   orderNumber:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Bad request, status query parameter is required
 *       500:
 *         description: Internal server error
 */
router.get("/filter", todoController.filterTodos);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single todo object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *                 orderNumber:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", todoController.getTodoById);

/**
 * @swagger
 * /orderNumbers:
 *   get:
 *     summary: Retrieve available order numbers
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: A list of available order numbers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: integer
 *                 description: Available order numbers
 *       500:
 *         description: Internal server error
 */
router.get("/orderNumbers", todoController.getAvailableOrderNumbers);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: The description of the todo
 *                 example: "Buy groceries"
 *               status:
 *                 type: string
 *                 description: The status of the todo
 *                 example: "pending"
 *               orderNumber:
 *                 type: integer
 *                 description: The order number of the todo (optional)
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the todo
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *                 orderNumber:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request, invalid input data
 *       500:
 *         description: Internal server error
 */
router.post("/", todoController.addTodo);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: The description of the todo
 *               status:
 *                 type: string
 *                 description: The status of the todo
 *               orderNumber:
 *                 type: integer
 *                 description: The order number of the todo (optional)
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *                 orderNumber:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request, invalid input data
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", todoController.updateTodo);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
