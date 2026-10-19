// ============================================================
// CHỈNH SỬA TẠI ĐÂY: câu hỏi, thư và lời chúc trong hộp quà
// ============================================================
const questions = [
  { text: "Ngày 20/10 là dịp gì ở Việt Nam?", answers: ["Ngày Phụ nữ Việt Nam", "Ngày Nhà giáo Việt Nam", "Ngày Quốc tế Thiếu nhi"], correct: 0 },
  { text: "Loài hoa nào là cảm hứng cho khu vườn này?", answers: ["Hoa hướng dương", "Hoa sữa", "Hoa anh đào"], correct: 1 },
  { text: "Cậu có muốn mở món quà nhỏ này không?", answers: ["Có chứ!", "Không, để hôm khác", "Mình không tò mò đâu"], correct: 0 }
];

const letters = [
 {title:"Mong cậu luôn rực rỡ", message:"Chúc cậu luôn tự tin với chính mình, dũng cảm theo đuổi điều mình thích và tỏa sáng theo cách rất riêng. Cậu không cần trở thành ai khác để thật tuyệt vời."},
 {title:"Những ngày bình yên", message:"Mong những ngày sắp tới có thật nhiều niềm vui nhỏ: một buổi sáng dễ chịu, một bài hát hay, một tin nhắn đáng yêu và những người khiến cậu cảm thấy được là chính mình."},
 {title:"Luôn được yêu thương", message:"Chúc cậu luôn gặp được những người biết lắng nghe, trân trọng và đối xử dịu dàng với cậu. Và mong cậu cũng nhớ dành cho bản thân sự dịu dàng ấy nhé."},
 {title:"Ước mơ ở phía trước", message:"Chúc cậu đủ kiên nhẫn để đi từng bước nhỏ, đủ can đảm để thử điều mới và đủ tin tưởng để không bỏ cuộc chỉ vì một ngày chưa như ý."},
 {title:"Nụ cười thật tươi", message:"Mong nụ cười sẽ xuất hiện nhiều hơn những lần lo lắng. Chúc cậu có thể cười thật thoải mái, vui thật lòng và giữ lại thật nhiều kỷ niệm đẹp."},
 {title:"Một chút may mắn", message:"Chúc cậu gặp may trong những lúc cần nhất, gặp đúng người vào những thời điểm đẹp và luôn tìm thấy một lối đi ngay cả khi mọi thứ hơi rối ren."},
 {title:"Cậu là phiên bản duy nhất", message:"Không cần hoàn hảo, cũng không cần lúc nào cũng mạnh mẽ. Chỉ cần cậu vẫn là mình, vẫn học hỏi và vẫn tiến về phía trước — như thế đã đáng quý lắm rồi."},
 {title:"Ngày nào cũng đáng yêu", message:"Chúc cậu không chỉ có một ngày 20/10 thật vui mà còn có thật nhiều ngày bình thường cũng trở nên đặc biệt nhờ những điều giản dị và những người thương quý."},
 {title:"Điều ước bí mật", message:"Mong điều ước mà cậu vẫn âm thầm giữ trong lòng sẽ có cơ hội thành hiện thực. Chúc cậu luôn có hy vọng, có động lực và có người đồng hành khi cần."}
];

const giftMessage = "Nhân ngày 20/10, chúc cậu luôn xinh tươi theo cách riêng, mạnh mẽ khi cần và dịu dàng với chính mình. Mong mọi cố gắng của cậu đều được đền đáp, mọi nỗi buồn đều có ngày nhẹ lại, và mỗi ngày đều có ít nhất một điều khiến cậu mỉm cười. Cảm ơn vì đã làm thế giới này dễ thương hơn chỉ bằng sự hiện diện của cậu. Chúc cậu một ngày 20/10 thật ấm áp, bình yên và ngập tràn yêu thương. Nếu có thể gửi thêm một điều ước, mình mong những điều tốt đẹp sẽ luôn tìm đến cậu. ♡";

