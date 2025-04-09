document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const themeToggle = document.querySelector('.theme-toggle');
    const generateBtn = document.getElementById('generateBtn');
    const shareBtn = document.getElementById('shareBtn');
    const saveBtn = document.getElementById('saveBtn');
    const shareActions = document.getElementById('shareActions');
    const contentDisplay = document.getElementById('content');
    const contentTypeBadge = document.getElementById('contentType');
    const contentDate = document.getElementById('contentDate');
    const loader = document.querySelector('.loader');
    const typeBtns = document.querySelectorAll('.type-btn');
    
    // بيانات الرموز السرية (يمكن استبدالها ببيانات من API)
    const secretCodes = {
      all: [
        { text: '👑🐍🔥 - هذه الرموز تمثل لعبة شهيرة (بايثون)', type: 'easy', hint: 'لغة برمجة' },
        { text: '🌍➕➕ - هذه الرموز تمثل لغة برمجة (سي بلس بلس)', type: 'medium', hint: 'لغة برمجة تبدأ بحرف C' },
        { text: '☕🎯 - هذه الرموز تمثل إطار عمل شهير (جافا سكريبت)', type: 'hard', hint: 'إطار عمل لتطبيقات الويب' },
        { text: '🍏📱 - هذه الرموز تمثل شركة تقنية (آبل)', type: 'easy', hint: 'شركة iPhone' },
        { text: '🪐🚀 - هذه الرموز تمثل شركة فضائية (سبيس إكس)', type: 'medium', hint: 'شركة إيلون ماسك' },
        { text: '🟦🐦 - هذه الرموز تمثل شبكة اجتماعية (تويتر)', type: 'hard', hint: 'تم شراؤها مؤخرًا' }
      ],
      easy: [
        { text: '👑🐍🔥 - هذه الرموز تمثل لعبة شهيرة (بايثون)', type: 'easy', hint: 'لغة برمجة' },
        { text: '🍏📱 - هذه الرموز تمثل شركة تقنية (آبل)', type: 'easy', hint: 'شركة iPhone' }
      ],
      medium: [
        { text: '🌍➕➕ - هذه الرموز تمثل لغة برمجة (سي بلس بلس)', type: 'medium', hint: 'لغة برمجة تبدأ بحرف C' },
        { text: '🪐🚀 - هذه الرموز تمثل شركة فضائية (سبيس إكس)', type: 'medium', hint: 'شركة إيلون ماسك' }
      ],
      hard: [
        { text: '☕🎯 - هذه الرموز تمثل إطار عمل شهير (جافا سكريبت)', type: 'hard', hint: 'إطار عمل لتطبيقات الويب' },
        { text: '🟦🐦 - هذه الرموز تمثل شبكة اجتماعية (تويتر)', type: 'hard', hint: 'تم شراؤها مؤخرًا' }
      ]
    };
    
    let currentFilter = 'all';
    
    // تبديل الوضع الفاتح/الداكن
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      // حفظ التفضيل في localStorage
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
    });
    
    // تحميل تفضيل الوضع من localStorage
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }
    
    // تصفية المحتوى حسب النوع
    typeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        typeBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.type;
      });
    });
    
    // توليد رمز سري عشوائي
    generateBtn.addEventListener('click', function() {
      // عرض مؤشر التحميل
      loader.classList.remove('hidden');
      contentDisplay.classList.add('hidden');
      shareActions.classList.add('hidden');
      
      // محاكاة جلب البيانات من API
      setTimeout(() => {
        const filteredCodes = secretCodes[currentFilter];
        const randomCode = filteredCodes[Math.floor(Math.random() * filteredCodes.length)];
        
        // عرض المحتوى
        contentDisplay.innerHTML = `
          <h3>${randomCode.text}</h3>
          <p class="hint">تلميح: ${randomCode.hint}</p>
          <button class="show-answer-btn">اظهر الإجابة</button>
          <p class="answer hidden">${randomCode.text.split('-')[1].trim()}</p>
        `;
        
        // تعيين نوع المحتوى وتاريخ اليوم
        contentTypeBadge.textContent = getTypeName(randomCode.type);
        contentTypeBadge.className = 'content-type-badge ' + randomCode.type;
        contentDate.textContent = new Date().toLocaleDateString('ar-EG');
        
        // إخفاء مؤشر التحميل وإظهار المحتوى
        loader.classList.add('hidden');
        contentDisplay.classList.remove('hidden');
        shareActions.classList.remove('hidden');
        
        // إضافة حدث لزر الإجابة
        document.querySelector('.show-answer-btn').addEventListener('click', function() {
          document.querySelector('.answer').classList.toggle('hidden');
          this.textContent = document.querySelector('.answer').classList.contains('hidden') ? 
            'اظهر الإجابة' : 'إخفاء الإجابة';
        });
        
        // تأثير كونفيتي للاحتفال
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 1000);
    });
    
    // مشاركة المحتوى
    shareBtn.addEventListener('click', function() {
      if (navigator.share) {
        navigator.share({
          title: 'تحدي الرموز السرية',
          text: 'جرب حظك في فك الشيفرة اليوم!',
          url: window.location.href
        }).catch(err => {
          console.log('Error sharing:', err);
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        alert('عذرًا، مشاركة غير متاحة في متصفحك. يمكنك نسخ الرابط يدويًا.');
      }
    });
    
    // حفظ المحتوى (محاكاة)
    saveBtn.addEventListener('click', function() {
      alert('تم حفظ التحدي بنجاح! يمكنك العودة إليه لاحقًا.');
      // في تطبيق حقيقي، هنا سيتم حفظ البيانات في localStorage أو قاعدة بيانات
    });
    
    // دالة مساعدة للحصول على اسم النوع بالعربية
    function getTypeName(type) {
      const types = {
        easy: 'سهل',
        medium: 'متوسط',
        hard: 'صعب'
      };
      return types[type] || type;
    }
  });