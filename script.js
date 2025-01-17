
const checkboxList= document.querySelectorAll('.todo-checkbox')
const inputfields = document.querySelectorAll('.todo-input')
const error=document.querySelector('.error')
const progressBar=document.querySelector('.progress-bar')
const progressValue=document.querySelector('.progress-value')
const todoBody=document.querySelectorAll('.todo-body')

const allGoals=JSON.parse(localStorage.getItem('allGoals')) || {}
   
let completedgoalsCount= Object.values(allGoals).filter((goals)=>goals.completed).length
  progressValue.style.width=`${(completedgoalsCount/inputfields.length) *100}%`
 progressValue.firstElementChild.innerText=`${completedgoalsCount}/${inputfields.length} completed`
   
checkboxList.forEach((checkbox)=>{
    checkbox.addEventListener('click',(e)=>{
        const allinputfields=[...inputfields].every(function(input){
            return input.value
        })

        if(allinputfields){
        checkbox.parentElement.classList.toggle('completed')
      const inputId= checkbox.nextElementSibling.id
      allGoals[inputId].completed = !allGoals[inputId].completed
       completedgoalsCount= Object.values(allGoals).filter((goals)=>goals.completed).length
       progressValue.style.width=`${(completedgoalsCount/inputfields.length) *100}%`
       progressValue.firstElementChild.innerText=`${completedgoalsCount}/${inputfields.length} completed`
      localStorage.setItem('allGoals',JSON.stringify(allGoals))
        }
        else{
          progressBar.classList.add('show-error')
        }
    })
})

inputfields.forEach((input)=>{
    if(allGoals[input.id]){
        input.value=allGoals[input.id].name

        if(allGoals[input.id].completed){
            input.parentElement.classList.add('completed')
         }
    }
   
    input.addEventListener('focus',()=>{
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input',(e)=>{
        if(allGoals[input.id]&&allGoals[input.id].completed){
            input.value=allGoals[input.id].name
            return
        }
        if(allGoals[input.id]){
            allGoals[input.id].name=input.value
        }
        else{
            allGoals[input.id]={
                name:input.value,
                completed:false
            }
        }
        localStorage.setItem('allGoals',JSON.stringify(allGoals))
    })
}
)
