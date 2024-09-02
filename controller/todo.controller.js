const Todo = require("../model/todo.model");

exports.todo = (req, res) => {
    res.render('newtodo');
}
exports.createTodo = async (req, res) => {
    try {
        // let todo = await Todo.findOne({ task: req.body.task, isDelete: false });
        let todo = await Todo.findOne({ user: req.user._id, task: req.body.task, isDelete: false });
        if (todo) {
            return res.send({ message: 'Task Already Existed....' });
        }
        todo = await Todo.create({ user: req.user._id, ...req.body, });
        res.redirect('alltodo');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAllTodo = async (req, res) => {
    try {
        // let todos = await Todo.find({ isDelete: false });
        let todos = await Todo.find({ user: req.user._id, isDelete: false });
        res.render('alltodo', { todos });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
};



// exports.updateTask = async (req, res) => {
//     try {
//         let task = req.task;
//         task = await Task.findByIdAndUpdate(task._id, { $set: req.body }, { new: true });
//         res.status(202).json({ message: "Task Updated" });
//     } catch (err) {
//         console.log(err);
//         // res.status(500).json({ message: 'Internal Server Error' });
//         res.redirect("login.ejs");
//     }
// };

exports.deleteTodo = async (req, res) => {
    try {
        let todo = await Todo.findOne({ _id: req.params.taskId, isDelete: false });
        // console.log(todo);
        todo = await Todo.findByIdAndUpdate(todo._id, { isDelete: true }, { new: true });
        res.redirect('/todo/alltodo');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.completeTodo = async (req, res) => {
    try {
        // let todo = await Todo.findOne({ _id: req.params.taskId, isDelete: false });
        let todo = await Todo.findOne({ _id: req.params.taskId, isComplete: false, isDelete: false });
        // console.log(todo);
        todo = await Todo.findByIdAndUpdate(todo._id, { isComplete: true }, { isDelete: false }, { new: true });
        res.redirect('/todo/alltodo');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

