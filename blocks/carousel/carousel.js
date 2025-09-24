// blocks/carousel/carousel.js - Fixed version
export default async function decorate(block) {
  try {
    // Temporary hardcoded values - aem.js fix hone tak
    const btnNxt = 'Next';
    const btnPre = 'Previous';
    
    console.log('Carousel initializing with:', btnNxt, btnPre);
    
    const rows = [...block.children];
    
    // Pehle buttons create karein
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('btn', 'btn-next');
    nextBtn.textContent = btnNxt;
    
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('btn', 'btn-prev');
    prevBtn.textContent = btnPre;
    
    // Slides process karein
    const slides = [];
    rows.forEach((row, r) => {
      if (r > 0 && r < rows.length - 1) {
        row.classList.add('slide');
        [...row.children].forEach((col, c) => {
          if (c === 1) {
            col.classList.add('slide-text');
          }
        });
        slides.push(row);
      }
    });
    
    // Block clear karein aur elements add karein
    block.innerHTML = '';
    block.appendChild(prevBtn);
    slides.forEach(slide => block.appendChild(slide));
    block.appendChild(nextBtn);
    
    // Slides position set karein
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${index * 100}%)`;
    });
    
    // Slide navigation logic
    let curSlide = 0;
    const maxSlide = slides.length - 1;
    
    nextBtn.addEventListener('click', function () {
      curSlide = curSlide === maxSlide ? 0 : curSlide + 1;
      updateSlidePosition();
    });
    
    prevBtn.addEventListener('click', function () {
      curSlide = curSlide === 0 ? maxSlide : curSlide - 1;
      updateSlidePosition();
    });
    
    function updateSlidePosition() {
      slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
      });
    }
    
  } catch (error) {
    console.error('Error in carousel:', error);
  }
}