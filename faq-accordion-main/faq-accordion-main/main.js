 const faqItems = document.querySelectorAll('.faq__item');
    console.log(faqItems);
    
    faqItems.forEach(function(item){
      const plusIcon = item.querySelector('.plus__icon');
      const minusIcon = item.querySelector('.minus__icon');
      const question = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');

      plusIcon.addEventListener('click', function(){
        document.querySelectorAll('.minus__icon').forEach(item => {item.style.display = 'none'});
        document.querySelectorAll('.plus__icon').forEach(item => {item.style.display = 'block'});
        document.querySelectorAll('.faq__answer').forEach(item => {item.classList.remove('active')});

        answer.classList.add('active');
        plusIcon.style.display = 'none';
        minusIcon.style.display = 'block';
      });

      minusIcon.addEventListener('click', function(){
        event.stopPropagation();
        console.log('clicked');
        answer.classList.remove('active');
        plusIcon.style.display = 'block';
        minusIcon.style.display = 'none';
      });

      question.addEventListener('click', function(){
        document.querySelectorAll('.minus__icon').forEach(item => {item.style.display = 'none'});
        document.querySelectorAll('.plus__icon').forEach(item => {item.style.display = 'block'});
        document.querySelectorAll('.faq__answer').forEach(item => {item.classList.remove('active')});

        answer.classList.add('active');
        plusIcon.style.display = 'none';
        minusIcon.style.display = 'block';
      });
    });
