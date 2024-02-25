// here we will put all code in IIFE ( immediately invoked function expression)

(function(){

    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    
    
    async function fetchtodo(){
        // //GET request
        // fetch('https://jsonplaceholder.typicode.com/todos')
        // .then(function(response){
        //     return response.json();
        // }).then(function(data){
        //     tasks = data.slice(0,10);
        //     renderList();
        // }).catch(function(error){
        //     console.log('error',error);
        // })
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                const data = await response.json();
                tasks = data.slice(0,10);
                renderList();
        }catch(error){
            console.log(error)
        }
    
    }
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" id="${task.id}" ${task.completed ? "checked" : ""} class="custom-checkbox">
            <label for="${task.id}">${task.title}</label>
            <img src="bin.svg" class="delete" data-id="${task.id}"/>
        `;
        tasksList.append(li);
    }
    function renderList () {
        tasksList.innerHTML='';
        for(let i=0; i<tasks.length; i++){
            addTaskToDOM(tasks[i]);
        }
        tasksCounter.innerHTML=tasks.length;
    }
    
    function markTaskAsComplete (taskId) {
        const task = task.filter(function(task){
            return task.id === Number(taskId);
        })
        if(task.length > 0){
            const currentTask = task[0];
            currentTask.completed = !currentTask.completed;
            renderList();
            showNotification("Task Marked sucessfully");
            return;
        }
        showNotification(' could not mark the task');
    }
    
    function deleteTask (taskId) {
        const newTask = tasks.filter(function(task){
            return task.id !== Number(taskId);
        })
        tasks = newTask;
        renderList();
        showNotification('Task deleted sucessfully');
    }
    
    function addTask (task) {
        if(task){
            tasks.push(task);
            renderList();
            showNotification('Task added Sucessfully');
            return;
        }
        showNotification('Empty Task can not be added');
    }
    
    function showNotification(text) {
        alert(text); 
    }
    
    function handleinputkeyPress(e){
       if(e.key=== 'Enter'){
        const text = e.target.value;
        console.log('text',text);
        if(!text){
        showNotification("Task text can not be empty");
        return;
       } 
    
       const task ={
        title:text,
        id:Date.now(),
        completed:false
       }
       e.target.value='';
       addTask(task);
       }
    }
    
    function handleClickListner(e){
        const target = e.target;
        if(target.className === 'delete'){
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        }else if(target.className === 'custom-checkbox'){
            const taskId = target.id;
            markTaskAsComplete(taskId);
            return;
            }
    }
    
    function app(){
        fetchtodo();
    addTaskInput.addEventListener('keyup',handleinputkeyPress);
    document.addEventListener('click',handleClickListner);
    }
    app();
    
})();

