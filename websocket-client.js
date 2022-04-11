const WS = new WebSocket('ws://localhost:3133');
WS.binaryType = "blob";
let color;

WS.onopen = () => {
    setTitle('Connected');
    color = setColor();
}

WS.onmessage = (payload) => {
    if (payload.data instanceof Blob) {
        reader = new FileReader();
        reader.readAsText(payload.data);
        reader.onload = () => {
            let serverResponse = JSON.parse(reader.result);
            appendChatBox(serverResponse);
        };
    } else {
        console.log("Result: " + payload.data);
    }
};

document.forms[0].onsubmit = () => {
    let input = document.getElementById('message');
    let json = {
        "message": input.value,
        "color" : color,
    };
    WS.send(JSON.stringify(json));
    input.value = "";
};

const setTitle = (title) => {
    document.querySelector('h1').innerHTML = title;
};

const appendChatBox = ({message, color}) => {
    const container = document.getElementById('chat-container');
    const element = document.createElement('span');
    element.className += `${color} rounded-3 px-3 py-2 d-inline-block text-white my-1 mw-50 w-auto`;
    element.innerHTML = message;
    container.append(document.createElement('br'), element);
    container.scrollTop = container.scrollHeight;
}

const setColor = () => {
    const num = Math.floor(Math.random() * 7);

    switch (num) {
        case 1:
            return 'bg-primary'
            break;
        case 2:
            return 'bg-secondary'
            break;
        case 3:
            return 'bg-success'
            break;
        case 4:
            return 'bg-danger'
            break;
        case 5:
            return 'bg-warning'
            break;
        case 6:
            return 'bg-info'
            break;
        default:
            return 'bg-dark'
            break;
    }
}