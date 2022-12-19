const buttonOk = document.getElementById('button-decision');
const buttonClose = document.getElementById('button-close');
const modal = document.getElementById('modal');
const inputUsername = document.getElementById('username');
const buttonControlComment = document.getElementById('button-control');
const iconButtonControl = document.getElementById('button-control-img');
const commentBoxOpen = document.getElementById('comment-box-open');
const commentBoxClose = document.getElementById('comment-box-close');
const commentForm = document.getElementById('form-comment');
const inputComment = document.getElementById('message');
let username = "";

buttonOk.addEventListener("click", hideModal);
buttonControlComment.addEventListener("click", toggleCommentBox);

const socket = io.connect('https://cedar-raspy-anorak.glitch.me/')

commentForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if (inputComment.value) {
    socket.emit('chat message', inputComment.value);
    inputComment.value = '';
  }
});

function hideModal() {
  username = inputUsername.value;
  if(username != "" && username.length >= 8) {
    modal.style.display = "none";
  } else {
    alert("Username invalid!")
  }  
}

function toggleCommentBox() {
    let srcIcon = iconButtonControl.src;
    if(srcIcon.includes("btn_close")) {
        iconButtonControl.src = "./img/comment_close/btn_open.png";
        commentBoxOpen.style.display = "none";
        commentBoxClose.style.borderTopLeftRadius = '10px';
    } else {
        iconButtonControl.src = "./img/comment_open/btn_close.png";
        commentBoxOpen.style.display = "block";
        commentBoxClose.style.borderTopLeftRadius = '0px';
    }
}