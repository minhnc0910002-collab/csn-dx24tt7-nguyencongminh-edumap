let map, infoWindow, markers = [], userMarker = null, selectedSchool = null;

const schools = [
  {id:1,name:"Trường Mầm non Hoa Sen",level:"Mầm non",address:"Phường Trấn Biên, Thành phố Đồng Nai",lat:10.9508,lng:106.8171,phone:"0251 0000 0001"},
  {id:2,name:"Trường Tiểu học Nguyễn Du",level:"Tiểu học",address:"Phường Quyết Thắng, Thành phố Đồng Nai",lat:10.9520,lng:106.8225,phone:"0251 0000 0002"},
  {id:3,name:"Trường THCS Trần Văn Ơn",level:"THCS",address:"Phường Tam Hiệp, Thành phố Đồng Nai",lat:10.9485,lng:106.8300,phone:"0251 0000 0003"},
  {id:4,name:"Trường THPT Ngô Quyền",level:"THPT",address:"Phường Trung Dũng, Thành phố Đồng Nai",lat:10.9550,lng:106.8180,phone:"0251 0000 0004"},
  {id:5,name:"Cao đẳng Mỹ thuật trang trí Đồng Nai",level:"Cao đẳng",address:"Phường Trung Dũng, Thành phố Đồng Nai",lat:10.9535,lng:106.8250,phone:"0251 0000 0005"},
  {id:6,name:"Đại học Đồng Nai",level:"Đại học",address:"Phường Tân Hiệp, Thành phố Đồng Nai",lat:10.9600,lng:106.8350,phone:"0251 0000 0006"}
];

function initMap(){
  map = new google.maps.Map(document.getElementById("map"), {
    center: APP_CONFIG.defaultCenter,
    zoom: APP_CONFIG.defaultZoom,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true
  });
  infoWindow = new google.maps.InfoWindow();
  render();
}

function filteredSchools(){
  const q = document.getElementById("search").value.trim().toLowerCase();
  const level = document.getElementById("level").value;
  return schools.filter(s => (!level || s.level === level) &&
    (!q || `${s.name} ${s.address} ${s.level}`.toLowerCase().includes(q)));
}

function clearMarkers(){
  markers.forEach(m => m.setMap(null));
  markers = [];
}

function render(){
  clearMarkers();
  const data = filteredSchools();
  document.getElementById("resultCount").textContent = `Tìm thấy ${data.length} cơ sở giáo dục`;
  const list = document.getElementById("schoolList");
  list.innerHTML = "";
  data.forEach(s => {
    const marker = new google.maps.Marker({
      map, position:{lat:s.lat,lng:s.lng}, title:s.name
    });
    marker.addListener("click", () => showSchool(s));
    markers.push(marker);

    const card = document.createElement("div");
    card.className = "school-card";
    card.innerHTML = `<h3>${escapeHtml(s.name)}</h3>
      <span class="tag">${escapeHtml(s.level)}</span>
      <p>📍 ${escapeHtml(s.address)}</p>`;
    card.onclick = () => { map.panTo({lat:s.lat,lng:s.lng}); map.setZoom(16); showSchool(s); };
    list.appendChild(card);
  });
}

function showSchool(s){
  selectedSchool = s;
  map.panTo({lat:s.lat,lng:s.lng});
  map.setZoom(16);
  document.getElementById("detailContent").innerHTML = `
    <h2>${escapeHtml(s.name)}</h2>
    <p><b>Cấp học:</b> ${escapeHtml(s.level)}</p>
    <p><b>Địa chỉ:</b> ${escapeHtml(s.address)}</p>
    <p><b>Điện thoại:</b> ${escapeHtml(s.phone)}</p>
    <div class="actions">
      <button class="street" onclick="openStreetView()">👁 Street View</button>
      <button class="primary" onclick="getDirections()">🧭 Chỉ đường</button>
    </div>
    <div id="streetView" class="street-view"></div>`;
  document.getElementById("detail").classList.remove("hidden");
}

function openStreetView(){
  if(!selectedSchool) return;
  const el = document.getElementById("streetView");
  el.style.display = "block";
  const panorama = new google.maps.StreetViewPanorama(el, {
    position:{lat:selectedSchool.lat,lng:selectedSchool.lng},
    pov:{heading:0,pitch:0},
    zoom:1,
    addressControl:true,
    fullscreenControl:true
  });
  new google.maps.StreetViewService().getPanorama(
    {location:{lat:selectedSchool.lat,lng:selectedSchool.lng}, radius:100},
    (data,status)=>{
      if(status !== "OK") el.innerHTML = `<div style="padding:20px">Không tìm thấy ảnh Street View gần vị trí này.</div>`;
    }
  );
}

function getDirections(){
  if(!selectedSchool) return;
  const destination = encodeURIComponent(`${selectedSchool.lat},${selectedSchool.lng}`);
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      const origin = `${pos.coords.latitude},${pos.coords.longitude}`;
      window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`,"_blank");
    },()=>{
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`,"_blank");
    });
  } else {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`,"_blank");
  }
}

document.getElementById("search").addEventListener("input", render);
document.getElementById("level").addEventListener("change", render);
document.getElementById("closeDetail").addEventListener("click",()=>document.getElementById("detail").classList.add("hidden"));

document.getElementById("locateBtn").addEventListener("click",()=>{
  if(!navigator.geolocation) return alert("Trình duyệt không hỗ trợ định vị.");
  navigator.geolocation.getCurrentPosition(pos=>{
    const p={lat:pos.coords.latitude,lng:pos.coords.longitude};
    map.panTo(p); map.setZoom(15);
    if(userMarker) userMarker.setMap(null);
    userMarker=new google.maps.Marker({map,position:p,title:"Vị trí của bạn",icon:"https://maps.google.com/mapfiles/ms/icons/blue-dot.png"});
  },()=>alert("Không thể lấy vị trí. Hãy cấp quyền định vị cho trình duyệt."));
});

function escapeHtml(v){
  return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}
