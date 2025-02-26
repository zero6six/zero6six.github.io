document.addEventListener('DOMContentLoaded', function() {
    // 背景图片列表（根据实际路径修改）
    const images = [
        '/custom/bg/pic1.jpg',
        '/custom/bg/pic2.jpg',
        // '/custom/bg/pic3.jpg',
        '/custom/bg/pic4.jpg',
        '/custom/bg/pic5.jpg',
        '/custom/bg/pic6.jpg',
        // '/custom/bg/pic7.jpg',
        '/custom/bg/pic8.jpg',
        '/custom/bg/pic9.jpg',
        '/custom/bg/pic10.jpg',
        '/custom/bg/pic11.jpg',
        '/custom/bg/pic12.jpg',
        // '/custom/bg/pic13.png',
    ];

    const bgContainer = document.createElement('div');
    bgContainer.className = 'background-container';
    document.body.prepend(bgContainer);

    // 从 sessionStorage 获取或生成随机索引
    let currentIndex = sessionStorage.getItem('bgIndex');
    if (currentIndex === null) {
        currentIndex = Math.floor(Math.random() * images.length);
        sessionStorage.setItem('bgIndex', currentIndex);
    } else {
        currentIndex = parseInt(currentIndex);
    }

    function preloadImages(urls) {
        urls.forEach(url => {
            new Image().src = url;
        });
    }

    function changeBackground() {
        bgContainer.style.opacity = 0;
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            sessionStorage.setItem('bgIndex', currentIndex); // 保存新索引
            bgContainer.style.backgroundImage = `url(${images[currentIndex]})`;
            bgContainer.style.opacity = 1;
        }, 1000);
    }

    // 初始化
    preloadImages(images);
    bgContainer.style.backgroundImage = `url(${images[currentIndex]})`;
    bgContainer.style.opacity = 1;

    setInterval(changeBackground, 60000); // 1 分钟切换一次背景
});

// 删除特定元素以避免手机端无法选择目录
// 选择符合条件的 <label> 元素
const labelElement = document.querySelector('label.md-overlay[for="__drawer"]');

// 检查元素是否存在
if (labelElement) {
  // 如果存在，则删除该元素
  labelElement.remove();
} else {
  console.log('未找到符合条件的 <label> 元素');
}