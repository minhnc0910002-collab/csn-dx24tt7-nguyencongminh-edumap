let map = null;
let markers = [];
let userMarker = null;
let selectedSchool = null;

const schools = [
  {
    "id": 1,
    "name": "Trường Mầm non Hoa Sen",
    "level": "Mầm non",
    "address": "510 Đ. Đồng Khởi, Tam Hiệp, Thành phố Đồng Nai",
    "province": "Thành phố Đồng Nai",
    "lat": 10.958297,
    "lng": 106.857833,
    "phone": "02513822962"
  },
  {
    "id": 2,
    "name": "Trường Tiểu học Nguyễn Huệ",
    "level": "Tiểu học",
    "address": "XW73+P5M, Ngô Sỹ Liên, Long Bình, Thành phố Đồng Nai",
    "province": "Thành phố Đồng Nai",
    "lat": 10.964344,
    "lng": 106.902924,
    "phone": "0613881591"
  },
  {
    "id": 3,
    "name": "Trường THCS Trần Hưng Đạo",
    "level": "THCS",
    "address": "372 Ba Mươi Tháng Tư, Trấn Biên, Thành phố Đồng Nai",
    "province": "Thành phố Đồng Nai",
    "lat": 10.955763,
    "lng": 106.828267,
    "phone": "02513822039"
  },
  {
    "id": 4,
    "name": "Trường THPT Ngô Quyền",
    "level": "THPT",
    "address": "XR3G+MG8, 61 Ba Mươi Tháng Tư, Khu phố 2, Trấn Biên, Thành phố Đồng Nai",
    "province": "Thành phố Đồng Nai",
    "lat": 10.954195,
    "lng": 106.826022,
    "phone": "02513829029"
  },
  {
    "id": 5,
    "name": "Trường Cao đẳng FPT Polytechnic cơ sở Đồng Nai",
    "level": "Cao đẳng",
    "address": "193 Đỗ Văn Thi, phường Trấn Biên, Thành phố Đồng Nai",
    "province": "Thành phố Đồng Nai",
    "lat": 10.937691,
    "lng": 106.834898,
    "phone": "0345690031"
  },
  {
    "id": 6,
    "name": "Trường Đại học Lạc Hồng",
    "level": "Đại học",
    "address": "10 Huỳnh Văn Nghệ, Trấn Biên, Đồng Nai, Việt Nam",
    "province": "Đồng Nai",
    "lat": 10.953035,
    "lng": 106.802255,
    "phone": "0941731973"
  }
];

function initMap() {
  if (!window.google || !google.maps) {
    const box = document.getElementById("mapsError");
    if (box) { box.classList.remove("hidden"); box.textContent = "Google Maps API chưa sẵn sàng."; }
    return;
  }
  map = new google.maps.Map(document.getElementById("map"), {
    center: APP_CONFIG.defaultCenter,
    zoom: APP_CONFIG.defaultZoom,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    mapTypeId: "roadmap"
  });

  render();
}

function filteredSchools() {
  const q = document.getElementById("search").value.trim().toLowerCase();
  const level = document.getElementById("level").value;

  return schools.filter(s => {
    const text = `${s.name} ${s.address} ${s.level} ${s.phone}`.toLowerCase();
    return (!q || text.includes(q)) && (!level || s.level === level);
  });
}

function clearMarkers() {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
}

function render() {
  clearMarkers();

  const data = filteredSchools();
  document.getElementById("resultCount").textContent =
    `Tìm thấy ${data.length} / ${schools.length} cơ sở giáo dục`;

  const list = document.getElementById("schoolList");
  list.innerHTML = "";

  if (!data.length) {
    list.innerHTML = '<div class="empty">Không tìm thấy cơ sở giáo dục phù hợp.</div>';
    return;
  }

  data.forEach(school => {
    const marker = new google.maps.Marker({
      map,
      position: { lat: school.lat, lng: school.lng },
      title: school.name
    });

    marker.addListener("click", () => showSchool(school));
    markers.push(marker);

    const card = document.createElement("article");
    card.className = "school-card";
    card.innerHTML = `
      <span class="tag">${escapeHtml(school.level)}</span>
      <h3>${escapeHtml(school.name)}</h3>
      <p>📍 ${escapeHtml(school.address)}</p>
      <p>☎ ${escapeHtml(school.phone || "Chưa cập nhật")}</p>
    `;
    card.addEventListener("click", () => showSchool(school));
    list.appendChild(card);
  });
}

