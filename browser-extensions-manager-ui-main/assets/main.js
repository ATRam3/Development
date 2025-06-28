const themeDark = document.querySelector('.theme__dark');
const themeLight = document.querySelector('.theme__light');
const body = document.body;

if (themeLight) {
themeLight.addEventListener('click', function () {
    body.classList.add('dark__mode');
    themeLight.style.display = 'none';
    console.log(themeLight);
    themeDark.style.display = 'block';
});
}

if (themeDark) {
themeDark.addEventListener('click', function () {
    body.classList.remove('dark__mode');
    themeLight.style.display = 'block';
    themeDark.style.display = 'none';
});
}

const allExtentions = document.querySelector('.filter__all');
const activeExtentions = document.querySelector('.filter__active');
const inactiveExtentions = document.querySelector('.filter__inactive');

const checkInput = document.querySelectorAll('.toggle__input');

checkInput.forEach(function(check){
    const parentDiv = check.closest('.extension');

    allExtentions.addEventListener('click', function(){
        allExtentions.classList.add('active__filter');
        inactiveExtentions.classList.remove('active__filter');
        activeExtentions.classList.remove('active__filter');

        parentDiv.style.display = 'block';
    });

    activeExtentions.addEventListener('click', function(){
        //console.log('clicked');
        allExtentions.classList.remove('active__filter');
        inactiveExtentions.classList.remove('active__filter');
        activeExtentions.classList.add('active__filter');

        if(check.checked){
            parentDiv.style.display = 'block';
        } else{
            parentDiv.style.display = 'none';
        }
    });

    inactiveExtentions.addEventListener('click', function(){
        allExtentions.classList.remove('active__filter');
        inactiveExtentions.classList.add('active__filter');
        activeExtentions.classList.remove('active__filter');
        
        if(!check.checked){
            parentDiv.style.display = 'block';
        } else{
            parentDiv.style.display = 'none';
        }
    });
})



    