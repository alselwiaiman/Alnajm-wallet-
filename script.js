// كود JavaScript للصفحة التعليمية
document.addEventListener('DOMContentLoaded', function() {
    // تعيين السنة الحالية في التذييل
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // الحصول على عناصر النموذج
    const loginBtn = document.getElementById('login-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const simulationResult = document.getElementById('simulation-result');
    const demoEmail = document.getElementById('demo-email');
    const demoPassword = document.getElementById('demo-password');
    
    // إضافة مؤثرات لحقول الإدخال
    const inputs = document.querySelectorAll('.demo-input');
    inputs.forEach(input => {
        // تأثير عند التركيز
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        // تأثير عند فقد التركيز
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
        
        // إظهار تحذير عند بدء الكتابة
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                showInputWarning(this);
            }
        });
    });
    
    // معالجة النقر على زر تسجيل الدخول
    loginBtn.addEventListener('click', function() {
        const email = emailInput.value;
        const password = passwordInput.value;
        
        // التحقق من إدخال البيانات
        if (!email && !password) {
            alert('الرجاء إدخال بيانات وهمية لعرض المحاكاة التعليمية');
            return;
        }
        
        // إضافة تأثير على الزر
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // تغيير نص الزر مؤقتًا
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري المحاكاة...';
        this.disabled = true;
        
        // محاكاة عملية التصيد الاحتيالي
        setTimeout(() => {
            // إعادة نص الزر الأصلي
            this.innerHTML = originalText;
            this.disabled = false;
            
            // عرض نتيجة المحاكاة
            showSimulationResult(email, password);
            
            // عرض إشعار تحذيري
            showSecurityAlert();
            
            // إضافة سجل المحاكاة (لأغراض تعليمية فقط)
            logSimulationAttempt(email, password);
        }, 1500);
    });
    
    // السماح بالإدخال بالضغط على Enter
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                loginBtn.click();
            }
        });
    });
    
    // إضافة تأثيرات للمربعات التعليمية
    const tipBoxes = document.querySelectorAll('.tip-box');
    tipBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 6px 15px rgba(0, 112, 186, 0.2)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // وظيفة لعرض نتيجة المحاكاة
    function showSimulationResult(email, password) {
        demoEmail.textContent = email || "لم يتم إدخال بريد إلكتروني";
        demoPassword.textContent = password ? "••••••••" : "لم يتم إدخال كلمة مرور";
        
        // إظهار قسم النتيجة مع تأثير
        simulationResult.style.display = 'block';
        
        // إضافة تأثير اهتزاز بسيط
        simulationResult.style.animation = 'none';
        setTimeout(() => {
            simulationResult.style.animation = 'fadeIn 0.5s ease-out, shake 0.5s ease-in-out';
        }, 10);
        
        // إضافة صوت تنبيهي (إن أمكن)
        playAlertSound();
    }
    
    // وظيفة لعرض تحذير عند الإدخال
    function showInputWarning(inputElement) {
        // إنشاء عنصر التحذير إذا لم يكن موجودًا
        let warning = inputElement.parentElement.querySelector('.input-warning');
        
        if (!warning) {
            warning = document.createElement('div');
            warning.className = 'input-warning';
            warning.innerHTML = '<i class="fas fa-exclamation-triangle"></i> تذكر: هذه بيانات وهمية لأغراض تعليمية فقط';
            warning.style.cssText = `
                color: #856404;
                background-color: #fff3cd;
                padding: 8px 12px;
                border-radius: 6px;
                margin-top: 8px;
                font-size: 14px;
                display: flex;
                align-items: center;
                gap: 8px;
                animation: fadeIn 0.3s ease;
            `;
            inputElement.parentElement.appendChild(warning);
            
            // إزالة التحذير بعد 5 ثوانٍ
            setTimeout(() => {
                if (warning.parentElement) {
                    warning.style.opacity = '0';
                    warning.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        if (warning.parentElement) {
                            warning.parentElement.removeChild(warning);
                        }
                    }, 500);
                }
            }, 5000);
        }
    }
    
    // وظيفة لعرض تنبيه أمني
    function showSecurityAlert() {
        const alertBox = document.createElement('div');
        alertBox.id = 'security-alert';
        alertBox.innerHTML = `
            <div class="alert-content">
                <h3><i class="fas fa-shield-alt"></i> تذكير أمني مهم</h3>
                <p>في صفحة تسجيل دخول حقيقية، تأكد دائماً من:</p>
                <ul>
                    <li>عنوان URL الصحيح للموقع (مثال: https://www.paypal.com)</li>
                    <li>وجود قفل الأمان 🔒 بجوار العنوان</li>
                    <li>شهادة SSL سارية المفعول (https وليس http)</li>
                    <li>التصميم يتطابق مع الموقع الرسمي</li>
                </ul>
                <button id="close-alert">حسنًا، فهمت</button>
            </div>
        `;
        
        alertBox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;
        
        document.querySelector('.alert-content').style.cssText = `
            background-color: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            text-align: center;
        `;
        
        document.body.appendChild(alertBox);
        
        // إضافة حدث لإغلاق التنبيه
        document.getElementById('close-alert').addEventListener('click', function() {
            alertBox.style.opacity = '0';
            alertBox.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                if (alertBox.parentElement) {
                    document.body.removeChild(alertBox);
                }
            }, 300);
        });
        
        // إغلاق التنبيه عند النقر خارج الصندوق
        alertBox.addEventListener('click', function(e) {
            if (e.target === this) {
                document.getElementById('close-alert').click();
            }
        });
    }
    
    // وظيفة لتسجيل محاولة المحاكاة (لأغراض تعليمية فقط)
    function logSimulationAttempt(email, password) {
        console.log('====== محاكاة هجوم تصيد احتيالي ======');
        console.log('الوقت:', new Date().toLocaleString('ar-SA'));
        console.log('البريد الإلكتروني المدخل:', email || 'لم يتم إدخال');
        console.log('كلمة المرور المدخلة:', password ? 'مدخلة (' + password.length + ' حرف)' : 'لم يتم إدخال');
        console.log('ملاحظة: في هجوم حقيقي، كانت هذه البيانات سترسل إلى خادم المخترقين.');
        console.log('====================================');
        
        // عرض رسالة في وحدة التحكم للمستخدمين المتقدمين
        console.info('💡 تلميح: افتح أدوات المطور (F12) لرؤية كيف يمكن تتبع محاولات التصيد.');
    }
    
    // وظيفة لتشغيل صوت التنبيه (إذا كان مسموحًا)
    function playAlertSound() {
        // محاولة إنشاء صوت تنبيه باستخدام Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            // في حالة فشل Web Audio API، نستخدم صوت بسيط
            console.log('🔔 محاكاة صوت التنبيه');
        }
    }
    
    // إضافة تأثير اهتزاز CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .security-tip {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background-color: #0070ba;
            color: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            max-width: 300px;
            z-index: 100;
            animation: slideIn 0.5s ease;
            display: none;
        }
        
        @keyframes slideIn {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // إضافة نصائح أمنية عشوائية
    const securityTips = [
        "تأكد دائمًا من وجود HTTPS في عنوان الموقع قبل إدخال أي معلومات شخصية.",
        "لا تستخدم نفس كلمة المرور لمواقع متعددة. استخدم مدير كلمات مرور.",
        "تفعيل المصادقة الثنائية (2FA) يوفر طبقة أمان إضافية لحساباتك.",
        "احذر من رسائل البريد الإلكتروني التي تطلب تحديث معلوماتك الشخصية.",
        "قبل النقر على أي رابط، مرر مؤشر الفأرة فوقه لرؤية العنوان الحقيقي.",
        "تحديث برامجك ومتصفحك باستمرار يساعد في الحماية من الثغرات الأمنية."
    ];
    
    // عرض نصيحة أمنية عشوائية بعد فترة
    setTimeout(() => {
        const randomTip = securityTips[Math.floor(Math.random() * securityTips.length)];
        showFloatingTip(randomTip);
    }, 10000);
    
    // وظيفة لعرض نصيحة عائمة
    function showFloatingTip(tip) {
        const tipElement = document.createElement('div');
        tipElement.className = 'security-tip';
        tipElement.innerHTML = `
            <i class="fas fa-lightbulb"></i> 
            <strong>نصيحة أمنية:</strong> 
            <p>${tip}</p>
            <button onclick="this.parentElement.style.display='none'" style="background:white;color:#0070ba;border:none;padding:5px 10px;border-radius:5px;margin-top:8px;cursor:pointer;">حسنًا</button>
        `;
        document.body.appendChild(tipElement);
        tipElement.style.display = 'block';
        
        // إخفاء النصيحة بعد 15 ثانية
        setTimeout(() => {
            if (tipElement.parentElement) {
                tipElement.style.opacity = '0';
                tipElement.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    if (tipElement.parentElement) {
                        document.body.removeChild(tipElement);
                    }
                }, 500);
            }
        }, 15000);
    }
    
    // إضافة معلومات للمطورين في وحدة التحكم
    console.log('%c🔐 صفحة التوعية من التصيد الاحتيالي', 'color: #0070ba; font-size: 18px; font-weight: bold;');
    console.log('%cهذه الصفحة للأغراض التعليمية فقط لتعريف المستخدمين بكيفية عمل هجمات التصيد الاحتيالي.', 'color: #333; font-size: 14px;');
    console.log('%cلا تدخل أي معلومات حقيقية في هذه الصفحة.', 'color: #cc0000; font-size: 14px; font-weight: bold;');
});