function showSchool(school) {
  selectedSchool = school;
  const position = { lat: school.lat, lng: school.lng };

  map.panTo(position);
  map.setZoom(16);

  document.getElementById("detailContent").innerHTML = `
    <div class="detail-head">
      <span class="tag">${escapeHtml(school.level)}</span>
      <h2>${escapeHtml(school.name)}</h2>
    </div>
    <p><strong>Địa chỉ:</strong> ${escapeHtml(school.address)}</p>
    <p><strong>Điện thoại:</strong> ${escapeHtml(school.phone || "Chưa cập nhật")}</p>
    <p><strong>Tọa độ:</strong> ${school.lat}, ${school.lng}</p>

    <div class="actions">
      <button class="street" onclick="openStreetView()">👁 Xem Street View</button>
      <button class="primary" onclick="getDirections()">🧭 Chỉ đường</button>
    </div>

    <div id="streetView" class="street-view"></div>
  `;

  document.getElementById("detail").classList.remove("hidden");
}

function openStreetView() {
  if (!selectedSchool) return;

  const container = document.getElementById("streetView");
  container.style.display = "block";
  container.innerHTML = "";

  const panorama = new google.maps.StreetViewPanorama(container, {
    position: {
      lat: selectedSchool.lat,
      lng: selectedSchool.lng
    },
    pov: { heading: 0, pitch: 0 },
    zoom: 1,
    addressControl: true,
    fullscreenControl: true,
    motionTrackingControl: false
  });

  const service = new google.maps.StreetViewService();
  service.getPanorama(
    {
      location: {
        lat: selectedSchool.lat,
        lng: selectedSchool.lng
      },
      radius: 100
    },
    (data, status) => {
      if (status !== "OK") {
        container.innerHTML =
          '<div class="street-empty">Không tìm thấy ảnh Street View gần vị trí này.</div>';
      }
    }
  );

  panorama.setVisible(true);
}

function getDirections() {
  if (!selectedSchool) return;

  const destination = `${selectedSchool.lat},${selectedSchool.lng}`;

  if (!navigator.geolocation) {
    openDirections(destination);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const origin = `${position.coords.latitude},${position.coords.longitude}`;
      openDirections(destination, origin);
    },
    () => openDirections(destination)
  );
}

function openDirections(destination, origin = "") {
  const url = new URL("https://www.google.com/maps/dir/");
  url.searchParams.set("api", "1");
  url.searchParams.set("destination", destination);
  url.searchParams.set("travelmode", "driving");
  if (origin) url.searchParams.set("origin", origin);
  window.open(url.toString(), "_blank", "noopener");
}

document.getElementById("search").addEventListener("input", () => { if (map) render(); });
document.getElementById("level").addEventListener("change", () => { if (map) render(); });

document.getElementById("closeDetail").addEventListener("click", () => {
  document.getElementById("detail").classList.add("hidden");
});

document.getElementById("locateBtn").addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Trình duyệt không hỗ trợ xác định vị trí.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const current = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.panTo(current);
      map.setZoom(15);

      if (userMarker) userMarker.setMap(null);

      userMarker = new google.maps.Marker({
        map,
        position: current,
        title: "Vị trí của tôi",
        icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      });
    },
    () => alert("Không thể lấy vị trí. Hãy cấp quyền định vị cho trình duyệt.")
  );
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}
