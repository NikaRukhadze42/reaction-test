// DOM Variables
const userName = document.querySelector('input');
const timeTest = document.querySelector('.time-btn a');
const standTest = document.querySelector('.standard-btn a');

// Events
userName.addEventListener('change', function(){
    localStorage.setItem('userName', userName.value);
});

timeTest.addEventListener('click', function(){
    localStorage.setItem('type', this.innerHTML);
})

standTest.addEventListener('click', function(){
    localStorage.setItem('type', this.innerHTML);
})