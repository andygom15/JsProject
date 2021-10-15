var textboxSelected;
let re = /\S+@\S+\.\S+/;


function toggleCapsLock() {
    element = document.getElementById("keyboard_capslock");
    letters = document.getElementsByClassName("letter");
    length = letters.length;

    if (element.classList.contains("keyboard__key--active")){
        element.classList.remove("keyboard__key--active");
        element.classList.add("keyboard__key--activatable");
        for (i= 0; i < length; i++) {   
            letters[i].innerHTML = letters[i].innerHTML.toLowerCase();
        }
    } else {
        element.classList.remove("keyboard__key--activatable");
        element.classList.add("keyboard__key--active");
        for (i= 0; i < length; i++) {   
            letters[i].innerHTML = letters[i].innerHTML.toUpperCase();
        }
    }
}

function keyDown(element) {
    textbox = document.getElementById(textboxSelected);

    if (element.id == "backspace") {
        length = textbox.value.length;
        textbox.value = textbox.value.substring(0,length-1);
    } else if (element.id == "space_bar") {
        textbox.value = textbox.value + " ";
    } else if (element.id == "enter") {
        textbox.value = textbox.value + "\n";
    } else {
        textbox.value = textbox.value + element.innerHTML;
        
    }
}

function selectTextbox(element) {
    textboxSelected = element.id;
}

function sendEmail() {
    var mailto = document.getElementById("mailto").value;
    var subject = document.getElementById("subject").value;
    var content = document.getElementById("content").value;

    flag = validateEmail(mailto);
    if (flag){
        Email.send({
            SecureToken : TOKEN,
            To : mailto,
            From : EMAIL_ADDRESS,
            Subject : subject,
            Body : content
        }).then(
            message => {
            console.log(message)
            if (message == "OK") 
                alert("Check your inbox! (or SPAM)")
            else
                alert("There was an error, please try again later") 
        }
        );
    }
}

function validateEmail(email) {
    ret = re.test(email);
    if (!ret) {
        alert("type a valid email address!")
    }
    return ret;
}