let patients = JSON.parse(localStorage.getItem("patients")) || [];
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let billTotal = 0;
let chart;

// PAGE SWITCH
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id === "analytics") renderChart();
  updateDashboard();
}

// DEFAULT PAGE
showPage("dashboard");

// DARK MODE
function toggleDark() {
  document.body.classList.toggle("dark");
}

// MENU (mobile ready)
function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("open");
}

// PATIENTS
function addPatient() {
  let name = pname.value;
  let age = pageAge.value;

  if (!name || !age) return alert("Fill all fields");

  patients.push({ name, age });
  localStorage.setItem("patients", JSON.stringify(patients));

  pname.value = pageAge.value = "";
  renderPatients();
  updateDashboard();
}

function renderPatients() {
  plist.innerHTML = patients
    .map(p => `<div class="card">${p.name} (${p.age})</div>`)
    .join("");
}

// DOCTORS
function addDoctor() {
  if (!dname.value || !dspec.value) return alert("Fill all fields");

  doctors.push({ name: dname.value, spec: dspec.value });
  localStorage.setItem("doctors", JSON.stringify(doctors));

  dname.value = dspec.value = "";
  renderDoctors();
  updateDashboard();
}

function renderDoctors() {
  dlist.innerHTML = doctors
    .map(d => `<div class="card">${d.name} - ${d.spec}</div>`)
    .join("");
}

// APPOINTMENTS
function addAppointment() {
  if (!ap.value || !ad.value || !adate.value) return alert("Fill all fields");

  appointments.push({
    patient: ap.value,
    doctor: ad.value,
    date: adate.value
  });

  localStorage.setItem("appointments", JSON.stringify(appointments));

  ap.value = ad.value = adate.value = "";
  renderAppointments();
  updateDashboard();
}

function renderAppointments() {
  alist.innerHTML = appointments
    .map(a => `<div class="card">${a.patient} → ${a.doctor} (${a.date})</div>`)
    .join("");
}

// BILLING
function addBill() {
  if (!bprice.value) return;
  billTotal += Number(bprice.value);
  total.innerText = billTotal;
  bprice.value = "";
}

// DASHBOARD
function updateDashboard() {
  dp.innerText = patients.length;
  dd.innerText = doctors.length;
  da.innerText = appointments.length;
}

// ANALYTICS
function renderChart() {
  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels: ["Patients", "Doctors", "Appointments"],
      datasets: [{
        label: "Hospital Data",
        data: [patients.length, doctors.length, appointments.length],
        backgroundColor: ["#3b82f6", "#22c55e", "#f97316"]
      }]
    }
  });
}

// INITIAL RENDER
renderPatients();
renderDoctors();
renderAppointments();
updateDashboard();