// ============================================================
// PHẦN TƯƠNG TÁC — không cần chỉnh khi chỉ đổi lời chúc
// ============================================================
const $ = s => document.querySelector(s);
let current = 0, locked = false;
const welcome = $("#welcome"), garden = $("#garden");
const answersBox = $("#answers"), feedback = $("#feedback"), progress = $("#progress");

function renderQuestion() {
  const q = questions[current];
  $("#stepLabel").textContent = `CÂU HỎI ${String(current+1).padStart(2,"0")} / ${String(questions.length).padStart(2,"0")}`;
  $("#question").textContent = q.text;
  progress.style.width = `${current/questions.length*100}%`;
  feedback.textContent = "Chọn câu trả lời của cậu nhé.";
  answersBox.innerHTML = "";
  q.answers.forEach((answer,i) => {
    const b = document.createElement("button");
    b.className = "answer";
    b.innerHTML = `<span class="letter-key">${String.fromCharCode(65+i)}</span><span></span>`;
    b.querySelector("span:last-child").textContent = answer;
    b.addEventListener("click", () => answerQuestion(i,b));
    answersBox.appendChild(b);
  });
}
function answerQuestion(i,button) {
  if (locked) return;
  if (i !== questions[current].correct) {
    locked = true;
    button.classList.add("wrong");
    feedback.textContent = "Có vẻ chưa đúng rồi… khu vườn vẫn khép cửa.";
    [...answersBox.children].forEach(b => b.disabled = true);
    setTimeout(() => { $("#endDialog").classList.remove("hidden"); }, 550);
    return;
  }
  locked = true; button.classList.add("correct");
  [...answersBox.children].forEach(b => b.disabled = true);
  feedback.textContent = ["Đúng rồi, cậu tinh ý lắm! ✧","Chính xác! Khu vườn đang chờ cậu. ❀","Tất cả đã sẵn sàng, chào mừng cậu ♡"][current] || "Tuyệt lắm!";
  progress.style.width = `${(current+1)/questions.length*100}%`;
  setTimeout(() => {
    current++;
    if (current >= questions.length) {
      welcome.classList.add("hidden"); garden.classList.remove("hidden");
      renderLetters(); confettiBurst(innerWidth*.5,innerHeight*.4,65);
    } else { locked = false; renderQuestion(); }
  }, 650);
}

function renderLetters() {
  const layer = $("#letterLayer"); layer.innerHTML = "";
  // Vị trí theo phần trăm trong vùng cây; tinh chỉnh được nếu thay ảnh nền.
  const positions = [
    [27,27],[38,17],[49,23],[61,16],[71,28],
    [22,42],[37,39],[58,39],[72,44]
  ];
  letters.forEach((letter,i) => {
    const b = document.createElement("button");
    b.className = "hanging-letter";
    b.style.left = `${positions[i][0]}%`; b.style.top = `${positions[i][1]}%`;
    b.style.animationDelay = `${-i*.47}s`;
    b.setAttribute("aria-label",`Mở lá thư số ${i+1}`);
    b.innerHTML = '<span class="string"></span><span class="envelope"></span><span class="seal">♡</span><span class="letter-index">THƯ '+String(i+1).padStart(2,"0")+'</span>';
    b.addEventListener("click", () => {
      $("#letterTitle").textContent = letter.title;
      $("#letterBody").textContent = letter.message;
      $("#letterCount").textContent = `LÁ THƯ ${String(i+1).padStart(2,"0")} / ${String(letters.length).padStart(2,"0")}`;
      $("#letterDialog").classList.remove("hidden"); confettiBurst(innerWidth*.5,innerHeight*.45,24);
    });
    layer.appendChild(b);
  });
}
$("#gift").addEventListener("click", () => {
  $("#giftBody").textContent = giftMessage;
  $("#giftDialog").classList.remove("hidden"); confettiBurst(innerWidth*.5,innerHeight*.68,55);
});
document.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click",() => $("#"+b.dataset.close).classList.add("hidden")));
document.querySelectorAll(".overlay").forEach(overlay => overlay.addEventListener("click",e => { if(e.target===overlay && overlay.id!=="endDialog") overlay.classList.add("hidden"); }));
$("#closeGift").addEventListener("click",() => $("#giftDialog").classList.add("hidden"));
$("#endButton").addEventListener("click",() => { $("#endDialog").classList.add("hidden"); welcome.classList.add("hidden"); garden.classList.add("hidden"); document.body.innerHTML='<main class="farewell"><div class="overline">THANK YOU FOR VISITING</div><h1>Hẹn gặp lại <em>cậu nhé ♡</em></h1><p>Cảm ơn cậu đã ghé qua khu vườn nhỏ này.</p></main>'; });
renderQuestion();

