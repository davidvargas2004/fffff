import Task from '../models/tasks.model.js';


export const getTasks = async (req, res)=>{
    const tasks = await Task.find({
        user:req.user.id,//con esto traemo el id del usuiario y nos hace comparar para traer las tareas del usuario
    }).populate('user');


    res.json(tasks);
};
//creamos la tarea
export const createTasks = async (req, res)=>{
    try {
    const {title,description,date} = req.body;
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id
    })
    const saveTask = await newTask.save()
    res.json(saveTask);
    } catch (error) {
        return res.status(500).json({message: 'Intenta nuevamente'});    
    }
}; 
//optener una sola tarea
export const getTask = async (req, res)=>{
   try {
    const task = await Task.findById(req.params.id).populate('user');
    if(!task){
        return res.status(404).json({message: 'Task not found'});
    }
    res.json(task);
   } catch (error) {
    return res.status(404).json({message:"Tarea no encontrada"})
   }
}; 

//Eliminamos una tarea
export const deleteTasks = async (req, res)=>{
   try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task){
        return res.status(404).json({message: 'Task not found'});
    }
    return res.sendStatus(204);
   } catch (error) {
     return res.status(404).json({message:"Tarea no encontrada"})
   }
}; 
//Actualizamos una tarea
export const updateTasks = async (req, res)=>{
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
        });
        if(!task){
            res.status(404).json({message: 'Task not found'});
        }
    
        res.json(task);
    } catch (error) {
        return res.status(404).json({message: 'Tarea no encontrada'})
    }
};