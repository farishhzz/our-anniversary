
const landingPage = document.getElementById("landing-page");
const cupidTarget = document.getElementById("cupid-target");
const loveArrow = document.getElementById("love-arrow");

landingPage.addEventListener("click", function (event) {
    if (loveArrow.classList.contains("shooting")) return;

    const bow = cupidTarget.querySelector(".cupid-bow");
    const bowRect = bow.getBoundingClientRect();

    // Titik mula anak panah: dari busur
    const startX = bowRect.left + bowRect.width / 2;
    const startY = bowRect.top + bowRect.height / 2;

    // Titik sasaran: lokasi yang diklik
    const endX = event.clientX;
    const endY = event.clientY;

    const dx = endX - startX;
    const dy = endY - startY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
bow.style.animation = "none";
bow.style.transform = `rotate(${angle}deg)`;
    const target = cupidTarget.getBoundingClientRect();

    const clickedTarget =
        endX >= target.left &&
        endX <= target.right &&
        endY >= target.top &&
        endY <= target.bottom;


    // Letakkan anak panah pada busur
    loveArrow.classList.remove("hidden");
    loveArrow.classList.add("shooting");
    loveArrow.innerHTML = `
    <svg viewBox="0 0 100 30" class="arrow-svg">
        <path d="M 5 15 L 82 15"
              stroke="#8b542e" stroke-width="3"
              stroke-linecap="round" fill="none"/>

        <path d="M 78 15 L 96 15 L 83 5 L 86 15 L 83 25 Z"
              fill="#d94f83"/>

        <path d="M 12 15 L 3 6 L 6 15 L 3 24 Z"
              fill="#d94f83"/>

        <path d="M 48 10 C 43 2 32 7 38 14 L 48 23 L 58 14 C 64 7 53 2 48 10 Z"
              fill="#f7b4ce" stroke="#c65383"
              stroke-width="1.5"/>
    </svg>
`;

    loveArrow.style.left = startX + "px";
    loveArrow.style.top = startY + "px";

   
const duration = 550;
const startTime = performance.now();

function animateArrow(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    const currentX = startX + (endX - startX) * eased;
    const currentY = startY + (endY - startY) * eased;

    loveArrow.style.left = currentX + "px";
    loveArrow.style.top = currentY + "px";
    console.log("Arrow position:", currentX, currentY);
    loveArrow.style.transform =
        `translate(-50%, -50%) rotate(${angle}deg) scale(${0.7 + 0.5 * eased})`;

    if (progress < 1) {
        requestAnimationFrame(animateArrow);
    } else {
        loveArrow.classList.remove("shooting");
        loveArrow.classList.add("hidden");

        if (clickedTarget) {
            cupidTarget.querySelector("p").textContent =
                "Terkena cintakuu!!";

            setTimeout(function () {
                datingPopup.classList.remove("hidden");
            }, 400);
        }
    }
}
console.log("Arrow animation started", startX, startY, endX, endY);
requestAnimationFrame(animateArrow);


    // Love particles muncul sepanjang laluan anak panah
    for (let i = 1; i <= 5; i++) {
        setTimeout(function () {
            const particle = document.createElement("span");
            particle.className = "love-particle";
            particle.textContent = i % 2 === 0 ? "♡" : "♥";

            const progress = i / 6;
            particle.style.left = (startX + dx * progress) + "px";
            particle.style.top = (startY + dy * progress) + "px";
            particle.style.setProperty(
                "--drift-x",
                (Math.random() * 50 - 25) + "px"
            );

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 750);
        }, i * 70);
    }

    });


const datingPopup = document.getElementById("dating-popup");
const closeDating = document.getElementById("close-dating");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const continueButton = document.getElementById("continue-button");
const datingQuestion = document.getElementById("dating-question");
const datingSubtitle = document.getElementById("dating-subtitle");
const catCharacter = document.getElementById("cat-character");

let yesScale = 1;

noButton.addEventListener("pointerenter", function () {
    if (continueButton.classList.contains("hidden")) {
        const maxX = Math.max(0, datingPopup.clientWidth - noButton.offsetWidth - 40);
        const maxY = Math.max(0, datingPopup.clientHeight - noButton.offsetHeight - 40);

        noButton.style.position = "fixed";
        noButton.style.left = Math.random() * maxX + "px";
        noButton.style.top = Math.random() * maxY + "px";

        yesScale = Math.min(yesScale + 0.15, 2.5);
        yesButton.style.transform = `scale(${yesScale})`;
    }
});

