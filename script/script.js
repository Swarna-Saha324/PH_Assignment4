console.log("HI");
let interviewList = [];
let rejectedList = [];
const total_Count=document.getElementById("totalCount");
const interview_Count=document.getElementById("interviewCount");
const rejected_Count=document.getElementById("rejectedCount");
// const available_Count=document.getElementById("availableCount");
console.log(total_Count);

const all_btn=document.getElementById("allBtn");
const interview_btn=document.getElementById("interviewBtn");
const rejected_btn=document.getElementById("rejectedBtn");

const allCardSection = document.getElementById("allCard");
console.log(allCardSection.children.length);

const mainContainer = document.querySelector("main");
console.log(mainContainer);

function calculateCounts(){
    total_Count.innerText = allCardSection.children.length;
    interview_Count.innerText = interviewList.length;
    rejected_Count.innerText = rejectedList.length;
}

function toggleStyle(buttonId){

    all_btn.classList.remove('bg-primary','text-white');
    interview_btn.classList.remove("bg-primary","text-white");
    rejected_btn.classList.remove("bg-primary","text-white");
    // console.log("click",buttonId);
    all_btn.classList.add('bg-gray-200', 'text-white');
    interview_btn.classList.add('bg-gray-200', 'text-white');
    rejected_btn.classList.add('bg-gray-200', 'text-white');


    

   

    // if any button has black then remove
    // all_btn.classList.remove('bg-black', 'text-white')
    // interview_btn.classList.remove('bg-black', 'text-white')
    // rejected_btn.classList.remove('bg-black', 'text-white')
    // strugglingFilterBtn.classList.remove('bg-black', 'text-white')

    // console.log(id);
    const selected = document.getElementById(buttonId);//this is the button that clicked for filter

    // currentStatus = id
    // console.log(currentStatus);
    // console.log(selected);

    // adding black bg for current button
    selected.classList.remove('bg-gray-200');
    selected.classList.add('bg-blue-700', 'text-white', 'font-bold');
   
}




calculateCounts();
