

// hide HTML 

const navbarSection = document.getElementById("navbar-section");
navbarSection.style.display = "none"
const mainSection = document.getElementById("main-section")
mainSection.style.display = "none"


const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("lessons-container").classList.add("hidden")
}
const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("lessons-container").classList.remove("hidden")
}



// login verification

const nameInput = document.getElementById("name-input");
const codeInput = document.getElementById("code-input");

const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", () => {
    if (typeof nameInput.value === "string" && typeof parseInt(codeInput.value) === "number" && codeInput.value.length === 6 && codeInput.value == 123456) {
        navbarSection.style.display = "block";
        mainSection.style.display = "block"
        document.getElementById("banner").style.display = "none";
        // sweat alert 

        function sweatAlert() {
            Swal.fire({
                title: "Good job!",
                text: "You login successfully!",
                icon: "success"
            });
        }
        sweatAlert()


    } else {
        if (nameInput.value === "" || codeInput.value === "") {
            alert("Fill all input Field")
        } else {
            if (codeInput.value != 123456) {
                alert("Wrong Code, try again later")
            } else if (typeof nameInput.value !== "string") {
                alert("Invalid name, Your name is always text not number")
            } else if (typeof parseInt(codeInput.value) !== "number") {
                alert("Invalid code, Your code is always number not text")
            } else if (codeInput.value.length !== 6) {
                alert("You should entered only 6 digit code")
            }
        }

    }
})




// logout button 
document.getElementById("logout").addEventListener("click", () => {
    navbarSection.style.display = "none"
    mainSection.style.display = "none"
    document.getElementById("banner").style.display = "block";
})


// lessons section 

const lessons = async () => {
    const responce = await fetch("https://openapi.programming-hero.com/api/levels/all")
    const data = await responce.json();
    displayLessonsBtn(data.data);
}



const loadLessons = async () => {
    const responce = await fetch("https://openapi.programming-hero.com/api/level/5");
    const data = await responce.json()
    displayLesson(data.data);

}


// modal section 

const loadAllWordDetails = async(wordId) => {
    // console.log(wordId);
    const url = await fetch(`https://openapi.programming-hero.com/api/word/${wordId}`);
    const data = await url.json();
    displayWordDetails(data.data);
}

const displayWordDetails = (words) => {
    
    console.log(words);
    document.getElementById("word_details").showModal();
    const detailsContainer = document.getElementById("details_container");
    
    
    detailsContainer.innerHTML = `
        <div class="space-y-6">
            <h1 class="font-bold text-xl">${words.word} (<i class="fa-solid fa-microphone-lines"></i>. ${words.pronunciation})</h1>
            <div class="space-y-2">
                <p class="text-lg font-bold">Meaning</p>
                <p class="font-semibold text-sm">${words.meaning === null || words.meaning === undefined
                    ? "অর্থ নেই" : words.meaning
                }</p>
            </div>
            <div>
                <p class="text-lg font-bold">Example</p>
                <p class="font-semibold text-sm text-gray-600">${words.sentence}</p>
            </div>
            
            <div>
                <p class="font-bold text-lg">সমার্থক শব্দ গুলো</p>
                <div>
                    ${words.synonyms.length > 0 ? words.synonyms.map((item) => {
                        return `<button class="rounded-md px-4 py-2 bg-[#EDF7FF] text-xl mr-4 mb-2">${item}</button>`
                        
                    }) .join(""):'<p>কোন সমার্থক শব্দ নেই।</p>'}
                </div>
            </div>
            
            
        </div>
    `;
    
    
}


const emptylessons = document.getElementById("empty-lessons")
const displayLesson = (lessons) => {
    const lessonsContainer = document.getElementById("lessons-container")
    lessonsContainer.innerHTML = "";
    lessons.forEach(lesson => {


        // create lessons card\
        const lessonCard = document.createElement("div");


        lessonCard.innerHTML = `
            <div class="p-5 hover:bg-sky-50 border border-gray-500 rounded-lg space-y-5 shadow-lg">
                <div class="space-y-2">
                    <h2 class="text-center text-2xl font-bold">${lesson.word}</h2>
                    <p class="text-center text-sm text-gray-500 ">Meaning / Pronounciation</p>
                </div>
                <h3 class="text-center text-xl text-gray-800 font-semibold">${lesson.meaning === null || lesson.meaning === undefined
                ? "অর্থ নেই"
                : lesson.meaning
            } / ${lesson.pronunciation}</h3>

                <div class="flex items-center justify-between">
                    <button class="btn py-2 px-3 rounded-md" onclick="loadAllWordDetails('${lesson.id}')"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn p-2 rounded-md" onclick="pronounceWord('${lesson.word}')"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `;

        lessonsContainer.appendChild(lessonCard);
        if (lessonCard.innerHTML !== "") {
            emptylessons.innerHTML = ""
        }


    });

}


const loadLessonsItem = async (level) => {
    showLoader()

    const url = `https://openapi.programming-hero.com/api/level/${level}`;
    const responce = await fetch(url);
    const data = await responce.json();
    displayLesson(data.data);



    const noLessons = document.getElementById("no-lessons");
    noLessons.innerHTML = ""
    if (data.data.length === 0) {


        const div = document.createElement("div");
        div.innerHTML = `
            <div class="bg-gray-200 text-center py-7 space-y-4 flex flex-col justify-center items-center" >

                <img src="./assets/alert-error.png" alt="" class="w-28">
                <p class="text-sm font-bold text-gray-600 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="text-3xl font-semibold">নেক্সট Lesson এ যান</h1>
            </div>
        `;
        noLessons.appendChild(div)
        emptylessons.innerHTML = ""
    }
    hideLoader()
}


const displayLessonsBtn = (lessonBtns) => {

    for (const lessonBtn of lessonBtns) {
        console.log(lessonBtn.id);
        const lessonsItem = document.getElementById("lessons-item");
        const lsn = document.createElement("div");
        lsn.classList.add("flex", "items-center", "justify-between", "font-pop", "border", "border-blue-600", "rounded-lg", "gap-3", "hover:bg-blue-600", "hover:text-white", "transition-all", "cursor-pointer", "clicked-btns")
        lsn.innerHTML = `
        <button class="flex gap-2 items-center cursor-pointer py-2 px-4" onclick="loadLessonsItem(${lessonBtn.level_no})"><i class="fa-solid fa-book-open"></i><span>Lessons ${lessonBtn.level_no}</span> </button>
            
        `
        lessonsItem.appendChild(lsn);

    }
    const clickedButtons = document.querySelectorAll(".clicked-btns");
    for (const clickButton of clickedButtons) {



        clickButton.addEventListener("click", () => {
            clickedButtons.forEach(btn => {
                btn.classList.remove("active")
            })
            clickButton.classList.add("active");
            console.log(clickButton);


        })


    }

}

// speak word 
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // English
    window.speechSynthesis.speak(utterance);
}

lessons()