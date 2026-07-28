const words = ["> Network Architect", "> Flutter Mobile Engineer", "> Python Automation Dev", "> Tech Enthusiast"];
let i = 0, timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typewriter').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typewriter').innerHTML = words[i].substring(0, word.length);
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}

typingEffect();

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 65;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 255, 102, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 255, 102, ${1 - distance / 120})`;
                ctx.lineWidth = 0.3;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

document.addEventListener("DOMContentLoaded", () => {
  fetch('https://api.github.com/users/khamdam0va/repos')
    .then(response => response.json())
    .then(repos => {
      const container = document.getElementById('projects-container');
      if (!container) return;
      container.innerHTML = '';
      
      repos.forEach(repo => {
        const description = repo.description ? repo.description : 'Enterprise darajasidagi tarmoq va dasturiy taʼminot loyihasi.';
        
        const card = `
          <div class="bg-cyber-cardBg/80 backdrop-blur p-8 rounded-xl border border-cyber-border hover:border-cyber-green transition-all flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start mb-4">
                <span class="font-mono-custom text-xs text-cyber-green">[REPOSITORY]</span>
                <a href="${repo.html_url}" target="_blank" class="text-slate-400 hover:text-cyber-green"><i class="fa-brands fa-github text-2xl"></i></a>
              </div>
              <h3 class="text-2xl font-bold font-orbitron text-white mb-3">${repo.name}</h3>
              <p class="text-slate-400 text-sm leading-relaxed mb-6">${description}</p>
            </div>
            <div class="flex gap-2 font-mono-custom text-xs text-slate-300">
              <span class="px-3 py-1 bg-black/50 rounded border border-cyber-border">${repo.language || 'Code'}</span>
            </div>
          </div>
        `;
        container.innerHTML += card;
      });
    })
    .catch(error => {
      console.error('GitHub API xatoligi:', error);
      const container = document.getElementById('projects-container');
      if (container) {
        container.innerHTML = '<p class="text-red-500 font-mono-custom col-span-full">Loyihalarni yuklashda xatolik yuz berdi.</p>';
      }
    });
});