noButton.addEventListener("click", function () {
    yesScale = Math.min(yesScale + 0.15, 2.5);
    yesButton.style.transform = `scale(${yesScale})`;
});

yesButton.addEventListener("click", function () {
    catCharacter.classList.add("happy");
    datingQuestion.textContent = "Yayyy! It's a date!";
    datingSubtitle.textContent = "I can't wait to spend time with you, sayang!";
    document.getElementById("answer-buttons").classList.add("hidden");
    continueButton.classList.remove("hidden");
});

closeDating.addEventListener("click", function () {
    datingPopup.classList.add("hidden");
});


const datePage = document.getElementById("date-page");

continueButton.addEventListener("click", function () {
    datingPopup.classList.add("hidden");
    landingPage.style.display = "none";
    datePage.classList.remove("hidden");
});


const dateChoice = document.getElementById("date-choice");
const timeChoice = document.getElementById("time-choice");
const dateMessage = document.getElementById("date-message");
const dateNextButton = document.getElementById("date-next-button");

// Benarkan tarikh hari ini dan tarikh akan datang
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

dateChoice.min = `${year}-${month}-${day}`;

dateNextButton.addEventListener("click", function () {
    if (!dateChoice.value || !timeChoice.value) {
        dateMessage.textContent =
            "Pilih tarikh dan masa dulu sayang ";
        return;
    }

    const chosenDate = new Date(dateChoice.value + "T00:00:00");

    const formattedDate = chosenDate.toLocaleDateString("en-MY", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const formattedTime = new Date(
        `2000-01-01T${timeChoice.value}`
    ).toLocaleTimeString("en-MY", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });

   dateMessage.textContent =
    `Our date: ${formattedDate} at ${formattedTime} 💕`;

datePage.classList.add("hidden");
document.getElementById("activity-page").classList.remove("hidden");
});


const activityPage = document.getElementById("activity-page");
const activityNextButton = document.getElementById("activity-next-button");
const activityMessage = document.getElementById("activity-message");

activityNextButton.addEventListener("click", function () {
    const selectedActivities = [
        ...document.querySelectorAll('input[name="activity"]:checked')
    ].map(input => input.value);

    const selectedDressCode = document.querySelector(
        'input[name="dresscode"]:checked'
    );

    if (selectedActivities.length === 0 || !selectedDressCode) {
        activityMessage.textContent =
            "Pilih at least satu aktiviti dan dress code dulu, sayang 💗";
        return;
    }

    activityMessage.textContent =
        "Pandainyaa sayang! Next, let's make our date ticket ! ";

    // Simpan pilihan untuk digunakan pada tiket nanti
    window.datePlan = {
        date: dateChoice.value,
        time: timeChoice.value,
        activities: selectedActivities,
        dressCode: selectedDressCode.value
    };

   activityPage.classList.add("hidden");
document.getElementById("message-page").classList.remove("hidden");
});


const loveMessage = document.getElementById("love-message");
const messageCounter = document.getElementById("message-counter");
const messageError = document.getElementById("love-message-error");
const messageNextButton = document.getElementById("message-next-button");

loveMessage.addEventListener("input", function () {
    messageCounter.textContent = `${loveMessage.value.length}/500`;
});


const ticketPage = document.getElementById("ticket-page");
const ticketError = document.getElementById("ticket-error");

messageNextButton.addEventListener("click", function () {
    if (!window.datePlan) {
        messageError.textContent = "Ada masalah dengan pilihan date tadi. Cuba refresh page.";
        return;
    }

    window.datePlan.message = loveMessage.value.trim();

    const chosenDate = new Date(window.datePlan.date + "T00:00:00");

    document.getElementById("ticket-date").textContent =
        chosenDate.toLocaleDateString("en-MY", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    document.getElementById("ticket-time").textContent =
        new Date("2000-01-01T" + window.datePlan.time).toLocaleTimeString("en-MY", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });

    document.getElementById("ticket-activities").textContent =
        window.datePlan.activities.join(", ");

    document.getElementById("ticket-dresscode").textContent =
        window.datePlan.dressCode;

    document.getElementById("ticket-message").textContent =
        window.datePlan.message || "No message yet ♡";

    messageError.textContent = "";
    document.getElementById("message-page").classList.add("hidden");
    ticketPage.classList.remove("hidden");
});

