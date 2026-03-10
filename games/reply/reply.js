const storyText = document.getElementById("story-text")
const choicesContainer = document.getElementById("choices")
const sceneImage = document.getElementById("scene-image")
const restartBtn = document.getElementById("restart-btn")

restartBtn.onclick = () => renderScene("start")

function typeText(text) {
    storyText.innerHTML = ""
    let i = 0

    const speed = 20

    function type() {
        if (i < text.length) {
            storyText.innerHTML += text.charAt(i)
            i++
            setTimeout(type, speed)
        }
    }

    type()
}

const scenes = {

    start: {
        text: `The alarm rings at 7:00 AM.

Morning light slips through your window. Another ordinary day begins.

You check your phone.

A notification appears.

A message from someone you haven't spoken to in years.

"Hey... I was thinking about you today."

Your thumb hovers above the screen.`,
        image: "../../images/alarm.jpg",
        options: [
            { text: "Reply to the message", next: "reply1" },
            { text: "Ignore it and start your day", next: "ignore1" }
        ]
    },

    ignore1: {
        text: `You put the phone down.

Some things belong to the past.

You finish breakfast and leave for work.

Outside, the city is already alive.

People rushing. Cars passing. The usual rhythm of life.`,
        image: "images/image.png",
        options: [
            { text: "Focus on work", next: "work1" },
            { text: "Call another friend instead", next: "call_friend" }
        ]
    },

    work1: {
        text: `Work consumes the day.

Emails. Meetings. Deadlines.

You feel productive... but strangely empty.`,
        image: "images\Gemini_Generated_Image_ah7u3hah7u3hah7u.png",
        options: [
            { text: "Stay late at work", next: "work2" },
            { text: "Leave early and take a walk", next: "walk1" }
        ]
    },

    work2: {
        text: `Years pass quickly.

Career success arrives.

Promotions. Recognition.

But the quiet evenings grow longer.`,
        image: "https://images.stockcake.com/public/b/b/9/bb93b7aa-7a24-44ff-88ab-1cceb61651a4_large/office-late-night-stockcake.jpg",
        options: [
            { text: "The end of this path.", next: null }
        ]
    },

    walk1: {
        text: `You walk through a quiet park.

The wind moves through the trees.

You realize life has been moving too fast.`,
        image: "https://images.squarespace-cdn.com/content/v1/5bafb638840b162de12e8913/1660645171424-TOSGIQD2TZP0HJFWOWW0/TrailJudarnFinal28WEB.jpeg",
        options: [
            { text: "Sit and think", next: "reflection" },
            { text: "Go home", next: "home_alone" }
        ]
    },

    reflection: {
        text: `You think about old memories.

Friends you lost contact with.

Moments you never revisited.

Maybe some doors shouldn't stay closed forever.`,
        image: "https://www.gardenplus.com.hk/cdn/shop/products/garden-benches-no2-143937.jpg?v=1704001375&width=783",
        options: [
            { text: "Send a message after all", next: "reply1" },
            { text: "Accept the silence", next: "home_alone" }
        ]
    },

    home_alone: {
        text: `Life becomes peaceful but quiet.

You build a stable routine.

Some nights you wonder how things might have been different.`,
        image: "https://static.vecteezy.com/system/resources/thumbnails/005/732/461/small/night-time-scene-with-bright-full-moon-at-lake-vector.jpg",
        options: [
            { text: "The end of this story.", next: null }
        ]
    },

    call_friend: {
        text: `You call another friend.

The conversation turns into laughter.

It reminds you how powerful small connections can be.`,
        image: "https://ih1.redbubble.net/image.2825787850.1493/st,small,507x507-pad,600x600,f8f8f8.jpg",
        options: [
            { text: "Meet them tonight", next: "meetup" },
            { text: "Return to your routine", next: "work1" }
        ]
    },

    meetup: {
        text: `Dinner becomes storytelling.

Stories become plans.

Life slowly grows richer.`,
        image: "https://www.realsimple.com/thmb/cRFZnLYHd9xMHWGvHTCVOgsw1sc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/easy-dinners-RS0225DINN_skillet-ravioli-lasagna-02e4984546f14b1a8630965a11af0131.jpg",
        options: [
            { text: "The end of this story.", next: null }
        ]
    },

    reply1: {
        text: `You type a reply.

"Hey... it's been a long time."

The response arrives almost instantly.

Within minutes you're both laughing like old times.`,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnwl9lnAyb5MkQMI3Ag454LVtB6MCSPGM8JA&s",
        options: [
            { text: "Meet for coffee", next: "coffee" },
            { text: "Keep chatting online", next: "chatting" }
        ]
    },

    coffee: {
        text: `The coffee shop smells like roasted beans and warm pastries.

Seeing them again feels surreal.

Time didn't erase the connection.`,
        image: "https://insanelygoodrecipes.com/wp-content/uploads/2020/07/Cup-Of-Creamy-Coffee.png",
        options: [
            { text: "Start meeting regularly", next: "relationship1" },
            { text: "Keep things casual", next: "casual_friendship" }
        ]
    },

    chatting: {
        text: `Weeks of conversations pass.

Late-night talks.

Shared memories.

The connection grows stronger.`,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_5O36o8Zy2kq0uleSGJBDrDh96Uq011eDzQ&s",
        options: [
            { text: "Finally meet in person", next: "coffee" },
            { text: "Let the conversation fade", next: "fade" }
        ]
    },

    fade: {
        text: `Eventually the messages slow down.

Life becomes busy again.

The moment passes quietly.`,
        image: "images/fade.png",
        options: [
            { text: "The end of this path.", next: null }
        ]
    },

    relationship1: {
        text: `Months pass.

You go to movies.

Walk through the city.

Share stories late into the night.`,
        image: "https://www.universalstudioshollywood.com/tridiondata/ush/en/us/files/images/ush-citywalk-universal-hollywood-citywalk-hero-b.jpg",
        options: [
            { text: "Move in together", next: "relationship2" },
            { text: "Stay independent", next: "separate_paths" }
        ]
    },

    relationship2: {
        text: `Years later you stand together in a small ceremony.

Friends gather.

Music plays softly.

All because of one small reply.`,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN7wvZ33FpjINw3igTh9IecmYYRzPxP9Aaww&s",
        options: [
            { text: "The end of this story.", next: null }
        ]
    },

    casual_friendship: {
        text: `You remain good friends.

Sometimes the best connections don't need labels.`,
        image: "https://static.vecteezy.com/system/resources/previews/035/563/076/non_2x/stick-figure-illustration-stick-man-friendship-pictogram-people-hugging-holding-hands-free-vector.jpg",
        options: [
            { text: "The end of this story.", next: null }
        ]
    },

    separate_paths: {
        text: `You both choose different directions in life.

But the memory of that reconnection stays meaningful.`,
        image: "https://thumb.photo-ac.com/bb/bbc62f20a605a3f9ca887b8e70714e29_t.jpeg",
        options: [
            { text: "The end of this story.", next: null }
        ]
    }

}

function renderScene(key) {

    const scene = scenes[key]

    if (!scene) return

    choicesContainer.innerHTML = ""
    restartBtn.style.display = "none"

    sceneImage.src = scene.image

    typeText(scene.text)

    scene.options.forEach(option => {

        const btn = document.createElement("button")

        btn.className = "choice-btn"
        btn.innerText = option.text

        btn.onclick = () => {

            if (option.next) {
                renderScene(option.next)
            } else {
                choicesContainer.innerHTML = ""
                restartBtn.style.display = "block"
            }

        }

        choicesContainer.appendChild(btn)

    })

}

renderScene("start")