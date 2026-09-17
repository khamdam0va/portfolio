// Typewriter Effect
const words = ["> Cybersecurity Specialist", "> Network Security Engineer", "> Infosec Researcher", "> Python Automation Dev"];
let i = 0;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            const el = document.getElementById('typewriter');
            if(el) el.innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            const el = document.getElementById('typewriter');
            if(el) el.innerHTML = words[i].substring(0, word.length);
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            setTimeout(typingEffect, 500);
            return false;
        }
        setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}

typingEffect();

// Background Canvas Particles
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 60;

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

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
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
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
}

// GitHub Repositories Fetcher
document.addEventListener("DOMContentLoaded", () => {
    fetch('https://api.github.com/users/khamdam0va/repos')
        .then(response => response.json())
        .then(repos => {
            const container = document.getElementById('projects-container');
            if (!container) return;
            container.innerHTML = '';
            
            const filteredRepos = repos.filter(repo => !repo.fork);
            
            if (filteredRepos.length === 0) {
                container.innerHTML = '<p class="text-slate-400 font-mono col-span-full">Hozircha ommaviy repositorylar mavjud emas.</p>';
                return;
            }

            filteredRepos.forEach(repo => {
                const description = repo.description ? repo.description : 'Cybersecurity and Network Infrastructure project.';
                const card = `
                    <div class="bg-cyber-cardBg/85 backdrop-blur p-8 rounded-xl border border-cyber-border hover:border-cyber-green transition-all flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-4">
                                <span class="font-mono text-xs text-cyber-green">[REPOSITORY]</span>
                                <a href="${repo.html_url}" target="_blank" class="text-slate-400 hover:text-cyber-green"><i class="fa-brands fa-github text-2xl"></i></a>
                            </div>
                            <h3 class="text-2xl font-bold font-orbitron text-white mb-3">${repo.name}</h3>
                            <p class="text-slate-400 text-sm leading-relaxed mb-6">${description}</p>
                        </div>
                        <div class="flex gap-2 font-mono text-xs text-slate-300">
                            <span class="px-3 py-1 bg-black/50 rounded border border-cyber-border">${repo.language || 'Code'}</span>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(error => {
            console.error(error);
            const container = document.getElementById('projects-container');
            if (container) {
                container.innerHTML = '<p class="text-red-500 font-mono col-span-full">Loyihalarni yuklashda xatolik yuz berdi.</p>';
            }
        });

    // Interactive Terminal Logic
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');

    if (termInput && termOutput) {
        termInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const cmd = termInput.value.trim().toLowerCase();
                const commandLine = `<p class="text-white"><span class="text-cyber-green">visitor@khamdam0va:~$</span> ${termInput.value}</p>`;
                termOutput.innerHTML += commandLine;

                let response = '';
                switch(cmd) {
                    case 'help':
                        response = `<div class="text-slate-300 space-y-1">
                            <p>Available commands:</p>
                            <p><span class="text-cyber-green font-bold">about</span> - Brief summary about Sarafroz</p>
                            <p><span class="text-cyber-green font-bold">skills</span> - List technical expertise</p>
                            <p><span class="text-cyber-green font-bold">contact</span> - Get direct communication links</p>
                            <p><span class="text-cyber-green font-bold">clear</span> - Clear terminal screen</p>
                            <p><span class="text-cyber-green font-bold">sudo</span> - Run administrative check</p>
                        </div>`;
                        break;
                    case 'about':
                        response = `<p class="text-slate-300">Sarafroz Khamdamova - Cybersecurity Specialist & Network Security Engineer from Uzbekistan. 4+ years of hands-on experience in infrastructure defense.</p>`;
                        break;
                    case 'skills':
                        response = `<p class="text-slate-300">Core Skills: Cisco Networking, Security Hardening, Penetration Testing Basics, Python, Bash, Git.</p>`;
                        break;
                    case 'contact':
                        response = `<p class="text-slate-300">Telegram: @Mayuzz_001 | Email: sarafrozxamdamova@gmail.com</p>`;
                        break;
                    case 'clear':
                        termOutput.innerHTML = '';
                        termInput.value = '';
                        return;
                    case 'sudo':
                        response = `<p class="text-red-400">Access denied: User 'visitor' is not in the sudoers file. This incident will be reported.</p>`;
                        break;
                    case '':
                        response = '';
                        break;
                    default:
                        response = `<p class="text-red-400">Command not found: ${cmd}. Type 'help' for valid commands.</p>`;
                }

                if(response) {
                    termOutput.innerHTML += `<div>${response}</div>`;
                }

                termInput.value = '';
                termOutput.scrollTop = termOutput.scrollHeight;
            }
        });
    }
});
