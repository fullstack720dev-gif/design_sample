// API Configuration
const API_BASE = 'https://fedskillstest.coalitiontechnologies.workers.dev';
const AUTH_USERNAME = 'coalition';
const AUTH_PASSWORD = 'skills-test';


// Create Basic Auth header
function getAuthHeader() {
    const credentials = `${AUTH_USERNAME}:${AUTH_PASSWORD}`;
    const encodedCredentials = btoa(credentials);
    return `Basic ${encodedCredentials}`;
}

// Fetch all patients and find Jessica Taylor
async function fetchPatients() {
    try {
        const response = await fetch(API_BASE, {
            headers: {
                'Authorization': getAuthHeader()
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched patients:', data);
        return data;
    } catch (error) {
        console.error('Error fetching patients:', error);
        showError('Failed to load patients. Please check your connection.');
        return null;
    }
}

// Fetch specific patient data
async function fetchPatientData(patientId) {
    try {
        const response = await fetch(`${API_BASE}/${patientId}`, {
            headers: {
                'Authorization': getAuthHeader()
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched patient data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching patient data:', error);
        showError('Failed to load patient details.');
        return null;
    }
}

// Find Jessica Taylor in patients list


// Render patients list in left sidebar

function renderPatientsList(patients, selectedPatientId = null) {
    const container = document.getElementById('patients-list');
    if (!container) return;
    container.innerHTML = '';
    patients.forEach(patient => {
        const patientElement = document.createElement('div');
        patientElement.className = `patient-item${patient.id === selectedPatientId ? ' active' : ''}`;
        patientElement.onclick = async () => {
            document.querySelectorAll('.patient-item').forEach(item => item.classList.remove('active'));
            patientElement.classList.add('active');
            await displayPatientData(patient.id);
        };
        const age = calculateAge(patient.date_of_birth);
        const gender = patient.gender || 'N/A';
        // Always show image from server data
        let avatarHtml = '';
        if (patient.profile_image) {
            avatarHtml = `<img src="${patient.profile_image}" alt="${patient.name}" class="patient-avatar-small-img">`;
        } else {
            avatarHtml = `<img src=${patient.profile_picture} alt="No Image" class="patient-avatar-small-img">`;
        }
        patientElement.innerHTML = `
            <div class="patient-avatar-small-container">${avatarHtml}</div>
            <div class="patient-item-info">
                <div class="patient-item-name">${patient.name}</div>
                <div class="patient-item-meta">${gender}, ${age}</div>
            </div>
            <div class="patient-item-icon">⋮</div>
        `;
        container.appendChild(patientElement);
    });
}


// (No longer needed: click logic is now in renderPatientsList)

// Render patient information card
function renderPatientInfo(patient) {
    const container = document.getElementById('patient-info');
    console.log('Rendering patient info:', patient);
    const age = calculateAge(patient.date_of_birth);
    const gender = patient.gender || 'Not specified';
    const dob = formatDate(patient.date_of_birth);
    const phone = patient.phone_number || 'Not available';
    const email = patient.email_address || 'Not available';
    const emergency = patient.emergency_contact || 'Not available';
    const insurance = patient.insurance_provider || 'Not available';

    const initials = getInitials(patient.name);

    container.innerHTML = `
        <div class="patient-header">
            <div class="patient-avatar-large">${initials}</div>
            <div class="patient-basic-info">
                <h2>${patient.name}</h2>
                <div class="patient-meta">
                    <div class="patient-meta-item">
                        <span class="patient-meta-label">Date of Birth:</span>
                        <span>${dob}</span>
                    </div>
                    <div class="patient-meta-item">
                        <span class="patient-meta-label">Gender:</span>
                        <span>${gender}</span>
                    </div>
                    <div class="patient-meta-item">
                        <span class="patient-meta-label">Phone:</span>
                        <span>${phone}</span>
                    </div>
                    <div class="patient-meta-item">
                        <span class="patient-meta-label">Email:</span>
                        <span>${email}</span>
                    </div>
                    <div class="patient-meta-item">
                        <span class="patient-meta-label">Emergency Contact:</span>
                        <span>${emergency}</span>
                    </div>
                    <div class="patient-meta-item">
                        <span class="patient-meta-label">Insurance Provider:</span>
                        <span>${insurance}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render vital signs
function renderVitalSigns(patient) {
    if (!patient.diagnosis_history || patient.diagnosis_history.length === 0) {
        console.log('No diagnosis history for vitals:', patient);
        return;
    }
    const latestDiagnosis = patient.diagnosis_history[0];
    // Update the stat cards directly if you have IDs, or update the DOM as needed
    const statCards = document.querySelectorAll('.diagnostic-stat-card');
    if (statCards.length === 3) {
        // Respiratory Rate
        statCards[0].querySelector('.stat-value').textContent = latestDiagnosis.respiratory_rate ? `${latestDiagnosis.respiratory_rate} bpm` : '--';
        // Temperature
        statCards[1].querySelector('.stat-value').textContent = latestDiagnosis.temperature ? `${latestDiagnosis.temperature}°F` : '--';
        // Heart Rate
        statCards[2].querySelector('.stat-value').textContent = latestDiagnosis.heart_rate ? `${latestDiagnosis.heart_rate} bpm` : '--';
    }
}

// Render blood pressure chart
function renderBloodPressureChart(patient) {
    try {
        let diagnosisHistory = [];
        if (patient.diagnosis_history && patient.diagnosis_history.length > 0) {
            diagnosisHistory = patient.diagnosis_history.slice().reverse();
        } else {
            // Static demo data if no real data
            diagnosisHistory = [
                { month: '2025-10-01', blood_pressure: { systolic: 120, diastolic: 80 } },
                { month: '2025-11-01', blood_pressure: { systolic: 122, diastolic: 82 } },
                { month: '2025-12-01', blood_pressure: { systolic: 125, diastolic: 85 } },
                { month: '2026-01-01', blood_pressure: { systolic: 130, diastolic: 88 } },
                { month: '2026-02-01', blood_pressure: { systolic: 128, diastolic: 86 } }
            ];
        }

        const months = diagnosisHistory.map(d => {
            const date = new Date(d.month);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        });

        const systolicData = diagnosisHistory.map(d => d.blood_pressure.systolic);
        const diastolicData = diagnosisHistory.map(d => d.blood_pressure.diastolic);

        const canvasElement = document.getElementById('blood-pressure-chart');
        if (!canvasElement) {
            console.error('Canvas element not found');
            return;
        }

        const ctx = canvasElement.getContext('2d');

        // Destroy existing chart if it exists
        if (window.bpChart instanceof Chart) {
            window.bpChart.destroy();
        }

        window.bpChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Systolic',
                        data: systolicData,
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.05)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointBackgroundColor: '#ef4444',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Diastolic',
                        data: diastolicData,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.05)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        yAxisID: 'y'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 12,
                                weight: '600'
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        min: 0,
                        max: 200,
                        ticks: {
                            callback: function(value) {
                                return value;
                            }
                        },
                        title: {
                            display: true,
                            text: 'Blood Pressure (mmHg)',
                            font: {
                                size: 12,
                                weight: '600'
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date',
                            font: {
                                size: 12,
                                weight: '600'
                            }
                        }
                    }
                }
            }
        });
        console.log('Chart rendered successfully');
    } catch (error) {
        console.error('Error rendering blood pressure chart:', error);
    }
}
function renderDiagnosticList(patient) {
    const container = document.getElementById('diagnostic-list');
    console.log('Rendering diagnostic list:', patient.diagnostic_list);
    
    if (!patient.diagnostic_list || patient.diagnostic_list.length === 0) {
        container.innerHTML = '<tr><td colspan="3" class="loading-message">No diagnostic data available.</td></tr>';
        return;
    }

    container.innerHTML = '';

    patient.diagnostic_list.forEach(diagnostic => {
        const status = diagnostic.status === 'Active' ? 'Active' : 'Inactive';
        const statusClass = diagnostic.status === 'Active' ? 'status-active' : 'status-inactive';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${diagnostic.name || 'N/A'}</td>
            <td>${diagnostic.description || 'No description'}</td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
        `;
        container.appendChild(row);
    });
}

// Render lab results
function renderLabResults(patient) {
    const container = document.getElementById('lab-results');
    console.log('Rendering lab results:', patient.lab_results);
    
    if (!patient.lab_results || patient.lab_results.length === 0) {
        container.innerHTML = '<div class="loading-message">No lab results available.</div>';
        return;
    }

    container.innerHTML = '';

    patient.lab_results.forEach(lab => {
        const labElement = document.createElement('div');
        labElement.className = 'lab-item';
        labElement.innerHTML = `
            <div class="lab-info">
                <div class="lab-name">${lab.test_name}</div>
                <div class="lab-description">${lab.test_name} - Result</div>
            </div>
            <div class="lab-value">
                ${lab.test_value}
                <span class="lab-unit">${lab.test_unit || ''}</span>
            </div>
        `;
        container.appendChild(labElement);
    });
}

// Render user info section on right sidebar
function renderUserInfo(patient) {
    const container = document.getElementById('userinfo-content');
    console.log('Rendering user info:', patient);
    const initials = getInitials(patient.name);
    
    container.innerHTML = `
        <div class="userinfo-item userinfo-avatar">
            <div class="userinfo-avatar-large">${initials}</div>
            <div class="userinfo-value">${patient.name}</div>
        </div>
        <div class="userinfo-item">
            <div class="userinfo-icon">📅</div>
            <div class="userinfo-details">
                <div class="userinfo-label">Date of Birth</div>
                <div class="userinfo-value">${formatDate(patient.date_of_birth)}</div>
            </div>
        </div>
        <div class="userinfo-item">
            <div class="userinfo-icon">👤</div>
            <div class="userinfo-details">
                <div class="userinfo-label">Gender</div>
                <div class="userinfo-value">${patient.gender || 'N/A'}</div>
            </div>
        </div>
        <div class="userinfo-item">
            <div class="userinfo-icon">📞</div>
            <div class="userinfo-details">
                <div class="userinfo-label">Contact Info</div>
                <div class="userinfo-value">${patient.phone_number || 'N/A'}</div>
            </div>
        </div>
        <div class="userinfo-item">
            <div class="userinfo-icon">🆘</div>
            <div class="userinfo-details">
                <div class="userinfo-label">Emergency Contact</div>
                <div class="userinfo-value">${patient.emergency_contact || 'N/A'}</div>
            </div>
        </div>
        <div class="userinfo-item">
            <div class="userinfo-icon">🏥</div>
            <div class="userinfo-details">
                <div class="userinfo-label">Insurance Provider</div>
                <div class="userinfo-value">${patient.insurance_provider || 'N/A'}</div>
            </div>
        </div>
    `;
}

// Render lab results section
// ...existing code...

// Load and display patient data
async function displayPatientData(patientId) {
    const patientData = await fetchPatientData(patientId);
    if (patientData) {
        console.log('Displaying patient data:', patientData);
        renderPatientInfo(patientData);
        renderVitalSigns(patientData);
        renderBloodPressureChart(patientData);
        renderUserInfo(patientData);
        renderDiagnosticList(patientData);
        renderLabResults(patientData);
    } else {
        console.log('No patient data to display');
    }
}

// Utility functions
function getInitials(name) {
    if (!name) return '?';
    return name
        .split(' ')
        .map(n => n.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);
}

function calculateAge(dateOfBirth) {
    if (!dateOfBirth) return '?';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function showError(message) {
    console.error(message);
    const container = document.getElementById('patient-info');
    if (container) {
        container.innerHTML = `<div class="loading-message" style="color: #ef4444;">${message}</div>`;
    }
}

// Initialize the application with real API data
async function initializeApp() {
    try {
        // Fetch all patients
        const patients = await fetchPatients();
        if (!patients || !Array.isArray(patients) || patients.length === 0) {
            showError('No patients found.');
            return;
        }
        // Render patients list in sidebar
        renderPatientsList(patients, patients[0].id);
        // Display first patient's data by default
        await displayPatientData(patients[0].id);
    } catch (error) {
        showError('Failed to initialize app.');
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);
