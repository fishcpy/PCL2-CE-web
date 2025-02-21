'use strict';

// 视频循环控制
const videoFrame = document.getElementById('bili-video'); 
let isVideoLoaded = false;

videoFrame.onload = function () {
    if (!isVideoLoaded) {
        this.contentWindow.postMessage('{"event":"command","func":"loop","args":""}', '*');
        isVideoLoaded = true;
    }
};
// 高级主题切换
const themeToggle = document.querySelector('#theme-toggle');
const body = document.body;

function toggleTheme() {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    
    body.style.transition = 'background 0.6s ease';
    setTimeout(() => body.style.transition = '', 600);
}

// 动态光标效果
document.querySelectorAll('[data-cursor-effect]').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        element.style.transform = `perspective(1000px) rotateX(${(y - rect.height/2)/20}deg) rotateY(${-(x - rect.width/2)/20}deg)`;
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'none';
    });
});

// 初始化主题
if(typeof savedTheme === 'undefined'){
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
}