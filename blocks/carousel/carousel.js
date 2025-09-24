import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  try {
    const placeholders = await fetchPlaceholders(getMetadata('locale'));
    const { btnNxt, btnPre } = placeholders;

    console.log('placeholders ---> ', placeholders, btnNxt, btnPre);
    
    const rows = [...block.children];
    
    // Pehle buttons create karein
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('btn', 'btn-next');
    nextBtn.textContent = btnNxt || 'Next'; // Fallback agar placeholder na mile
    
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('btn', 'btn-prev');
    prevBtn.textContent = btnPre || 'Previous'; // Fallback agar placeholder na mile
    
    // Slides process karein
    const slides = [];
    rows.forEach((row, r) => {
      if (r > 0 && r < rows.length - 1) { // Middle rows ko slides banayenge
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
      if (curSlide === maxSlide) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      updateSlidePosition();
    });
    
    prevBtn.addEventListener('click', function () {
      if (curSlide === 0) {
        curSlide = maxSlide;
      } else {
        curSlide--;
      }
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