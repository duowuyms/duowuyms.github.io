// eVTA0 project page interactions: demo tabs, paired playback,
// real-world result split toggle, BibTeX copy, figure zoom dialog.

(function () {
  "use strict";

  /* ---------- Demo tabs ---------- */
  var DEMOS = {
    "position-a": {
      instruction: "Put the shuttlecock from the table onto the shuttlecock in the plate.",
      caption: "SFT (left): reaches for the trained position and never touches the shifted shuttlecock. eVTA\u2080-RLER (right): adjusts the reach to the new position, grasps the shuttlecock, and places it onto the one in the plate. Played at 3\u00d7 speed.",
      sft: "shuttlecock-position-a",
      rler: "shuttlecock-position-a"
    },
    "position-b": {
      instruction: "Put the shuttlecock from the table onto the shuttlecock in the plate.",
      caption: "SFT (left): heads to where the shuttlecock used to be and closes on empty space. eVTA\u2080-RLER (right): locates the shifted target, reaches for it, and completes the placement. Played at 3\u00d7 speed.",
      sft: "shuttlecock-position-b",
      rler: "shuttlecock-position-b"
    },
    "distance": {
      instruction: "Pick up the carrot on the moving conveyor and place it on the plate.",
      caption: "SFT (left): stops short of the carrot at the workspace edge and fails to grasp. eVTA\u2080-RLER (right): extends to the target, grasps the carrot, and places it on the plate. Played at 3\u00d7 speed.",
      sft: "conveyor-distance",
      rler: "conveyor-distance"
    },
    "rotation": {
      instruction: "Pick up the carrot on the moving conveyor and place it on the plate.",
      caption: "SFT (left): fails to align its grasp with the rotated carrot. eVTA\u2080-RLER (right): adapts the approach to the new orientation, grasps, and completes the placement. Played at 3\u00d7 speed.",
      sft: "conveyor-rotation",
      rler: "conveyor-rotation"
    }
  };

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".demo-tabs button"));
  var panel = document.getElementById("demo-panel");
  var videoSft = document.getElementById("video-sft");
  var videoRler = document.getElementById("video-rler");
  var instruction = document.getElementById("demo-instruction");
  var demoCaption = document.getElementById("demo-caption");
  var status = document.getElementById("video-status");

  function setSource(video, name) {
    var source = video.querySelector("source");
    source.setAttribute("src", "assets/videos/" + name + ".mp4");
    video.setAttribute("poster", "assets/posters/" + name + ".webp");
    video.load();
  }

  function selectTab(tab) {
    tabs.forEach(function (t) {
      var selected = t === tab;
      t.setAttribute("aria-selected", selected ? "true" : "false");
      t.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", tab.id);
    var d = DEMOS[tab.getAttribute("data-demo")];
    instruction.textContent = d.instruction;
    if (demoCaption) { demoCaption.textContent = d.caption; }
    setSource(videoSft, d.sft + "-sft");
    setSource(videoRler, d.rler + "-rler");
    if (status) { status.textContent = "Showing comparison for " + tab.textContent.trim(); }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () { selectTab(tab); });
    tab.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(tab);
      var target = null;
      if (e.key === "ArrowRight") target = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") target = tabs[(i - 1 + tabs.length) % tabs.length];
      if (target) { e.preventDefault(); target.focus(); selectTab(target); }
    });
  });

  /* ---------- Paired playback ---------- */
  var playButton = document.getElementById("play-pair");
  var replayButton = document.getElementById("replay-pair");
  function playBoth() {
    [videoSft, videoRler].forEach(function (v) {
      v.currentTime = 0;
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    });
  }
  if (playButton) playButton.addEventListener("click", playBoth);
  if (replayButton) replayButton.addEventListener("click", playBoth);

  /* ---------- Real-world split toggle ---------- */
  var SPLITS = {
    ood: {
      carrot:   ["32.0%", "40.0%", "68.0%", "48.0%", "+36 pp"],
      shuttlecock: ["45.0%", "60.0%", "80.0%", "65.0%", "+35 pp"],
      description: "Evaluation under real-world distribution shifts in object distance, pose, position, and appearance.",
      caption: "Evaluated under unseen object configurations (25 trials for Pick Carrot and 20 for Put Shuttlecock), RLER Round 2 consistently outperforms the fixed eVTA\u2080 baseline trained with the same rollout budget, achieving +15\u201320 pp improvement under OOD scenarios."
    },
    total: {
      carrot:   ["64.0%", "70.0%", "84.0%", "72.0%", "+20 pp"],
      shuttlecock: ["60.0%", "76.0%", "86.0%", "78.0%", "+26 pp"],
      description: "Evaluation across all 50 real-world trials per task, combining in-distribution and out-of-distribution conditions.",
      caption: "Across 50 trials per task, RLER improves real-world success rates by 20\u201326 pp over the initial SFT policies and by 8\u201312 pp over the fixed eVTA\u2080 baseline under matched data and optimization budgets."
    },
    id: {
      carrot:   ["96.0%", "100.0%", "100.0%", "96.0%", "+4 pp"],
      shuttlecock: ["70.0%", "86.7%", "90.0%", "86.7%", "+20 pp"],
      description: "Evaluation under the in-distribution configurations of each real-world task.",
      caption: "In-distribution trials per task: 25 for Pick Carrot, 30 for Put Shuttlecock. RLER Round 2 reaches 100% (25/25) and 90% (27/30) on the two tasks."
    }
  };
  var toggleButtons = Array.prototype.slice.call(document.querySelectorAll(".split-toggle button"));
  var splitDescription = document.getElementById("split-description");
  var splitCaption = document.getElementById("split-caption");
  toggleButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      toggleButtons.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      var s = SPLITS[btn.getAttribute("data-split")];
      ["carrot", "shuttlecock"].forEach(function (task) {
        var cells = document.querySelectorAll('tr[data-task="' + task + '"] td');
        s[task].forEach(function (val, i) { cells[i].textContent = val; });
      });
      splitDescription.textContent = s.description;
      splitCaption.textContent = s.caption;
    });
  });

  /* ---------- BibTeX copy ---------- */
  var copyButton = document.getElementById("copy-bibtex");
  var copyStatus = document.getElementById("copy-status");
  if (copyButton) {
    copyButton.addEventListener("click", function () {
      var text = document.getElementById("bibtex-code").textContent;
      function done(ok) {
        copyStatus.textContent = ok ? "Copied to clipboard." : "Copy failed — please select and copy manually.";
        setTimeout(function () { copyStatus.textContent = ""; }, 2600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else {
        var ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { done(document.execCommand("copy")); } catch (e) { done(false); }
        document.body.removeChild(ta);
      }
    });
  }

  /* ---------- Figure zoom dialog ---------- */
  var dialog = document.getElementById("figure-dialog");
  var enlarged = document.getElementById("enlarged-figure");
  var dialogCaption = document.getElementById("figure-dialog-caption");
  var originalLink = document.getElementById("original-figure-link");
  var closeButton = document.getElementById("close-figure");
  document.querySelectorAll(".zoomable").forEach(function (z) {
    z.addEventListener("click", function () {
      var img = z.querySelector("img");
      enlarged.setAttribute("src", img.getAttribute("src"));
      enlarged.setAttribute("alt", img.getAttribute("alt") || "");
      dialogCaption.textContent = z.getAttribute("data-caption") || "";
      originalLink.setAttribute("href", img.getAttribute("src"));
      if (typeof dialog.showModal === "function") dialog.showModal();
      else window.open(img.getAttribute("src"), "_blank");
    });
  });
  if (closeButton) closeButton.addEventListener("click", function () { dialog.close(); });
  if (dialog) dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && dialog.open) dialog.close();
  });
})();
