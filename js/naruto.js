/* ====================================
   NARUTO STYLE - 火影忍者风格交互脚本
   手里剑 · 螺旋丸 · 木叶飘落
   ==================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // ---- 漩涡角标装饰 ----
    function addUzumakiCorners() {
      var widgets = document.querySelectorAll(
        "#recent-posts .recent-post-item, #sidebar .card-widget",
      );
      widgets.forEach(function (el) {
        el.classList.add("uzumaki-corner");
      });
    }

    // ---- 控制台输出忍者风格信息 ----
    function consoleNinjaBanner() {
      var orange = "color:#ff7500;font-weight:bold;";
      var dim = "color:#8f94a3;";
      var blue = "color:#4fc3f7;font-weight:bold;";
      console.log("%c┌────────────────────────────────┐", orange);
      console.log("%c│   木叶隐村 · NINJA SCROLL      │", orange);
      console.log("%c│   >>> 木叶飞舞之处             │", orange);
      console.log("%c│   >>> 火亦生生不息             │", orange);
      console.log("%c└────────────────────────────────┘", orange);
      console.log("%c[NINJA] 忍术卷轴已展开", dim);
      console.log("%c[NINJA] Theme: Naruto Style", dim);
      console.log(
        "%c[NINJA] Chakra: " + "%c螺旋丸 READY",
        dim,
        blue,
      );
    }

    // ---- 侧边栏卡片入场动画 ----
    function animateSidebarCards() {
      var cards = document.querySelectorAll("#sidebar .card-widget");
      cards.forEach(function (card, index) {
        card.style.opacity = "0";
        card.style.transform = "translateX(20px)";
        card.style.transition = "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        setTimeout(
          function () {
            card.style.opacity = "1";
            card.style.transform = "translateX(0)";
          },
          150 * (index + 1),
        );
      });
    }

    // ---- 文章卡片入场动画 ----
    function animatePostCards() {
      var posts = document.querySelectorAll("#recent-posts .recent-post-item");
      posts.forEach(function (post, index) {
        post.style.opacity = "0";
        post.style.transform = "translateY(20px)";
        post.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        setTimeout(
          function () {
            post.style.opacity = "1";
            post.style.transform = "translateY(0)";
          },
          100 * (index + 1),
        );
      });
    }

    // ---- 打字机光标效果 ----
    function addTypingCursor() {
      var subtitle = document.querySelector("#site-info .site-subtitle");
      if (subtitle) {
        subtitle.style.borderRight = "2px solid #ff7500";
        subtitle.style.animation = "naruto-blink 1s step-end infinite";
      }
    }

    // ---- 木叶飘落 ----
    function initLeafFall() {
      // 检查是否为减少动画偏好
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // 移动端不飘叶
      if (window.innerWidth < 768) return;

      var leafCount = 8;
      for (var i = 0; i < leafCount; i++) {
        spawnLeaf(Math.random() * 100, 6 + Math.random() * 10);
      }
    }

    function spawnLeaf(leftVw, duration) {
      var leaf = document.createElement("div");
      leaf.className = "naruto-leaf";
      leaf.textContent = Math.random() > 0.5 ? "\uD83C\uDF43" : "\uD83C\uDF42";
      leaf.style.left = leftVw + "vw";
      leaf.style.animationDuration = duration + "s";
      leaf.style.animationDelay = Math.random() * 8 + "s";
      leaf.style.fontSize = 12 + Math.random() * 10 + "px";
      document.body.appendChild(leaf);
      // 动画结束后重新生成，保持循环
      leaf.addEventListener("animationend", function () {
        if (leaf.parentNode) leaf.parentNode.removeChild(leaf);
        spawnLeaf(Math.random() * 100, 6 + Math.random() * 10);
      });
    }

    // ---- 忍者点击特效：手里剑 + 螺旋丸 ----
    function initNinjaClickEffect() {
      // 注入点击效果所需的 CSS 动画
      if (!document.getElementById("naruto-click-style")) {
        var style = document.createElement("style");
        style.id = "naruto-click-style";
        style.textContent = [
          "@keyframes shuriken-fly{",
          "  0%{transform:translate(-50%,-50%) rotate(0deg) scale(0.3);opacity:1;}",
          "  100%{transform:translate(var(--sx),var(--sy)) rotate(720deg) scale(0.8);opacity:0;}",
          "}",
          "@keyframes rasengan-spin{",
          "  0%{transform:translate(-50%,-50%) scale(0) rotate(0deg);opacity:0.95;}",
          "  60%{transform:translate(-50%,-50%) scale(1) rotate(360deg);opacity:0.8;}",
          "  100%{transform:translate(-50%,-50%) scale(1.4) rotate(540deg);opacity:0;}",
          "}",
          "@keyframes rasengan-burst{",
          "  0%{transform:translate(-50%,-50%) scale(0.2);opacity:1;}",
          "  100%{transform:translate(-50%,-50%) scale(1.6);opacity:0;}",
          "}",
          "@keyframes chakra-ring{",
          "  0%{transform:translate(-50%,-50%) scale(0);opacity:0.8;}",
          "  100%{transform:translate(-50%,-50%) scale(1);opacity:0;}",
          "}",
          ".naruto-click-container{",
          "  position:fixed;top:0;left:0;width:100%;height:100%;",
          "  pointer-events:none;z-index:9999;overflow:hidden;",
          "}",
        ].join("\n");
        document.head.appendChild(style);
      }

      // 创建点击效果容器
      var container = document.createElement("div");
      container.className = "naruto-click-container";
      document.body.appendChild(container);

      document.addEventListener("click", function (e) {
        var x = e.clientX;
        var y = e.clientY;

        // 1) 手里剑连掷 - 三发手里剑呈扇形飞出
        createShuriken(x, y, -135, 90);
        createShuriken(x, y, -90, 110);
        createShuriken(x, y, -45, 90);

        // 2) 螺旋丸 - 蓝色查克拉球旋转爆发
        createRasengan(x, y);

        // 3) 查克拉冲击环
        createChakraRing(x, y);
      });
    }

    // 创建手里剑（SVG 四角星）
    function createShuriken(x, y, angleDeg, distance) {
      var container = document.querySelector(".naruto-click-container");
      if (!container) return;
      var rad = (angleDeg * Math.PI) / 180;
      var tx = Math.cos(rad) * distance - x;
      var ty = Math.sin(rad) * distance - y;

      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "28");
      svg.setAttribute("height", "28");
      svg.setAttribute("viewBox", "0 0 40 40");
      svg.style.cssText = [
        "position:absolute;",
        "left:" + x + "px;",
        "top:" + y + "px;",
        "pointer-events:none;",
        "filter:drop-shadow(0 0 4px rgba(255,117,0,0.6));",
        "animation:shuriken-fly 550ms cubic-bezier(0.2,0.6,0.4,1) forwards;",
      ].join("");
      svg.style.setProperty("--sx", tx + "px");
      svg.style.setProperty("--sy", ty + "px");

      // 四角星手里剑
      var star = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon",
      );
      star.setAttribute("points", "20,0 24,16 40,20 24,24 20,40 16,24 0,20 16,16");
      star.setAttribute("fill", "#2b2f3a");
      star.setAttribute("stroke", "#ff7500");
      star.setAttribute("stroke-width", "1.5");
      svg.appendChild(star);

      // 中心圆孔
      var hole = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      hole.setAttribute("cx", "20");
      hole.setAttribute("cy", "20");
      hole.setAttribute("r", "3");
      hole.setAttribute("fill", "#10131c");
      svg.appendChild(hole);

      container.appendChild(svg);
      setTimeout(function () {
        if (svg.parentNode) svg.parentNode.removeChild(svg);
      }, 600);
    }

    // 创建螺旋丸（蓝色查克拉球）
    function createRasengan(x, y) {
      var container = document.querySelector(".naruto-click-container");
      if (!container) return;

      var rasengan = document.createElement("div");
      rasengan.style.cssText = [
        "position:absolute;",
        "left:" + x + "px;",
        "top:" + y + "px;",
        "width:70px;",
        "height:70px;",
        "border-radius:50%;",
        "pointer-events:none;",
        "background:",
        "  radial-gradient(circle, rgba(255,255,255,0.95) 0%,",
        "    rgba(79,195,247,0.85) 25%,",
        "    rgba(41,152,217,0.5) 55%,",
        "    rgba(41,152,217,0) 75%);",
        "box-shadow:",
        "  0 0 20px rgba(79,195,247,0.8),",
        "  inset 0 0 15px rgba(255,255,255,0.6);",
        "animation:rasengan-spin 600ms ease-out forwards;",
      ].join("");
      container.appendChild(rasengan);

      // 内部螺旋纹
      var swirl = document.createElement("div");
      swirl.style.cssText = [
        "position:absolute;",
        "left:" + (x - 17) + "px;",
        "top:" + (y - 17) + "px;",
        "width:34px;",
        "height:34px;",
        "border-radius:50%;",
        "pointer-events:none;",
        "border:2px dashed rgba(255,255,255,0.8);",
        "animation:rasengan-spin 600ms ease-out forwards reverse;",
      ].join("");
      container.appendChild(swirl);

      setTimeout(function () {
        if (rasengan.parentNode) rasengan.parentNode.removeChild(rasengan);
        if (swirl.parentNode) swirl.parentNode.removeChild(swirl);
      }, 650);
    }

    // 查克拉冲击环
    function createChakraRing(x, y) {
      var container = document.querySelector(".naruto-click-container");
      if (!container) return;

      var ring = document.createElement("div");
      ring.style.cssText = [
        "position:absolute;",
        "left:" + x + "px;",
        "top:" + y + "px;",
        "width:100px;",
        "height:100px;",
        "border:1.5px solid rgba(79,195,247,0.6);",
        "border-radius:50%;",
        "pointer-events:none;",
        "box-shadow:0 0 8px rgba(79,195,247,0.4);",
        "animation:chakra-ring 500ms ease-out forwards;",
      ].join("");
      container.appendChild(ring);
      setTimeout(function () {
        if (ring.parentNode) ring.parentNode.removeChild(ring);
      }, 550);
    }

    // ---- 初始化所有效果 ----
    function init() {
      addUzumakiCorners();
      consoleNinjaBanner();
      animateSidebarCards();
      animatePostCards();
      addTypingCursor();
      initLeafFall();
      initNinjaClickEffect();
    }

    // 延迟执行确保页面完全加载
    if (document.readyState === "complete") {
      setTimeout(init, 300);
    } else {
      window.addEventListener("load", function () {
        setTimeout(init, 300);
      });
    }

    // Pjax 兼容
    document.addEventListener("pjax:complete", function () {
      setTimeout(init, 300);
    });
  });
})();
