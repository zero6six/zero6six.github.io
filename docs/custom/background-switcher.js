document.addEventListener('DOMContentLoaded', function() {
    // 背景图片列表（根据实际路径修改）

    const images = [
        '/custom/bg/pic1.jpg',
        '/custom/bg/pic2.jpg',
        '/custom/bg/pic3.jpg',
        '/custom/bg/pic4.jpg',
        '/custom/bg/pic5.jpg',
        '/custom/bg/pic6.jpg',
        '/custom/bg/pic7.jpg',
        '/custom/bg/pic8.jpg',
        '/custom/bg/pic9.jpg',
        '/custom/bg/pic10.jpg',
        '/custom/bg/pic11.jpg',
        '/custom/bg/pic12.jpg',
        '/custom/bg/pic13.png',
    ];

    // 创建背景容器
    const bgContainer = document.createElement('div');
    bgContainer.className = 'background-container';
    document.body.prepend(bgContainer);

    // 预加载图片
    function preloadImages(urls) {
        urls.forEach(url => {
            new Image().src = url;
        });
    }

    // 切换背景函数
    let currentIndex = Math.floor(Math.random() * images.length);
    function changeBackground() {
        bgContainer.style.opacity = 0;
        
        setTimeout(() => {
            // 替换原来的currentIndex递增逻辑
            currentIndex = Math.floor(Math.random() * images.length);
            bgContainer.style.backgroundImage = `url(${images[currentIndex]})`;
            bgContainer.style.opacity = 1; // 最终透明度
        }, 1000);
    }

    // 初始化
    preloadImages(images);
    bgContainer.style.backgroundImage = `url(${images[currentIndex]})`;
    bgContainer.style.opacity = 1;

    // 每 1 分钟切换一次（单位：毫秒）
    setInterval(changeBackground, 60000);
});