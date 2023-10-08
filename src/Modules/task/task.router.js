// import {Router} from 'express'
// const router = Router()
// import * as taskController from './task.controller.js'
// import auth from '../../middleware/auth.js'
// import {vaildation} from '../../middleware/vaildation.js'
// import * as taskValidators from './task.validation.js'



// // 1-add task with status (toDo)(user must be logged in)
// router.post('/add',auth,vaildation(taskValidators.addTask),taskController.addNewTask)

// // 2-update task (title , description , status) and assign task to other user(user must be logged in) (creator only can update task)
// router.put('/update/:taskId',auth,vaildation(taskValidators.updateTask),taskController.updateTask)

// // 3-delete task(user must be logged in) (creator only can delete task)
// router.delete('/delete/:taskId',auth,taskController.deleteTask)

// // 4-get all tasks with user data
// router.get('/all',auth, taskController.getAllTasksWithUser)

// // 5-get tasks of oneUser with user data (user must be logged in)
// router.get('/user',auth, taskController.tasksOfOneUser)

// // 6-get all tasks of oneUser with user data
// router.get('/tasks/:userId',auth, taskController.alltaskOfOne)

// // 7-get all tasks that not done after deadline
// router.get('/deadline',auth, taskController.getTasksAfterDeadline)


// export default router