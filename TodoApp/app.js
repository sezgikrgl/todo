var Filter={
    Elements:{
        form:document.querySelector("form"),
        textInput:document.querySelector("#text-input"),
        dateInput:document.getElementById("date-input"),
        textArea:document.querySelector("textarea"),
        submitBtn:document.querySelector("#submitBtn"),
        boxes:document.querySelector(".boxes"),
        msg:document.querySelector(".msg")
    },

    Status:{

        todos:[],
        todo:{},
    },

    Actions:{
        init:()=>{

            const todolist=JSON.parse(localStorage.getItem("TodoAppList"));
            if (!todolist){
                localStorage.setItem("TodoAppList",JSON.stringify([]))
            }else{
                Filter.Status.todos=todolist;
                Filter.Status.todos.forEach((item,index) => {
                    Filter.Actions.addToHTML(item,index)
                });
            }
        },

        control:()=>{
            Filter.Elements.msg.style.display="inline"
            Filter.Elements.msg.innerHTML="Task can not be blank. "
            Filter.Elements.textInput.classList.add("red-border");
            setTimeout(()=>{
                Filter.Elements.msg.style.display="none";
                Filter.Elements.textInput.classList.remove("red-border")
            },2500)
            
        },

        formControl:()=>{

            var text=Filter.Elements.textInput.value ;
            var date=Filter.Elements.dateInput.value;
            var info=Filter.Elements.textArea.value;
            
            if(text.trim() === "" ){
                Filter.Actions.control()
            }else{
                
                Filter.Elements.msg.innerHTML="";
                Filter.Status.todo={text,date,info}
                Filter.Status.todos.push(Filter.Status.todo)
               
                var todolist=JSON.parse(localStorage.getItem("TodoAppList"));
                todolist=Filter.Status.todos;
                localStorage.setItem("TodoAppList",JSON.stringify(todolist))

                Filter.Actions.addToHTML()
               
                Filter.Elements.submitBtn.setAttribute("data-bs-dismiss","modal");
                Filter.Elements.submitBtn.click();
                (()=>{
                    
                   Filter.Elements.submitBtn.setAttribute("data-bs-dismiss","");
                })();
            }
       
        } ,

        reset:()=>{
            Filter.Elements.textInput.value="" ;
            Filter.Elements.dateInput.value="";
            Filter.Elements.textArea.value="";
        },

        delete:(e,index)=>{
            Filter.Status.todos.splice(index,1)
            localStorage.setItem("TodoAppList",JSON.stringify(Filter.Status.todos))
            Filter.Actions.addToHTML()
        },

        edit:(e,index)=>{
           
            Filter.Elements.textInput.value=Filter.Status.todos[index].text;
            Filter.Elements.dateInput.value=Filter.Status.todos[index].date;
            Filter.Elements.textArea.value=Filter.Status.todos[index].info;
            Filter.Elements.submitBtn.innerHTML = "Edit";
            Filter.Elements.submitBtn.setAttribute("onclick", `Filter.Actions.editPerson(${index})`);
            Filter.Elements.submitBtn.setAttribute("data-bs-dismiss","modal");
      
        },

        editPerson:(index)=>{
            var text=Filter.Elements.textInput.value ;
            var date=Filter.Elements.dateInput.value;
            var info=Filter.Elements.textArea.value;
            if(text.trim() === "" ){
                Filter.Elements.msg.innerHTML="Task can not be blank. "
            }else{
            Filter.Status.todo={text,date,info}
            Filter.Status.todos[index]=Filter.Status.todo;
            localStorage.setItem("TodoAppList",JSON.stringify(Filter.Status.todos));
            Filter.Actions.addToHTML();
            Filter.Elements.submitBtn.innerHTML = "Add";
            Filter.Elements.submitBtn.setAttribute("onclick", `Filter.Actions.formControl()`);}
        },

        addToHTML:()=>{
            Filter.Elements.boxes.innerHTML=""
            Filter.Status.todos.map((item,index)=>{
                return (Filter.Elements.boxes.innerHTML+=`
                <div class="task-box">
                    <div class="fw-bold">${item.text}</div>
                    <div class="small text-secondary">${item.date}</div>
                    <p class="task-info">${item.info}</p>
                    <div class="items">
                        <button id="edit" onclick="Filter.Actions.edit(this,${index})" href="" data-bs-toggle="modal" data-bs-target="#form"><img src="images/edit-new-icon-22.png" alt=""></button>
                        <button id="delete" onclick="Filter.Actions.delete(this,${index})" href=""><img src="images/waste.png" alt=""></button>
                    </div>
                </div>
             `)

            })
            Filter.Actions.reset(Filter.Elements.form);
        },
    }
}

Filter.Actions.init()