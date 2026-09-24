/* ====================================
   MECHA TECH - 科技机甲风格交互脚本
   ==================================== */

(function () {
  "use strict";

  // 等待 DOM 加载完成
  document.addEventListener("DOMContentLoaded", function () {
    // ---- 机甲角标装饰 ----
    function addMechaCorners() {
      var widgets = document.querySelectorAll(
        "#recent-posts .recent-post-item, #sidebar .card-widget",
      );
      widgets.forEach(function (el) {
        el.classList.add("mecha-corner");
      });
    }

    // ---- 导航栏扫描线效果 ----
    function addNavScanline() {
      var nav = document.getElementById("nav");
      if (!nav) return;
      var scanline = document.createElement("div");
      scanline.style.cssText =
        "position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;";
      var line = document.createElement("div");
      line.style.cssText =
        "position:absolute;top:-100%;left:0;width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(0,229,255,0.3),transparent);animation:navScan 4s linear infinite;";
      scanline.appendChild(line);
      nav.style.position = "relative";
      nav.appendChild(scanline);

      // 添加动画
      if (!document.getElementById("mecha-nav-scan-style")) {
        var style = document.createElement("style");
        style.id = "mecha-nav-scan-style";
        style.textContent = "@keyframes navScan{0%{top:-100%}100%{top:200%}}";
        document.head.appendChild(style);
      }
    }

    // ---- 文章卡片悬停数据流效果 ----
    function addDataFlowEffect() {
      var items = document.querySelectorAll("#recent-posts .recent-post-item");
      items.forEach(function (item) {
        item.addEventListener("mouseenter", function () {
          this.style.setProperty("--flow-opacity", "1");
        });
        item.addEventListener("mouseleave", function () {
          this.style.setProperty("--flow-opacity", "0");
        });
      });
    }

    // ---- 控制台输出机甲风格信息 ----
    function consoleMechaBanner() {
      var cyan = "color:#00e5ff;font-weight:bold;";
      var dim = "color:#7c8ea6;";
      var orange = "color:#ff6e40;font-weight:bold;";
      console.log("%c╔══════════════════════════════════════╗", cyan);
      console.log("%c║   MECHA TECH SYSTEM v1.0            ║", cyan);
      console.log("%c║   >>> SYSTEM ONLINE                 ║", cyan);
      console.log("%c║   >>> ALL MODULES LOADED            ║", cyan);
      console.log("%c╚══════════════════════════════════════╝", cyan);
      console.log("%c[MECHA] Core initialized", dim);
      console.log("%c[MECHA] Theme: Cyberpunk Mecha", dim);
      console.log("%c[MECHA] Status: " + "%cONLINE", dim, orange);
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
        subtitle.style.borderRight = "2px solid #00e5ff";
        subtitle.style.animation = "mecha-blink 1s step-end infinite";
      }
    }

    // ---- 科技感点击效果 ----
    function initMechaClickEffect() {
      // 注入点击效果所需的 CSS 动画
      if (!document.getElementById("mecha-click-style")) {
        var style = document.createElement("style");
        style.id = "mecha-click-style";
        style.textContent = [
          "@keyframes mecha-ring-expand{",
          "  0%{transform:translate(-50%,-50%) scale(0);opacity:1;}",
          "  100%{transform:translate(-50%,-50%) scale(1);opacity:0;}",
          "}",
          "@keyframes mecha-ring-2{",
          "  0%{transform:translate(-50%,-50%) scale(0);opacity:0.7;}",
          "  100%{transform:translate(-50%,-50%) scale(1);opacity:0;}",
          "}",
          "@keyframes mecha-particle-fly{",
          "  0%{transform:translate(0,0) scale(1);opacity:1;}",
          "  100%{opacity:0;}",
          "}",
          "@keyframes mecha-crosshair-spin{",
          "  0%{transform:translate(-50%,-50%) rotate(0deg) scale(0.3);opacity:1;}",
          "  100%{transform:translate(-50%,-50%) rotate(90deg) scale(1);opacity:0;}",
          "}",
          "@keyframes mecha-hex-pulse{",
          "  0%{transform:translate(-50%,-50%) scale(0);opacity:0.8;}",
          "  50%{opacity:0.4;}",
          "  100%{transform:translate(-50%,-50%) scale(1);opacity:0;}",
          "}",
        ].join("\n");
        document.head.appendChild(style);
      }

      // 创建点击效果容器
      var container = document.createElement("div");
      container.id = "mecha-click-container";
      container.style.cssText =
        "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;";
      document.body.appendChild(container);

      document.addEventListener("click", function (e) {
        var x = e.clientX;
        var y = e.clientY;

        // 1) 主冲击波环 - 青色扩散环
        createRing(x, y, 80, "1.5px", "#00e5ff", "mecha-ring-expand", 600);
        // 2) 第二层冲击波环 - 稍大、稍慢
        setTimeout(function () {
          createRing(
            x,
            y,
            120,
            "1px",
            "rgba(0,229,255,0.5)",
            "mecha-ring-2",
            700,
          );
        }, 80);
        // 3) 第三层极细环
        setTimeout(function () {
          createRing(
            x,
            y,
            50,
            "0.5px",
            "rgba(0,229,255,0.8)",
            "mecha-ring-expand",
            400,
          );
        }, 40);

        // 4) 十字准星旋转
        createCrosshair(x, y);

        // 5) 数据粒子爆散
        createParticles(x, y, 10);

        // 6) 六边形脉冲
        createHexPulse(x, y);
      });
    }

    // 创建扩散环
    function createRing(x, y, size, border, color, anim, duration) {
      var container = document.getElementById("mecha-click-container");
      if (!container) return;
      var ring = document.createElement("div");
      ring.style.cssText = [
        "position:absolute;",
        "left:" + x + "px;",
        "top:" + y + "px;",
        "width:" + size + "px;",
        "height:" + size + "px;",
        "border:" + border + " solid " + color + ";",
        "border-radius:50%;",
        "box-shadow:0 0 6px " + color + ", inset 0 0 6px " + color + ";",
        "animation:" +
          anim +
          " " +
          duration +
          "ms cubic-bezier(0.25,0.46,0.45,0.94) forwards;",
        "pointer-events:none;",
      ].join("");
      container.appendChild(ring);
      setTimeout(function () {
        if (ring.parentNode) ring.parentNode.removeChild(ring);
      }, duration + 50);
    }

    // 创建十字准星
    function createCrosshair(x, y) {
      var container = document.getElementById("mecha-click-container");
      if (!container) return;
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "40");
      svg.setAttribute("height", "40");
      svg.setAttribute("viewBox", "0 0 40 40");
      svg.style.cssText = [
        "position:absolute;",
        "left:" + x + "px;",
        "top:" + y + "px;",
        "animation:mecha-crosshair-spin 500ms ease-out forwards;",
        "pointer-events:none;",
        "filter:drop-shadow(0 0 3px rgba(0,229,255,0.6));",
      ].join("");
      // 四条准星线
      var lines = [
        { x1: 20, y1: 2, x2: 20, y2: 10 },
        { x1: 20, y1: 30, x2: 20, y2: 38 },
        { x1: 2, y1: 20, x2: 10, y2: 20 },
        { x1: 30, y1: 20, x2: 38, y2: 20 },
      ];
      lines.forEach(function (l) {
        var line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        line.setAttribute("x1", l.x1);
        line.setAttribute("y1", l.y1);
        line.setAttribute("x2", l.x2);
        line.setAttribute("y2", l.y2);
        line.setAttribute("stroke", "#00e5ff");
        line.setAttribute("stroke-width", "1.5");
        svg.appendChild(line);
      });
      // 中心小圆
      var circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      circle.setAttribute("cx", "20");
      circle.setAttribute("cy", "20");
      circle.setAttribute("r", "3");
      circle.setAttribute("fill", "none");
      circle.setAttribute("stroke", "#00e5ff");
      circle.setAttribute("stroke-width", "1");
      svg.appendChild(circle);
      container.appendChild(svg);
      setTimeout(function () {
        if (svg.parentNode) svg.parentNode.removeChild(svg);
      }, 550);
    }

    // 创建数据粒子
    function createParticles(x, y, count) {
      var container = document.getElementById("mecha-click-container");
      if (!container) return;
      for (var i = 0; i < count; i++) {
        var particle = document.createElement("div");
        var angle = ((Math.PI * 2) / count) * i + (Math.random() - 0.5) * 0.5;
        var distance = 30 + Math.random() * 50;
        var tx = Math.cos(angle) * distance;
        var ty = Math.sin(angle) * distance;
        var size = 2 + Math.random() * 3;
        var duration = 400 + Math.random() * 300;
        // 随机选择粒子样式：小方块或小线段
        var isLine = Math.random() > 0.5;
        var color = Math.random() > 0.3 ? "#00e5ff" : "#ff6e40";
        particle.style.cssText = [
          "position:absolute;",
          "left:" + x + "px;",
          "top:" + y + "px;",
          "width:" + (isLine ? 1 : size) + "px;",
          "height:" + (isLine ? size + 4 : size) + "px;",
          "background:" + color + ";",
          "box-shadow:0 0 4px " + color + ";",
          "border-radius:" + (isLine ? "0" : "50%") + ";",
          "pointer-events:none;",
          "animation:mecha-particle-fly " + duration + "ms ease-out forwards;",
        ].join("");
        // 用 CSS 变量传递位移
        particle.style.setProperty("--tx", tx + "px");
        particle.style.setProperty("--ty", ty + "px");
        // 内联关键帧（每个粒子方向不同）
        var particleAnim = "mecha-p-" + Date.now() + "-" + i;
        var keyframes = [
          "@keyframes " + particleAnim + "{",
          "  0%{transform:translate(0,0) scale(1);opacity:1;}",
          "  100%{transform:translate(" +
            tx +
            "px," +
            ty +
            "px) scale(0.3);opacity:0;}",
          "}",
        ].join("\n");
        var styleEl = document.createElement("style");
        styleEl.textContent = keyframes;
        document.head.appendChild(styleEl);
        particle.style.animation =
          particleAnim + " " + duration + "ms ease-out forwards";
        container.appendChild(particle);
        (function (p, s, d) {
          setTimeout(function () {
            if (p.parentNode) p.parentNode.removeChild(p);
            if (s.parentNode) s.parentNode.removeChild(s);
          }, d + 50);
        })(particle, styleEl, duration);
      }
    }

    // 创建六边形脉冲
    function createHexPulse(x, y) {
      var container = document.getElementById("mecha-click-container");
      if (!container) return;
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "60");
      svg.setAttribute("height", "52");
      svg.setAttribute("viewBox", "0 0 60 52");
      svg.style.cssText = [
        "position:absolute;",
        "left:" + x + "px;",
        "top:" + y + "px;",
        "animation:mecha-hex-pulse 600ms ease-out forwards;",
        "pointer-events:none;",
        "filter:drop-shadow(0 0 4px rgba(0,229,255,0.4));",
      ].join("");
      var polygon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon",
      );
      // 六边形顶点
      polygon.setAttribute("points", "30,1 58,14 58,38 30,51 2,38 2,14");
      polygon.setAttribute("fill", "none");
      polygon.setAttribute("stroke", "#00e5ff");
      polygon.setAttribute("stroke-width", "1");
      polygon.setAttribute("opacity", "0.6");
      svg.appendChild(polygon);
      container.appendChild(svg);
      setTimeout(function () {
        if (svg.parentNode) svg.parentNode.removeChild(svg);
      }, 650);
    }

    // ---- 初始化所有效果 ----
    function init() {
      addMechaCorners();
      addNavScanline();
      addDataFlowEffect();
      consoleMechaBanner();
      animateSidebarCards();
      animatePostCards();
      addTypingCursor();
      initMechaClickEffect();
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
