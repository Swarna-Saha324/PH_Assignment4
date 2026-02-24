let interviewList = [];
let rejectedList = [];
let currentStatus = 'allBtn';


const total = document.getElementById('totalCount');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('allBtn');
const interviewFilterBtn = document.getElementById('interviewBtn');
const rejectedFilterBtn = document.getElementById('rejectedBtn');

const allCardSection = document.getElementById('allCard');
const mainContainer = document.querySelector('main');


let filterSection = document.getElementById('filtered-section');
if (!filterSection) {
    filterSection = document.createElement('section');
    filterSection.id = 'filtered-section';
    filterSection.className = 'w-full hidden';
    allCardSection.parentNode.appendChild(filterSection);
}

function calculateCount() {
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}

function calculateCount() {
    // Top Header Stats
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    // 
    const totalJobs = allCardSection.children.length;
    const availableCountSpan = document.getElementById('availableCount');

    if (currentStatus === 'allBtn') {
        availableCountSpan.innerText = `${totalJobs} jobs`;
    } else if (currentStatus === 'interviewBtn') {
        availableCountSpan.innerText = `${rejectedList.length} of ${totalJobs} jobs`;
    } else if (currentStatus === 'rejectedBtn') {
        availableCountSpan.innerText = `${interviewList.length} of ${totalJobs} jobs`;
    }
}


// Step 1: 
function toggleStyle(id) {
   
    [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach(btn => {
        btn.classList.remove('bg-blue-700', 'text-white', 'font-bold');
        btn.classList.add('bg-white', 'text-[#64748bFF]');
        calculateCount();
    });

    const selected = document.getElementById(id);
    currentStatus = id;

    
    selected.classList.remove('bg-white', 'text-[#64748bFF]');
    selected.classList.add('bg-blue-700', 'text-white', 'font-bold');

    // Step 4 logic: Toggle between original list and filtered list
    if (id === 'allBtn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    } else if (id === 'interviewBtn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    } else if (id === 'rejectedBtn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }
}


mainContainer.addEventListener('click', function (event) {
    const target = event.target;
    const action = target.innerText.trim();

    
    if (target.classList.contains('fa-trash-can') || target.closest('.fa-trash-can')) {
        const card = target.closest('.flex.justify-between');
        const workName = card.querySelector('.work').innerText;

        
        interviewList = interviewList.filter(item => item.work !== workName);
        rejectedList = rejectedList.filter(item => item.work !== workName);

       
        const allCards = allCardSection.querySelectorAll('.work');
        allCards.forEach(title => {
            if(title.innerText === workName) {
                title.closest('.flex.justify-between').remove();
            }
        });

        
        if (currentStatus !== 'allBtn') card.remove();

        calculateCount();
        return;
    }

    // 2. INTERVIEW / REJECTED LOGIC
    if (action === 'INTERVIEW' || action === 'REJECTED') {
        
        const card = target.closest('.flex.justify-between');
        
        const work = card.querySelector('.work').innerText;
        const expert = card.querySelector('.expert').innerText;
        const salary = card.querySelector('.salary').innerText;
        const explain = card.querySelector('.explain').innerText;

        const cardInfo = { work, expert, salary, explain };

        // Update the status label on the card in the "All" section
        const allCards = allCardSection.querySelectorAll('.work');
        allCards.forEach(title => {
            if(title.innerText === work) {
                const label = title.closest('.flex-1').querySelector('.change');
                label.innerText = action;
                // Change label color based on status
                label.className = `change px-3 py-1 uppercase text-[12px] font-bold inline-block rounded-sm mb-3 ${
                    action === 'INTERVIEW' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`;
            }
        });

        if (action === 'INTERVIEW') {
            if (!interviewList.find(i => i.work === work)) interviewList.push(cardInfo);
            rejectedList = rejectedList.filter(i => i.work !== work);
        } else {
            if (!rejectedList.find(i => i.work === work)) rejectedList.push(cardInfo);
            interviewList = interviewList.filter(i => i.work !== work);
        }

        // Keep current view in sync
        if (currentStatus === 'interviewBtn') renderInterview();
        if (currentStatus === 'rejectedBtn') renderRejected();
        
        calculateCount();
    }
});

// Step 3:
function getEmptyStateHTML(message) {
    return `
        <div class="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-[#f1f2f4]">
            <img src="jobs.png" class="w-20 mb-4 opacity-50" alt="No jobs">
            <h2 class="text-2xl font-bold text-[#002c5c]">${message}</h2>
            <p class="text-gray-400 mt-2">Check back soon for new job opportunities</p>
        </div>`;
}

function renderInterview() {
    filterSection.innerHTML = '';
    if (interviewList.length === 0) {
        filterSection.innerHTML = getEmptyStateHTML("No interview available");
        return;
    }
    interviewList.forEach(job => renderCard(job, 'INTERVIEW', 'bg-green-100 text-green-600'));
}

function renderRejected() {
    filterSection.innerHTML = '';
    if (rejectedList.length === 0) {
        filterSection.innerHTML = getEmptyStateHTML("No rejected available");
        return;
    }
    rejectedList.forEach(job => renderCard(job, 'REJECTED', 'bg-red-100 text-red-600'));
}

function renderCard(job, status, statusClass) {
    let div = document.createElement('div');
    div.className = 'flex justify-between items-start border p-[24px] bg-[#ffffff] border-[#f1f2f4] rounded-[8px] mb-4';
    div.innerHTML = `
        <div class="flex-1">
            <p class="work text-[18px] font-bold text-[#002c5c]">${job.work}</p>
            <p class="expert text-[#64748b] text-[16px]">${job.expert}</p>
            <p class="salary text-[#64748b] text-[14px] mt-2 mb-4">${job.salary}</p>
            <p class="change ${statusClass} px-3 py-1 uppercase text-[12px] font-bold inline-block rounded-sm mb-3">${status}</p>
            <p class="explain text-[#323b49] text-[14px] font-normal leading-relaxed max-w-[800px]">${job.explain}</p>
            <div class="flex gap-3 mt-5">
                <button class="border border-[#10b981] px-4 py-1 rounded-[4px] text-[12px] font-bold text-[#10b981] cursor-pointer">INTERVIEW</button>
                <button class="border border-[#ef4444] px-4 py-1 rounded-[4px] text-[12px] font-bold text-[#ef4444] cursor-pointer">REJECTED</button>
            </div>
        </div>
        <div class="text-gray-400 p-2 cursor-pointer"><i class="fa-regular fa-trash-can"></i></div>`;
    filterSection.appendChild(div);
}

// calculateCount();