document.getElementById("save-ticket-button").addEventListener("click", async function () {
    if (typeof html2canvas === "undefined") {
        ticketError.textContent = "PNG library tak dapat dimuatkan. Check internet connection.";
        return;
    }

    try {
        ticketError.textContent = "Preparing your ticket... 💗";

        const ticket = document.getElementById("date-ticket");
        const canvas = await html2canvas(ticket, {
            scale: 2,
            backgroundColor: "#fffafc"
        });

        const link = document.createElement("a");
        link.download = "our-date-ticket.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

        ticketError.textContent = "Ticket saved! Check your Downloads folder ♡";
    } catch (error) {
        ticketError.textContent = "Couldn't save the ticket. Please try again.";
        console.error(error);
    }
});

document.getElementById("share-ticket-button").addEventListener("click", function () {
    const plan = window.datePlan;

    const message = [
        "💗 OUR LITTLE DATE 💗",
        "",
        "📅 Date: " + document.getElementById("ticket-date").textContent,
        "🕒 Time: " + document.getElementById("ticket-time").textContent,
        "💕 Plans: " + plan.activities.join(", "),
        "👗 Dress code: " + plan.dressCode,
        "",
        "💌 Message for Farish:",
        plan.message || "No message yet ♡",
        "",
        "Made with love, just for you ♡"
    ].join("\n");

    const whatsappURL = "https://wa.me/?text=" + encodeURIComponent(message);
    window.open(whatsappURL, "_blank");
});


const anniversaryPage = document.getElementById("anniversary-page");
const openAnniversaryButton = document.getElementById("open-anniversary-button");

const letterButton = document.getElementById("letter-button");
const letterPopup = document.getElementById("letter-popup");
const closeLetterButton = document.getElementById("close-letter");
const typedLetter = document.getElementById("typed-letter");

const anniversaryMessage = `hi hadith zahara, saya masih ingat moment saya tersentuh tangan awak waktu kita jaga booth churros sama sama. saya fikir about that all day longg. sebab apa? sebab saya tersentuh tangan dengan seorang perempuan. tapi bukan perempuan biasa, ni sebenarnya crush saya. dan sekarang rupanya dah jadi gf saya for 4 yearsss. thats you hadith zaharaaa. from lama i like you, crushing on you, tungguu you approve my tiktok following, and tengok your videos as my source of happiness. and i cant believe youre right here now beside me :). until now, its still the same, that kind of feelings where i feel nervous with you, looking at your beautiful face. its neverending. my lovee for you.

from person yang everyone hate, from nobody, you love me like im somebody. you love me like you owe me everything sayang. and thats my why until now.
dari i bocah, rambut macam apa, suara bocah lagi, and taktau apa apa, you have been beside me sampai i jadi the person i am now.

until now, i never change the way i see you. youre beautiful inside and out. and when i said beautiful, not just outside, but all of you are beautiful sayang. i love the way you laugh, the way you care about me, the way you caring for anyone else more than you. i see everything that most people dont see , and thats make me 999x nak stay with you more sayang.

happy 4th anniversary sayang. masuk tahun ke empat means kita dah go thru a lot together sayang. i want us to continue strive for the best and ill never want to do with anybody else if not with you sayang. 

I Love You, Nur Hadith Zahara 

....
....
....
....
....
....
...
....
....
....
....
....
....`;

let typingTimer;

function typeLetter() {
    let index = 0;
    typedLetter.textContent = "";

    clearInterval(typingTimer);

    typingTimer = setInterval(function () {
        typedLetter.textContent += anniversaryMessage[index];
        index++;

        if (index >= anniversaryMessage.length) {
            clearInterval(typingTimer);
        }
    }, 45);
}

openAnniversaryButton.addEventListener("click", function () {
    ticketPage.classList.add("hidden");
    anniversaryPage.classList.remove("hidden");
});

letterButton.addEventListener("click", function () {
    letterPopup.classList.remove("hidden");
    typeLetter();
});

closeLetterButton.addEventListener("click", function () {
    letterPopup.classList.add("hidden");
    clearInterval(typingTimer);
});

letterPopup.addEventListener("click", function (event) {
    if (event.target === letterPopup) {
        letterPopup.classList.add("hidden");
        clearInterval(typingTimer);
    }
});




