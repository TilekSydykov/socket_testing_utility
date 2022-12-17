const main = document.getElementById("main")
const send = document.getElementById("send")
const connect = document.getElementById("connect")

const API = 'ws://discoverystudio.xyz:3050/'

const connections = {}
let lastTime = Date.now()

let nodes = ''

for (let i = 0; i < 255; i++) {
    nodes += `
    <div class="component d-flex justify_s_b" id="${i}">
        <div class="indicator red"></div>
        <div class="messages"></div>
    </div>`
}

main.innerHTML = nodes

for (let i of main.children) {
    const id = i.getAttribute("id")
    const conn = new WebSocket(API)
    connections[id] = conn
    let ind = i.getElementsByClassName('indicator')[0];
    conn.onopen = e => {
        ind.className = ind.className.replace('red', 'green')
    }
    conn.onclose = e => {
        ind.className = ind.className.replace('green', 'red')
    }
    conn.onmessage = msg => {
        const diff = Date.now() - (+msg.data)
        const multiplier = 2
        i.getElementsByClassName('messages')[0].innerHTML = diff + '';
        i.style.background = `rgb(255,${255 - diff * multiplier},${ 255 - diff * multiplier})`
    }
}

send.addEventListener('click', e => {
    connections[0].send(Date.now().toString())
    lastTime = Date.now()
})