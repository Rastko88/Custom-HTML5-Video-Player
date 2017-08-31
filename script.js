/*    Svi elementi koji su nam potrebni   */

// div koji sadrzi video player sa svim komandama
const player = document.querySelector('.player');

// video player
const video = player.querySelector('.viewer');

// progres bar prazan
const progress = player.querySelector('.progress');

//progres bar popunjen
const progressBar = player.querySelector('.progress__filled');

// play pause dugme
const toggle = player.querySelector('.toggle');

// dugmici za preskakanje segmenata videa
const skipButtons = player.querySelectorAll('[data-skip]');

// slajderi za volume i brzinu videa
const ranges = player.querySelectorAll('.player__slider');




/*      Funkcije      */

// pustanje i pauziranje videa
function togglePlay() {
//	if (video.paused) {
//		video.play();
//	} else {
//		video.pause();
//	}
	
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

// menjanje dugmice za play i pause
function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// funkcija za preskakanje segmenata video snimka
function skip() {
	let time = Number(this.dataset.skip);
	// moze i let time = parseFloat(this.dataset.skip)
	video.currentTime += time;
}

// funkcija za slajdere brzine videa i volume
function handleRangeUpdate() {
	video[this.name] = this.value;
}

// funkcija za pokretanje progress bar-a
function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;	
}




/*     Event listeners      */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

progress.addEventListener('click', scrub);

// pomocna promenljiva za premotavanje videa uz pomoc progress bar-a
let mousedown = false;

// slusa 'pomeranje misa', ako je vrednost 'mousedown' jednaka true, pokrece funkciju scrub; a ako je false, nece pokrenuti scrub 
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

// ako je mis kliknut, menja vrednost 'mousedown' u true
progress.addEventListener('mousedown', () => mousedown = true);

// kada pustimo dugme misa, menja vredost 'mousedown' ponovo u false
progress.addEventListener('mouseup', () => mousedown = false);




















