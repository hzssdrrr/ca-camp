// ============================================
// Suncheon Hightech Center CA Campaign
// Main JavaScript File
// ============================================

// DOM 요소 선택
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const contactForm = document.getElementById('contactForm');
const buttons = document.querySelectorAll('button');
const scrollIndicator = document.querySelector('.scroll-indicator');

// ============================================
// 1. Smooth Scroll Navigation
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// 2. Scroll Indicator Click
// ============================================
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const efficiencySection = document.getElementById('efficiency');
        if (efficiencySection) {
            efficiencySection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ============================================
// 3. Contact Form Submission
// ============================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // 유효성 검사
        if (!data.name || !data.email) {
            showAlert('이름과 이메일을 입력해주세요.', 'error');
            return;
        }
        
        // 이메일 형식 검사
        if (!isValidEmail(data.email)) {
            showAlert('올바른 이메일 형식을 입력해주세요.', 'error');
            return;
        }
        
        // 성공 메시지
        showAlert('문의가 정상적으로 접수되었습니다. 감사합니다!', 'success');
        
        // 폼 초기화
        contactForm.reset();
        
        // 실제 서버 전송 코드 (필요시)
        // sendFormData(data);
    });
}

// ============================================
// 4. Button Click Effects
// ============================================
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // 클릭 애니메이션
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
        
        // 버튼별 액션 (필요시 커스터마이징)
        handleButtonClick(this);
    });
});

// ============================================
// 5. Navigation Active State
// ============================================
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-emerald-600');
        link.classList.add('text-gray-700');
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-700');
            link.classList.add('text-emerald-600');
        }
    });
});

// ============================================
// Utility Functions
// ============================================

/**
 * 이메일 유효성 검사
 * @param {string} email - 검사할 이메일
 * @returns {boolean} - 유효성 여부
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * 알림 메시지 표시
 * @param {string} message - 표시할 메시지
 * @param {string} type - 메시지 타입 ('success' 또는 'error')
 */
function showAlert(message, type = 'info') {
    // 기존 알림 제거
    const existingAlert = document.querySelector('.alert-notification');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // 새 알림 생성
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-notification fixed top-20 right-6 px-6 py-4 rounded-lg text-white font-semibold shadow-lg z-50 ${
        type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
    }`;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    // 3초 후 제거
    setTimeout(() => {
        alertDiv.style.transition = 'opacity 0.3s ease';
        alertDiv.style.opacity = '0';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

/**
 * 버튼 클릭 시 동작 처리
 * @param {HTMLElement} button - 클릭된 버튼 요소
 */
function handleButtonClick(button) {
    const buttonText = button.textContent.toLowerCase();
    
    // 버튼별 액션 정의
    const actions = {
        '의견 접수하기': () => showAlert('의견 접수 페이지로 이동합니다.'),
        '조직도 확인하기': () => showAlert('조직도 페이지로 이동합니다.'),
        '사용법 알아보기': () => showAlert('사용법 안내 페이지로 이동합니다.'),
        'q&a 보기': () => showAlert('Q&A 페이지로 이동합니다.'),
        '문의/건의하기': () => scrollToSection('contact'),
        '일정 확인하기': () => showAlert('일정 페이지로 이동합니다.'),
        '동료 추천하기': () => showAlert('칭찬캠페인 페이지로 이동합니다.'),
        '지금 참여하기': () => scrollToSection('contact'),
        '캠페인 참여': () => scrollToSection('efficiency'),
    };
    
    // 매칭되는 액션 실행
    for (const [key, action] of Object.entries(actions)) {
        if (buttonText.includes(key)) {
            action();
            break;
        }
    }
}

/**
 * 특정 섹션으로 스크롤
 * @param {string} sectionId - 섹션 ID
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId) || document.querySelector('form');
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * 폼 데이터 서버로 전송 (실제 구현 필요)
 * @param {Object} data - 전송할 데이터
 */
function sendFormData(data) {
    // 실제 API 호출 예시
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    //     showAlert('문의가 정상적으로 접수되었습니다.', 'success');
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    //     showAlert('문의 접수 중 오류가 발생했습니다.', 'error');
    // });
}

// ============================================
// Page Load Event
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('CA Campaign 사이트가 로드되었습니다.');
    
    // 초기화 작업
    initializePageAnimations();
});

/**
 * 페이지 애니메이션 초기화
 */
function initializePageAnimations() {
    // 스크롤 진입 애니메이션 추가 (필요시)
    const cards = document.querySelectorAll('.card-hover');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'slideInUp 0.6s ease-out';
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}