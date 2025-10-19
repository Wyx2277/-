// 响应式导航栏切换
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // 动画菜单按钮
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.transitionDelay = `${index * 0.1}s`;
    });
    spans[0].classList.toggle('rotate-45');
    spans[1].classList.toggle('opacity-0');
    spans[2].classList.toggle('-rotate-45');
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // 如果在移动端，点击链接后关闭菜单
            if (window.innerWidth < 768) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 表单提交处理
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 这里只是简单的模拟提交，实际项目中需要连接到后端API
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = '发送中...';
        
        // 模拟网络请求延迟
        setTimeout(() => {
            // 重置表单
            contactForm.reset();
            
            // 显示成功消息（实际项目中可以使用更美观的提示组件）
            alert('消息发送成功！感谢您的联系。');
            
            // 恢复按钮状态
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 1500);
    });
}

// 添加滚动动画
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .about-stats, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// 初始化元素动画状态
const initAnimation = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .about-stats, .contact-info, .contact-form');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
    });
};

// 页面加载完成后执行初始化
window.addEventListener('DOMContentLoaded', () => {
    initAnimation();
    animateOnScroll(); // 初始检查一次
    
    // 监听滚动事件
    window.addEventListener('scroll', animateOnScroll);
});

// 添加菜单按钮的CSS样式（通过JS添加，避免CSS文件过大）
const style = document.createElement('style');
style.textContent = `
    .menu-toggle span:nth-child(1) {
        transform-origin: top left;
    }
    .menu-toggle span:nth-child(3) {
        transform-origin: bottom left;
    }
    .menu-toggle span.rotate-45 {
        transform: rotate(45deg);
        background-color: #1e88e5;
    }
    .menu-toggle span.opacity-0 {
        opacity: 0;
    }
    .menu-toggle span.-rotate-45 {
        transform: rotate(-45deg);
        background-color: #1e88e5;
    }
`;
document.head.appendChild(style);