
document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
           
            if (href.startsWith('#') && window.location.pathname.endsWith(href.split('#')[0] || 'index.html')) {
                e.preventDefault(); 

               
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth' 
                });
            }
           
        });
    });

    
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            
            document.querySelector('#products').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

   
    const products = [
        {
            name: "iPhone 15 Pro Max",
            image: "https://www.thegioididong.com/dtdd/iphone-15-pro-max",
            price: "29.990.000 VNĐ",
            category: "Điện thoại",
            defaultDescription: "Chiếc điện thoại cao cấp nhất của Apple với hiệu năng vượt trội, camera đỉnh cao và thiết kế sang trọng."
        },
        {
            name: "Samsung Galaxy S24 Ultra 5G",
            image: "https://www.thegioididong.com/dtdd/samsung-galaxy-s24-ultra-5g",
            price: "28.990.000 VNĐ",
            category: "Điện thoại",
            defaultDescription: "Siêu phẩm Android với camera 200MP, S Pen tích hợp và sức mạnh AI đột phá."
        },
        {
            name: "Xiaomi 14",
            image: "https://www.thegioididong.com/dtdd/xiaomi-14",
            price: "19.990.000 VNĐ",
            category: "Điện thoại",
            defaultDescription: "Flagship nhỏ gọn với hiệu năng mạnh mẽ, camera Leica và màn hình tuyệt đẹp."
        },
        {
            name: "Oppo Reno11 F",
            image: "https://www.thegioididong.com/dtdd/oppo-reno11-f-5g",
            price: "8.990.000 VNĐ",
            category: "Điện thoại",
            defaultDescription: "Điện thoại tầm trung nổi bật với thiết kế mỏng nhẹ, camera chân dung chuyên nghiệp và sạc nhanh."
        },
        {
            name: "Laptop Asus ROG Strix",
            image: "https://www.thegioididong.com/laptop/asus-gaming-rog-strix-scar-18-g834jy-i9-n6039w",
            price: "25.000.000 VNĐ",
            category: "Laptop",
            defaultDescription: "Laptop gaming mạnh mẽ với card đồ họa RTX, màn hình tần số quét cao và hệ thống tản nhiệt hiệu quả."
        },
        {
            name: "iPad Air 5",
            image: "https://www.thegioididong.com/tin-tuc/tren-tay-ipad-air-5-2022-1426155",
            price: "15.990.000 VNĐ",
            category: "Máy tính bảng",
            defaultDescription: "Máy tính bảng linh hoạt với chip M1 mạnh mẽ, màn hình Liquid Retina và hỗ trợ Apple Pencil."
        }
    ];

    
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) { 
        products.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/200x200/cccccc/333333?text=Image+Error';">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <p class="ai-description-text" id="ai-desc-${index}">${product.defaultDescription}</p>
                <div class="loading-indicator" id="loading-${index}">Đang tạo mô tả...</div>
                <div class="button-group">
                    <button>Xem chi tiết</button>
                    <button class="ai-description-btn" data-product-index="${index}">✨ Mô tả thông minh</button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });

        
        document.querySelectorAll('.ai-description-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const productIndex = event.target.dataset.productIndex;
                const product = products[productIndex];
                const descriptionTextElement = document.getElementById(`ai-desc-${productIndex}`);
                const loadingIndicator = document.getElementById(`loading-${productIndex}`);

               
                loadingIndicator.classList.add('visible');
                descriptionTextElement.classList.remove('visible'); 

                try {
                    
                    const prompt = `Viết một đoạn mô tả sản phẩm hấp dẫn, ngắn gọn (khoảng 2-3 câu) cho '${product.name}' thuộc danh mục '${product.category}', nhấn mạnh các tính năng nổi bật.`;

                    let chatHistory = [];
                    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                    const payload = { contents: chatHistory };
                    const apiKey = ""; 
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    const result = await response.json();

                    if (result.candidates && result.candidates.length > 0 &&
                        result.candidates[0].content && result.candidates[0].content.parts &&
                        result.candidates[0].content.parts.length > 0) {
                        const text = result.candidates[0].content.parts[0].text;
                        descriptionTextElement.textContent = text;
                        descriptionTextElement.classList.add('visible'); 
                    } else {
                        descriptionTextElement.textContent = "Không thể tạo mô tả. Vui lòng thử lại.";
                        descriptionTextElement.classList.add('visible');
                        console.error("Unexpected API response structure:", result);
                    }
                } catch (error) {
                    descriptionTextElement.textContent = "Đã xảy ra lỗi khi kết nối AI. Vui lòng thử lại.";
                    descriptionTextElement.classList.add('visible');
                    console.error("Error calling Gemini API:", error);
                } finally {
                    loadingIndicator.classList.remove('visible'); 
                }
            });
        });
    }
    const newsAndPromotions = [
        {
            title: "Giảm giá sốc iPhone 15 series lên đến 5 triệu đồng!",
            image: "https://placehold.co/400x200/ffcc00/000000?text=Khuyen+Mai+iPhone",
            description: "Cơ hội vàng sở hữu iPhone 15 series với ưu đãi cực lớn, số lượng có hạn.",
            link: "#"
        },
        {
            title: "Ra mắt Samsung Galaxy Z Fold6/Flip6: Đặt trước nhận quà khủng",
            image: "https://placehold.co/400x200/007bff/ffffff?text=Galaxy+Z+Fold6",
            description: "Khám phá thế hệ điện thoại gập mới nhất từ Samsung và nhận bộ quà tặng giá trị khi đặt trước.",
            link: "#"
        },
        {
            title: "Ưu đãi Laptop Gaming: Giảm đến 10% và tặng kèm phụ kiện",
            image: "https://placehold.co/400x200/28a745/ffffff?text=Laptop+Gaming",
            description: "Nâng cấp trải nghiệm gaming với các mẫu laptop hiệu năng cao, ưu đãi hấp dẫn.",
            link: "#"
        },
        {
            title: "Chương trình thu cũ đổi mới: Lên đời điện thoại tiết kiệm hơn",
            image: "https://placehold.co/400x200/dc3545/ffffff?text=Thu+Cu+Doi+Moi",
            description: "Mang điện thoại cũ đến Thế Giới Di Động để được định giá và đổi lấy máy mới với chi phí tối ưu.",
            link: "#"
        },
        {
            title: "Đồng hồ thông minh giảm giá đến 30%",
            image: "https://placehold.co/400x200/800080/ffffff?text=Smartwatch",
            description: "Cơ hội sở hữu các mẫu smartwatch thời thượng với giá cực kỳ ưu đãi.",
            link: "#"
        },
        {
            title: "Phụ kiện điện thoại đồng giá 99K",
            image: "https://placehold.co/400x200/FFA500/000000?text=Phu+Kien",
            description: "Hàng ngàn phụ kiện chất lượng cao như ốp lưng, tai nghe, sạc dự phòng đồng giá 99.000 VNĐ.",
            link: "#"
        }
    ];

    const newsGrid = document.querySelector('.news-grid');
    if (newsGrid) { 
        newsAndPromotions.forEach(item => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card');
            newsCard.innerHTML = `
                <img src="${item.image}" alt="${item.title}" onerror="this.onerror=null;this.src='https://placehold.co/400x200/cccccc/333333?text=Image+Error';">
                <div class="news-card-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="${item.link}">Xem chi tiết</a>
                </div>
            `;
            newsGrid.appendChild(newsCard);
        });
    }
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');
    const closeMessageBox = document.getElementById('closeMessageBox');
    function showMessage(message) {
        messageText.textContent = message; 
        messageBox.style.display = 'flex';
    }
    function hideMessage() {
        messageBox.style.display = 'none';
    }
    if (closeMessageBox) {
        closeMessageBox.addEventListener('click', hideMessage);
    }
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showMessage('Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ lại sớm nhất.');
            contactForm.reset();
        });
    }
});
