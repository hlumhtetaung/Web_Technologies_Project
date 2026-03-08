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
        image: "images/morning.png",
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
        image: "images/city.png",
        options: [
            { text: "Focus on work", next: "work1" },
            { text: "Call another friend instead", next: "call_friend" }
        ]
    },

    work1: {
        text: `Work consumes the day.

Emails. Meetings. Deadlines.

You feel productive... but strangely empty.`,
        image: "images/work.png",
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
        image: "images/office_night.png",
        options: [
            { text: "The end of this path.", next: null }
        ]
    },

    walk1: {
        text: `You walk through a quiet park.

The wind moves through the trees.

You realize life has been moving too fast.`,
        image: "images/park.png",
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
        image: "images/bench.png",
        options: [
            { text: "Send a message after all", next: "reply1" },
            { text: "Accept the silence", next: "home_alone" }
        ]
    },

    home_alone: {
        text: `Life becomes peaceful but quiet.

You build a stable routine.

Some nights you wonder how things might have been different.`,
        image: "images/night.png",
        options: [
            { text: "The end of this story.", next: null }
        ]
    },

    call_friend: {
        text: `You call another friend.

The conversation turns into laughter.

It reminds you how powerful small connections can be.`,
        image: "images/friends.png",
        options: [
            { text: "Meet them tonight", next: "meetup" },
            { text: "Return to your routine", next: "work1" }
        ]
    },

    meetup: {
        text: `Dinner becomes storytelling.

Stories become plans.

Life slowly grows richer.`,
        image: "images/dinner.png",
        options: [
            { text: "The end of this story.", next: null }
        ]
    },

    reply1: {
        text: `You type a reply.

"Hey... it's been a long time."

The response arrives almost instantly.

Within minutes you're both laughing like old times.`,
        image: "images/texting.png",
        options: [
            { text: "Meet for coffee", next: "coffee" },
            { text: "Keep chatting online", next: "chatting" }
        ]
    },

    coffee: {
        text: `The coffee shop smells like roasted beans and warm pastries.

Seeing them again feels surreal.

Time didn't erase the connection.`,
        image: "images/coffee.png",
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
        image: "images/chat.png",
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
        image: "images/city_walk.png",
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
        image: "images/wedding.png",
        options: [
            { text: "The end of this story.", next: null }
        ]
    },

    casual_friendship: {
        text: `You remain good friends.

Sometimes the best connections don't need labels.`,
        image: "images/friends2.png",
        options: [
            { text: "The end of this story.", next: null }
        ]
    },

    separate_paths: {
        text: `You both choose different directions in life.

But the memory of that reconnection stays meaningful.`,
        image: "images/path.png",
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