// Canvas particles: hoa sữa trắng, lá xanh, bụi sáng và cánh hoa rơi.
const canvas=$("#sky"),ctx=canvas.getContext("2d");let W,H,particles=[];
function resize(){const dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;canvas.style.width=W+"px";canvas.style.height=H+"px";ctx.setTransform(dpr,0,0,dpr,0,0);}
function particle(initial=false){return {x:Math.random()*W,y:initial?Math.random()*H:-15,size:2+Math.random()*4,vy:.35+Math.random()*1.05,vx:(Math.random()-.5)*.7,rot:Math.random()*6.28,spin:(Math.random()-.5)*.025,type:Math.random()<.58?"flower":Math.random()<.7?"leaf":"glow",alpha:.35+Math.random()*.55};}
function paint(p){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.globalAlpha=p.alpha;
 if(p.type==="flower"){ctx.fillStyle="#fff6e5";for(let i=0;i<5;i++){ctx.rotate(6.283/5);ctx.beginPath();ctx.ellipse(0,-p.size*.7,p.size*.38,p.size*.72,0,0,6.283);ctx.fill();}ctx.fillStyle="#f1c77e";ctx.beginPath();ctx.arc(0,0,p.size*.22,0,6.283);ctx.fill();}
 else if(p.type==="leaf"){ctx.fillStyle="#a9d2ad";ctx.beginPath();ctx.ellipse(0,0,p.size*.42,p.size,0,0,6.283);ctx.fill();ctx.strokeStyle="#e4f2dc";ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(0,-p.size*.7);ctx.lineTo(0,p.size*.7);ctx.stroke();}
 else{ctx.fillStyle="#ffedc5";ctx.beginPath();ctx.arc(0,0,p.size*.45,0,6.283);ctx.fill();}
 ctx.restore();}
function animate(){ctx.clearRect(0,0,W,H);for(let i=0;i<particles.length;i++){const p=particles[i];p.y+=p.vy;p.x+=p.vx+Math.sin(p.y*.012)*.28;p.rot+=p.spin;paint(p);if(p.y>H+20)particles[i]=particle();}requestAnimationFrame(animate);}
function confettiBurst(x,y,count){const bits=Array.from({length:count},()=>({x,y,vx:(Math.random()-.5)*6,vy:(Math.random()-.8)*6,life:0,size:2+Math.random()*3,color:["#f5b4d0","#a6dff0","#fff0cf","#c5e2c1"][Math.floor(Math.random()*4)]}));function frame(){bits.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.07;p.life++;ctx.globalAlpha=Math.max(0,1-p.life/65);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,6.283);ctx.fill();});ctx.globalAlpha=1;if(bits.some(p=>p.life<65))requestAnimationFrame(frame);}frame();}
resize();particles=Array.from({length:innerWidth<600?34:68},()=>particle(true));animate();addEventListener("resize",resize);addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".overlay").forEach(o=>o.classList.add("hidden"));});
